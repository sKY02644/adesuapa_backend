import nodemailer from "nodemailer";

export default class NodeMailer {
  private transporter: nodemailer.Transporter;

  constructor(options: any) {
    this.transporter = nodemailer.createTransport(options);
  }

  public sendEmail(mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  public async processInitMail(welcomeData:any, confirmationData?:any) {

        const promises: Promise<any>[] = []

        const welcomeMail = this.welcomeMail(welcomeData)
        const welcomeMailOptions = { from: 'info@adesuapa.com', to: welcomeData.email, subject: 'Welcome Email', html: welcomeMail }
        const welcomeInfoPromise = this.sendEmail(welcomeMailOptions).catch(error => {
            return { type: "confirmation", status: "rejected", error};
        })
        
        promises.push(welcomeInfoPromise)

        if(confirmationData){
            const htmlData = this.confirmationMail(confirmationData.institution_name, '1', confirmationData)
            const confirmationMailOptions = { from: 'info@adesuapa.com', to: welcomeData.email, subject: 'Confirmation Email', html: htmlData }
            const confirmationInfoPromise = this.sendEmail(confirmationMailOptions).catch(error => {
                return { type: "welcome", status: "rejected", error: error.message};
            });
            promises.push(confirmationInfoPromise)
        }

        const response: any = await Promise.allSettled(promises)

        return { response: [response[0]['value'], response[1]['value']], status: true }

  }

  private welcomeMail(data: {
    thank_you_message: string;
    welcome_message: string;
    contact: string;
    user_name: string;
    lower_message: string;
  }) {
    return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
    <!--<![endif]-->
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
        }

        table,
        td,
        tr {
            vertical-align: top;
            border-collapse: collapse;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>
    <style type="text/css" id="media-query">
        @media (max-width: 620px) {

            .block-grid,
            .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .block-grid {
                width: 100% !important;
            }

            .col {
                width: 100% !important;
            }

            .col>div {
                margin: 0 auto;
            }

            img.fullwidth,
            img.fullwidthOnMobile {
                max-width: 100% !important;
            }

            .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
            }

            .no-stack.two-up .col {
                width: 50% !important;
            }

            .no-stack .col.num4 {
                width: 33% !important;
            }

            .no-stack .col.num8 {
                width: 66% !important;
            }

            .no-stack .col.num4 {
                width: 33% !important;
            }

            .no-stack .col.num3 {
                width: 25% !important;
            }

            .no-stack .col.num6 {
                width: 50% !important;
            }

            .no-stack .col.num9 {
                width: 75% !important;
            }

            .video-block {
                max-width: none !important;
            }

            .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide {
                display: block !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #B8CCE2;">
    <!--[if IE]><div class="ie-browser"><![endif]-->
    <table class="nl-container"
        style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #B8CCE2; width: 100%;"
        cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#B8CCE2" valign="top">
        <tbody>
            <tr style="vertical-align: top;" valign="top">
                <td style="word-break: break-word; vertical-align: top;" valign="top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#B8CCE2"><![endif]-->
                    <div style="background-color:transparent;">
                        <div class="block-grid "
                            style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                            <!--<![endif]-->
                                            <div class="mobile_hide">
                                                <table class="divider" border="0" cellpadding="0" cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                    role="presentation" valign="top">
                                                    <tbody>
                                                        <tr style="vertical-align: top;" valign="top">
                                                            <td class="divider_inner"
                                                                style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                                valign="top">
                                                                <table class="divider_content" border="0"
                                                                    cellpadding="0" cellspacing="0" width="100%"
                                                                    style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 40px; width: 100%;"
                                                                    align="center" role="presentation" height="40"
                                                                    valign="top">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top;" valign="top">
                                                                            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                                height="40" valign="top"><span></span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:transparent;">
                        <div class="block-grid "
                            style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 35px; padding-left: 35px; padding-top:35px; padding-bottom:40px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:40px; padding-right: 35px; padding-left: 35px;">
                                            <!--<![endif]-->
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#132F40;font-family:&#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div
                                                    style="font-size: 12px; line-height: 1.2; color: #132F40; font-family: &#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="font-size: 30px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 36px; margin: 0;">
                                                        <span
                                                            style="font-size: 30px;"><strong>${data.welcome_message}</strong></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#132F40;font-family:&#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div
                                                    style="font-size: 12px; line-height: 1.2; color: #132F40; font-family: &#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="font-size: 22px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 26px; margin: 0;">
                                                        <span style="font-size: 22px;">Hello
                                                            <strong>${data.user_name}</strong>, your registration has been completed. </span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#555555;font-family:&#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;line-height:1.5;padding-top:5px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
                                                <div
                                                    style="font-size: 12px; line-height: 1.5; color: #555555; font-family: &#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif; mso-line-height-alt: 18px;">
                                                    <p
                                                        style="font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;">
                                                        ${data.thank_you_message}</p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div class="img-container center fixedwidth" align="center"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                                    class="center fixedwidth" align="center" border="0"
                                                    src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/271/illo.png"
                                                    alt="Image" title="Image"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 530px; display: block;"
                                                    width="530">
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#555555;font-family:&#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div
                                                    style="font-size: 12px; line-height: 1.2; color: #555555; font-family: &#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="font-size: 16px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 19px; margin: 0;">
                                                        <span
                                                            style="font-size: 16px;">${data.lower_message}&nbsp;</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:transparent;">
                        <div class="block-grid two-up no-stack"
                            style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #132f40;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#132f40;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#132f40"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color:#132f40;width:300px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:15px; padding-bottom:15px;"><![endif]-->
                                <div class="col num6"
                                    style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top; width: 300px;">
                                    <div style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 25px;">
                                            <!--<![endif]-->
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#F8F8F8;font-family:&#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div
                                                    style="font-size: 12px; line-height: 1.2; color: #F8F8F8; font-family: &#39;Cabin&#39;, Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: left; mso-line-height-alt: 17px; margin: 0;">
                                                      ${data.contact}  
                                                    </p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td><td align="center" width="300" style="background-color:#132f40;width:300px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->

                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if (IE)]></div><![endif]-->
</body>

</html>
    `;
  }

  private confirmationMail(
    school_name: string,
    type: string = "",
    data: {
      message: string;
      user_uid: string;
      default_password: string;
      confirmation_url: string;
      user_name: string;
    }
  ) {
    let tr = "";

    switch (type) {
      case "1":
        tr = `<tr>
                    <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Hello ${data.user_name}, welcome onboard ADESUAPA</h3>
                            <h3 style="text-align: left; font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Your password: <b>${data["default_password"]}</b></h3>
                            <h3 style="text-align: left; font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: -35px; font-weight: 400;">Your ID: <b>${data["user_uid"]}</b></h3>
                            <h4 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Click here to login to your account</h4>
                            <p><a href="${data["confirmation_url"]}" alt="Click here to login to your account" class="btn btn-primary" style="padding: 10px 15px; display: inline-block; border-radius: 5px; background: #1976D2; color: #ffffff;">Login</a></p>
                        </div>
                    </td>
                </tr>`;
        break;
      case "2":
        tr = `<tr>
                    <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">${data["message"]}</h3>
                        </div>
                    </td>
                </tr>`;
        break;
      case "3":
        tr = `<tr>
                     <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">${data["message"]}</h3>
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">${data["confirmation_url"]}</h3>
                        </div>
                    </td>
                </tr>`;
        break;
      default:
        break;
    }

    // $$tr$$ $$school_name$$
    return `<!DOCTYPE html 
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn&#39t be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
            <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
            <title>ADESUAPA</title> <!-- The title tag shows in email notifications, like Android 4.4. -->

            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

            <!-- CSS Reset : BEGIN -->
            <style type="text/css">
                /* What it does: Remove spaces around the email design added by some email clients. */
                /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                html,
                body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                    background: #f1f1f1;
                }

                /* What it does: Stops email clients resizing small text. */
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }

                /* What it does: Centers email on Android 4.4 */
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }

                /* What it does: Stops Outlook from adding extra spacing to tables. */
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }

                /* What it does: Fixes webkit padding issue. */
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }

                /* What it does: Uses a better rendering method when resizing images in IE. */
                img {
                    -ms-interpolation-mode: bicubic;
                }

                /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
                a {
                    text-decoration: none;
                }

                /* What it does: A work-around for email clients meddling in triggered links. */
                *[x-apple-data-detectors],
                /* iOS */
                .unstyle-auto-detected-links *,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }

                /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
                .a6S {
                    display: none !important;
                    opacity: 0.01 !important;
                }

                /* What it does: Prevents Gmail from changing the text color in conversation threads. */
                .im {
                    color: inherit !important;
                }

                /* If the above doesn&#39t work, add a .g-img class to any image in question. */
                img.g-img+div {
                    display: none !important;
                }

                /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
                /* Create one of these media queries for each additional viewport size you&#39d like to fix */

                /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                    u~div .email-container {
                        min-width: 320px !important;
                    }
                }

                /* iPhone 6, 6S, 7, 8, and X */
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                    u~div .email-container {
                        min-width: 375px !important;
                    }
                }

                /* iPhone 6+, 7+, and 8+ */
                @media only screen and (min-device-width: 414px) {
                    u~div .email-container {
                        min-width: 414px !important;
                    }
                }
            </style>

            <!-- CSS Reset : END -->

            <!-- Progressive Enhancements : BEGIN -->
            <style>
                .primary {
                    background: #30e3ca;
                }

                .bg_white {
                    background: #ffffff;
                }

                .bg_light {
                    background: #fafafa;
                }

                .bg_black {
                    background: #000000;
                }

                .bg_dark {
                    background: rgba(0, 0, 0, .8);
                }

                .email-section {
                    padding: 2.5em;
                }

                /*BUTTON*/
                .btn {
                    padding: 10px 15px;
                    display: inline-block;
                }

                .btn.btn-primary {
                    border-radius: 5px;
                    background: #30e3ca;
                    color: #ffffff;
                }

                .btn.btn-white {
                    border-radius: 5px;
                    background: #ffffff;
                    color: #000000;
                }

                .btn.btn-white-outline {
                    border-radius: 5px;
                    background: transparent;
                    border: 1px solid #fff;
                    color: #fff;
                }

                .btn.btn-black-outline {
                    border-radius: 0px;
                    background: transparent;
                    border: 2px solid #000;
                    color: #000;
                    font-weight: 700;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: &#39Lato&#39, sans-serif;
                    color: #000000;
                    margin-top: 0;
                    font-weight: 400;
                }

                body {
                    font-family: &#39Lato&#39, sans-serif;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 1.8;
                    color: rgba(0, 0, 0, .4);
                }

                a {
                    color: #30e3ca;
                }

                /* table{
                } */

                /*LOGO*/

                .logo h1 {
                    margin: 0;
                }

                .logo h1 a {
                    color: #30e3ca;
                    font-size: 24px;
                    font-weight: 700;
                    font-family: &#39Lato&#39, sans-serif;
                }

                /*HERO*/
                .hero {
                    position: relative;
                    z-index: 0;
                }

                .hero .text {
                    color: rgba(0, 0, 0, .3);
                }

                .hero .text h2 {
                    color: #000;
                    font-size: 40px;
                    margin-bottom: 0;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .hero .text h3 {
                    font-size: 24px;
                    font-weight: 300;
                }

                .hero .text h2 span {
                    font-weight: 600;
                    color: #30e3ca;
                }


                /*HEADING SECTION*/

                /* .heading-section{
            } */

                .heading-section h2 {
                    color: #000000;
                    font-size: 28px;
                    margin-top: 0;
                    line-height: 1.4;
                    font-weight: 400;
                }

                .heading-section .subheading {
                    margin-bottom: 20px !important;
                    display: inline-block;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(0, 0, 0, .4);
                    position: relative;
                }

                .heading-section .subheading::after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -10px;
                    content: &#39&#39;
                    width: 100%;
                    height: 2px;
                    background: #30e3ca;
                    margin: 0 auto;
                }

                .heading-section-white {
                    color: rgba(255, 255, 255, .8);
                }

                .heading-section-white h2 {
                    font-family: &#39&#39;
                    line-height: 1;
                    padding-bottom: 0;
                }

                .heading-section-white h2 {
                    color: #ffffff;
                }

                .heading-section-white .subheading {
                    margin-bottom: 0;
                    display: inline-block;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, .4);
                }


                ul.social {
                    padding: 0;
                }

                ul.social li {
                    display: inline-block;
                    margin-right: 10px;
                }

                /*FOOTER*/

                .footer {
                    border-top: 1px solid rgba(0, 0, 0, .05);
                    color: rgba(0, 0, 0, .5);
                }

                .footer .heading {
                    color: #000;
                    font-size: 20px;
                }

                .footer ul {
                    margin: 0;
                    padding: 0;
                }

                .footer ul li {
                    list-style: none;
                    margin-bottom: 10px;
                }

                .footer ul li a {
                    color: rgba(0, 0, 0, 1);
                }
            </style>
        </head>

        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
            <div
                style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                <!-- BEGIN BODY -->
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                    style="margin: auto;">
                    <tr>
                        <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="logo" style="text-align: center;">
                                        <h1><a href="" style="color: #1976D2;">${school_name}</a></h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr><!-- end tr -->
                    <tr>
                        <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
                            <img src="https://res.cloudinary.com/dtampspjc/image/upload/v1673388672/ADESUAPA/main/email_hipc5a.png" alt="" style="width: 150px; max-width: 600px; height: auto; margin: auto; display: block;">
                        </td>
                    </tr><!-- end tr -->
                    <tr>
                        <td valign="middle" class="hero bg_white" style="padding: 3em 0 4em 0;">
                            <table>
                                ${tr}
                            </table>
                        </td>
                    </tr><!-- end tr -->
                    <!-- 1 Column Text + Button : END -->
                </table>

            </div>
            <div style="background-color:transparent;">
                <div class="block-grid"
                    style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                        <div class="col num12"
                            style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                            <div class="col_cont" style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                    style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                    <div
                                        style="color:#8a8a8a;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                        <div
                                            style="line-height: 1.5; font-size: 12px; color: #8a8a8a; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
                                            <p style="font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;">
                                                ADESUAPA <br />
                                                VB IT CONSULT LTD<br />
                                                103 Afunyan Street Greater Accra, Accra, 00233<br />
                                                Tel: +233 54-273-8071
                                            </p>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>
        </body>
    </html>`;
  }
}
