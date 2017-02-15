﻿var cols = {
    location: 0,
    text_tooltip: 1,
    text_box: 2,
    color: 3,
    _top: 4,
    _left: 5,
    width: 6,
    height: 7,
    proj_no: 8
};
var eq_list = ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10"
              , "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09"
              , "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10"
              , "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21"];

gw_job_process = {


    
    ready: function () {
        var args = { height: 740 };
        parent.resizeFrame(args);
        gw_job_process.getCol(false);
        var loop = setInterval(function () {
            gw_job_process.getCol(true);
        }, 18000);
        
    },

    linkBind: function (location, proj_no) {
        if (proj_no == null || proj_no == undefined || proj_no == "")
            return;
        else {
            var id = "#" + location;
            var url = "../job/scm_frame.aspx?sub_cat_no=s51&proj_no=" + proj_no;
            $(id).click(function (e) {
                //alert("[" + id + "]" + " Click");
                window.open(url, "IPS");
            });
        }
        
    },

    hoverEvent: function (location) {
        var lct = "#" + location;

        $(lct).hover(
            function () {
                $(lct + " > div").addClass("hover");
            }, function () {
                $(lct + " > div").removeClass("hover");
            }
        );
    },

    getCol: function (changable) {

        var url = "readData"
        var DATA = {};
        var val = "";
        $.ajax({
            url: "/Service/svc_Data_Retrieve_JSONs.aspx?QRY_ID=DASHBOARD_1&QRY_COLS=location,text_tooltip,text_box,color,_top,_left,width,height,proj_no&CRUD=R&arg_aaa=aaa",
            type: "POST",
            cache: false,
            data: DATA,
            success: function (data, status) {
                var d = $.parseJSON(data);
                if (changable == false)
                    gw_job_process.setVisual(d.tData);
                else
                    gw_job_process.loopSet(d.tData);
            },
            error: function (e) {
                alert("error" + e.responseText);
            }
        });
               
    },

    changeColor: function (location, color) {
        var lct = "#" + location + "";
        $(lct).attr('class', color);
    },

    addTooltip: function (location, text) {
        var lct = "#" + location + "";
        var posAt;
        var posMy;
        var area = lct.substring(1,2);

        if (area == "B"){
            posMy = 'top right';
            posAt = 'bottom left';
        }
        else if(area == "C"){
            posMy = 'bottom right';
            posAt = 'top left';
        }
        else {
            switch (location) {
                case "A01":
                case "A02":
                case "A03":
                case "A04":
                    posMy = 'top left';
                    posAt = 'bottom right';
                    break;
                default:
                    posMy = 'bottom left';
                    posAt = 'top right';
                    break;

            }
        }

        $(lct).qtip({
            content: text,
            position: {
                my: posMy,  // Position my top left...
                at: posAt, // at the bottom right of...
                target: $(lct), // my target
                adjust: {

                }
            },
            style: {
                classes: 'qtip-light qtip-shadow'
            }
        });
    },

    drawRect: function(location,top,left,width,height){
        var lct = "#" + location;
        $('#container').append($('<div/>', {
            id: location,
            height: height,
            width:width
        }));
        $(lct).offset({ top: top, left: left });
        //$(lct).css("top", top + "px");
        //$(lct).css("left", left + "px");
        //$(lct).height(height);
        //$(lct).width(width);
    },

    addBoxText: function (location, text, changable) {
        var lct = "#" + location;
        var area = lct.substring(1, 2) + "area";                        //영역별 폰트크기 구분용

        var boxtext = '<div class="boxtxt ' + area + '" style="text-align:center;">' + text + '</div>';
        if (changable == true)
            $(lct + " > div").remove();
        $(lct).append(boxtext);
    },

    loopSet: function (param) {
        $.each(param, function () {
            gw_job_process.changeColor(this.DATA[cols.location], this.DATA[cols.color]);
            gw_job_process.addBoxText(this.DATA[cols.location], this.DATA[cols.text_box], true);
            gw_job_process.addTooltip(this.DATA[cols.location], this.DATA[cols.text_tooltip]);
            gw_job_process.linkBind(this.DATA[cols.location], this.DATA[cols.proj_no]);
        })
    },

    setVisual: function (param) {
        $.each(param, function () {
            gw_job_process.drawRect(this.DATA[cols.location], this.DATA[cols._top], this.DATA[cols._left], this.DATA[cols.width], this.DATA[cols.height]);
            gw_job_process.changeColor(this.DATA[cols.location], this.DATA[cols.color]);
            gw_job_process.addTooltip(this.DATA[cols.location], this.DATA[cols.text_tooltip]);
            gw_job_process.addBoxText(this.DATA[cols.location], this.DATA[cols.text_box], false);
            gw_job_process.linkBind(this.DATA[cols.location], this.DATA[cols.proj_no]);
            gw_job_process.hoverEvent(this.DATA[cols.location]);
        });
    }


    
}
