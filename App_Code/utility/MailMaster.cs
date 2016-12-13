using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Reflection;
using System.Diagnostics;
using System.Collections;

public class MailMaster
{
    private string host = ConfigurationManager.AppSettings["SMTPServerIP"].ToString();
    private MailAddress AdminEmail = new MailAddress(ConfigurationManager.AppSettings["AdminEmail"].ToString());

    public MailMaster() { }
  
     

    public void sendMail(MailParameter param)
    {
        MailMessage email = new MailMessage();
        email.IsBodyHtml = true;

        //// List of receivers 
        if (param.EmailTo != null)
        {
            string[] toList = param.EmailTo.Split(';');
            foreach (string toListItem in toList) 
                email.To.Add(new MailAddress(toListItem)); 
        }
        else 
            email.To.Add(AdminEmail); 

        string body = bindingValuetoContent(param);

        email.From = (param.EmailFrom != null) ? param.EmailFrom : AdminEmail;
        email.Subject = param.Subject;
        email.Body = body;

        // List of attachement
        if (param.Attachments != null)  
            foreach (Attachment attachment in param.Attachments) 
                email.Attachments.Add(attachment); 
        
        
        SmtpClient client = new SmtpClient();
        client.Timeout = 2000000;
        client.Host = host;
        client.Port = 25;
        client.Send(email);
    }

    private string bindingValuetoContent(MailParameter param)
    {
        var server = HttpContext.Current.Server;
        string path = server.MapPath("~/resources/templates/email/" + param.EmailTemplate + ".html");
        string body = System.IO.File.ReadAllText(path);

        if (param.ParamValue != null)
            foreach (KeyValue k in param.ParamValue)
                body = body.Replace(k.PKey, k.PValue);
 
        return body;
    }

}