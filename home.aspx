<%@ Page Language="C#" AutoEventWireup="true" CodeFile="home.aspx.cs" Inherits="home" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booster Tool License Registration</title>
    <link rel="icon" type="image/ico" href="resources/images/favicon.ico" />
    <link href="js/external/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="js/external/bootstrap/css/sticky-footer.css" rel="stylesheet" />
    <link href="css/dataTables.min.css" rel="stylesheet" />
    <%--<link href="css/bootstraphack.css" rel="stylesheet" />--%>
    <link href="css/stylesheet.css" rel="stylesheet" />
    <link href="css/rsTable.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
</head>
<body>
    <form id="frmMain" runat="server">
        <asp:HiddenField ID="hfBaseURL" runat="server" />
        <asp:HiddenField ID="hfURLChunks" runat="server" />
    </form>    
    <div id="wrap" >
        <div id="CommonHeader" ></div>
        <div class="header-bar"><h2>Booster Tools: List of Users</h2></div>
                
        <div class="container content">
            
            <div class="row filter-wrap">
                <div class="col-md-3">
                    <div class="group">
                        <select class="inputMaterial" id="list-search">
                            <option value="-" disabled selected>Select one</option>
                            <option value="0" data-search="text">Name</option>
                            <option value="1" data-search="text">Email Address</option>
                            <option value="2" data-search="text">Mac Address</option>
                        </select>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="formlabel">Search By:</label>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="group">
                        <input class="inputMaterial" type="text" id="txt-search"/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="formlabel">Search here:</label>
                    </div> 
                </div>

                <div class="col-md-3 pull-right">
                    <div class="group">
                        <select class="inputMaterial" id="list-status">
                            <option value="-" selected>All</option>
                            <option value="0">Waiting for Approval</option>
                            <option value="1">Approved / License Sent</option>
                            <option value="2">Rejected</option>
                        </select>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label class="formlabel">Status:</label>
                    </div> 
                </div>
                
               <%-- <div class="col-md-2">
                    <button type="button" class="btn flat-btn flat-btn-primary" id="Button1">Search</button>
                    
                </div>--%>

            </div>
             
               
            <div> 
                <br /> 
                <table id="tblusers" class="table dataTable display" style="width:100%">
                    <thead >
                        <tr> 
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mac Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead> 
                </table> 
            </div> 
        </div>
    </div>

    <div class="modal fade" id="requestform" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Request For License</h4>
          </div>
          <div class="modal-body">
              <div class ="modalloading-wrap" align="center">
                  <img src="resources/images/processing.gif"/>
              </div>
              <div class="form-wrap">
                  
                  <div class="row">
                      <div class="col-md-12">
                        <div class="group">
                            <input class="inputMaterial" type="text" id="txt-email"/>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="formlabel">Email Address:</label>
                        </div> 
                      </div>  
                  </div> 
              </div> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn flat-btn flat-btn-primary" id="btn-submitrequestform">Submit</button>
          </div>
        </div>
      </div>
    </div>

 

 


    <%-- Footer --%>
    <div id="footer" class="visible-lg visible-md hidden-sm hidden-xs"></div>
    <div id="footerMobile" class="hidden-lg hidden-md visible-sm visible-xs"></div>
    <!-- Javascript Libraries -->
    <script src="js/external/jquery/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="js/external/jquery/jquery-ui.js" type="text/javascript"></script>
    <script src="js/external/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/external/bootbox/bootbox.js" type="text/javascript"></script>
    <script src="//cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="js/default.js" type="text/javascript"></script>
    <script src="js/standardstyler.js" type="text/javascript"></script>
    <script src="js/external/nanobar/nanobar.js" type="text/javascript"></script>

    <script src="js/ajaxfunctions/ajaxfunctions.js" type="text/javascript"></script>
    <script src="js/ajaxfunctions/home.js" type="text/javascript"></script>
    <script type="text/javascript">
        var options = {
            bg: '#004b8d',
            // left target blank for global nanobar
            target: document.getElementById('myDivId'),
            // id for new nanobar
            id: 'mynano'
        };

        var nanobar = new Nanobar(options);

        //move bar
        nanobar.go(30); // size bar 30%

        // Finish progress bar
        nanobar.go(100); 
    </script>
</body>
</html>
