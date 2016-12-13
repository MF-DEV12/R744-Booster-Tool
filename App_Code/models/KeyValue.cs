using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for KeyValue
/// </summary>
public class KeyValue
{

    private string pkey;
    private string pvalue;

    public string PKey { get { return this.pkey; } set { this.pkey = value; } }
    public string PValue { get { return this.pvalue; } set { this.pvalue = value; } }
   
    public KeyValue() { }

    public KeyValue(string _key, string _value)
        {
            this.pkey = _key;
            this.pvalue = _value;
        } 
}