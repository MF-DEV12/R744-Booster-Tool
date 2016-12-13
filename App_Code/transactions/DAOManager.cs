using General;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Net.NetworkInformation;
using System.Web;

/// <summary>
/// Summary description for DAOManager
/// </summary>
public class DAOManager
{
	public DAOManager() { }


    public ArrayList GetUsers(Users user)
    {
        ConnectionMaster cm = new ConnectionMaster();
        DataTable dt = new DataTable();
        DataTransformerUtility dtu = new DataTransformerUtility();
        ArrayList list = new ArrayList();
        ArrayList param = new ArrayList();

        param.Add(new SqlParameter("@ID", user.ID));
        param.Add(new SqlParameter("@EmailAddress", user.EmailAddress));
        param.Add(new SqlParameter("@MacAddress", user.MacAddress));
        param.Add(new SqlParameter("@Status", user.Status)); 
        dt = cm.retrieveDataTableBySP("sp_SelectUsersWithFilter", param); 
        foreach (DataRow row in dt.Rows)
        {
            Users u = new Users();
            u.ID = dtu.extractStringValue(row["ID"], DataTransformerUtility.DataType.PRIMARYKEY);
            u.FullName = dtu.extractStringValue(row["Name"], DataTransformerUtility.DataType.STRING);
            u.EmailAddress = dtu.extractStringValue(row["EmailAddress"], DataTransformerUtility.DataType.STRING);
            u.MacAddress = dtu.extractStringValue(row["MacAddress"], DataTransformerUtility.DataType.STRING);
            u.License = dtu.extractStringValue(row["License"], DataTransformerUtility.DataType.STRING);
            u.Status = dtu.extractStringValue(row["Status"], DataTransformerUtility.DataType.STRING);
            list.Add(u);
        }

        return list; 
    }

    public ArrayList UpdateUserStatus(Users user)
    {
        ConnectionMaster cm = new ConnectionMaster();
        DataTable dt = new DataTable();
        DataTransformerUtility dtu = new DataTransformerUtility();
        ArrayList list = new ArrayList();
        ArrayList param = new ArrayList();

        param.Add(new SqlParameter("@ID", user.ID));
        param.Add(new SqlParameter("@Status", user.Status));
        if (user.License != "")
            param.Add(new SqlParameter("@License", user.License));
        dt = cm.retrieveDataTableBySP("sp_UpdateUserStatusByID", param);
        foreach (DataRow row in dt.Rows)
        {
            Users u = new Users();
            u.ID = dtu.extractStringValue(row["ID"], DataTransformerUtility.DataType.PRIMARYKEY);
            u.FullName = dtu.extractStringValue(row["Name"], DataTransformerUtility.DataType.STRING);
            u.FirstName = dtu.extractStringValue(row["FirstName"], DataTransformerUtility.DataType.STRING);
            u.LastName = dtu.extractStringValue(row["LastName"], DataTransformerUtility.DataType.STRING);
            u.EmailAddress = dtu.extractStringValue(row["EmailAddress"], DataTransformerUtility.DataType.STRING);
            u.MacAddress = dtu.extractStringValue(row["MacAddress"], DataTransformerUtility.DataType.STRING);
            u.License = dtu.extractStringValue(row["License"], DataTransformerUtility.DataType.STRING);
            u.Status = dtu.extractStringValue(row["Status"], DataTransformerUtility.DataType.STRING);
            list.Add(u);
        }

        return list;
    }

    public Boolean InsertUsers(Users u) {
        ConnectionMaster cm = new ConnectionMaster();
        ArrayList param = new ArrayList();

        param.Add(new SqlParameter("@LastName", u.LastName));
        param.Add(new SqlParameter("@FirstName", u.FirstName));
        param.Add(new SqlParameter("@EmailAddress", u.EmailAddress));
        param.Add(new SqlParameter("@MacAddress", u.MacAddress));

        long i = cm.executeCommandBySP("sp_InsertUsers", param, false);

        string AdminLink = ConfigurationManager.AppSettings["AdminLink"].ToString();

        MailMaster mail = new MailMaster();
        MailParameter paramMail = new MailParameter();
        ArrayList contentValue = new ArrayList();
        contentValue.Add(new KeyValue("@MacAddress", u.MacAddress));
        contentValue.Add(new KeyValue("@LastName", u.LastName));
        contentValue.Add(new KeyValue("@FirstName", u.FirstName));
        contentValue.Add(new KeyValue("@adminLink", AdminLink));
        paramMail.ParamValue = contentValue;
        paramMail.EmailFrom = new MailAddress(u.EmailAddress);
        paramMail.EmailTemplate = "newrequest";
        paramMail.Subject = "Booster Tool New User License Request";
        mail.sendMail(paramMail);



        return ((i > 0) ? true : false);

    }
   
}