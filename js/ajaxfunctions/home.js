var dtUsers;

jQuery(function () {
    
    jQuery(window).load(function () {
        var param = new Object(); 
        callAjaxRequestJSON("GetUsers", param, GetUserResponse, ajaxError)
    })
    


     
    jQuery("button#btn-submitrequestform").click(function (e) {
        if (!isOkayToSubmit()) {
            jQuery("#btn-submitrequestform").prop("disabled", false)
            return;
        }
        bootbox.confirm("Are you sure you want to submit your request?", function (result) {

            if (result) {
                jQuery("#btn-submitrequestform").prop("disabled", true)
                jQuery("div.modalloading-wrap").show();
                
                var requestform = new Object();
                var param = new Object(); 
                param.Email = jQuery("#txt-email").val() 

                callAjaxRequestJSON("submitRequest", param, SubmitRequestResponse, ajaxError)
            }
        })


    })
    jQuery("select#list-search").change(function (e) {
        jQuery("input#txt-search").closest("div.group").removeClass("search-by-empty")
        jQuery("input#txt-search").keyup()
    })
    
    jQuery("input#txt-search").keyup(function (e) {
        var elem = jQuery(this)
        elem.closest("div.group").removeClass("search-by-empty")
        var selectsearch = jQuery("select#list-search option:selected").val()
        var selectsstatus = jQuery("select#list-status option:selected").val()
        if (selectsearch == "-") {
            elem.closest("div.group").addClass("search-by-empty")
            return;
        }

        if (jQuery.trim(elem.val()).length > 0)
            filterDatatable(selectsearch, elem.val())
        else {
            resetFilterDatatable()
            if (selectsstatus != "-")
                filterDatatable("3", selectsstatus)
        }
                

    })

    jQuery("select#list-status").change(function (e) {
        var elem = jQuery(this)
        var selectsearch = elem.val()
        var txtsearch = jQuery("input#txt-search").val()
        if (selectsearch == "-") {
           
            resetFilterDatatableByColumns("3")
            return;
        }
        //jQuery("input#txt-search").val("");
        
        filterDatatable("3", elem.val())
        
    })
    


})

function GetUserResponse(response){
    var data = response["d"]
    if(data.ErrorMessage==null){
        dtUsers = jQuery('#tblusers').dataTable().fnDestroy();
        dtUsers = jQuery('#tblusers').DataTable({
            "searching": true, "scrollX": true, "deferRender": true,
            "aaData": data.ResponseItem,
            "aoColumns": [
                { "mDataProp": "FullName" },
                { "mDataProp": "EmailAddress" },
                { "mDataProp": "MacAddress" },
                { "mDataProp": "Status" },
                { "mDataProp": "ID" } ],
            "columnDefs": [{
                "targets": 4,
                "orderable": false
            } , {
                "targets": [4],
                "width": "150px",
            }]
         
            ,"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                jQuery('td:eq(3)', nRow).html(getStatus(aData['Status']));
                if(aData['Status'] == 0) // WAITING APPROVAL
                    jQuery('td:eq(4)', nRow).html('<div class=\"btn-group\"><button class=\"btn flat-btn flat-btn-cancel\" onclick=\'javascript:reject("' + aData['ID'] + '",this)\' style="cursor:pointer">Reject</button><button class=\"btn flat-btn flat-btn-primary\"   onclick=\'javascript:sendLicense("' + aData['ID'] + '",this)\' style="cursor:pointer">Send License</button></div>');
                else
                    jQuery('td:eq(4)', nRow).html("");
            }
        });
    }

}
 
function getStatus(status){
    var strStatus = "";
    switch (status){ 
        case "0":
            strStatus = "Waiting for Approval";
            break;
        case "1":
            strStatus = "Approved / License Sent";
            break;
        case "2":
            strStatus = "Rejected";
            break;
    }
    return strStatus;
}

function sendLicense(id, elem) {
    elem = jQuery(elem)
    var tr = elem.closest("tr")
    //console.log(dtUsers.row(tr).data())
    bootbox.confirm("Are you sure you want to approve?", function (result) {
        if (result) {
            var param = new Object()
            param.id = id
            callAjaxRequestJSON("ApproveRequest", param,
                function (response) {
                    var data = response["d"]
                    if (data.ResponseItem) {
                        dtUsers.row(tr).remove().draw();
                        dtUsers.row.add(data.ResponseItem[0]).draw();
                    }
                }, ajaxError) 
        } 
    })  
}

function reject(id, elem) {
    elem = jQuery(elem)
    var tr = elem.closest("tr")
    console.log(dtUsers.row(tr).data())
    bootbox.confirm("Are you sure you want to reject?", function (result) {
        if (result) {
            var param = new Object()
            param.id = id
            callAjaxRequestJSON("RejectRequest", param,
                function (response) {
                    var data = response["d"]
                    if (data.ResponseItem) {
                        dtUsers.row(tr).remove().draw();
                        dtUsers.row.add(data.ResponseItem[0]).draw();
                    }
                }, ajaxError)
        }
    })
}


function SubmitRequestResponse(response){
    var data = response["d"]
    if (data.ErrorMessage == null) {
        jQuery("div.modalloading-wrap").hide();

        bootbox.alert("You request has been submitted successfully.", function (result) {
            location.reload()
        })
       

    }
    jQuery("#btn-submitrequestform").prop("disabled", false)

}
  
 
function isOkayToSubmit() {
    var modal = jQuery("div#requestform")
    modal.find("p.label-error").remove();
    modal.find("label.formlabel.error").removeClass("error");
    var isOkay = true
    modal.find("input.inputMaterial").each(function (e) {
        var elem = jQuery(this)
        if (jQuery.trim(elem.val()).length == 0) {
            elem.closest("div.group").find("label.formlabel").addClass("error")
            isOkay = false;
        }
            
    })
    
    if (!isOkay) {
        modal.find("div.form-wrap").before("<p class=\"label-error\">* Indicates required field/s.</p>")
        return isOkay;
    }

    if (!validateEmail(jQuery("input#txt-email").val())) {
        modal.find("div.form-wrap").before("<p class=\"label-error\">Email address is invalid.</p>")
        isOkay = false
        jQuery("input#txt-email").focus();
    
    }

     

    return isOkay;
}
 
function validateEmail(email) { 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        return false;
    }

    return true;
}


function filterDatatable(index, filter) {
    dtUsers
         .column(index)
         .search(filter)
         .draw();

}
function resetFilterDatatable() {
    dtUsers
        .search('')
        .columns().search('')
        .draw();
}

function resetFilterDatatableByColumns(str) {
    dtUsers
        .search('')
        .columns(str).search('')
        .draw();
}