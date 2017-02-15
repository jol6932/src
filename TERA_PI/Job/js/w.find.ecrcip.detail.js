﻿//------------------------------------------
// Process about Job Process.
//                Created by Professor.X, GoodWare (2011.04)
//------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// variables.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var v_global = {
    event: {
        type: null,
        object: null,
        row: null,
        element: null
    },
    process: {
        param: null,
        entry: null,
        act: null,
        handler: null,
        current: {},
        prev: {}
    },
    logic: {}
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
        var args = { request: [
				{ type: "PAGE", name: "DEPT_AREA_FIND", query: "dddw_deptarea",
				    param: [{ argument: "arg_type", value: gw_com_module.v_Session.DEPT_AUTH }] },
				{
				    type: "PAGE", name: "진행상태", query: "dddw_zcode",
				    param: [
                        { argument: "arg_hcode", value: "ECCB03" }
                    ]
				},
				{
				    type: "PAGE", name: "조치시점", query: "dddw_zcode",
				    param: [
                        { argument: "arg_hcode", value: "ECCB10" }
                    ]
				},
				{
				    type: "PAGE", name: "분류1", query: "dddw_zcode",
				    param: [
                        { argument: "arg_hcode", value: "ECCB05" }
                    ]
				},
				{
				    type: "PAGE", name: "분류2", query: "dddw_zcode",
				    param: [
                        { argument: "arg_hcode", value: "ECCB06" }
                    ]
				},
				{
				    type: "PAGE", name: "분류3", query: "dddw_zcode",
				    param: [
                        { argument: "arg_hcode", value: "ECCB07" }
                    ]
				},
                {
                    type: "PAGE", name: "부서", query: "dddw_dept"
                },
                {
                    type: "PAGE", name: "사원", query: "dddw_emp"
                }
			],
            starter: start
        };
        gw_com_module.selectSet(args);

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
        var args = { targetid: "lyrMenu",
            type: "FREE",
            element: [
				{
				    name: "조회",
				    value: "조회",
				    act: true
				},
				{
				    name: "닫기",
				    value: "닫기"
				}
			]
        };
        //----------
        gw_com_module.buttonMenu(args);
        //=====================================================================================
        var args = { targetid: "frmOption", type: "FREE", title: "조회 조건",
            trans: true,
            show: true,
            border: false,
            align: "left",
            editable: {
                validate: true
            }/*,
            remark: "lyrRemark"*/,
            content: {
                row: [
                    {
                        element: [
				            {
				                name: "ecr_no",
				                label: {
				                    title: "ECR No. :"
				                },
				                editable: {
				                    type: "text",
				                    size: 10,
				                    maxlength: 20
				                }
				            },
				            {
				                name: "실행",
				                act: true,
				                show: false,
				                format: {
				                    type: "button"
				                }
				            }
				        ]
                    }
			    ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_내역",
            query: "w_eccb1020_M_1",
            type: "TABLE",
            title: "제안 내역",
            caption: true,
            show: true,
            selectable: true,
            content: {
                width: {
                    label: 80,
                    field: 160
                },
                height: 25,
                row: [
                    {
                        element: [
                            {
                                header: true,
                                value: "ECR No.",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "ecr_no",
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                header: true,
                                value: "진행상태",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "pstat"
                            },
                            {
                                header: true,
                                value: "작성자",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "ecr_emp_nm"
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "개선제안명",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 3
                                },
                                name: "ecr_title",
                                format: {
                                    width: 500
                                },
                                editable: {
                                    type: "text",
                                    width: 500
                                }
                            },
                            {
                                header: true,
                                value: "작성부서",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "ecr_dept_nm"
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "제안개요",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 3
                                },
                                name: "ecr_desc",
                                format: {
                                    width: 500
                                },
                                editable: {
                                    type: "text",
                                    width: 500
                                }
                            },
                            {
                                header: true,
                                value: "작성일자",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "ecr_dt",
                                mask: "date-ymd"
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "조치요구시점",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 3,
                                    colfloat: "float"
                                },
                                name: "act_time_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "조치시점"
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_time_text",
                                format: {
                                    width: 300
                                }
                            },
                            {
                                style: {
                                    colfloat: "floated"
                                },
                                name: "act_time_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 337
                                },
                                display: true
                            },
                            {
                                name: "act_time",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                header: true,
                                value: "실행요청부서",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "rqst_dept",
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "부서"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "접수자",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "rcvd_emp",
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "사원"
                                    }
                                }
                            },
                            {
                                header: true,
                                value: "접수일자",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "rcvd_dt",
                                mask: "date-ymd",
                                editable: {
                                    type: "text"
                                }
                            },
                            {
                                header: true,
                                value: "접수부서",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "rcvd_dept",
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "부서"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "분류",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 5,
                                    colfloat: "float"
                                },
                                name: "act_region1",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류1",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_region1_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module1_text",
                                format: {
                                    width: 300
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module1_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류2",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module1_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "act_module1",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class1_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class1_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류3",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floated"
                                },
                                name: "mp_class1_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "mp_class1",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 5,
                                    colfloat: "float"
                                },
                                name: "act_region2",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류1",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_region2_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module2_text",
                                format: {
                                    width: 300
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module2_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류2",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module2_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "act_module2",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class2_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class2_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류3",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floated"
                                },
                                name: "mp_class2_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "mp_class2",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 5,
                                    colfloat: "float"
                                },
                                name: "act_region3",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류1",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_region3_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module3_text",
                                format: {
                                    width: 300
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module3_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류2",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "act_module3_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "act_module3",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class3_text",
                                format: {
                                    width: 200
                                }
                            },
                            {
                                style: {
                                    colfloat: "floating"
                                },
                                name: "mp_class3_sel",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "select",
                                    data: {
                                        memory: "분류3",
                                        unshift: [
				                            { title: "-", value: "" }
				                        ]
                                    },
                                    width: 155
                                },
                                display: true
                            },
                            {
                                style: {
                                    colfloat: "floated"
                                },
                                name: "mp_class3_etc",
                                format: {
                                    width: 0
                                },
                                editable: {
                                    type: "text",
                                    width: 155
                                },
                                display: true
                            },
                            {
                                name: "mp_class3",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "개선예상효과",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                style: {
                                    colspan: 5
                                },
                                name: "act_effect",
                                format: {
                                    type: "textarea",
                                    rows: 5,
                                    width: 800
                                },
                                editable: {
                                    type: "textarea",
                                    rows: 5,
                                    width: 800
                                }
                            }
                        ]
                    },
                    {
                        element: [
                            {
                                header: true,
                                value: "최종승인상태",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "astat"
                            },
                            {
                                header: true,
                                value: "승인자",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "aemp"
                            },
                            {
                                header: true,
                                value: "승인일시",
                                format: {
                                    type: "label"
                                }
                            },
                            {
                                name: "adate"
                            }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_모델",
            query: "w_eccb1010_S_1",
            title: "적용 모델",
            caption: true,
            height: "100%",
            pager: false,
            show: true,
            number: true,
            selectable: true,
            element: [
				{
				    header: "제품유형",
				    name: "prod_type",
				    width: 100,
				    align: "center",
				    editable: {
				        type: "hidden"
				    }
				},
                {
                    header: "고객사",
                    name: "cust_nm",
                    width: 100,
                    align: "center"
                },
                {
                    header: "Line",
                    name: "cust_dept",
                    width: 120,
                    align: "center",
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    header: "Process",
                    name: "cust_proc",
                    width: 120,
                    align: "center",
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    header: "제품코드",
                    name: "prod_cd",
                    width: 100,
                    align: "center"
                },
                {
                    header: "제품명",
                    name: "prod_nm",
                    width: 300,
                    align: "left"
                },
                {
                    name: "cust_cd",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    name: "prod_key",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    name: "model_seq",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    name: "root_seq",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                },
                {
                    name: "root_no",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_메모A",
            query: "w_eccb1010_S_2_1",
            type: "TABLE",
            title: "개선 전 (현상 및 문제점)",
            caption: true,
            show: true,
            selectable: true,
            content: {
                width: {
                    field: "100%"
                },
                height: 185,
                row: [
                    {
                        element: [
                            {
                                name: "memo_html",
                                format: {
                                    type: "html",
                                    height: 185,
                                    top: 5
                                }
                            },
                            {
                                name: "memo_text",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "memo_cd",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "root_seq",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "root_no",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "frmData_메모B",
            query: "w_eccb1010_S_2_2",
            type: "TABLE",
            title: "개선 후 (안)",
            caption: true,
            show: true,
            selectable: true,
            content: {
                width: {
                    field: "100%"
                },
                height: 185,
                row: [
                    {
                        element: [
                            {
                                name: "memo_html",
                                format: {
                                    type: "html",
                                    height: 185,
                                    top: 5
                                }
                            },
                            {
                                name: "memo_text",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "memo_cd",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "root_seq",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            },
                            {
                                name: "root_no",
                                hidden: true,
                                editable: {
                                    type: "hidden"
                                }
                            }
                        ]
                    }
                ]
            }
        };
        //----------
        gw_com_module.formCreate(args);
        //=====================================================================================
        var args = {
            targetid: "grdData_첨부",
            query: "w_eccb1010_S_3",
            title: "첨부 문서",
            caption: true,
            height: "100%",
            pager: false,
            show: true,
            number: true,
            selectable: true,
            element: [
				{
				    header: "파일명",
				    name: "file_nm",
				    width: 300,
				    align: "left"
				},
				{
				    header: "다운로드",
				    name: "download",
				    width: 60,
				    align: "center",
				    format: {
				        type: "link",
				        value: "다운로드"
				    }
				},
				{
				    header: "파일설명",
				    name: "file_desc",
				    width: 300,
				    align: "left",
				    editable: {
				        type: "text"
				    }
				},
                {
                    name: "file_ext",
                    hidden: true
                },
                {
                    name: "file_path",
                    hidden: true
                },
                {
                    name: "network_cd",
                    hidden: true
                },
                {
                    name: "data_tp",
                    hidden: true
                },
                {
                    name: "data_key",
                    hidden: true
                },
                {
                    name: "data_seq",
                    hidden: true
                },
                {
                    name: "file_id",
                    hidden: true,
                    editable: {
                        type: "hidden"
                    }
                }
			]
        };
        //----------
        gw_com_module.gridCreate(args);
        //=====================================================================================
        var args = {
            targetid: "lyrDown",
            width: 0,
            height: 0,
            show: false
        };
        gw_com_module.pageCreate(args);
        //=====================================================================================
        var args = {
            target: [
				{
				    type: "FORM",
				    id: "frmData_내역",
				    offset: 8
				},
				{
				    type: "GRID",
				    id: "grdData_모델",
				    offset: 8
				},
                {
                    type: "FORM",
                    id: "frmData_상세",
                    offset: 8
                },
				{
				    type: "GRID",
				    id: "grdData_첨부",
				    offset: 8
				}
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
        var args = {
            targetid: "lyrMenu",
            element: "조회",
            event: "click",
            handler: click_lyrMenu_조회
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "lyrMenu",
            element: "닫기",
            event: "click",
            handler: click_lyrMenu_닫기
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "frmOption",
            element: "실행",
            event: "click",
            handler: click_frmOption_실행
        };
        gw_com_module.eventBind(args);
        //----------
        var args = {
            targetid: "grdData_첨부",
            grid: true,
            element: "download",
            event: "click",
            handler: click_grdData_첨부_download
        };
        gw_com_module.eventBind(args);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // event handler.
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------
        function click_lyrMenu_조회(ui) {

            processRetrieve({});

        }
        //----------
        function click_lyrMenu_닫기(ui) {

            processClose({});

        }
        //----------
        function click_frmOption_실행(ui) {

            processRetrieve({});

        }
        //----------        
        function click_grdData_첨부_download(ui) {

            var args = {
                source: {
                    id: "grdData_첨부",
                    row: ui.row
                },
                targetid: "lyrDown"
            };
            gw_com_module.downloadFile(args);

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
function processRetrieve(param) {

    var args = {
        source: {
            type: "FORM",
            id: "frmOption",
            element: [
				{
				    name: "ecr_no",
				    argument: "arg_ecr_no"
				}
			]/*,
            remark: [
			    {
			        element: [{ name: "ecr_no"}]
			    }
		    ]*/
        },
        target: [
			{
			    type: "FORM",
			    id: "frmData_내역"
			},
            {
                type: "GRID",
                id: "grdData_모델"
            },
            {
                type: "FORM",
                id: "frmData_메모A"
            },
            {
                type: "FORM",
                id: "frmData_메모B"
            },
            {
                type: "GRID",
                id: "grdData_첨부"
            }
		],
        key: param.key
    };
    gw_com_module.objRetrieve(args);

}
//----------
function processClose(param) {

    var args = {
        ID: gw_com_api.v_Stream.msg_closeDialogue
    };
    gw_com_module.streamInterface(args);

}
//----------
function closeDialogue(param) {

    var args = {
        page: param.page
    };
    gw_com_module.dialogueClose(args);
    if (param.focus) {
        gw_com_api.setFocus(v_global.event.object,
	                        v_global.event.row,
	                        v_global.event.element,
	                        (v_global.event.type == "GRID") ? true : false);
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stream handler. (network section)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//----------
streamProcess = function (param) {

    switch (param.ID) {
        case gw_com_api.v_Stream.msg_infoECRCIP:
            {
                var retrieve = false;
                if (param.data != undefined) {
                    if (param.data.ecr_no
                        != gw_com_api.getValue("frmOption", 1, "ecr_no")) {
                        gw_com_api.setValue("frmOption", 1, "ecr_no", param.data.ecr_no);
                        retrieve = true;
                    }
                }
                else if (!v_global.process.init) {
                    v_global.process.init = true;
                    retrieve = true;
                }
                if (retrieve)
                    processRetrieve({});
                gw_com_api.setFocus("frmOption", 1, "ecr_no");

            }
            break;
        case gw_com_api.v_Stream.msg_showMessage:
            {
                gw_com_module.streamInterface(param);
            }
            break;
        case gw_com_api.v_Stream.msg_resultMessage:
            {
                if (param.data.page != gw_com_api.getPageID()) {
                    param.to = {
                        type: "POPUP",
                        page: param.data.page
                    };
                    gw_com_module.streamInterface(param);
                    break;
                }
            }
            break;
    }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//