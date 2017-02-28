// <copyright file="NPGSQLTable.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>02/01/2017</date>

namespace Yojowa.StopByStop.Store
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Npgsql;
    using Utils;

    /// <summary>
    /// PostgreSQL table wrapper
    /// </summary>
    /// <typeparam name="TContainer">The type of the container.</typeparam>
    public class NPGSQLTable<TContainer> where TContainer : new()
    {
        /// <summary>
        /// The columns map
        /// </summary>
        private Dictionary<string, NPGSQLColumn<TContainer>> columnsMap;

        /// <summary>
        /// The connection string
        /// </summary>
        private string connectionString;

        /// <summary>
        /// The private key column name
        /// </summary>
        private string privateKeyColumnName;

        /// <summary>
        /// The index creation statement
        /// </summary>
        private string indexCreationStatement;

        /// <summary>
        /// Initializes a new instance of the <see cref="NPGSQLTable{TContainer}" /> class.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="tableName">Name of the table.</param>
        /// <param name="columns">The columns.</param>
        /// <param name="privateKeyColumnName">Name of the private key column.</param>
        /// <param name="indexCreationStatement">The index creation statement.</param>
        /// <exception cref="System.ArgumentOutOfRangeException">columns - Expecting more than 1 column.</exception>
        public NPGSQLTable(
            string connectionString,
            string tableName,
            IEnumerable<NPGSQLColumn<TContainer>> columns,
            string privateKeyColumnName,
            string indexCreationStatement = null)
        {
            this.columnsMap = columns.ToDictionary(c => c.DBColumnName, StringComparer.OrdinalIgnoreCase);

            if (this.columnsMap.Count < 2)
            {
                throw new ArgumentOutOfRangeException("columns", "Expecting more than 1 column.");
            }

            this.connectionString = connectionString;
            this.TableName = tableName;
            this.privateKeyColumnName = privateKeyColumnName;
            this.indexCreationStatement = indexCreationStatement;
        }

        /// <summary>
        /// Gets the name of the table.
        /// </summary>
        /// <value>
        /// The name of the table.
        /// </value>
        public string TableName { get; private set; }

        /// <summary>
        /// Gets the items.
        /// </summary>
        /// <param name="reader">The data reader.</param>
        /// <returns>Collection of items</returns>
        public IEnumerable<TContainer> Get(NpgsqlDataReader reader)
        {
            while (reader.Read())
            {
                TContainer obj = new TContainer();
                var columns = this.columnsMap.Values.ToArray();
                for (int i = 0; i < columns.Length; i++)
                {
                    columns[i].Setter(obj, reader[columns[i].DBColumnName]);
                }

                yield return obj;
            }
        }

        /// <summary>
        /// Gets all the items.
        /// </summary>
        /// <param name="whereClause">The where clause.</param>
        /// <returns>
        /// All the items in the table
        /// </returns>
        public IEnumerable<TContainer> GetAll(string whereClause = null)
        {
            string columns = string.Join(", ", this.columnsMap.Values.Select(c => c.DBColumnTextToRetrieve));
            string selectQuery = string.Format("SELECT {0} FROM {1}", columns, this.TableName);
            if (!string.IsNullOrEmpty(whereClause))
            {
                selectQuery += " " + whereClause;
            }

            return PGSQLRunner.ExecutePGSQLStatement<IEnumerable<TContainer>>(
                this.connectionString,
                selectQuery,
                (cmd, c) =>
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        return this.Get(reader).ToArray();
                    }
                });
        }

        /// <summary>
        /// Creates this instance.
        /// </summary>
        public void Create()
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("DROP TABLE IF EXISTS {0};", this.TableName);
            stringBuilder.AppendFormat("CREATE TABLE {0}(", this.TableName);
            var columns = this.columnsMap.Values.ToArray();
            for (int i = 0; i < columns.Length; i++)
            {
                stringBuilder.AppendFormat("{0} {1}", columns[i].DBColumnName, columns[i].DBColumnInfo);
                if (i < columns.Length - 1)
                {
                    stringBuilder.Append(",");
                }
            }

            stringBuilder.Append(")WITH (OIDS = FALSE);");

            PGSQLRunner.ExecutePGSQLStatement<object>(this.connectionString, stringBuilder.ToString());

            this.CreateIndices();
        }

        /// <summary>
        /// Creates the indices.
        /// </summary>
        public void CreateIndices()
        {
            if (!string.IsNullOrEmpty(this.indexCreationStatement))
            {
                PGSQLRunner.ExecutePGSQLStatement<object>(this.connectionString, this.indexCreationStatement);
            }
        }

        /// <summary>
        /// Deletes this instance.
        /// </summary>
        public void Delete()
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("DROP TABLE IF EXISTS {0};", this.TableName);
            PGSQLRunner.ExecutePGSQLStatement<object>(this.connectionString, stringBuilder.ToString());
        }

        /// <summary>
        /// Upserts the specified items.
        /// </summary>
        /// <param name="items">The items.</param>
        public void Upsert(IEnumerable<TContainer> items)
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("INSERT INTO {0} (", this.TableName);
            var columns = this.columnsMap.Values.ToArray();

            for (int i = 0; i < columns.Length; i++)
            {
                stringBuilder.Append(columns[i].DBColumnName);
                if (i < columns.Length - 1)
                {
                    stringBuilder.Append(",");
                }
            }

            stringBuilder.Append(") VALUES ");

            var itemsArray = items.ToArray();
            for (int i = 0; i < itemsArray.Length; i++)
            {
                stringBuilder.Append("(");
                for (int k = 0; k < columns.Length; k++)
                {
                    stringBuilder.Append(columns[k].Getter(itemsArray[i]));
                    if (k < columns.Length - 1)
                    {
                        stringBuilder.Append(",");
                    }
                }

                stringBuilder.Append(")");
                if (i < itemsArray.Length - 1)
                {
                    stringBuilder.Append(",");
                }
            }

            stringBuilder.AppendFormat(" ON CONFLICT({0}) DO UPDATE SET ", this.privateKeyColumnName);
            for (int i = 0; i < columns.Length; i++)
            {
                if (!columns[i].DBColumnName.Equals(this.privateKeyColumnName, StringComparison.OrdinalIgnoreCase))
                {
                    stringBuilder.AppendFormat("{0}=excluded.{0},", columns[i].DBColumnName);
                }

                if (i == columns.Length - 1)
                {
                    stringBuilder.Remove(stringBuilder.Length - 1, 1);
                }
            }

            PGSQLRunner.ExecutePGSQLStatement<object>(this.connectionString, stringBuilder.ToString());
        }
    }
}
