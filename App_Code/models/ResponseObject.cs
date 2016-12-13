namespace Models
{
    using System;
    using System.Data;
    using System.Configuration;
    using System.Linq;
    using System.Web;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;
    using System.Web.UI.WebControls;
    using System.Web.UI.WebControls.WebParts;
    using System.Xml.Linq;

    /// <summary>
    /// Summary description for ResponseObject
    /// </summary>
    public class ResponseObject
    {
        private object responseItem;
        private string errorMessage;

        public object ResponseItem { get { return this.responseItem; } set { this.responseItem = value; } }
        public string ErrorMessage { get { return this.errorMessage; } set { this.errorMessage = value; } }

        public ResponseObject() { }
        public ResponseObject(object _responseItem, string _errorMessage)
        {
            this.responseItem = _responseItem;
            this.errorMessage = _errorMessage;
        } 
    }
}