﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Xml;
using System.Windows.Forms;
using Newtonsoft.Json;

/// <summary>
/// WebService의 요약 설명입니다.
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// ASP.NET AJAX를 사용하여 스크립트에서 이 웹 서비스를 호출하려면 다음 줄의 주석 처리를 제거합니다. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {

    public WebService () {

        //디자인된 구성 요소를 사용하는 경우 다음 줄의 주석 처리를 제거합니다. 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "I love WevService 1";
    }

    [WebMethod]
    public string HelloWorld2()
    {
        return "I love WevService 2";
    }

    [WebMethod]
    public XmlDocument getData(string param1)
    {
        XmlDocument dom = new XmlDocument();

        XmlElement people = dom.CreateElement("People");
        dom.AppendChild(people);

        XmlElement person = dom.CreateElement("Person");
        people.AppendChild(person);

        XmlElement firstName = dom.CreateElement("FirstName");
        person.AppendChild(firstName);

        XmlText text = dom.CreateTextNode("Bob");
        firstName.AppendChild(text);

        return dom;
    }

    [WebMethod]
    public string getWebData(string _qry)
    {
        gwData mDb = new gwData();
        string sData = mDb.getDbData(_qry);
        mDb.closeDb();
        return sData;

        //public Boolean getDbData(string _qry, out ArrayList _data)
    }

    [WebMethod]
    public Boolean getWebList(string _qry, out string[][] _data)
    {
        string[][] sData;
        ArrayList sList;
        gwData mDb = new gwData();
        if (mDb.getDbData(_qry, out sList))
        {
            sData = new string[sList.Count][];
            int i = 0;
            foreach (string[] item in sList)
            {
                sData[i++] = item;
            }
        }
        else { sData = new string[1][]; sData[0] = new string[1]; sData[0][0] = ""; }
        mDb.closeDb();
        _data = sData;
        return true;
    }


    [WebMethod]
    public Boolean exeDML(string _qry, int _TimeOut = 30)
    {
        gwData mDb = new gwData();
        Boolean sData = mDb.exeDML(_qry, _TimeOut);
        mDb.closeDb();
        return sData;
    }

    private class gwData
    {
        #region "Using Database"
        private string mDatabase = @"Data Source=10.10.10.21;Initial Catalog=PLM_NEW;Persist Security Info=True;User ID=plmuser;Password=plmuser";
        public SqlConnection mDbConn;
        public SqlCommand mDbCmd;
        private SqlDataReader mDataReader;
        private string mQry = "";

        public gwData()
        {
            mDbConn = getDbConnetion(mDatabase);
            mDbCmd = new SqlCommand();
            mDbCmd.Connection = mDbConn;
        }

        public void closeDb()
        {
            mDbConn.Close();
        }

        public Boolean createQueryById(string _id)
        {
            if (_id == "File")
            {
                mQry = "Insert Into swApiFiles (dept_area, prod_id, file_name, file_id, file_ext, file_path)"
                 + " Values(@dept_area, @prod_id, @file_name, @file_id, @file_ext, @file_path)";
                mDbCmd.Parameters.Clear();
                addParam("@dept_area", "", SqlDbType.VarChar);
                addParam("@prod_id", "", SqlDbType.VarChar);
                addParam("@file_name", "", SqlDbType.VarChar);
                addParam("@file_id", "", SqlDbType.VarChar);
                addParam("@file_ext", "", SqlDbType.VarChar);
                addParam("@file_path", "", SqlDbType.VarChar);
            }
            else return false;

            mDbCmd.CommandText = mQry;
            return true;
        }

        private SqlConnection getDbConnetion(string _Db)
        {
            string sDbConn = _Db;
            try
            {
                mDbConn = new SqlConnection(sDbConn);
                mDbConn.Open();
            }
            catch (Exception ex)
            {
                //MessageBox.Show("Database 연결 중에 오류가 발생하였습니다.\n- " + ex.Message);
            }

            return mDbConn;
        }

        // Query를 실행한 결과집합의 1행 1열 값을 String 으로 반환
        public string getDbData(string _qry)
        {
            if (mDbConn.State == ConnectionState.Closed)
            {
                mDbConn = getDbConnetion(mDatabase);
                mDbCmd = new SqlCommand();
                mDbCmd.Connection = mDbConn;
            }
            string rtnData = "";
            mDbCmd.CommandText = _qry;
            mDataReader = mDbCmd.ExecuteReader();
            while (mDataReader.Read())
            {
                rtnData = (mDataReader[0] == null) ? "" : mDataReader[0].ToString();
            }
            mDataReader.Close();

            return rtnData;
        }

        // Query를 실행한 결과집합을 String Array로 구성된 ArrayList로 반환
        public Boolean getDbData(string _qry, out ArrayList _data)
        {
            _data = new ArrayList();
            if (mDbConn.State == ConnectionState.Closed)
            {
                mDbConn = getDbConnetion(mDatabase);
                mDbCmd = new SqlCommand();
                mDbCmd.Connection = mDbConn;
            }

            try
            {
                mDbCmd.CommandText = _qry;
                mDataReader = mDbCmd.ExecuteReader();

                while (mDataReader.Read())
                {
                    string[] sRowData = new string[mDataReader.FieldCount];
                    for (int i = 0; i < mDataReader.FieldCount; i++)
                        sRowData[i] = (mDataReader[0] == null) ? "" : mDataReader[i].ToString();
                    _data.Add(sRowData);
                }
            }
            catch (Exception ex)
            {
                //MessageBox.Show("쿼리 실행 중에 오류가 발생하였습니다.\n- " + ex.Message);
                return false;
            }
            finally { mDataReader.Close(); }

            return true;
        }

        // DML Query 실행
        public Boolean exeDML(string _qry, int _TimeOut = 30)
        {
            if (mDbConn.State == ConnectionState.Closed)
            {
                mDbConn = getDbConnetion(mDatabase);
                mDbCmd = new SqlCommand();
                mDbCmd.Connection = mDbConn;
            }
            try
            {
                mDbCmd.CommandTimeout = _TimeOut;
                mDbCmd.CommandText = _qry;
                int nCnt = mDbCmd.ExecuteNonQuery();
                //mDbCmd.Transaction.Commit();
            }
            catch (Exception ex)
            {
                //MessageBox.Show("쿼리 실행 중에 오류가 발생하였습니다.\n- " + "Query : " + _qry + "\n" + ex.Message);
                return false;
            }

            return true;
        }

        // Stored Procedure Query 실행
        public Boolean exeProc(string _qry, int _TimeOut = 30)
        {
            // Sample
            // strin sQry = "PROC_NM";
            //mDb.addParam("NO_TYPE", "HYPE", System.Data.SqlClient.SqlDbType.VarChar);
            //mDb.addParam("RTN_CD", "", System.Data.SqlClient.SqlDbType.VarChar, true, 20);
            //bool bRtn = mDb.exeProc(sQry);
            try
            {
                mDbCmd.CommandTimeout = _TimeOut;
                mDbCmd.CommandText = _qry;
                mDbCmd.CommandType = CommandType.StoredProcedure;
                int nCnt = mDbCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                //MessageBox.Show("쿼리 실행 중에 오류가 발생하였습니다.\n- " + "Query : " + _qry + "\n" + ex.Message);
                return false;
            }

            return true;
        }

        // Set Query Parameter Type & Values
        public void addParam(string _ColName, object _Value, SqlDbType _ColType = SqlDbType.VarChar, bool _IsOutput = false, int _Size = 100)
        {
            SqlParameter par = new SqlParameter(_ColName, _ColType);

            if (_IsOutput)
            {
                par.Direction = ParameterDirection.Output;
                par.Size = _Size;
            }
            else par.Value = _Value;

            mDbCmd.Parameters.Add(par);
        }

        public object getParamValue(string _ColName)
        {
            return mDbCmd.Parameters[_ColName].Value;
        }

        public void setParmType(string[] _ColNm, SqlDbType[] _ColType)
        {
            //dbCmd.Parameters.Add("@tname", SqlDbType.VarChar);
            //dbCmd.Parameters.Add("@addseq", SqlDbType.BigInt);
            //dbCmd.Parameters["@tname"].Value = "OTLKIN";
            //dbCmd.Parameters["@addseq"].Value = 2;
            //string[] ParamCols = {"@tname","@addseq"};
            //SqlDbType[] ParamTypes = {SqlDbType.VarChar, SqlDbType.BigInt};
            //object[] ParamValues = {"OTLKIN", 2};
            //db.setParmType(ParamCols, ParamTypes);
            for (int i = 0; i < _ColNm.Length; i++)
                mDbCmd.Parameters.Add(_ColNm[i], _ColType[i]);
        }

        public void setParmValue(object[] _Value)
        {
            for (int i = 0; i < _Value.Length; i++)
                if (_Value[i] != null)
                {

                    if (mDbCmd.Parameters[i].DbType == DbType.Int16)
                        mDbCmd.Parameters[i].Value = Convert.ToInt16(_Value[i]);
                    else
                        mDbCmd.Parameters[i].Value = _Value[i];
                }
        }

        public void clearParm() { mDbCmd.Parameters.Clear(); }

        // XML 결과 얻기 : MSSQL DB에서만 사용 가능
        public Boolean getXML(string _qty)
                {
                    string sDbConn = "";
                    SqlConnection cn = new SqlConnection(sDbConn);
                    cn.Open();
                    string qry = "select * from Tabel FOR XML AUTO, ELEMENTS";
                    SqlCommand cmd = new SqlCommand(qry, cn);
                    XmlReader xr = null;
                    try
                    {
                        xr = cmd.ExecuteXmlReader();
                        StringBuilder sb = new StringBuilder("", 256);
                        while (xr.Read())
                        {
                            switch (xr.NodeType)
                            {
                                case XmlNodeType.Attribute: break;
                                case XmlNodeType.CDATA: break;
                                case XmlNodeType.Comment: break;
                                case XmlNodeType.Document: break;
                                case XmlNodeType.DocumentFragment: break;
                                case XmlNodeType.DocumentType: break;
                                case XmlNodeType.Element: sb.AppendFormat("<{0}>", xr.Name);  break;
                                case XmlNodeType.EndElement: sb.AppendFormat("</{0}>", xr.Name); break;
                                case XmlNodeType.EndEntity: break;
                                case XmlNodeType.Entity: break;
                                case XmlNodeType.EntityReference: break;
                                case XmlNodeType.None: break;
                                case XmlNodeType.Notation: break;
                                case XmlNodeType.ProcessingInstruction: break;
                                case XmlNodeType.SignificantWhitespace: break;
                                case XmlNodeType.Text: sb.AppendFormat(xr.Value.Trim()); break;
                                case XmlNodeType.Whitespace: break;
                                case XmlNodeType.XmlDeclaration: break;
                                default: break;
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        //MessageBox.Show("쿼리 실행 중에 오류가 발생하였습니다.\n- " + ex.Message);
                        return false;
                    }
                    finally
                    {
                        xr.Close();
                        cn.Close();
                    }
                    return true;
                }
                
        #endregion

    }

    public IEnumerable<Dictionary<string, object>> sr(SqlDataReader dr)
    {
        var results = new List<Dictionary<string, object>>();
        var cols = new List<string>();

        for (var i = 0; i < dr.FieldCount; i++)
            cols.Add(dr.GetName(i));
        while (dr.Read())
            results.Add(serRow(cols, dr));

        return results;
    }

    private Dictionary<string, object> serRow(IEnumerable<string> cols, SqlDataReader dr)
    {
        var result = new Dictionary<string, object>();
        foreach (var col in cols)
            result.Add(col, dr[col]);
        return result;
    }

    [WebMethod]
    public string readData()
    {
        String sql = "select * from dbo.fn_getTotalPMView('123')";
        //String sql = "SELECT * FROM EQ_LOCATION_TEST WHERE LCT_KEY ='" + lct + "'";
        string json = "";

        SqlConnection objcon = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PLMDB"].ConnectionString);
        try
        {
            objcon.Open();
        }
        catch (Exception e)
        {
            string err = e.Message;
        }



        SqlCommand cmd = new SqlCommand();
        cmd.Connection = objcon;
        cmd.CommandText = sql;
        cmd.CommandType = CommandType.Text;
        SqlDataReader dr = cmd.ExecuteReader();



        if (dr.HasRows)
        {
            var r = sr(dr);
            json = JsonConvert.SerializeObject(r, Newtonsoft.Json.Formatting.Indented);
        }

        dr.Close();
        objcon.Close();

        return json;
    }
}