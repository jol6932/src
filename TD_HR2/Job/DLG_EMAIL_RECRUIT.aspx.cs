﻿using System;

public partial class Job_DLG_EMAIL_RECRUIT : System.Web.UI.Page
{
    public string _email_params = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            _email_params = Request.Form["_args"].ToString();
            _args.Text = Request.Form["_args"].ToString();
        }
        catch (Exception ex)
        {
        }
    }

    public override void VerifyRenderingInServerForm(System.Web.UI.Control control)
    {
        // Confirms that an HtmlForm control is rendered for the specified ASP.NET server control at run time.
    }
}
