using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

class DataTransformerUtility
{
    public DataTransformerUtility() { }

    public string convertToSQLString(string strValue, int dtype)
    {
        string cleanedvalue = strValue.Trim();
        cleanedvalue = strValue.Replace("&nbsp;", " ");
        cleanedvalue = strValue.Replace("&quot;", "\"");
        if (String.IsNullOrEmpty(cleanedvalue) == false)
        {
            switch (dtype)
            {
                case 1:
                    {
                        break;
                    }
                case 2:
                    {
                        cleanedvalue = cleanedvalue.Replace(",", "");
                        break;
                    }
                case 3:
                    {
                        cleanedvalue = cleanedvalue.Replace(",", "");
                        break;
                    }
                case 4:
                    {
                        cleanedvalue = "'" + cleanedvalue + "'";
                        break;
                    }
                case 5:
                    {
                        bool tmpBool = Boolean.Parse(cleanedvalue);
                        if (tmpBool == true)
                            cleanedvalue = "1";
                        else
                            cleanedvalue = "0";
                        break;
                    }
                case 6:
                    {
                        cleanedvalue = "'" + cleanedvalue.Replace("'", "''") + "'";
                        break;
                    }
                default:
                    {
                        cleanedvalue = "'" + cleanedvalue.ToUpper().Replace("'", "''") + "'";
                        break;
                    }
            }
        }
        else
            cleanedvalue = "NULL";
        return cleanedvalue;
    }
    public string cleanInput(string strValue, int dtype)
    {
        string cleanedvalue = strValue.Trim();

        switch (dtype)
        {
            case 1:
                {
                    if (String.IsNullOrEmpty(cleanedvalue) == true)
                        cleanedvalue = "0";
                    break;
                }
            case 2:
                {
                    if (String.IsNullOrEmpty(cleanedvalue) == true)
                        cleanedvalue = "0";
                    break;
                }
            case 3:
                {
                    if (String.IsNullOrEmpty(cleanedvalue) == true)
                        cleanedvalue = "0";
                    break;
                }
            case 4:
                {

                    break;
                }
            case 5:
                {
                    if (String.IsNullOrEmpty(cleanedvalue) == true)
                        cleanedvalue = "False";
                    break;
                }
            default:
                {

                    break;
                }
        }
        return cleanedvalue;
    }
    public string extractStringValue(object obj, int dtype)
    {
        if (obj != DBNull.Value)
        {
            return obj.ToString();
        }
        else
        {
            if (dtype == DataType.BOOLEAN)
                return "False";
            else if ((dtype == DataType.DECIMAL) || (dtype == DataType.NUMBER) || (dtype == DataType.PRIMARYKEY))
                return "0";
            else
                return "";
        }

    }
    public static class DataType
    {
        public static int STRING = 0;
        public static int PRIMARYKEY = 1;
        public static int NUMBER = 2;
        public static int DECIMAL = 3;
        public static int DATE = 4;
        public static int BOOLEAN = 5;
        public static int PASSWORD = 6;
    }
}
