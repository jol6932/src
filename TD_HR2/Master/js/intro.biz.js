﻿//------------------------------------------
// Process about Intro Manager.
//                Created by Professor.X, GoodWare (2011.03.03)
//------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// variables.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// process.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var gw_intro_process = {

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ready all for document.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//#region
	ready: function(argMenu) {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // initialize page.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        /*
        //----------
        if ($.browser.msie 
            && $.browser.version.slice(0,1) >= 8) {}
        else {
            if (!gw_com_api.showMessage(
                "이 사이트는 IE 8.0 이상부터 최적화되어 있습니다.\n하위 버전에서 실행할 경우 일부 UI가 제대로 보이지 않거나 오동작이 발생할 수도 있습니다.\n계속 하시겠습니까?",
                "yesno"
                ))
                return;
        }
        */
        //----------
        $.blockUI();
        //----------
        gw_com_module.v_Current.window = "IntroProcess";
        gw_com_module.v_Current.launch = "MAIN";
        
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // set UI.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

		var args = { targetid: "frmAuth", show: true };
		gw_com_module.formTrans(args);

		var args = { targetid: "frmAuth", trans: true };
		gw_com_module.formValidator(args);

		var args = { targetid: "btnAuth", event: "click", handler: click_btnAuth };
		gw_com_module.eventBind(args);

		var args = { targetid: "frmAuth_login_id", event: "keydown", handler: keypress_frmAuth_login };
		gw_com_module.eventBind(args);

		var args = { targetid: "frmAuth_login_pw", event: "keydown", handler: keypress_frmAuth_login };
		gw_com_module.eventBind(args);
		
		// --- host 정보에 따라서 분개 처리 : srm, hrm, plm by hoon
		var host = window.location.host.split(".")[0].toUpperCase();
		if (host == "SRM") {
		    host = "<b>SRM 서비스</b>입니다.";
		} else if (host == "HRM") {
		    host = "<b>대사우 서비스</b>입니다.";
		} else if (host == "REC") {
		    host = "<b>Recruit 서비스</b>입니다.";
		} else if(host=="PI"){
		    host = "<b>PI 서비스</b>입니다.";
		} else {
		    host = "<b>Intranet 서비스</b>입니다.";
		}
		$(hosturl).html(host);
		
		//----------
        $.unblockUI();
        //----------
        gw_com_api.show("lyrMaster");
        gw_com_api.setFocus("frmAuth", 1, "login_id");
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // process.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        function keypress_frmAuth_login(param) {
            if (param.object == "frmAuth_login_id") {
                if (event.keyCode == 9 || event.keyCode == 13) {
                    gw_com_api.setFocus("frmAuth", 1, "login_pw");
                    return false;
                }
            } else if (param.object == "frmAuth_login_pw") {
                if (event.keyCode == 13) {
                    return click_btnAuth();
                }
            }

            return true;
        }

		function click_btnAuth() {
		    var args = {
		        targetid: "frmAuth"
		    };
		    if (gw_com_module.formValidate(args) == false) {
		        return false;
		    }

		    //----------
		    var password = hex_md5(gw_com_api.getValue("frmAuth", 1, "login_pw"));
		    var args = {
		        request: "PAGE",
		        url: "../Service/svc_Auth.aspx" +
                        "?QUERY=PLM_AUTH" +
                        "&arg_login_id=" + gw_com_api.getValue("frmAuth", 1, "login_id") +
                        "&arg_login_pw=" + password,
		        block: true,
		        handler_success: successAuth
		    };
		    gw_com_module.callRequest(args);

			return false;
		};

		function successAuth(data) {

			location.replace(
			    "../Master/BizProcess.aspx"
			);

		};

	}
	//#endregion

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//