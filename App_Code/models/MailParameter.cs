using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

/// <summary>
/// Summary description for MailParam
/// Author By: Mark Friaz
/// </summary>
public class MailParameter
{
    public MailParameter() { }

    private string subject;
    private string emailTo;
    private MailAddress emailFrom;
    private string cc;
    private string bcc;
    private string emailTemplate;
    private ArrayList paramValue;
    private ArrayList attachments;

    public string Subject { get { return this.subject; } set { this.subject = value; } }
    public string EmailTo { get { return this.emailTo; } set { this.emailTo = value; } }
    public MailAddress EmailFrom { get { return this.emailFrom; } set { this.emailFrom = value; } }
    public string Cc { get { return this.cc; } set { this.cc = value; } }
    public string Bcc { get { return this.bcc; } set { this.bcc = value; } }
    public string EmailTemplate { get { return this.emailTemplate; } set { this.emailTemplate = value; } }
    public ArrayList ParamValue { get { return this.paramValue; } set { this.paramValue = value; } }
    public ArrayList Attachments { get { return this.attachments; } set { this.attachments = value; } }

}