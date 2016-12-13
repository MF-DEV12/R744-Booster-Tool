var __loc = window.location.toString();
var __tmpArr = __loc.split("/");
//var __baseURL = __tmpArr[0] + "//" + __tmpArr[2];
var __baseURL = __tmpArr[0] + "//" + __tmpArr[2] + "/" + __tmpArr[3];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function callAjaxRequestJSON(_serviceVerb, _postBody, _function_success, _function_error) {
    jQuery.ajax({
        type: "post"
        , url: __baseURL + "/requesthandler.asmx/" + _serviceVerb
        , data: JSON.stringify(_postBody)
        , dataType: "json"
        , contentType: "application/json; charset=UTF-8"
        , error: _function_error
        , success: _function_success
    })
}

function ajaxError(response, error) {
    bootbox.alert("Request Error" + response.responseText);
    jQuery(".modal-footer button").removeClass("btn-primary").addClass("flat-btn flat-btn-primary");
}

