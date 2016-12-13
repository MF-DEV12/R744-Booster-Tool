function ajaxFileUpload(uploadtype, fileElement) {

    var returnObject = new Object();
    returnObject.Filename = "";
    returnObject.ErrorMessage = "File not uploaded";

    var handlerurl = "";

    if (uploadtype == 1)
        handlerurl = "uploadimage.ashx";
    else if (uploadtype == 2)
        handlerurl = "uploadslideshow.ashx";
    else if (uploadtype == 3)
        handlerurl = "uploadvideo.ashx";

    jQuery.ajaxFileUpload({
        url: "uploadimage.ashx",
        secureuri: false,
        fileElementId: fileElement,
        dataType: "json",
        success: function (data, status) {

            if (data.Error != "") {
                returnObject.Filename = "";
                returnObject.ErrorMessage = data.Error;
            }
            else {
                returnObject.Filename = data.Filename;
                returnObject.ErrorMessage = "";
            }

            return returnObject;

        },
        error: function (data, status, e) {
            returnObject.ErrorMessage = e.toString();
            return returnObject;
        }
    });
    
    }
