using System;
using System.Data;
using System.Web;
using System.Collections;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;


namespace General
{
    public class ConnectionMaster
    {
        private string connectionString = System.Configuration.ConfigurationSettings.AppSettings["DBConnectionString"];
        public ConnectionMaster() { }
        /// <returns>DataTable</returns>
        public DataTable retrieveDataTable(string _sqlString)
        {

            SqlConnection sqlCon = new SqlConnection(this.connectionString);
            sqlCon.Open();

            SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
            SqlDataReader reader = sqlCom.ExecuteReader();

            DataTable ret = new DataTable();
            ret.Load(reader);

            sqlCom.Dispose();
            reader.Close();
            reader.Dispose();
            sqlCon.Close();
            sqlCon.Dispose();
            return ret;
        }

        public DataTable retrieveDataTableBySP(string _sqlString, ArrayList _sqlparameters)
        {

            SqlConnection sqlCon = new SqlConnection(this.connectionString);
            sqlCon.Open();

            SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
            // add parameters
            foreach (SqlParameter parameter in _sqlparameters)
                sqlCom.Parameters.Add(parameter);

            sqlCom.CommandType = CommandType.StoredProcedure;
            SqlDataReader reader = sqlCom.ExecuteReader();

            DataTable ret = new DataTable();
            ret.Load(reader);

            sqlCom.Dispose();
            reader.Close();
            reader.Dispose();
            sqlCon.Close();
            sqlCon.Dispose();
            return ret;
        }

        public long executeCommandBySP(string _sqlString, ArrayList _sqlparameters, bool retrieveID)
        {
            SqlConnection sqlCon = new SqlConnection(this.connectionString);

            sqlCon.Open();
            long result = 0;

            if (retrieveID == true)
            {
                SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
                sqlCom.CommandType = CommandType.StoredProcedure;
                //sqlCom.CommandType = CommandType.StoredProcedure;
                // add parameters
                foreach (SqlParameter parameter in _sqlparameters)
                    sqlCom.Parameters.Add(parameter);

                SqlParameter returnParameter = sqlCom.Parameters.Add("@result", SqlDbType.Int);
                returnParameter.Direction = ParameterDirection.ReturnValue;
                sqlCom.ExecuteNonQuery();
                result = (int)sqlCom.Parameters["@result"].Value;
            }
            else
            {
                SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
                sqlCom.CommandType = CommandType.StoredProcedure;
                // add parameters
                foreach (SqlParameter parameter in _sqlparameters)
                    sqlCom.Parameters.Add(parameter);
                result = sqlCom.ExecuteNonQuery();
            }
            sqlCon.Close();
            return result;

        }

        public long executeCommand(string _sqlString, bool retrieveID)
        {
            SqlConnection sqlCon = new SqlConnection(this.connectionString);
            sqlCon.Open();

            if (retrieveID == true)
            {
                _sqlString += "; SELECT SCOPE_IDENTITY();";
                SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
                return Convert.ToInt64(sqlCom.ExecuteScalar());
            }
            else
            {
                SqlCommand sqlCom = new SqlCommand(_sqlString, sqlCon);
                return sqlCom.ExecuteNonQuery();
            }

        }

        public DataTable limitDataTable(DataTable _refTable, int _limit)
        {
            DataTable dt = new DataTable();
            for (int i = 0; i < _refTable.Columns.Count; i++)
                dt.Columns.Add(_refTable.Columns[i].ColumnName, _refTable.Columns[i].DataType);

            if (_refTable.Rows.Count < _limit)
                _limit = _refTable.Rows.Count;
            for (int i = 0; i < _limit; i++)
                dt.Rows.Add(_refTable.Rows[i].ItemArray);

            return dt;
        }
    }
}
