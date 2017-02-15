﻿//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면명 : 인사정보
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var v_global = {
    event: { type: null, object: null, row: null, element: null },
    process: { param: null, entry: null, act: null, handler: null, current: {}, prev: {} },
    data: null, logic: {}
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define gw_job_process class : ready(), UI(), procedure()
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var gw_job_process = {

    // entry point. (pre-process section)
    ready: function () {

        // initialize page.
        v_global.process.param = gw_com_module.initPage({ message: true });
        gw_com_api.changeTheme("style_theme");

        // set data for DDDW List
        var args = {
            request: [
				{
				    type: "PAGE", name: "관계", query: "DDDW_HRM_COMMON",
				    param: [{ argument: "arg_hcode", value: "A019" }]
				}
            ],
            starter: start
        };
        gw_com_module.selectSet(args);

        //----------
        function start() {
            gw_job_process.UI();
            gw_job_process.procedure();

            //gw_com_api.hide("lyrMenu_FAMILY");  // 임시
            gw_com_module.startPage();

            processRetrieve({});
        }
    },

    // manage UI. (design section)
    UI: function () {

        //=====================================================================================
        var args = {
            targetid: "lyrMenu", type: "FREE",
            element: [
				{ name: "조회", value: "조회", act: true },
                //{ name: "실행", value: "실행" },
                { name: "저장", value: "저장" },
                { name: "닫기", value: "닫기" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "lyrMenu_FAMILY", type: "FREE",
            element: [
                { name: "추가", value: "추가" },
                { name: "삭제", value: "삭제" }
            ]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_EMP", query: "HRM_EMP_MASTER", type: "TABLE", title: "기본정보",
            caption: false, show: true, selectable: true,
            content: {
                width: { label: 90, field: 150 }, height: 30,
                row: [
                    {
                        element: [
                            { header: true, value: "사원번호", format: { type: "label" } },
                            { name: "emp_no", format: { type: "text", width: 300 } },
                            { header: true, value: "재직구분", format: { type: "label" } },
                            { name: "emp_tp_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "입사일자", format: { type: "label" } },
                            { name: "enter_date", format: { type: "text", width: 300 }, mask: "date-ymd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "성명", format: { type: "label" } },
                            { name: "emp_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "계약형태", format: { type: "label" } },
                            { name: "rank_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "그룹입사", format: { type: "label" } },
                            { name: "pas_date", format: { type: "text", width: 300 }, mask: "date-ymd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "성명(한자)", format: { type: "label" } },
                            { name: "cha_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "직급", format: { type: "label" } },
                            { name: "grade_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "최종승진일", format: { type: "label" } },
                            { name: "final_step_date", format: { type: "text", width: 100 }, mask: "date-ymd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "성명(영문)", format: { type: "label" } },
                            { name: "eng_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "호칭", format: { type: "label" } },
                            { name: "position_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "차기승진예정일", format: { type: "label" } },
                            { name: "next_step_date", format: { type: "text", width: 100 }, mask: "date-ymd" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "주민번호", format: { type: "label" } },
                            { name: "emp_id", format: { type: "text", width: 300 }, mask: "person-id" },
                            { header: true, value: "직책", format: { type: "label" } },
                            { name: "duty_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "부서", format: { type: "label" } },
                            { name: "dept_nm", format: { type: "text", width: 300 } }
                            //{ header: true, value: "원소속", format: { type: "label" } },
                            //{ name: "ofc_gb" }

                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_EMP2", query: "HRM_EMP_MASTER", type: "TABLE", title: "신상정보",
            caption: false, show: true, selectable: true,
            editable: { bind: "select", focus: "wed_date", validate: true },
            content: {
                width: { label: 40, field: 60 }, height: 34,
                row: [
                    {
                        element: [
                            { header: true, value: "성별", format: { type: "label" } },
                            { name: "sex_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "결혼여부", format: { type: "label" } },
                            { name: "married_yn_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "중간정산일자", format: { type: "label" } },
                            { name: "retadj_date", format: { type: "text", width: 100 }, mask: "date-ymd" },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "생일구분", format: { type: "label" } },
                            { name: "birth_gb_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "결혼일자", format: { type: "label" } },
                            {
                                name: "wed_date", format: { type: "text", width: 100 },
                                editable: { type: "text", width: 100 }, mask: "date-ymd"
                            },
                            { header: true, value: "퇴직금기산일", format: { type: "label" } },
                            { name: "retstr_date", format: { type: "text", width: 100 }, mask: "date-ymd" },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "생년월일", format: { type: "label" } },
                            { name: "birth_date", format: { type: "text", width: 100 }, mask: "date-ymd" },
                            { header: true, value: "종교", format: { type: "label" } },
                            { name: "religion_cd", format: { type: "text", width: 300 } },
                            { header: true, value: "군필", format: { type: "label" } },
                            { name: "millitary_tp", format: { type: "text", width: 300 } },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "", format: { type: "text", width: 300 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "국적", format: { type: "label" } },
                            { name: "country_nm", format: { type: "text", width: 300 } },
                            { header: true, value: "휴대폰", format: { type: "label" } },
                            {
                                name: "mobile_no", format: { type: "text", width: 300 },
                                editable: { type: "text", width: 162 }
                            },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "전화번호(집)", format: { type: "label" } },
                            {
                                name: "tel_no", format: { type: "text", width: 300 },
                                editable: { type: "text", width: 162 }
                            },
                            { header: true, value: "전화번호(회사)", format: { type: "label" } },
                            {
                                name: "ofc_tel_no", format: { type: "text", width: 300 },
                                editable: { type: "text", width: 162 }
                            },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "주소", format: { type: "label" } },
                            {
                                name: "addr1", format: { type: "text", width: 900 }, style: { colfloat: "float", colspan: 7 },
                                editable: { type: "text", maxlength: 120, width: 900 }
                            }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "본적", format: { type: "label" } },
                            {
                                name: "born_addr", format: { type: "text", width: 448 }, style: { colspan: 3 },
                                editable: { type: "text", width: 448 }
                            },
                            { header: true, value: "E-Mail", format: { type: "label" } },
                            { name: "email", format: { type: "text", width: 500 }, style: { colspan: 3 } },
                            { name: "emp_no", editable: { type: "hidden" }, hidden: true }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_OFCODR", query: "HRM_EMP_OFCODR", title: "발령이력",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "구분", name: "order_nm", width: 60, align: "center" },
				{ header: "일자", name: "s_date", width: 60, align: "center", mask: "date-ymd" },
				{ header: "부서", name: "dept_nm", width: 80, align: "center" },
				{ header: "직종", name: "work_nm", width: 60, align: "center" },
				{ header: "직급", name: "grade_nm", width: 60, align: "center" },
				{ header: "호칭", name: "pos_nm", width: 60, align: "center" },
				{ header: "직책", name: "duty_nm", width: 60, align: "center" },
            	{ header: "비고", name: "rmk", width: 150 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_FAMILY", query: "HRM_EMP_FAMILY", title: "가족관계",
            caption: false, height: 220, pager: false, show: true, selectable: true, number: true,
            editable: { bind: "select", focus: "realation", validate: true },
            element: [
				{
				    header: "관계", name: "realation", width: 50, align: "center",
				    format: { type: "select", data: { memory: "관계" } },
				    editable: { type: "select", data: { memory: "관계" }, validate: { rule: "required" }, width: 80}
				},
				{
				    header: "성명", name: "name", width: 50, align: "center",
				    editable: { type: "text", maxlength: 5, validate: { rule: "required" }, width: 80 }
				},
				{
				    header: "주민번호", name: "id_no", width: 80, align: "center", mask: "person-id",
				    editable: { type: "text", maxlength: 14, validate: { rule: "required" }, width: 110 }
				},
				{
				    header: "생년월일", name: "birth_date", width: 50, align: "center",
				    editable: { type: "text", maxlength: 10, width: 110 }, mask: "date-ymd"
				},
				{
				    header: "부양가족여부", name: "buyang_yn", width: 50, align: "center",
				    format: { type: "checkbox", value: "1", offval: "0" }//,
				    //editable: { type: "checkbox", value: "1", offval: "0" }
				},
            	{ header: "비고", name: "rmk", width: 200, editable: { type: "text", maxlength: 100, width: 440 } },
                { name: "emp_no", editable: { type: "hidden" }, hidden: true },
                { name: "seq", editable: { type: "hidden" }, hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        $("#grdData_FAMILY_data_buyang_yn").attr("title", "연말정산 및 급여 소득세 반영");
        //=====================================================================================
        var args = {
            targetid: "grdList_SCHOOL", query: "HRM_EMP_SCHOOL", title: "학력사항",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "구분", name: "school_tp_nm", width: 80 },
				{ header: "입학일", name: "enter_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "졸업일", name: "edu_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "학교명", name: "school_nm", width: 80 },
				{ header: "전공", name: "major", width: 80 },
				{ header: "학위", name: "degree", width: 80 },
				{
				    header: "최종학력", name: "last_yn", width: 40, align: "center",
				    format: { type: "checkbox", value: "1", offval: "0" }
				},
            	{ header: "비고", name: "rmk", width: 150 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_LANG", query: "HRM_EMP_LANG", title: "어학",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "외국어", name: "langeuge", width: 100 },
				{ header: "시험구분", name: "evaluation", width: 80 },
				{ header: "점수", name: "point", width: 80, align: "right", mask: "numeric-float" },
				{ header: "등급", name: "position", width: 80 },
				{ header: "취득일", name: "evaluation_date", width: 80, align: "center", mask: "date-ymd" },
            	{ header: "비고", name: "rmk", width: 150 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_EDU", query: "HRM_EMP_EDU", title: "교육",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "교육명", name: "edu_nm", width: 150 },
				{ header: "시작일", name: "s_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "종료일", name: "e_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "실교육시간", name: "edu_time", width: 80, align: "right", mask: "numeric-float" },
				{ header: "교육기관", name: "complete", width: 150 },
            	{ header: "비고", name: "rmk", width: 250 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_AWARD", query: "HRM_EMP_AWARD", title: "상벌",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "구분", name: "award_tp", width: 100 },
				{ header: "훈격 및 징계등급", name: "award_kind", width: 100 },
				{ header: "시작일", name: "s_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "종료일", name: "e_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "내용", name: "content", width: 250 }//,
            	//{ header: "시상 및 처벌내용", name: "rmk", width: 200 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_LICENSE", query: "HRM_EMP_LICENSE", title: "자격증",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "취득일", name: "get_date", width: 60, align: "center", mask: "date-ymd" },
				{ header: "구분", name: "license_tp", width: 80 },
				{ header: "자격증 발급번호", name: "content", width: 100 },
				{ header: "발급기관", name: "issue_pl", width: 100 },
				{
				    header: "수당대상", name: "pay_yn", width: 50, align: "center",
				    format: { type: "checkbox", value: "1", offval: "0" }
				},
            	{ header: "비고", name: "rkm", width: 200 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdList_EVL", query: "HRM_EMP_EVL", title: "평가",
            caption: false, height: 250, pager: false, show: true, selectable: true, number: true,
            element: [
				{ header: "평가일자", name: "evl_date", width: 80, align: "center", mask: "date-ymd" },
				{ header: "MBO", name: "evl_grade1", width: 80 },
				{ header: "역량평가", name: "evl_grade2", width: 80 },
				{ header: "종합평가", name: "evl_grade3", width: 80 },
				{ header: "비고", name: "rmk", width: 200 }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = { targetid: "lyrDown", width: 0, height: 0, show: false };
        gw_com_module.pageCreate(args);
        //=====================================================================================
        var args = {
            target: [
				{ type: "FORM", id: "frmData_EMP", offset: 8 },
				{ type: "FORM", id: "frmData_EMP2", offset: 8 },
				{ type: "GRID", id: "grdList_OFCODR", offset: 8 },
				{ type: "GRID", id: "grdData_FAMILY", offset: 8 },
				{ type: "GRID", id: "grdList_SCHOOL", offset: 8 },
				{ type: "GRID", id: "grdList_LANG", offset: 8 },
				{ type: "GRID", id: "grdList_EDU", offset: 8 },
				{ type: "GRID", id: "grdList_AWARD", offset: 8 },
				{ type: "GRID", id: "grdList_LICENSE", offset: 8 },
				{ type: "GRID", id: "grdList_EVL", offset: 8 }
			]
        };
        gw_com_module.objResize(args);
        //=====================================================================================
        var args = {
            tabid: "lyrTab",
            target: [
                { type: "LAYER", id: "lyrTab_01", title: "신상정보" },
				{ type: "LAYER", id: "lyrTab_02", title: "발령이력" },
				{ type: "LAYER", id: "lyrTab_03", title: "가족관계" },
				{ type: "LAYER", id: "lyrTab_04", title: "학력사항" },
                { type: "LAYER", id: "lyrTab_05", title: "어학" },
                { type: "LAYER", id: "lyrTab_06", title: "교육" },
                { type: "LAYER", id: "lyrTab_07", title: "상벌" },
                { type: "LAYER", id: "lyrTab_08", title: "자격증" },
                { type: "LAYER", id: "lyrTab_09", title: "평가" }
            ]
        };
        //----------
        gw_com_module.convertTab(args);
        //=====================================================================================
        var args = {
            target: [
                { type: "TAB", id: "lyrTab", offset: 8 }
            ]
        };
        //----------
        gw_com_module.objResize(args);
        //=====================================================================================
        gw_com_module.informSize();

    },

    // manage process. (program section)
    procedure: function () {

        //=====================================================================================
        var args = { targetid: "lyrMenu", element: "조회", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "닫기", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "실행", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu", element: "저장", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //=====================================================================================
        var args = { targetid: "lyrMenu_FAMILY", element: "추가", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //----------
        var args = { targetid: "lyrMenu_FAMILY", element: "삭제", event: "click", handler: processButton };
        gw_com_module.eventBind(args);
        //=====================================================================================
        var args = { targetid: "grdData_FAMILY", grid: true, event: "itemchanged", handler: processItemchanged };
        gw_com_module.eventBind(args);
        //=====================================================================================

    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// custom function. (program section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function viewOption(param) {

    gw_com_api.show("frmOption");

}
//----------
function closeOption(param) {

    gw_com_api.hide("frmOption");

}
//----------
function processButton(param) {

    closeOption({});
    switch (param.element) {
        case "조회":
            {
                v_global.event.data = {
                    dept_nm: gw_com_module.v_Session.DEPT_NM
                }
                var args = {
                    type: "PAGE", page: "w_find_emp", title: "사원 검색",
                    width: 600, height: 450, locate: ["center", "top"], open: true,
                    data: v_global.event.data
                };
                if (gw_com_module.dialoguePrepare(args) == false) {
                    var args = {
                        page: "w_find_emp",
                        param: {
                            ID: gw_com_api.v_Stream.msg_openedDialogue,
                            data: v_global.event.data
                        }
                    };
                    gw_com_module.dialogueOpen(args);
                }
            }
            break;
        case "추가":
            if (!checkManipulate({})) return;
            processInsert({});
            break;
        case "삭제":
            processDelete({});
            break;
        case "저장":
            processSave({});
            break;
        case "닫기":
            v_global.process.handler = processClose;
            if (!checkUpdatable({})) return;
            processClose({});
            break;
        case "실행":
            var param = {
                request: "SERVICE",
                url: gw_com_module.v_Current.window + ".aspx/ImageUpload"
            };
            gw_com_module.callRequest(param);
            break;
    }

}
//----------
function processItemchanged(param) {

    if (param.object == "grdData_FAMILY") {
        if (param.element == "id_no" && gw_com_api.getValue(param.object, param.row, "birth_date", true) == "") {
            var val = param.value.current.substr(0, 6);
            switch(gw_com_api.unMask(param.value.current, "person-id").substr(6, 1)){
                case "1":
                case "2":
                    val = "19" + val;
                    break;
                default:
                    val = "20" + val;
                    break;
            }
            gw_com_api.setValue(param.object, param.row, "birth_date", val, true);
        }
    }

}
//----------
function processInsert(param) {

    var args = {
        targetid: "grdData_FAMILY", edit: true, updatable: true,
        data: [
            { name: "emp_no", value: gw_com_module.v_Session.EMP_NO },
            { name: "seq", rule: "INCREMENT", value: 1 }
        ]
    };
    gw_com_module.gridInsert(args);

}
//----------
function processDelete(param) {

    var args = { targetid: "grdData_FAMILY", row: "selected", select: true };
    gw_com_module.gridDelete(args);

}
//----------
function processSave(param) {

    var args = {
        url: "COM",
        target: [
            { type: "FORM", id: "frmData_EMP2" },
			{ type: "GRID", id: "grdData_FAMILY" }
        ]
    };
    if (gw_com_module.objValidate(args) == false) return false;

    args.handler = {
        success: successSave,
        param: param
    };
    gw_com_module.objSave(args);

}
//----------
function successSave(response, param) {

    processRetrieve({});
    //processRetrieve({ target: [{ type: "GRID", id: "grdData_FAMILY" }] });

}
//----------
function processRetrieve(param) {
    
    if (param == undefined || param.emp_no == undefined) return;
    var args = {
        source: {
            type: "INLINE",
            argument: [
                { name: "arg_emp_no", value: param.emp_no }
            ]
        },
        handler: {
            complete: processRetrieveEnd,
            param: param
        },
        key: param.key
    };

    if (param.target != undefined) {
        args.target = param.target;
    } else {
        args.target = [
            { type: "FORM", id: "frmData_EMP" },
            { type: "FORM", id: "frmData_EMP2" },
            { type: "GRID", id: "grdList_OFCODR" },
            { type: "GRID", id: "grdData_FAMILY" },
            { type: "GRID", id: "grdList_SCHOOL" },
            { type: "GRID", id: "grdList_LANG" },
            { type: "GRID", id: "grdList_EDU" },
            { type: "GRID", id: "grdList_AWARD" },
            { type: "GRID", id: "grdList_LICENSE" },
            { type: "GRID", id: "grdList_EVL" }
        ];
    }
    gw_com_module.objRetrieve(args);

}
//----------
function processRetrieveEnd(param) {
    
}
//----------
function processClose(param) {

    var args = { ID: gw_com_api.v_Stream.msg_closePage };
    gw_com_module.streamInterface(args);

}
//----------
function closeDialogue(param) {

    var args = { page: param.page };
    gw_com_module.dialogueClose(args);
    if (param.focus) {
        gw_com_api.setFocus(v_global.event.object, v_global.event.row, v_global.event.element,
                            (v_global.event.type == "GRID") ? true : false);
    }

}
//----------
function checkCRUD(param) {

    return gw_com_api.getCRUD("frmData_EMP");

}
//----------
function checkManipulate(param) {

    closeOption({});

    if (checkCRUD(param) == "none") {
        gw_com_api.messageBox([{ text: "NOMASTER" }]);
        return false;
    }
    return true;

}
//----------
function checkUpdatable(param) {

    var args = {
        check: param.check,
        target: [
            { type: "FORM", id: "frmData_EMP2" },
            { type: "GRID", id: "grdData_FAMILY" }
        ],
        param: param
    };
    return gw_com_module.objUpdatable(args);

}
//----------
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_showMessage:
            {
                gw_com_module.streamInterface(param);
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID()) {
                    param.to = { type: "POPUP", page: param.data.page };
                    gw_com_module.streamInterface(param);
                    break;
                }
                switch (param.data.ID) {
                    case gw_com_api.v_Message.msg_confirmSave:
                        {
                            if (param.data.result == "YES") {
                                processSave(param.data.arg);
                            } else {
                                if (v_global.process.handler != null)
                                    v_global.process.handler(param.data.arg);
                            }
                        } break;
                    case gw_com_api.v_Message.msg_confirmRemove:
                        { if (param.data.result == "YES") processRemove(param.data.arg); } break;
                    case gw_com_api.v_Message.msg_informSaved:
                        {
                            param.data.arg.handler(param.data.arg.response, param.data.arg.param); 
                        } break;
                    case gw_com_api.v_Message.msg_informRemoved:
                        { param.data.arg.handler(param.data.arg.response, param.data.arg.param); } break;
                    case gw_com_api.v_Message.msg_informBatched:
                        { param.data.arg.handler(param.data.arg.response, param.data.arg.param); } break;
                }
            }
            break;
        case gw_com_api.v_Stream.msg_openedDialogue:
            {
                var args = {
                    to: { type: "POPUP", page: param.from.page },
                    ID: param.ID
                };
                switch (param.from.page) {
                    case "DLG_FileUpload":
                        args.data = {
                            type: "PER_SUPP",
                            key: v_global.logic.per_no,
                            seq: v_global.logic.supp_seq
                        };
                        break;
                    case "w_find_emp":
                        {
                            args.data = v_global.event.data;
                        }
                        break;

                }
                gw_com_module.streamInterface(args);
            } break;
        case gw_com_api.v_Stream.msg_closeDialogue:
            {
                switch (param.from.page) {
                    case "DLG_FileUpload":
                        if (param.data != undefined)
                            processRetrieve({});
                        break;
                    case "w_find_emp":
                        {
                            if (param.data)
                                processRetrieve({ emp_no: param.data.emp_no });
                        }
                        break;
                }
                closeDialogue({ page: param.from.page });
            }
            break;
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//