// <copyright file="DynamicJsonConverter.cs" company="Yojowa, LLC">
// Copyright (c) 2016-2020 All Rights Reserved
// </copyright>
// <author>Alex Bulankou</author>
// <date>11/09/2016</date>

namespace Yojowa.StopByStop.Utils
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Dynamic;
    using System.Linq;
    using System.Text;
    using System.Web.Script.Serialization;

    /// <summary>
    /// Dynamic JSON converter
    /// </summary>
    /// <seealso cref="System.Web.Script.Serialization.JavaScriptConverter" />
    public sealed class DynamicJsonConverter : JavaScriptConverter
    {
        /*
           /// Original Source: http://www.drowningintechnicaldebt.com/ShawnWeisfeld/archive/2010/08/22/using-c-4.0-and-dynamic-to-parse-json.aspx
           /// Original Source: http://stackoverflow.com/a/3806407 
         
         */

        /// <summary>
        /// When overridden in a derived class, gets a collection of the supported types.
        /// </summary>
        public override IEnumerable<Type> SupportedTypes
        {
            get { return new ReadOnlyCollection<Type>(new List<Type>(new[] { typeof(object) })); }
        }

        /// <summary>
        /// When overridden in a derived class, converts the provided dictionary into an object of the specified type.
        /// </summary>
        /// <param name="dictionary">An <see cref="T:System.Collections.Generic.IDictionary`2" /> instance of property data stored as name/value pairs.</param>
        /// <param name="type">The type of the resulting object.</param>
        /// <param name="serializer">The <see cref="T:System.Web.Script.Serialization.JavaScriptSerializer" /> instance.</param>
        /// <returns>
        /// The deserialized object.
        /// </returns>
        /// <exception cref="System.ArgumentNullException">dictionary parameter not correct</exception>
        public override object Deserialize(IDictionary<string, object> dictionary, Type type, JavaScriptSerializer serializer)
        {
            if (dictionary == null)
            {
                throw new ArgumentNullException("dictionary");
            }

            return type == typeof(object) ? new DynamicJsonObject(dictionary) : null;
        }

        /// <summary>
        /// When overridden in a derived class, builds a dictionary of name/value pairs.
        /// </summary>
        /// <param name="obj">The object to serialize.</param>
        /// <param name="serializer">The object that is responsible for the serialization.</param>
        /// <returns>
        /// An object that contains key/value pairs that represent the object’s data.
        /// </returns>
        /// <exception cref="System.NotImplementedException">Method is not implemented</exception>
        public override IDictionary<string, object> Serialize(object obj, JavaScriptSerializer serializer)
        {
            throw new NotImplementedException();
        }
        #region Nested type: DynamicJsonObject

        /// <summary>
        /// Dynamic JSON object
        /// </summary>
        /// <seealso cref="System.Dynamic.DynamicObject" />
        private sealed class DynamicJsonObject : DynamicObject
        {
            /// <summary>
            /// The dictionary
            /// </summary>
            private readonly IDictionary<string, object> dictionary;

            /// <summary>
            /// Initializes a new instance of the <see cref="DynamicJsonObject"/> class.
            /// </summary>
            /// <param name="dictionary">The dictionary.</param>
            /// <exception cref="System.ArgumentNullException">dictionary parameter missing</exception>
            public DynamicJsonObject(IDictionary<string, object> dictionary)
            {
                if (dictionary == null)
                {
                    throw new ArgumentNullException("dictionary");
                }

                this.dictionary = dictionary;
            }

            /// <summary>
            /// Returns a <see cref="System.String" /> that represents this instance.
            /// </summary>
            /// <returns>
            /// A <see cref="System.String" /> that represents this instance.
            /// </returns>
            public override string ToString()
            {
                var sb = new StringBuilder("{");
                this.ToString(sb);
                return sb.ToString();
            }

            /// <summary>
            /// Provides the implementation for operations that get member values. Classes derived from the <see cref="T:System.Dynamic.DynamicObject" /> class can override this method to specify dynamic behavior for operations such as getting a value for a property.
            /// </summary>
            /// <param name="binder">Provides information about the object that called the dynamic operation. The binder.Name property provides the name of the member on which the dynamic operation is performed. For example, for the Console.WriteLine(sampleObject.SampleProperty) statement, where sampleObject is an instance of the class derived from the <see cref="T:System.Dynamic.DynamicObject" /> class, binder.Name returns "SampleProperty". The binder.IgnoreCase property specifies whether the member name is case-sensitive.</param>
            /// <param name="result">The result of the get operation. For example, if the method is called for a property, you can assign the property value to <paramref name="result" />.</param>
            /// <returns>
            /// true if the operation is successful; otherwise, false. If this method returns false, the run-time binder of the language determines the behavior. (In most cases, a run-time exception is thrown.)
            /// </returns>
            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                if (!this.dictionary.TryGetValue(binder.Name, out result))
                {
                    // return null to avoid exception.  caller can check for null this way...
                    result = null;
                    return true;
                }

                result = WrapResultObject(result);
                return true;
            }

            /// <summary>
            /// Provides the implementation for operations that get a value by index. Classes derived from the <see cref="T:System.Dynamic.DynamicObject" /> class can override this method to specify dynamic behavior for indexing operations.
            /// </summary>
            /// <param name="binder">Provides information about the operation.</param>
            /// <param name="indexes">The indexes that are used in the operation. For example, for the sampleObject[3] operation in C# (sampleObject(3) in Visual Basic), where sampleObject is derived from the DynamicObject class, <paramref name="indexes[0]" /> is equal to 3.</param>
            /// <param name="result">The result of the index operation.</param>
            /// <returns>
            /// true if the operation is successful; otherwise, false. If this method returns false, the run-time binder of the language determines the behavior. (In most cases, a run-time exception is thrown.)
            /// </returns>
            public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
            {
                if (indexes.Length == 1 && indexes[0] != null)
                {
                    if (!this.dictionary.TryGetValue(indexes[0].ToString(), out result))
                    {
                        // return null to avoid exception.  caller can check for null this way...
                        result = null;
                        return true;
                    }

                    result = WrapResultObject(result);
                    return true;
                }

                return base.TryGetIndex(binder, indexes, out result);
            }

            /// <summary>
            /// Wraps the result object.
            /// </summary>
            /// <param name="result">The result.</param>
            /// <returns>Result object</returns>
            private static object WrapResultObject(object result)
            {
                var dictionary = result as IDictionary<string, object>;
                if (dictionary != null)
                {
                    return new DynamicJsonObject(dictionary);
                }

                var arrayList = result as ArrayList;
                if (arrayList != null && arrayList.Count > 0)
                {
                    return arrayList[0] is IDictionary<string, object>
                        ? new List<object>(arrayList.Cast<IDictionary<string, object>>().Select(x => new DynamicJsonObject(x)))
                        : new List<object>(arrayList.Cast<object>());
                }

                return result;
            }

            /// <summary>
            /// Converts internal StringBuilder to string
            /// </summary>
            /// <param name="sb">StringBuilder instance</param>
            private void ToString(StringBuilder sb)
            {
                var firstInDictionary = true;
                foreach (var pair in this.dictionary)
                {
                    if (!firstInDictionary)
                    {
                        sb.Append(",");
                    }

                    firstInDictionary = false;
                    var value = pair.Value;
                    var name = pair.Key;
                    if (value is string)
                    {
                        sb.AppendFormat("{0}:\"{1}\"", name, value);
                    }
                    else if (value is IDictionary<string, object>)
                    {
                        new DynamicJsonObject((IDictionary<string, object>)value).ToString(sb);
                    }
                    else if (value is ArrayList)
                    {
                        sb.Append(name + ":[");
                        var firstInArray = true;
                        foreach (var arrayValue in (ArrayList)value)
                        {
                            if (!firstInArray)
                            {
                                sb.Append(",");
                            }

                            firstInArray = false;
                            if (arrayValue is IDictionary<string, object>)
                            {
                                new DynamicJsonObject((IDictionary<string, object>)arrayValue).ToString(sb);
                            }
                            else if (arrayValue is string)
                            {
                                sb.AppendFormat("\"{0}\"", arrayValue);
                            }
                            else
                            {
                                sb.AppendFormat("{0}", arrayValue);
                            }
                        }

                        sb.Append("]");
                    }
                    else
                    {
                        sb.AppendFormat("{0}:{1}", name, value);
                    }
                }

                sb.Append("}");
            }
        }
        #endregion
    }
}
