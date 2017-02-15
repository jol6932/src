﻿//------------------------------------------
// Process about Job Process.
//                Created by Professor.X, GoodWare (2011.04)
//------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// variables.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var v_global = {
    event: { type: null, object: null, row: null, element: null },
    process: { param: null, entry: null, act: null, handler: null, current: {}, prev: {} },
    data: null, logic: {}
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// process.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var gw_job_process = {

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // entry point. (pre-process section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    ready: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // initialize page.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        v_global.process.param = gw_com_module.initPage({ message: true });
        //----------
        gw_com_api.changeTheme("style_theme");

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // set data.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        start();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // go next.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        function start() {

            gw_job_process.UI();

        }

    },
    //#endregion

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // manage UI. (design section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    UI: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // define UI.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //=====================================================================================
        var args = {
            targetid: "lyrMenu", type: "FREE",
            element: [
				{ name: "조회", value: "조회", act: true },
				{ name: "닫기", value: "닫기" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "frmOption", type: "FREE",
            trans: true, show: true, border: false, align: "left",
            editable: { bind: "open", focus: "acc_cd", validate: true },
            //remark: "lyrRemark",
            content: {
                row: [
                    {
                        element: [
				            {
				                name: "acc_cd", label: { title: "계정코드 :" },
				                editable: { type: "text", size: 8, maxlength: 20 }
				            },
				            {
				                name: "acc_nm", label: { title: "계정명칭 :" },
				                editable: { type: "text", size: 12, maxlength: 50 }
				            },
				            { name: "실행", act: true, show: false, format: { type: "button" } }
				        ]
                    }
				]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_ACCOUNT", query: "DLG_ACCOUNT", title: "계정",
            height: 250, show: true, number: true, dynamic: true, key: true,
            element: [
				{ header: "계정코드", name: "acc_cd", width: 100, align: "center" },
				{ header: "계정명칭", name: "acc_nm", width: 240 },
				{ name: "insert_yn", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            target: [
				{ type: "GRID", id: "grdList_ACCOUNT", offset: 8 }
			]
        };
        //----------
        gw_com_module.objResize(args);
        //=====================================================================================
        //----------
        gw_com_module.informSize();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // go next.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        gw_job_process.procedure();

    },
    //#endregion

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // manage process. (program section)
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //#region
    procedure: function () {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // define event.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        var args = { targetid: "lyrMenu", element: "조회", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "닫기", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "frmOption", element: "실행", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdList_ACCOUNT", grid: true, event: "rowdblclick", handler: informResult };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "grdList_ACCOUNT", grid: true, event: "rowkeyenter", handler: informResult };
        gw_com_module.eventBind(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        function processButton(param) {
            switch (param.element) {
                case "조회":
                    processRetrieve({});
                    break;
                case "닫기":
                    processClose({});
                    break;
                case "실행":
                    processRetrieve({});
                    break;
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // startup process.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        gw_com_module.startPage();
        //----------
        var args = {
            ID: gw_com_api.v_Stream.msg_openedDialogue
        };
        gw_com_module.streamInterface(args);

    }
    //#endregion

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
processRetrieve = function (param) {

    //if (gw_com_api.getValue("frmOption", 1, "acc_cd") == ""
    //            && gw_com_api.getValue("frmOption", 1, "acc_nm") == "") {
    //    gw_com_api.messageBox([
    //            { text: "조회 조건 중 한 가지는 반드시 입력하셔야 합니다." }
    //    ]);
    //    gw_com_api.setError(true, "frmOption", 1, "acc_cd", false, true);
    //    gw_com_api.setError(true, "frmOption", 1, "acc_nm", false, true);
    //    return false;
    //}
    //gw_com_api.setError(false, "frmOption", 1, "acc_cd", false, true);
    //gw_com_api.setError(false, "frmOption", 1, "acc_nm", false, true);

    var args = {
        source: {
            type: "FORM", id: "frmOption",
            element: [
				{ name: "acc_cd", argument: "arg_acc_cd" },
                { name: "acc_nm", argument: "arg_acc_nm" }
            ],
            argument: [
                { name: "arg_insert_yn", value: v_global.logic.insert_yn }
            ]
        },
        target: [
			{ type: "GRID", id: "grdList_ACCOUNT", focus: true, select: true }
		],
        key: param.key
    };
    gw_com_module.objRetrieve(args);

};
//----------
function processClose(param) {

    var args = {
        ID: gw_com_api.v_Stream.msg_closeDialogue,
        data: param.data
    };
    gw_com_module.streamInterface(args);

}
//----------
function informResult() {

    var data = {
        acc_cd: gw_com_api.getValue("grdList_ACCOUNT", "selected", "acc_cd", true),
        acc_nm: gw_com_api.getValue("grdList_ACCOUNT", "selected", "acc_nm", true)
    }
    processClose({ data: data });

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_openedDialogue:
            {
                var retrieve = false;
                v_global.logic.insert_yn = "%";
                if (param.data != undefined) {
                    v_global.logic.insert_yn = (param.data.insert_yn == undefined ? "%" : param.data.insert_yn);
                    if (param.data.acc_cd != gw_com_api.getValue("frmOption", 1, "acc_cd")) {
                        gw_com_api.setValue("frmOption", 1, "acc_cd", param.data.acc_cd);
                    }
                    if (param.data.acc_nm != gw_com_api.getValue("frmOption", 1, "acc_nm")) {
                        gw_com_api.setValue("frmOption", 1, "acc_nm", param.data.acc_nm);
                    }
                    if (gw_com_api.getValue("frmOption", 1, "acc_cd") != "" || gw_com_api.getValue("frmOption", 1, "acc_nm") != "") {
                        retrieve = true;
                    }
                }
                else if (!v_global.process.init) {
                    v_global.process.init = true;
                    //retrieve = true;
                }
                if (retrieve)
                    processRetrieve({});
                else
                    gw_com_api.setFocus("frmOption", 1, "acc_cd");
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID())
                    break;
            }
            break;
    }

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//