// <copyright file="NPGSQLColumn.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>02/01/2017</date>

namespace Yojowa.StopByStop.Store
{
    using System;

    /// <summary>
    /// PostgreSQL column wrapper
    /// </summary>
    /// <typeparam name="TContainer">The type of the container.</typeparam>
    public class NPGSQLColumn<TContainer>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="NPGSQLColumn{TContainer}"/> class.
        /// </summary>
        /// <param name="databaseColumnName">Name of the database column.</param>
        /// <param name="databaseColumnInfo">The database column information.</param>
        /// <param name="setter">The setter.</param>
        /// <param name="getter">The getter.</param>
        public NPGSQLColumn(
            string databaseColumnName,
            string databaseColumnInfo,
            Action<TContainer, object> setter,
            Func<TContainer, string> getter)
        {
            this.DBColumnName = databaseColumnName;
            this.DBColumnInfo = databaseColumnInfo;
            this.Setter = setter;

            this.Getter = getter;
        }

        /// <summary>
        /// Gets the name of the database column.
        /// </summary>
        /// <value>
        /// The name of the database column.
        /// </value>
        public string DBColumnName { get; private set; }

        /// <summary>
        /// Gets the database column information.
        /// </summary>
        /// <value>
        /// The database column information.
        /// </value>
        public string DBColumnInfo { get; private set; }

        /// <summary>
        /// Gets the setter.
        /// </summary>
        /// <value>
        /// The setter.
        /// </value>
        public Action<TContainer, object> Setter { get; private set; }

        /// <summary>
        /// Gets the getter.
        /// </summary>
        /// <value>
        /// The getter.
        /// </value>
        public Func<TContainer, string> Getter { get; private set; }
    }
}
