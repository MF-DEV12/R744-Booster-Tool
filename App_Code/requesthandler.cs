using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Net.Mail;
using System.Collections;
using System.Configuration;

/// <summary>
/// Summary description for requesthandler
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class requesthandler : System.Web.Services.WebService {

    public requesthandler () {  }
     
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseObject GetUsers()
    {
        ResponseObject result = new ResponseObject();
        try
        {
            DAOManager dao = new DAOManager();
            Users u = new Users(); 
            result.ResponseItem = dao.GetUsers(u); 
        }
        catch (Exception e)
        {
            result.ErrorMessage = e.Message;
        }
        return result;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseObject ApproveRequest(int id)
    {
        ResponseObject result = new ResponseObject();
        try
        {
            DAOManager dao = new DAOManager();
            Users user = new Users();
            user.ID = id.ToString();
            user.Status = "1"; // 1: Approved/License Sent

            // ENCRYPT THE MACADDRESS FOR LICENSE
            string key = CryptograpyhLib.getHashSha256("ECTAppDev", 31);
            string iv = "3wyAxXkBlzt2kG5a";
            CryptograpyhLib crypto = new CryptograpyhLib();
            user.License = crypto.encrypt(Utility.GetMACAddress(), key, iv); ;

            ArrayList list = dao.UpdateUserStatus(user);
            Users u = new Users();
            u = (Users)list[0];

            //SEND EMAIL
            MailMaster mail = new MailMaster();
            MailParameter param = new MailParameter();
            ArrayList contentValue = new ArrayList();
            contentValue.Add(new KeyValue("@LicensID", u.License));
            contentValue.Add(new KeyValue("@Name", u.FirstName));
            param.ParamValue = contentValue;
            param.EmailTo = u.EmailAddress;
            param.EmailTemplate = "sendlicense";
            param.Subject = "Booster Tool License Request Approval";
            mail.sendMail(param);
            // RETURN UPDATE CURRENT DATA
            result.ResponseItem = list;

         
        }
        catch (Exception e)
        {
            result.ErrorMessage = e.Message;
        }
        return result;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseObject RejectRequest(int id)
    {
        ResponseObject result = new ResponseObject();
        try
        {
            DAOManager dao = new DAOManager();
            Users user = new Users();
            user.ID = id.ToString();
            user.Status = "2"; // 2: Rejected 

            ArrayList list = dao.UpdateUserStatus(user);
            Users u = new Users();
            u = (Users)list[0];
              
            //SEND EMAIL
            string adminEmail = ConfigurationManager.AppSettings["AdminEmail"].ToString();
            MailMaster mail = new MailMaster();
            MailParameter param = new MailParameter();
            ArrayList contentValue = new ArrayList();
            contentValue.Add(new KeyValue("@Name", u.FirstName));
            contentValue.Add(new KeyValue("@AdminEmail", adminEmail));
            param.ParamValue = contentValue;
            param.EmailTo = u.EmailAddress;
            param.EmailTemplate = "rejectrequest";
            param.Subject = "Booster Tool License Request Denied";
            mail.sendMail(param);
            // RETURN UPDATE CURRENT DATA
            result.ResponseItem = list;
        }
        catch (Exception e)
        {
            result.ErrorMessage = e.Message;
        }
        return result;
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseObject CheckMacAddress(string lastname, string firstname, string email, string macaddress)
    {
        ResponseObject result = new ResponseObject();
        try
        {
            DAOManager dao = new DAOManager();
            Users u = new Users();
            u.EmailAddress = email; 
            ArrayList list = dao.GetUsers(u);
            
            if (list.Count > 0)
            {
                Users ulist = new Users();
                ulist = (Users)list[0];
                if (ulist.Status != "1")
                    throw new Exception("Already Exists."); 
                else
                    throw new Exception("Already Registered.");
            }
            else {
                u.FirstName = firstname;
                u.LastName = lastname;
                u.MacAddress = macaddress; //Utility.GetMACAddress();
                if (dao.InsertUsers(u))
                    result.ResponseItem = "Successfully added.";
                else
                    throw new Exception("Error in Insert");
                
            }
        }
        catch (Exception e)
        {
            result.ErrorMessage = e.Message;
        }
        return result;
    }



    
}
