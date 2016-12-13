using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Users
/// </summary>
public class Users
{
	public Users() { }

    private string id;
    private string fullName;
    private string firstName;
    private string lastName;
    private string emailAddress;
    private string macAddress;
    private string license;
    private string status;

    public string ID { get { return this.id; } set { this.id = value; } }
    public string FullName { get { return this.fullName; } set { this.fullName = value; } }
    public string FirstName { get { return this.firstName; } set { this.firstName = value; } }
    public string LastName { get { return this.lastName; } set { this.lastName = value; } }
    public string EmailAddress { get { return this.emailAddress; } set { this.emailAddress = value; } }
    public string MacAddress { get { return this.macAddress; } set { this.macAddress = value; } }
    public string License { get { return this.license; } set { this.license = value; } }
    public string Status { get { return this.status; } set { this.status = value; } }
}