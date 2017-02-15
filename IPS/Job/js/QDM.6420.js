﻿//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면명 : 시정조치 요구서 발행
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
        v_global.process.param = gw_com_module.initPage({ authority: true, message: true });
        gw_com_api.changeTheme("style_theme");

        // prepare dialogue. ---그룹웨어 로그인
        //        var args = { type: "PAGE", page: "IFProcess", path: "../Master/", title: "그룹웨어 로그인",
        //            width: 430, height: 90, locate: ["center", 200]
        //        };
        //        gw_com_module.dialoguePrepare(args);

        // set data for DDDW List
        var args = { request: [
                { type: "PAGE", name: "발생구분", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM010"}]
                },
                { type: "PAGE", name: "처리상태", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM022"}]
                },
                { type: "PAGE", name: "처리방안", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM035"}]
                },
                { type: "PAGE", name: "확인결과", query: "dddw_zcode",
                    param: [{ argument: "arg_hcode", value: "QDM023"}]
                },
                { type: "INLINE", name: "합불판정",
                    data: [{ title: "합격", value: "1" }, { title: "불합격", value: "0"}]
                },
                { type: "PAGE", name: "부서", query: "dddw_dept" },
                { type: "PAGE", name: "사원", query: "dddw_emp" }
			],
            starter: start
        };
        gw_com_module.selectSet(args);

        //----------
        function start() {
            gw_job_process.UI();
            gw_job_process.procedure();
        }

    },

    // manage UI. (design section)
    UI: function () {

        //=====================================================================================
        var args = {
            targetid: "lyrMenu_Main", type: "FREE",
            element: [
                { name: "상세", value: "발생정보", icon: "실행" },
				{ name: "저장", value: "저장" },
//                { name: "확인", value: "확인요청", icon: "기타" },
                { name: "통보", value: "결과통보", icon: "기타" },
				{ name: "닫기", value: "닫기" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "lyrMenu_File1", type: "FREE",
            element: [
				{ name: "추가", value: "추가" },
				{ name: "삭제", value: "삭제" }
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = {
            targetid: "frmRoot_MAIN_AS", query: "DLG_ISSUE_M_2", type: "TABLE", title: "발생 정보",
            caption: true, show: false, selectable: true,
            content: {
                width: { label: 80, field: 160 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "관리번호", format: { type: "label" } },
                            { name: "issue_no" },
                            { header: true, value: "발생일시", format: { type: "label" } },
                            { style: { colfloat: "float" }, name: "issue_dt", mask: "date-ymd", format: { type: "text", width: 60 } },
                            { style: { colfloat: "floated" }, name: "issue_time", mask: "time-hh", format: { type: "text", width: 30 } },
                            { header: true, value: "발생구분", format: { type: "label" } },
                            { name: "issue_tp" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "고객사", format: { type: "label" } },
                            { name: "cust_nm" },
                            { header: true, value: "Line", format: { type: "label" } },
                            { name: "cust_dept" },
                            { header: true, value: "Process", format: { type: "label" } },
                            { name: "cust_proc" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "설비명", format: { type: "label" } },
                            { name: "cust_prod_nm" },
                            { header: true, value: "제품명", format: { type: "label" } },
                            { name: "prod_nm", display: true, format: { type: "text", width: 458 } },
                            { header: true, value: "발생Module", format: { type: "label" } },
                            { name: "prod_sub" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "Warranty", format: { type: "label" } },
                            { name: "wrnt_io" },
                            { header: true, value: "긴급도", format: { type: "label" } },
                            { name: "important_level" },
                            { header: true, value: "상태", format: { type: "label" } },
                            { name: "pstat" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생현상", format: { type: "label" } },
                            { style: { colspan: 5 }, name: "rmk", format: { type: "text", width: 734 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "등록자/등록일시", format: { type: "label" } },
                            { name: "ins_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "ins_dt", style: { colfloat: "floated" } },
                            { header: true, value: "수정자/수정일시", format: { type: "label" } },
                            { name: "upd_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "upd_dt", style: { colfloat: "floated" } },
                            { header: true, value: "부품 Fail", format: { type: "label" } },
                            { name: "part_fail" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "CS표준유무", format: { type: "label" } },
                            { name: "standard_yn" },
                            { header: true, value: "CS표준준수여부", format: { type: "label" } },
                            { name: "follow_yn" },
                            { header: true, value: "표준번호", format: { type: "label" } },
                            { name: "standard_no", format: { type: "text", width: 458 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "제조Test유무", format: { type: "label" } },
                            { name: "ptest_yn" },
                            { header: true, value: "1차원인선택", format: { type: "label" } },
                            { name: "factor_tp", format: { type: "text", width: 458 } },
                            { header: true, value: "1차원인근거", format: { type: "label" } },
                            { name: "basis_rmk", format: { type: "text", width: 458 } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmRoot_MAIN_PO", query: "DLG_ISSUE_M_2", type: "TABLE", title: "발생 정보",
            caption: true, show: false, selectable: true,
            content: {
                width: { label: 80, field: 160 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "관리번호", format: { type: "label" } },
                            { name: "issue_no" },
                            { header: true, value: "발생일자", format: { type: "label" } },
                            { name: "issue_dt", mask: "date-ymd" },
                            { header: true, value: "발생구분", format: { type: "label" } },
                            { name: "issue_tp" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "고객사", format: { type: "label" } },
                            { name: "cust_nm" },
                            { header: true, value: "Line", format: { type: "label" } },
                            { name: "cust_dept" },
                            { header: true, value: "Process", format: { type: "label" } },
                            { name: "cust_proc" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "설비명", format: { type: "label" } },
                            { name: "cust_prod_nm" },
                            { header: true, value: "제품명", format: { type: "label" } },
                            { name: "prod_nm" },
                            { header: true, value: "Project No", format: { type: "label" } },
                            { name: "proj_no" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생Module", format: { type: "label" } },
                            { name: "prod_sub" },
                            { header: true, value: "중요도", format: { type: "label" } },
                            { name: "important_level" },
                            { header: true, value: "상태", format: { type: "label" } },
                            { name: "pstat" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생현상", format: { type: "label" } },
                            { style: { colspan: 5 }, name: "rmk", format: { type: "text", width: 734 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "등록자/등록일시", format: { type: "label" } },
                            { name: "ins_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "ins_dt", style: { colfloat: "floated" } },
                            { header: true, value: "수정자/수정일시", format: { type: "label" } },
                            { name: "upd_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "upd_dt", style: { colfloat: "floated" } },
                            { header: true, value: "부품 Fail", format: { type: "label" } },
                            { name: "part_fail" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "CS표준유무", format: { type: "label" } },
                            { name: "standard_yn" },
                            { header: true, value: "CS표준준수여부", format: { type: "label" } },
                            { name: "follow_yn" },
                            { header: true, value: "표준번호", format: { type: "label" } },
                            { name: "standard_no", format: { type: "text", width: 458 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "제조Test유무", format: { type: "label" } },
                            { name: "ptest_yn" },
                            { header: true, value: "1차원인선택", format: { type: "label" } },
                            { name: "factor_tp", format: { type: "text", width: 458 } },
                            { header: true, value: "1차원인근거", format: { type: "label" } },
                            { name: "basis_rmk", format: { type: "text", width: 458 } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmRoot_MAIN_QD", query: "DLG_ISSUE_M_2", type: "TABLE", title: "발생 정보",
            caption: true, show: false, selectable: true,
            content: {
                width: { label: 80, field: 160 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "관리번호", format: { type: "label" } },
                            { name: "issue_no" },
                            { header: true, value: "발생일자", format: { type: "label" } },
                            { name: "issue_dt", mask: "date-ymd" },
                            { header: true, value: "발생구분", format: { type: "label" } },
                            { name: "issue_tp" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "고객사", format: { type: "label" } },
                            { name: "cust_nm" },
                            { header: true, value: "Line", format: { type: "label" } },
                            { name: "cust_dept" },
                            { header: true, value: "Process", format: { type: "label" } },
                            { name: "cust_proc" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "설비명", format: { type: "label" } },
                            { name: "cust_prod_nm" },
                            { header: true, value: "제품명", format: { type: "label" } },
                            { name: "prod_nm" },
                            { header: true, value: "Project No", format: { type: "label" } },
                            { name: "proj_no" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생Module", format: { type: "label" } },
                            { name: "prod_sub" },
                            { header: true, value: "중요도", format: { type: "label" } },
                            { name: "important_level" },
                            { header: true, value: "상태", format: { type: "label" } },
                            { name: "pstat" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "발생현상", format: { type: "label" } },
                            { style: { colspan: 5 }, name: "rmk", format: { type: "text", width: 734 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "등록자/등록일시", format: { type: "label" } },
                            { name: "ins_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "ins_dt", style: { colfloat: "floated" } },
                            { header: true, value: "수정자/수정일시", format: { type: "label" } },
                            { name: "upd_usr", format: { type: "text", width: 50 }, style: { colfloat: "float" } },
                            { name: "upd_dt", style: { colfloat: "floated" } },
                            { header: true, value: "부품 Fail", format: { type: "label" } },
                            { name: "part_fail" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "CS표준유무", format: { type: "label" } },
                            { name: "standard_yn" },
                            { header: true, value: "CS표준준수여부", format: { type: "label" } },
                            { name: "follow_yn" },
                            { header: true, value: "표준번호", format: { type: "label" } },
                            { name: "standard_no", format: { type: "text", width: 458 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "제조Test유무", format: { type: "label" } },
                            { name: "ptest_yn" },
                            { header: true, value: "1차원인선택", format: { type: "label" } },
                            { name: "factor_tp", format: { type: "text", width: 458 } },
                            { header: true, value: "1차원인근거", format: { type: "label" } },
                            { name: "basis_rmk", format: { type: "text", width: 458 } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_SUB_AS", query: "DLG_ISSUE_S_1", title: "발생 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
                { header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "발생구분", name: "issue_tp", width: 80, align: "center" },
				{ header: "발생Module", name: "prod_sub", width: 80, align: "center" },
				{ header: "현상분류", name: "status_tp1", width: 130, align: "center" },
				{ header: "현상구분", name: "status_tp2", width: 130, align: "center" },
				{ header: "원인부위분류", name: "part_tp1", width: 90, align: "center" },
				{ header: "원인부위구분", name: "part_tp2", width: 130, align: "center" },
				{ header: "원인분류", name: "reason_tp1", width: 90, align: "center" },
				{ header: "원인구분", name: "reason_tp2", width: 130, align: "center" },
				{ header: "귀책분류", name: "duty_tp1", width: 90, align: "center" },
				{ header: "귀책구분", name: "duty_tp2", width: 130, align: "center" },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_SUB_PO", query: "DLG_ISSUE_S_1", title: "발생 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
                { header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "제품유형", name: "prod_type", width: 100, align: "center" },
				{ header: "발생Module", name: "part_tp1", width: 100, align: "center" },
				{ header: "발생부위", name: "part_tp2", width: 200, align: "center" },
				{ header: "발생원인", name: "reason_tp2", width: 200, align: "center" },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_SUB_QD", query: "DLG_ISSUE_S_1", title: "발생 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
                { header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "발생Module", name: "prod_sub", width: 80, align: "center" },
				{ header: "현상분류", name: "status_tp1", width: 150, align: "center" },
				{ header: "현상구분", name: "status_tp2", width: 200, align: "center" },
				{ header: "원인부위분류", name: "part_tp1", width: 150, align: "center" },
				{ header: "원인부위구분", name: "part_tp2", width: 200, align: "center" },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmRoot_SUB", query: "DLG_ISSUE_S_2", type: "TABLE", title: "발생 내용",
            width: "100%", show: false, selectable: true,
            content: {
                height: 25, width: { label: 80, field: 720 },
                row: [
                    {
                        element: [
                            { header: true, value: "발생내용", format: { type: "label" } },
                            { name: "rmk_text", format: { type: "textarea", rows: 7, width: 1000 } },
                            { name: "issue_no", hidden: true }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_DETAIL_AS", query: "DLG_ISSUE_S_3", title: "조치 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
				{ header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "조치일자", name: "work_dt", width: 80, align: "center", mask: "date-ymd" },
				{ header: "조치분류", name: "work_tp1", width: 115, align: "center" },
				{ header: "조치구분", name: "work_tp2", width: 120, align: "center" },
				{ header: "작업시간", name: "work_time", width: 60, align: "center" },
				{ header: "작업자1", name: "work_man1", width: 70, align: "center" },
				{ header: "작업자2", name: "work_man2", width: 70, align: "center" },
				{ header: "작업자3", name: "work_man3", width: 70, align: "center" },
				{ header: "작업자4", name: "work_man4", width: 70, align: "center" },
				{ header: "작업자5", name: "work_man5", width: 70, align: "center" },
				{ header: "상태", name: "pstat", width: 50, align: "center" },
				{ header: "완료일자", name: "end_dt", width: 80, align: "center", mask: "date-ymd" },
				{ header: "완료시각", name: "end_time", width: 60, align: "center", mask: "time-hh" },
                { name: "work_seq", hidden: true },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_DETAIL_PO", query: "DLG_ISSUE_S_3", title: "조치 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
				{ header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "조치일자", name: "work_dt", width: 80, align: "center", mask: "date-ymd" },
				{ header: "조치분류", name: "work_tp1", width: 190, align: "center" },
				{ header: "조치구분", name: "work_tp2", width: 70, align: "center" },
				{ header: "작업시간", name: "work_time", width: 60, align: "center" },
				{ header: "작업자1", name: "work_man1", width: 70, align: "center" },
				{ header: "작업자2", name: "work_man2", width: 70, align: "center" },
				{ header: "작업자3", name: "work_man3", width: 70, align: "center" },
				{ header: "작업자4", name: "work_man4", width: 70, align: "center" },
				{ header: "작업자5", name: "work_man5", width: 70, align: "center" },
				{ header: "상태", name: "pstat", width: 50, align: "center" },
                { name: "work_seq", hidden: true },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdRoot_DETAIL_QD", query: "DLG_ISSUE_S_3", title: "조치 내역",
            caption: true, height: "100%", pager: false, show: false, selectable: true,
            element: [
				{ header: "순번", name: "issue_seq", width: 35, align: "center" },
				{ header: "조치일자", name: "work_dt", width: 80, align: "center", mask: "date-ymd" },
				{ header: "조치분류", name: "work_tp1", width: 190, align: "center" },
				{ header: "조치구분", name: "work_tp2", width: 70, align: "center" },
				{ header: "작업시간", name: "work_time", width: 60, align: "center" },
				{ header: "작업자1", name: "work_man1", width: 70, align: "center" },
				{ header: "작업자2", name: "work_man2", width: 70, align: "center" },
				{ header: "작업자3", name: "work_man3", width: 70, align: "center" },
				{ header: "작업자4", name: "work_man4", width: 70, align: "center" },
				{ header: "작업자5", name: "work_man5", width: 70, align: "center" },
				{ header: "상태", name: "pstat", width: 50, align: "center" },
                { name: "work_seq", hidden: true },
                { name: "issue_no", hidden: true }
            ]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmRoot_DETAIL", query: "DLG_ISSUE_S_4", type: "TABLE", title: "조치 내용",
            width: "100%", show: false, selectable: true,
            content: {
                width: { label: 80, field: 720 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "조치내용", format: { type: "label" } },
                            { name: "rmk_text", format: { type: "textarea", rows: 10, width: 1000 } },
                            { name: "issue_no", hidden: true }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_Main", query: "QDM_6220_M_1", type: "TABLE", title: "NCR",
            caption: true, show: true, selectable: true,
            //editable: { bind: "select", focus: "str_time", validate: true },
            content: { width: { label: 100, field: 190 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "발행번호", format: { type: "label"} },
                            { name: "rqst_no" },
                            { header: true, value: "발행자", format: { type: "label"} },
                            { name: "rqst_user_nm" },
                            { header: true, value: "발행일자", format: { type: "label"} },
                            { name: "rqst_dt", mask: "date-ymd" }
	                    ]
                    },
                    {
                        element: [
                            { header: true, value: "발생구분", format: { type: "label"} },
                            { name: "issue_tp" },
                            { header: true, value: "발생부서", format: { type: "label"} },
                            { name: "issue_dept" },
                            { header: true, value: "발생일자", format: { type: "label"} },
                            { name: "issue_dt", mask: "date-ymd" }
	                    ]
                    },
                    {
                        element: [
                            { header: true, value: "발행구분", format: { type: "label" } },
                            { name: "astat" },
                            { header: true, value: "발생근거", format: { type: "label" } },
                            { name: "rqst_tp" },
                            { header: true, value: "처리요구일", format: { type: "label" } },
                            { name: "actrqst_dt", mask: "date-ymd" },
                            { name: "file_cnt", hidden: true },
                            { name: "rqst_rmk", hidden: true, editable: { type: "textarea" } },
                            { name: "rqst_user", hidden: true, editable: { type: "hidden" } },
                            { name: "prod_nm", hidden: true, editable: { type: "hidden" } },
                            { name: "issue_no", hidden: true, editable: { type: "hidden" } },
                            { name: "astat_dt", hidden: true, editable: { type: "hidden" } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_Sub", query: "QDM_6220_S_1", title: "담당 부서",
            caption: true, height: "100%", pager: false, show: true, selectable: true, number: true,
            //editable: { multi: true, bind: "open", focus: "dept_nm", validate: true },
            element: [
				{ header: "담당부서", name: "dept_nm", width: 120, align: "left", mask: "search", display: true,
				    editable: { type: "text", validate: { rule: "required"} }
				},
                { header: "담당자", name: "user_nm", width: 60, align: "center" },
                { header: "처리상태", name: "astat", width: 70, align: "center", editable: { type: "hidden"} },
                { header: "처리방안", name: "plan_cd", width: 80, align: "center" },
                { header: "계획자", name: "plan_user_nm", width: 60, align: "center" },
                { header: "계획일자", name: "plan_dt", width: 70, align: "center", mask: "date-ymd" },
                { header: "처리자", name: "act_user_nm", width: 60, align: "center" },
                { header: "처리일자", name: "act_dt", width: 70, align: "center", mask: "date-ymd" },
                { header: "확인결과", name: "check_cd", width: 60, align: "center" },
                { header: "확인자", name: "check_user", width: 60, align: "center" },
                { name: "dept_cd", hidden: true, editable: { type: "hidden"} },
				{ name: "rqst_no", hidden: true, editable: { type: "hidden"} },
				{ name: "act_seq", hidden: true, editable: { type: "hidden"} }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        createTableObject({ objType: "FORM", objId: "frmData_D1", readonly: false, clear: false });
        createTableObject({ objType: "FORM", objId: "frmData_D2", readonly: false, clear: false });
        //=====================================================================================
        var args = {
            targetid: "frmData_D2", query: "QDM_6220_D_2", type: "TABLE", title: "실시결과 확인",
            caption: true, width: "100%", show: true, selectable: true,
            editable: { bind: "select", focus: "plan_date", validate: true },
            content: { height: 25, width: { label: 100, field: 120 },
                row: [
                    {
                        element: [
                            { header: true, value: "계획일자", format: { type: "label" } },
                            {
                                name: "plan_date", mask: "date-ymd",
                                format: { type: "text" }, editable: { type: "text", validate: { rule: "required" } }
                            },
                            { header: true, value: "실시결과", format: { type: "label" } },
                            {
                                name: "astat",
                                format: { type: "select", data: { memory: "확인결과" } },
                                editable: { type: "select", data: { memory: "확인결과" }/*, validate: { rule: "required" }*/ }
                            },
                            { header: true, value: "확인자", format: { type: "label" } },
                            {
                                name: "astat_user_nm", mask: "search", display: true,
                                editable: { type: "text"/*, validate: { rule: "required" }*/ }
                            },
                            { header: true, value: "확인일자", format: { type: "label" } },
                            {
                                name: "astat_dt",
                                format: { type: "text", width: 200 },
                                editable: { type: "hidden", width: 200 }
                            }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "적용결과", format: { type: "label"} },
                            {
                                name: "check_rmk", style: { colspan: 7 },
                                format: { type: "textarea", rows: 8, width: 990 },
                                editable: { type: "textarea", rows: 8, width: 990 }
                            },
                            { name: "rqst_no", hidden: true, editable: { type: "hidden" } },
                            { name: "act_seq", hidden: true, editable: { type: "hidden" } },
                            { name: "rev_no", hidden: true, editable: { type: "hidden" } },
                            { name: "pstat", hidden: true, editable: { type: "hidden" } },
                            { name: "astat_user", hidden: true, editable: { type: "hidden" } }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_File1", query: "DLG_FILE_ZFILE_V", title: "첨부 문서(분석관련 보고서 및 변경점 / 개선사항 자료 첨부)",
            caption: true, height: "100%", pager: false, show: true, number: true, selectable: true,
            editable: { multi: true, bind: "select", focus: "file_desc", validate: true },
            element: [
				{ header: "파일명", name: "file_nm", width: 350, align: "left" },
				{ header: "등록자", name: "upd_usr", width: 80, align: "center" },
				{ header: "다운로드", name: "download", width: 80, align: "center",
				    format: { type: "link", value: "다운로드" }
				},
				{ header: "파일설명", name: "file_desc", width: 500, align: "left",
				    editable: { type: "text" }
				},
                { name: "file_ext", hidden: true },
                { name: "file_path", hidden: true },
                { name: "network_cd", hidden: true },
                { name: "data_tp", hidden: true },
                { name: "data_key", hidden: true },
                { name: "data_seq", hidden: true },
                { name: "file_id", hidden: true, editable: { type: "hidden"} }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = { targetid: "lyrDown", width: 0, height: 0, show: false };
        //----------
        gw_com_module.pageCreate(args);
        //=====================================================================================
        var args = {
            target: [
				{ type: "FORM", id: "frmRoot_MAIN_AS", offset: 8 },
				{ type: "FORM", id: "frmRoot_MAIN_PO", offset: 8 },
				{ type: "FORM", id: "frmRoot_MAIN_QD", offset: 8 },
                { type: "GRID", id: "grdRoot_SUB_AS", offset: 8 },
                { type: "GRID", id: "grdRoot_SUB_PO", offset: 8 },
                { type: "GRID", id: "grdRoot_SUB_QD", offset: 8 },
				{ type: "FORM", id: "frmRoot_SUB", offset: 8 },
                { type: "GRID", id: "grdRoot_DETAIL_AS", offset: 8 },
                { type: "GRID", id: "grdRoot_DETAIL_PO", offset: 8 },
                { type: "GRID", id: "grdRoot_DETAIL_QD", offset: 8 },
				{ type: "FORM", id: "frmRoot_DETAIL", offset: 8 },
				{ type: "FORM", id: "frmData_Main", offset: 8 },
                { type: "GRID", id: "grdData_Sub", offset: 8 },
                { type: "FORM", id: "frmData_D1", offset: 8 },
                { type: "FORM", id: "frmData_D1_2", offset: 8 },
                { type: "FORM", id: "frmData_D1_3", offset: 8 },
                { type: "FORM", id: "frmData_D2", offset: 8 },
				{ type: "GRID", id: "grdData_File1", offset: 8 }
			]
        };
        //----------
        gw_com_module.objResize(args);
        //=====================================================================================
        gw_com_module.informSize();
    },

    //==== manage process. (program section)
    procedure: function () {

        //==== Button Click : Main (상세, 저장, 통보, 삭제, 닫기) ====
        //----------
        var args = { targetid: "lyrMenu_Main", element: "상세", event: "click", handler: click_lyrMenu_Main_상세 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_Main_상세(ui) { popupDetail(ui); } //ui.object=lyrMenu_Main, ui.row=1, ui.element=상세, ui.type=FORM
        //----------
        var args = { targetid: "lyrMenu_Main", element: "저장", event: "click", handler: click_lyrMenu_Main_저장 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_Main_저장(ui) { processSave({}); }
        //----------
        var args = { targetid: "lyrMenu_Main", element: "통보", event: "click", handler: click_lyrMenu_Main_통보 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_Main_통보(ui) { processSend(ui); }
        //----------
        var args = { targetid: "lyrMenu_Main", element: "닫기", event: "click", handler: click_lyrMenu_Main_닫기 };
        gw_com_module.eventBind(args);
        function click_lyrMenu_Main_닫기(ui) { processClose({}); }

        //==== 첨부파일 : 추가/삭제/Down ====
        var args = { targetid: "lyrMenu_File1", element: "추가", event: "click", handler: click_lyrMenu_File1_추가 };
        gw_com_module.eventBind(args);
        var args = { targetid: "lyrMenu_File1", element: "삭제", event: "click", handler: click_lyrMenu_File1_삭제 };
        gw_com_module.eventBind(args);
        var args = { targetid: "grdData_File1", grid: true, element: "download", event: "click", handler: click_grdData_File1_down };
        gw_com_module.eventBind(args);
        //----------
        function click_lyrMenu_File1_추가(ui) { processUpload(ui); }
        function click_lyrMenu_File1_삭제(ui) { processDelete(ui); }
        function click_grdData_File1_down(ui) { 
        	gw_com_module.downloadFile({ source: { id: ui.object, row: ui.row }, targetid: "lyrDown" });
        }

        //==== Grid Events : Main
        var args = { targetid: "grdData_Sub", grid: true, event: "rowselected", handler: rowselected_grdData_Sub };
        gw_com_module.eventBind(args);
        function rowselected_grdData_Sub(ui) { if (ui.status) processLink(ui); }
        //----------
        var args = { targetid: "frmData_D2", event: "itemchanged", handler: itemchanged_frmData_D1 };
        gw_com_module.eventBind(args);
        function itemchanged_frmData_D1(ui) { eventItemChanged(ui); }

        // startup process.
        gw_com_module.startPage();

        v_global.logic.key = "";
        if (v_global.process.param != "") {	// Page Parameter 변수 저장
            v_global.logic.key = gw_com_api.getPageParameter("rqst_no");
            v_global.logic.issue_no = gw_com_api.getPageParameter("issue_no");
            v_global.logic.issue_tp = gw_com_api.getPageParameter("issue_tp");
            v_global.logic.issue_dept = gw_com_api.getPageParameter("issue_dept");
            v_global.logic.issue_dt = gw_com_api.getPageParameter("issue_dt");
            v_global.logic.prod_nm = gw_com_api.getPageParameter("prod_nm");
            
            if (v_global.logic.issue_no != "") {
                v_global.logic.root_tp = v_global.logic.issue_no.substr(0, 2);
                gw_com_api.show("frmRoot_MAIN_" + v_global.logic.root_tp);
                gw_com_api.show("grdRoot_SUB_" + v_global.logic.root_tp);
                gw_com_api.show("frmRoot_SUB");
                gw_com_api.show("grdRoot_DETAIL_" + v_global.logic.root_tp);
                gw_com_api.show("frmRoot_DETAIL");

                var args = { targetid: "grdRoot_SUB_" + v_global.logic.root_tp, grid: true, event: "rowselected", handler: processRetrieve };
                gw_com_module.eventBind(args);
            }

            if (v_global.logic.key == "")
	        	processInsert({ object: "Main" }); // 신규 등록
	        else 
	        	processRetrieve({ key: v_global.logic.key }); //수정 및 조회
        }

    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Grid & Form Objects
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== create Table Object : FORM & GRID
function createTableObject(param) {
	var args = {};
	if (param.clear) {
        var args = { target: [{ type: param.objType, id: param.objId}] };
        gw_com_module.objClear(args);
    }

    //==== Create Object : readonly 일 경우는 editable을 undefined로 설정한다
    if (param.objId == "frmData_D1"){	// Detail1 Form : NCR 담당 부서 처리결과
        args = {
            targetid: "frmData_D1", query: "QDM_6220_D_1", type: "TABLE", title: "처리계획 및 결과",
            caption: true, show: true, selectable: true,
            editable: (param.readonly) ? undefined : { bind: "select", focus: "astat", validate: true },
            content: {
                width: { label: 90, field: 180 }, height: 25,
                row: [
	                {
	                    element: [
	                        { header: true, value: "처리상태", format: { type: "label" } },
	                        { name: "astat", format: { type: "select", data: { memory: "처리상태" } } },
	                        { header: true, value: "협력사 귀책", format: { type: "label" } },
	                        { name: "duty_supp", format: { type: "checkbox", value: "1", offval: "0", title: "" } },
	                        { header: true, value: "계획자", format: { type: "label" } },
	                        { name: "plan_user_nm" },
	                        { header: true, value: "계획일자", format: { type: "label" } },
	                        { name: "plan_dt", mask: "date-ymd" }
	                    ]
	                },
	                {
	                    element: [
	                        { header: true, value: "처리방안", format: { type: "label" } },
	                        {
	                            name: "plan_cd",
	                            format: { type: "select", data: { memory: "처리방안" } }
	                        },
	                        { header: true, value: "원인유형", format: { type: "label" } },
	                        { name: "reason" },
	                        { header: true, value: "처리자", format: { type: "label" } },
	                        { name: "act_user_nm", mask: "search", display: true, editable: { type: "text" } },
	                        { header: true, value: "처리일자", format: { type: "label" } },
	                        { name: "act_dt", mask: "date-ymd", editable: { type: "text" } }
	                    ]
	                },
                    {
                        element: [
                            { header: true, value: "대책확인결과", format: { type: "label" } },
                            { name: "gw_stat" },
                            { header: true, value: "", format: { type: "label" } },
                            { name: "" },
                            { header: true, value: "확인자", format: { type: "label" } },
                            { name: "gw_stat_emp" },
                            { header: true, value: "확인일자", format: { type: "label" } },
                            { name: "gw_stat_dt" },
	                        { name: "rqst_no", hidden: true },
	                        { name: "act_seq", hidden: true },
	                        { name: "file_cnt", hidden: true },
	                        { name: "plan_user", hidden: true },
			                { name: "user_id", hidden: true },
			                { name: "supp_cd", hidden: true },
	                        { name: "act_user", hidden: true },
                            { name: "gw_stat", hidden: true },                                  //대책확인결과
                            { name: "gw_stat_emp", hidden: true },                              //확인자
                            { name: "gw_stat_dt", hidden: true },                               //확인일자
                            { name: "qa_rmk", editable: { type: "hidden" }, hidden: true },     //QA
                            { name: "plan_rmk", editable: { type: "hidden" }, hidden: true },   //참원인
                            { name: "act_rmk", editable: { type: "hidden" }, hidden: true },    //재발방지대책수립
                            { name: "memo01", editable: { type: "hidden" }, hidden: true },
                            { name: "memo02", editable: { type: "hidden" }, hidden: true },
                            { name: "memo03", editable: { type: "hidden" }, hidden: true },
                            { name: "memo04", editable: { type: "hidden" }, hidden: true },
                            { name: "memo05", editable: { type: "hidden" }, hidden: true },
                            { name: "memo11", editable: { type: "hidden" }, hidden: true },
                            { name: "memo12", editable: { type: "hidden" }, hidden: true }
                        ]
                    }
                ]
            }
        };
        //----------
	    gw_com_module.formCreate(args);
        //=====================================================================================
	    args = {
	        targetid: "frmData_D1_2", query: "QDM_6220_D_1", type: "TABLE", title: "처리계획 및 결과",
	        caption: false, show: true, selectable: true,
	        content: {
	            width: { label: 100, field: 100 }, height: 25,
	            row: [
                    {
                        element: [
                            { header: true, value: "원인분석", format: { type: "label" }, style: { colspan: 10 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "현상원인", format: { type: "label" }, style: { colspan: 2 } },
                            { header: true, value: "앞의 원인은", format: { type: "label" }, style: { colspan: 2 } },
                            { header: true, value: "앞의 원인은", format: { type: "label" }, style: { colspan: 2 } },
                            { header: true, value: "앞의 원인은", format: { type: "label" }, style: { colspan: 2 } },
                            { header: true, value: "앞의 원인은", format: { type: "label" }, style: { colspan: 2 } }
                        ]
                    },
	                {
	                    element: [
	                        {
	                            name: "memo01", style: { colspan: 2 },
	                            format: { type: "textarea", rows: 8, width: 210 }
	                        },
	                        {
	                            name: "memo02", style: { colspan: 2 },
	                            format: { type: "textarea", rows: 8, width: 210 }
	                        },
	                        {
	                            name: "memo03", style: { colspan: 2 },
	                            format: { type: "textarea", rows: 8, width: 210 }
	                        },
	                        {
	                            name: "memo04", style: { colspan: 2 },
	                            format: { type: "textarea", rows: 8, width: 210 }
	                        },
	                        {
	                            name: "memo05", style: { colspan: 2 },
	                            format: { type: "textarea", rows: 8, width: 210 }
	                        }
	                    ]
	                },
                    {
                        element: [
                            { header: true, value: "재발방지 대책", format: { type: "label" }, style: { colspan: 10 } }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "관리적 대책", format: { type: "label" }, style: { colspan: 5 } },
                            { header: true, value: "기술적 대책", format: { type: "label" }, style: { colspan: 5 } }
                        ]
                    },
                    {
                        element: [
                            {
                                name: "memo11", style: { colspan: 5 },
                                format: { type: "textarea", rows: 8, width: 550 }
                            },
                            {
                                name: "memo12", style: { colspan: 5 },
                                format: { type: "textarea", rows: 8, width: 550 }
                            }
                        ]
                    }
	            ]
	        }
	    };
        //----------
	    gw_com_module.formCreate(args);
        //=====================================================================================
	    args = {
	        targetid: "frmData_D1_3", query: "QDM_6220_D_1", type: "TABLE", title: "처리계획 및 결과",
	        caption: false, show: true, selectable: true,
	        editable: (param.readonly) ? undefined : { bind: "select", focus: "qa_rmk", validate: true },
	        content: {
	            width: { label: 100, field: 190 }, height: 25,
	            row: [
                    {
                        element: [
                            { header: true, value: "대책확인결과", format: { type: "label" } },
                            { name: "gw_stat" },
                            { header: true, value: "확인자", format: { type: "label" } },
                            { name: "gw_stat_emp" },
                            { header: true, value: "확인일자", format: { type: "label" } },
                            { name: "gw_stat_dt" }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "QA", format: { type: "label" } },
                            {
                                name: "qa_rmk", style: { colspan: 5 },
                                format: { type: "textarea", rows: 8, width: 990 },
                                editable: { type: "textarea", rows: 8, width: 990 }
                            }
                        ]
                    }
	            ]
	        }
	    };
        //----------
	    gw_com_module.formCreate(args);
        //=====================================================================================
    }
	else if (param.objId == "frmData_D2"){	// Detail2 Form : NCR 발생 부서 처리결과 확인
        args = { targetid: "frmData_D2", query: "QDM_6220_D_2", type: "TABLE", title: "실시결과 확인",
            caption: true, width: "100%", show: true, selectable: true,
            editable: (param.readonly) ? undefined : { bind: "select", focus: "astat", validate: true },
            content: {
                width: { label: 100, field: 120 }, height: 25,
                row: [
                    {
                        element: [
                            { header: true, value: "계획일자", format: { type: "label" } },
                            {
                                name: "plan_date", mask: "date-ymd",
                                format: { type: "text" }, editable: { type: "text" }
                            },
                            { header: true, value: "실시결과", format: { type: "label" } },
                            {
                                name: "astat",
                                format: { type: "select", data: { memory: "확인결과" } },
                                editable: { type: "select", data: { memory: "확인결과" }, validate: { rule: "required" } }
                            },
                            { header: true, value: "확인자", format: { type: "label" } },
                            {
                                name: "astat_user_nm", mask: "search", display: true,
                                editable: { type: "text"/*, validate: { rule: "required" }*/ }
                            },
                            { header: true, value: "확인일자", format: { type: "label" } },
                            {
                                name: "astat_dt",
                                format: { type: "text", width: 200 },
                                editable: { type: "hidden", width: 200 }
                            }
                        ]
                    },
                    {
                        element: [
                            { header: true, value: "적용결과", format: { type: "label"} },
                            {
                                name: "check_rmk", style: { colspan: 7 },
                                format: { type: "textarea", rows: 8, width: 990 },
                                editable: { type: "textarea", rows: 8, width: 990 }
                            },
                            { name: "rqst_no", hidden: true, editable: { type: "hidden" } },
                            { name: "act_seq", hidden: true, editable: { type: "hidden" } },
                            { name: "rev_no", hidden: true, editable: { type: "hidden" } },
                            { name: "pstat", hidden: true, editable: { type: "hidden" } },
                            { name: "astat_user", hidden: true, editable: { type: "hidden" } }
                        ]
                    }
                ]
            }
        };
        gw_com_module.formCreate(args);
	}
	else { return; }
	
    //==== Set Events
    if (!param.readonly) {
        var args = { targetid: param.objId, event: "itemdblclick", handler: eventItemDblClick };
        gw_com_module.eventBind(args);
        var args = { targetid: param.objId, event: "itemkeyenter", handler: eventItemDblClick };
        gw_com_module.eventBind(args);
        var args = { targetid: param.objId, event: "itemchanged", handler: eventItemChanged };
        gw_com_module.eventBind(args);

        if (param.objId == "frmData_D1") {
            var args = { targetid: param.objId + "_3", event: "itemdblclick", handler: eventItemDblClick };
            gw_com_module.eventBind(args);
            var args = { targetid: param.objId + "_3", event: "itemkeyenter", handler: eventItemDblClick };
            gw_com_module.eventBind(args);
            var args = { targetid: param.objId + "_3", event: "itemchanged", handler: eventItemChanged };
            gw_com_module.eventBind(args);
        }
    }
	//==== Resize Object & Form
    if (param.clear) {
	    args = { target: [ { type: param.objType, id: param.objId, offset: 8 } ] };
        gw_com_module.objResize(args);
        gw_com_module.informSize();
    }
}
//==== Event Process : ItemChanged
function eventItemDblClick(ui){
	
    v_global.event.type = ui.type;
    v_global.event.object = ui.object;
    v_global.event.row = ui.row;
    v_global.event.element = ui.element;

	//---------- Popup Find Window for select items    
    switch (ui.element) { 
        case "dept_nm": {
                var args = { type: "PAGE", page: "DLG_TEAM", title: "부서 선택", width: 500, height: 450, open: true };
                if (gw_com_module.dialoguePrepare(args) == false) {
                    var args = { page: "DLG_TEAM",
                        param: { ID: gw_com_api.v_Stream.msg_selectTeam }
                    };
                    gw_com_module.dialogueOpen(args);
                }
            } break;
        case "plan_user_nm": 
        case "astat_user_nm": {
                var args = { type: "PAGE", page: "DLG_EMPLOYEE", title: "사원 선택"
                	, width: 700, height: 450, locate: ["center", "top"], open: true 
            	};
                if (gw_com_module.dialoguePrepare(args) == false) {
                    var args = { page: "DLG_EMPLOYEE",
                        param: { ID: gw_com_api.v_Stream.msg_selectEmployee }
                    };
                    gw_com_module.dialogueOpen(args);
                }
            } break;
        default: return;
    }
}
//==== Event Process : ItemDoubleClick
function eventItemChanged(ui) {

    if (!checkEditable({})) return;

    switch (ui.object) {
        case "grdData_Sub":
            if (ui.element == "Remark") {   // 복수행 입력란의 개행문자 치환
                var vl = ui.value.current;
                vl = vl.replace(/\r\n/g, "CRLF");
                gw_com_api.setValue("grdData_Sub", "selected", ui.element, vl, true);
            }
            break;
        case "frmData_D2":
            if (ui.element == "astat") {
                gw_com_api.setValue(ui.object, 1, "astat_user_nm", gw_com_module.v_Session.USR_NM);
                gw_com_api.setValue(ui.object, 1, "astat_user", gw_com_module.v_Session.USR_ID);
                gw_com_api.setValue(ui.object, 1, "astat_dt", gw_com_api.getDate(""));
            }
            break;
        case "frmData_D1_2":
            gw_com_api.setValue("frmData_D1", ui.row, ui.element, ui.value.current, false, true, true);
            if (gw_com_api.getCRUD("frmData_D1", 1) == "retrieve") {
                gw_com_api.setCRUD("frmData_D1", 1, "modify");
            }
            break;
    }

}
//==== Popup Detail Windows
function popupDetail(ui) {
    v_global.event.object = "frmData_Main";
    v_global.event.row = 1;

	var LinkPage = "";
	var LinkID = gw_com_api.v_Stream.msg_infoECR;

	var IssueNo = gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", false);
	if (IssueNo == "") return;

	var LinkType = gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_tp", false);
	if ( LinkType == "VOC"){
		LinkPage = "INFO_VOC";
		LinkID = gw_com_api.v_Stream.msg_infoECR;
	}
	else if ( LinkType == "SPC"){
		LinkPage = "INFO_SPC";
		LinkID = gw_com_api.v_Stream.msg_infoECR;
	}
	else {
		LinkPage = "DLG_ISSUE";
		LinkID = gw_com_api.v_Stream.msg_infoAS;
	}

    var args = {
        type: "PAGE", page: LinkPage, title: "문제발생 상세 정보",
        width: 1100, height: 600, scroll: true, open: true, control: true, locate: ["center", "top"]
    };
    
    if (gw_com_module.dialoguePrepare(args) == false) {
        var args = { page: LinkPage,
            param: { ID: LinkID, data: { issue_no: IssueNo, voc_no: IssueNo } }
        }
        gw_com_module.dialogueOpen(args);
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== Check Functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function checkCRUD(param) {

    if (param.sub) {
        var obj = "grdData_Sub";
        if (checkEditable({}))
            return gw_com_api.getCRUD(obj, "selected", true);
        else
            return ((gw_com_api.getSelectedRow(obj) == null) ? false : true);
    }
    else return gw_com_api.getCRUD("frmData_D1");

}
//----------
function checkManipulate(param) {

    if (checkCRUD(param) == "none") {
        gw_com_api.messageBox([
            { text: (param.sub) ? "선택된 내역이 없습니다." : "NOMASTER" }
        ]);
        return false;
    }
    return true;

}
//----------
function checkEditable(param) {

    return (gw_com_module.v_Option.authority.usable && gw_com_module.v_Option.authority.control == "R") ? false : true;

}
//----------
function checkUpdatable(param) {

    var args = {
        check: param.check,
        target: [
            { type: "FORM", id: "frmData_D1" },
            { type: "FORM", id: "frmData_D2" },
			{ type: "GRID", id: "grdData_File1" }
		],
        param: param
    };
    return gw_com_module.objUpdatable(args);

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== Retrieve & Insert & Delete Data Functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//----------
function processRetrieve(param) {

    var args;
    if (param.object == "grdRoot_SUB_AS" || param.object == "grdRoot_SUB_PO" || param.object == "grdRoot_SUB_QD") {
        if (v_global.logic.root_tp == "") return;
        var obj = "grdRoot_SUB_" + v_global.logic.root_tp
        var target = "grdRoot_DETAIL_" + v_global.logic.root_tp
        args = {
            source: {
                type: "GRID", id: obj, row: param.row,
                element: [
                    { name: "issue_no", argument: "arg_issue_no" },
                    { name: "issue_seq", argument: "arg_issue_seq" }
                ]
            },
            target: [
                { type: "GRID", id: target, select: true }
            ]
        };
    } else {
        args = {
            source: {
                type: "INLINE",
                argument: [
                    { name: "arg_issue_no", value: v_global.logic.issue_no },
                    { name: "arg_rqst_no", value: param.key },
                    { name: "arg_data_key", value: param.key },	// 첨부파일용
                    { name: "arg_data_seq", value: -1 }	// 첨부파일용
                ]
            },
            target: [
                { type: "FORM", id: "frmRoot_MAIN_AS" },
                { type: "FORM", id: "frmRoot_MAIN_PO" },
                { type: "FORM", id: "frmRoot_MAIN_QD" },
                { type: "GRID", id: "grdRoot_SUB_" + v_global.logic.root_tp, select: true },
                { type: "FORM", id: "frmRoot_SUB" },
                { type: "FORM", id: "frmRoot_DETAIL" },
                { type: "FORM", id: "frmData_Main" },
                { type: "GRID", id: "grdData_Sub", select: true },	//checkEditable({}) ? false : 
                { type: "GRID", id: "grdData_File1" }
            ],
            clear: [
                { type: "GRID", id: "grdRoot_DETAIL_AS" },
                { type: "GRID", id: "grdRoot_DETAIL_PO" },
                { type: "GRID", id: "grdRoot_DETAIL_QD" },
                { type: "FORM", id: "frmData_D1" },
                { type: "FORM", id: "frmData_D1_2" },
                { type: "FORM", id: "frmData_D1_3" },
                { type: "FORM", id: "frmData_D2" }
            ],
            key: param.key
        };
    }
    gw_com_module.objRetrieve(args);

}
//----------
function processLink(param) {
    var args = {};

    if (param.object == "grdData_Sub") {
        args = { 
            key: param.key,
            source: { type: "GRID", id: "grdData_Sub", row: "selected", block: true,
                element: [
				    { name: "rqst_no", argument: "arg_rqst_no" },
				    { name: "act_seq", argument: "arg_act_seq" }
			    ]
            },
            target: [
                { type: "FORM", id: "frmData_D1" },
                { type: "FORM", id: "frmData_D1_2" },
                { type: "FORM", id: "frmData_D1_3" },
                { type: "FORM", id: "frmData_D2" }
		    ]
        };
    }
    else if (param.object == "grdData_File1") {
        args = { 
            key: param.key,
            source: { type: "GRID", id: "grdData_Sub", row: 1, block: true,
                element: [ { name: "rqst_no", argument: "arg_data_key" } ],
	            argument: [ { name: "arg_data_seq", value: -1 } ]
            },
            target: [ { type: "GRID", id: "grdData_File1", select: true } ]
        };
    }
    else return;

    gw_com_module.objRetrieve(args);

}
//----------
function processInsert(ui) {

    if (ui.object == "lyrMenu_Sub") {	// 대상부서 추가
    	//if (!checkManipulate({ sub: true })) return false;

        var args = { targetid: "grdData_Sub", edit: true, updatable: true,
            data: [
                { name: "rqst_no", value: gw_com_api.getValue("frmData_Main", 1, "rqst_no", false) }
            ]
        };
        gw_com_module.gridInsert(args);
    }
    else {	// 요구서 추가
        var args = {
            source: {
                type: "INLINE",
                argument: [
                    { name: "arg_issue_no", value: v_global.logic.issue_no }
                ]
            },
            target: [
                { type: "FORM", id: "frmRoot_MAIN_AS" },
                { type: "FORM", id: "frmRoot_MAIN_PO" },
                { type: "FORM", id: "frmRoot_MAIN_QD" },
                { type: "GRID", id: "grdRoot_SUB_" + v_global.logic.root_tp, select: true },
                { type: "FORM", id: "frmRoot_SUB" },
                { type: "FORM", id: "frmRoot_DETAIL" }
            ],
            clear: [
                { type: "GRID", id: "grdRoot_DETAIL_AS" },
                { type: "GRID", id: "grdRoot_DETAIL_PO" },
                { type: "GRID", id: "grdRoot_DETAIL_QD" },
                { type: "FORM", id: "frmData_D1" },
                { type: "FORM", id: "frmData_D1_2" },
                { type: "FORM", id: "frmData_D1_3" },
                { type: "FORM", id: "frmData_D2" }
            ]
        };
        gw_com_module.objRetrieve(args);

        var args = {
            targetid: "frmData_Main", edit: true, updatable: true,
            data: [
                { name: "rqst_dt", value: gw_com_api.getDate("") },
                { name: "pstat", value: "진행(품질)" },
                { name: "astat", value: "작성중" },
                { name: "astat_user", value: gw_com_module.v_Session.USR_ID },
                { name: "rqst_user", value: gw_com_module.v_Session.USR_ID },
                { name: "rqst_user_nm", value: gw_com_module.v_Session.USR_NM },
                { name: "issue_no", value: v_global.logic.issue_no },
                { name: "issue_tp", value: v_global.logic.issue_tp },
                { name: "issue_dept", value: v_global.logic.issue_dept },
                { name: "issue_dt", value: v_global.logic.issue_dt },
                { name: "prod_nm", value: v_global.logic.prod_nm }
            ],
            clear: [
                { type: "GRID", id: "grdData_Sub" },
                { type: "FORM", id: "frmData_D1" },
                { type: "FORM", id: "frmData_D1_2" },
                { type: "FORM", id: "frmData_D1_3" },
                { type: "FORM", id: "frmData_D2" },
                { type: "GRID", id: "grdData_File1" }
            ]
        };
        gw_com_module.formInsert(args);
        
        // 대상부서 추가
        processInsert({ object: "lyrMenu_Sub" });

        // 처리결과, 확인 Form 초기화
//        args = { targetid: "frmData_D1", edit: false };
//        gw_com_module.formInsert(args);
//        gw_com_api.setCRUD("frmData_D1", 1, "modify");	// Change Row's Status to Modify

//        args = { targetid: "frmData_D2", edit: false };
//        gw_com_module.formInsert(args);
//        gw_com_api.setCRUD("frmData_D2", 1, "modify");	// Change Row's Status to Modify
        
    }

}
//----------
function processDelete(ui) {

    if (ui.object == "lyrMenu_Sub") {
        var args = { targetid: "grdData_Sub", row: "selected" }
        gw_com_module.gridDelete(args);
    }
    else if (ui.object == "lyrMenu_File1") {
        var args = { targetid: "grdData_File1", row: "selected" }
        gw_com_module.gridDelete(args);
    }
    else if(ui.object == "lyrMenu_Main") {
		if (!checkManipulate({})) return;
	            
	    var status = checkCRUD({});
	    if (status == "initialize" || status == "create") processClear({});
	    else {
		    v_global.process.handler = processRemove;
	        gw_com_api.messageBox([ { text: "REMOVE" } ], 420, gw_com_api.v_Message.msg_confirmRemove, "YESNO", param);
		}
    }
    else return;

}
//----------
function processClear(param) {

    var args = {
        target: [
            { type: "FORM", id: "frmRoot_MAIN_AS" },
            { type: "FORM", id: "frmRoot_MAIN_PO" },
            { type: "FORM", id: "frmRoot_MAIN_QD" },
            { type: "GRID", id: "grdRoot_SUB_AS" },
            { type: "GRID", id: "grdRoot_SUB_PO" },
            { type: "GRID", id: "grdRoot_SUB_QD" },
            { type: "FORM", id: "frmRoot_SUB" },
            { type: "GRID", id: "grdRoot_DETAIL_AS" },
            { type: "GRID", id: "grdRoot_DETAIL_PO" },
            { type: "GRID", id: "grdRoot_DETAIL_QD" },
            { type: "FORM", id: "frmRoot_DETAIL" },
            { type: "FORM", id: "frmData_Main" },
            { type: "GRID", id: "grdData_Sub" },
            { type: "FORM", id: "frmData_D1" },
            { type: "FORM", id: "frmData_D1_2" },
            { type: "FORM", id: "frmData_D1_3" },
            { type: "FORM", id: "frmData_D2" },
            { type: "GRID", id: "grdData_File1" }
        ]
    };
    gw_com_module.objClear(args);

}
//---------- Save
function processSave(param) {

    var args = {
        target: [
            { type: "FORM", id: "frmData_D1" },
			{ type: "FORM", id: "frmData_D2" },
			{ type: "GRID", id: "grdData_File1" }
		]
    };
    if (gw_com_module.objValidate(args) == false) return false;

    args.handler = { success: successSave };
    gw_com_module.objSave(args);

}
//---------- After Saving
function successSave(response, param) {

    $.each(response, function () {
        $.each(this.KEY, function () { 
        	if (this.NAME == "rqst_no") { 
        		v_global.logic.key = this.VALUE;
                processRetrieve({ key: v_global.logic.key }); 
            }
        });
    });

}
//---------- Remove
function processRemove(param) {

    var args = {
        target: [
            { type: "FORM", id: "frmData_Main", key: { element: [ { name: "rqst_no" } ] } }
        ],
        handler: { success: successRemove, param: param }
    };
    gw_com_module.objRemove(args);

}
//---------- After Removing
function successRemove(response, param) {

    processClear(param);

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== Special Functions : Batch Procedure, Approval
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//---------- NCR 발행 통보 : Mail 전송 시작
function processSend(param) {
	
    //if (!checkManipulate({})) return;
    if (!checkUpdatable({ check: true })) return false;

    var CheckCode = gw_com_api.getValue("frmData_D2", 1, "astat");
    if (CheckCode != "부적합") {
        gw_com_api.messageBox([
	        { text: "조치결과가 부적합이 아닌 경우에는 결과통보를 할 수 없습니다." }], 480);
        return;
    }

    var args = {
        type: "NCR-REJECT",
        key_no: gw_com_api.getValue("frmData_D1", 1, "rqst_no"),
        key_seq: gw_com_api.getValue("frmData_D1", 1, "act_seq")
    }

    gw_com_api.messageBox([
        { text: "시정조치 요구서에 대한 이메일을 발송합니다." + "<br>" },
        { text: "계속 하시겠습니까?" }
    ], 420, gw_com_api.v_Message.msg_confirmBatch, "YESNO", args);

}
//---------- Batch : NCR 발행 통보 처리 Procedure 실행 (PROC_MAIL_QDM_NCR)
function processBatch(param) {

    var args = {
        url: "COM",
        subject: MailInfo.getSubject(param),
        body: MailInfo.getBody(param),
        to: MailInfo.getTo(param),
        edit: true
    };
    gw_com_module.sendMail(args);

}
//---------- Batch : Afert Processing
function successBatch(response) {
    gw_com_api.messageBox([ { text: response.VALUE[1] } ], 350);
}
//----------
function processApprove(param) {

    var status = gw_com_api.getValue("frmData_Main", 1, "gw_astat_nm", false, true);
    if (status != '없슴' && status != '미처리' && status != '반송' && status != '회수') {
        gw_com_api.messageBox([
            { text: "결재 " + status + " 자료이므로 처리할 수 없습니다." }
        ], 420);
        return false;
    }

    var args = { page: "IFProcess",
        param: { ID: gw_com_api.v_Stream.msg_authSystem,
            data: { system: "GROUPWARE",
                name: gw_com_module.v_Session.GW_ID,
                encrypt: { password: true },
                param: param }
        }
    };
    gw_com_module.dialogueOpen(args);

}
//----------
function successApproval(response, param) {

    processRetrieve({ key: v_global.logic.key });

    gw_com_api.showMessage("그룹웨어 페이지로 이동합니다.");
    var data = {};
    $.each(response.NAME, function (approval_i) {
        data[response.NAME[approval_i]] = response.VALUE[approval_i];
    });
    if (data.r_value < 0) {
        gw_com_api.showMessage(data.message);
        return;
    }
    var url = "http://gw.ips.co.kr/common/main/sso_erp.aspx";
    var params = [
        { name: "form_id", value: 7 },
        { name: "cmpid", value: 1 },
        { name: "inter_id", value: "I" },
        { name: "sysid", value: "ECCB" },
        { name: "sys_key", value: data.r_key },
        { name: "seq", value: data.r_seq },
        { name: "user_id", value: v_global.logic.name },
        { name: "passwd", value: v_global.logic.password }
    ];
    var args = "";
    $.each(params, function (args_i) {
        args = args +
            ((args_i == 0) ? "?" : "&") + this.name + "=" + this.value;
    });
    window.open(url + args, "", "");

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== Close Funtions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//----------
function processClose(param) {

    v_global.process.handler = processClose;
    if (!checkUpdatable({})) return;
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//==== 첨부 파일 Upload
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function processUpload(param) {

    // Check
    if (!checkManipulate({})) return;
    if (!checkUpdatable({ check: true })) return false;

    // Parameter 설정
    v_global.logic.FileUp = {
    	type: "NCR-CHK",
        key: gw_com_api.getValue("grdData_Sub", 1, "rqst_no", true),
        seq: 0,
        user: gw_com_module.v_Session.USR_ID,
        crud: "C",  rev: 0, revise: false
    };

    // Prepare File Upload Window
    var args = { type: "PAGE", page: "DLG_FileUpload", title: "파일 업로드", datatype: "NCR-CHK", 
    	width: 650, height: 260, open: true, locate: ["center", "top"] }; //

    if (gw_com_module.dialoguePrepare(args) == false) {
    	// 아래 로직은 두 번째 Open 부터 작동함. 첫 번째는 streamProcess 에 의함
        var args = { page: "DLG_FileUpload",
            param: { ID: gw_com_api.v_Stream.msg_upload_ASFOLDER, data: v_global.logic.FileUp }
        };
        gw_com_module.dialogueOpen(args);
    }
}
//----------
var MailInfo = {
    getSubject: function (param) {
        var rtn = "";
        var args = {
            request: "PAGE",
            url: "../Service/svc_Data_Retrieve_JSONs.aspx" +
                    "?QRY_ID=QDM_6210_MAIL" +
                    "&QRY_COLS=val" +
                    "&CRUD=R" +
                    "&arg_type=" + param.type + "&arg_field=subject&arg_key_no=" + param.key_no + "&arg_key_seq=" + param.key_seq,
            handler_success: successRequest
        };
        //=================== async : false ========================
        $.ajaxSetup({ async: false });
        //----------
        gw_com_module.callRequest(args);
        function successRequest(data) {
            rtn = data[0].DATA[0];
        }
        //----------
        $.ajaxSetup({ async: true });
        //=================== async : true ========================
        return rtn
    },
    getBody: function (param) {
        var rtn = "";
        var args = {
            request: "PAGE",
            url: "../Service/svc_Data_Retrieve_JSONs.aspx" +
                    "?QRY_ID=QDM_6210_MAIL" +
                    "&QRY_COLS=val" +
                    "&CRUD=R" +
                    "&arg_type=" + param.type + "&arg_field=body&arg_key_no=" + param.key_no + "&arg_key_seq=" + param.key_seq,
            handler_success: successRequest
        };
        //=================== async : false ========================
        $.ajaxSetup({ async: false });
        //----------
        gw_com_module.callRequest(args);
        function successRequest(data) {
            rtn = data[0].DATA[0];
        }
        //----------
        $.ajaxSetup({ async: true });
        //=================== async : true ========================
        return rtn
    },
    getTo: function (param) {
        var rtn = new Array();
        var args = {
            request: "PAGE",
            url: "../Service/svc_Data_Retrieve_JSONs.aspx" +
                    "?QRY_ID=QDM_6210_MAIL2" +
                    "&QRY_COLS=name,value" +
                    "&CRUD=R" +
                    "&arg_type=" + param.type + "&arg_key_no=" + param.key_no + "&arg_key_seq=" + param.key_seq,
            handler_success: successRequest
        };
        //=================== async : false ========================
        $.ajaxSetup({ async: false });
        //----------
        gw_com_module.callRequest(args);
        function successRequest(data) {
            $.each(data, function () {
                rtn.push({
                    name: this.DATA[0],
                    value: this.DATA[1]
                });
            });
        }
        //----------
        $.ajaxSetup({ async: true });
        //=================== async : true ========================
        return rtn
    }
}
//----------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_showMessage: { 
            gw_com_module.streamInterface(param); 
        } break;
        case gw_com_api.v_Stream.msg_resultMessage: {
        	// PageId가 다를 때 Skip 
        	if (param.data.page != gw_com_api.getPageID()) { 
        		param.to = { type: "POPUP", page: param.data.page };
                gw_com_module.streamInterface(param);
                break;
            }
            // 확인 메시지별 처리    
            switch (param.data.ID) { 
            	case gw_com_api.v_Message.msg_confirmSave: { 
                	if (param.data.result == "YES") processSave(param.data.arg);
                    else { 
                    	processClear({});
                        if (v_global.process.handler != null) v_global.process.handler(param.data.arg);
                    }
                } break;
                case gw_com_api.v_Message.msg_confirmRemove: { 
                    if (param.data.result == "YES") processRemove(param.data.arg);
                } break;
                case gw_com_api.v_Message.msg_confirmBatch: { 
                    if (param.data.result == "YES") processBatch(param.data.arg);
                } break;
                case gw_com_api.v_Message.msg_informSaved: { 
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
                case gw_com_api.v_Message.msg_informRemoved: { 
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
                case gw_com_api.v_Message.msg_informBatched: { 
                    param.data.arg.handler(param.data.arg.response, param.data.arg.param);
                } break;
            }
        } break;
        case gw_com_api.v_Stream.msg_selectedTeam: {
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "dept_cd", param.data.dept_cd,
			                        (v_global.event.type == "GRID") ? true : false);
                gw_com_api.setValue(v_global.event.object, v_global.event.row, "dept_nm", param.data.dept_nm,
			                        (v_global.event.type == "GRID") ? true : false);
                closeDialogue({ page: param.from.page, focus: true });
        } break;
        case gw_com_api.v_Stream.msg_selectedEmployee: {
        	var CodeCol = (v_global.event.element == "astat_user_nm") ? "astat_user" : "act_user" ;
            gw_com_api.setValue(v_global.event.object, v_global.event.row, CodeCol, param.data.user_id,
		                        (v_global.event.type == "GRID") ? true : false);
            gw_com_api.setValue(v_global.event.object, v_global.event.row, v_global.event.element, param.data.user_nm,
		                        (v_global.event.type == "GRID") ? true : false);
            closeDialogue({ page: param.from.page, focus: true });
        } break;
        case gw_com_api.v_Stream.msg_uploaded_ASFOLDER: {
            closeDialogue({ page: param.from.page });
        	processLink( { object: "grdData_File1" } ) ;
        } break;
        case gw_com_api.v_Stream.msg_authedSystem: { 
            	closeDialogue({ page: param.from.page });

                v_global.logic.name = param.data.name;
                v_global.logic.password = param.data.password;
                var gw_key = gw_com_api.getValue("frmData_Main", 1, "gw_key");
                var gw_seq = gw_com_api.getValue("frmData_Main", 1, "gw_seq");
                gw_seq = (gw_seq == "") ? 0 : parseInt(gw_seq);
                var args = { url: "COM",
                    procedure: "PROC_APPROVAL_ECCB",
                    input: [
                        { name: "user", value: gw_com_module.v_Session.USR_ID, type: "varchar" },
                        { name: "emp_no", value: gw_com_module.v_Session.EMP_NO, type: "varchar"}/*,
                        { name: "user", value: "goodware", type: "varchar" },
                        { name: "emp_no", value: "10505", type: "varchar" }*/,
                        { name: "eccb_no", value: gw_com_api.getValue("frmData_Main", 1, "eccb_no"), type: "varchar" },
                        { name: "gw_key", value: gw_key, type: "varchar" },
                        { name: "gw_seq", value: gw_seq, type: "int" }
                    ],
                    output: [
                        { name: "r_key", type: "varchar" },
                        { name: "r_seq", type: "int" },
                        { name: "r_value", type: "int" },
                        { name: "message", type: "varchar" }
                    ],
                    handler: { success: successApproval
                    }
                };
                gw_com_module.callProcedure(args); 
                }
            break;
           
        // When Opened Dialogue Winddows
        case gw_com_api.v_Stream.msg_openedDialogue: { 
        	var args = { to: { type: "POPUP", page: param.from.page } };

            switch (param.from.page) { 
                case "DLG_TEAM": { 
                    args.ID = gw_com_api.v_Stream.msg_selectTeam; 
                	} break;
                case "DLG_EMPLOYEE": { 
                    args.ID = gw_com_api.v_Stream.msg_selectEmployee; 
                	} break;
                case "DLG_FileUpload": { 
                	args.ID = gw_com_api.v_Stream.msg_upload_ASFOLDER;
                	args.data = v_global.logic.FileUp;
             	} break;
                case "INFO_VOC": {
                    args.ID = gw_com_api.v_Stream.msg_infoECR;
                    args.data = { 
                    	voc_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", false)
                    	};
                	} break;
                case "INFO_SPC": {
                    args.ID = gw_com_api.v_Stream.msg_infoECR;
                    args.data = { 
                    	issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", false)
                    	};
                	} break;
                case "DLG_ISSUE": {
                    args.ID = gw_com_api.v_Stream.msg_infoAS;
                    args.data = { 
                    	issue_no: gw_com_api.getValue(v_global.event.object, v_global.event.row, "issue_no", false)
                    	};
                	} break;
                }
            gw_com_module.streamInterface(args); 
            } break;
        case gw_com_api.v_Stream.msg_closeDialogue: {
        	closeDialogue({ page: param.from.page }); 
        } break;
    }

}