export const emailTemplate = async (
  userData: any,
  content: string,
  subject: string,
) => {
  const html = `
		<!DOCTYPE html>
		<html>
		<head>
				<meta charset="UTF-8">
				<title>Email Template</title>
				<style>
						body {
								font-family: Arial, sans-serif;
								line-height: 1.6;
								color: #333333;
								background-color: #f4f4f4;
								padding: 20px;
						}
						.container {
								background-color: #ffffff;
								padding: 20px;
								border-radius: 8px;
								box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
								max-width: 600px;
								margin: auto;
						}
						.header {
								text-align: center;
								padding-bottom: 20px;
						}
						.header h1 {
								margin: 0;
								color: #0073e6;
						}
						.content {
								padding: 20px 0;
						}
						.footer {
								text-align: center;
								padding-top: 20px;
								color: #777777;
								font-size: 0.9em;
						}
				</style>
		</head>
		<body>
				<div class="container">
						<div class="header">
								<h1>${subject}</h1>
						</div>
						<div class="content">
								<p>Dear ${userData.name},</p>
								<p>I hope this email finds you well.</p>
								<p>${content}</p>
								<p>Thank you for your time and consideration. I look forward to your response.</p>
						</div>
						<div class="footer">
								<p>Best regards,<br>Nirlat Team</p>
								<p>Jr.Software Developer<br>+91 9307871334</p>
						</div>
				</div>
		</body>
		</html>
	`;
  return {
    subject,
    html,
  };
};

export const forgetPasswordContent = (
  userData: any,
  verificationLink: string,
  expiresIn: Date,
) => {
  const emailSubject = 'Email Verification';

  const emailHtml = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nirlat</title>
  </head>
  <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #BBC1C4;">
    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #BBC1C4;">
        <tr>
          <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">
          <tr>
            <td valign="top" id="templateHeader" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #F1F4F5;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <tbody class="mcnImageBlockOuter">
                  <tr>
                    <td valign="top" style="padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <tbody>
                          <tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 0;padding-left: 0;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <img align="center" alt="" src="https://nirlat-assets.s3.il-central-1.amazonaws.com/assets/public/logo/logo.png" width="150px" style="max-width: 300px;padding-bottom: 0px;vertical-align: bottom;display: inline !important;border-radius: 20%;width: 100%;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
                </td>
              </tr>
              <tr>
                <td valign="top" id="templateBody" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 2px solid #EAEAEA;padding-top: 20px;padding-bottom: 20px;padding: 20px;background: #F1F4F5;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;background-color: #fff;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding: 20px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <!--[if mso]>
                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                  <tr>
                  <![endif]-->
                          <!--[if mso]>
                  <td valign="top" width="600" style="width:600px;">
                  <![endif]-->
                          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnButtonContentContainer">
                            <tbody>
                              <tr> 
                                <td valign="top" class="mcnButtonContent" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  <h3 style="text-align: center;font-family: open sans,helvetica neue,helvetica,arial,sans-serif;display: block;margin: 0;padding: 0;color: #202020;font-size: 32px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">
                                    <strong>הי
                                      ${userData.firstName} ${userData.lastName}</strong>
                                  </h3>
                                  &nbsp;
                                  <h4 style="text-align: center;font-family: open sans,helvetica neue,helvetica,arial,sans-serif;color: #1A2275;display: block;margin: 0;padding: 0;font-size: 24px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">
                                    <span style="color:#1497D4"><strong>
                                    אפס את הסיסמה שלך
                                    </strong></span>
                                  </h4>
                                  &nbsp;
                                  <p dir="rtl" style="text-align: right;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><span style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif;line-height: 30px;"><span>שלום,<br>
                                  שלחנו לך דוא"ל זה לבקשתך לאיפוס סיסמת מערכת.
                                  <br><br>
                                        <span style="color:#9D9D9D;">כדי לאפס את הסיסמה שלך, אנא לחץ על הקישור הבא
                                        </span><br>
                                      </span>
                                  </span></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 4px;background-color: #1497D4;width: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody>
                              <tr>
                                <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  <a class="mcnButton " title="Reset Password" href="${verificationLink}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Reset
                                    Password</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 4px;background-color: #fff;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody>
                              <tr>
                                <td  dir="rtl" align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding-top: 0;padding-right: 5px;padding-bottom: 9px;padding-left: 5px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  <p style="margin-bottom: 0px;text-align: right;color: #F85D5D;font-family: open sans,helvetica neue,helvetica,arial,sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 24px;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                    *הקישור הזה יפוג בעוד 10 דקות. ${expiresIn}
                                  </p>
                                  <p style="margin-top: 0px;margin-bottom: 30px;text-align: right;color: #F85D5D;font-family: open sans,helvetica neue,helvetica,arial,sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 24px;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  אנא התעלם מהמייל הזה אם לא ביקשת לשנות סיסמה
                                  </p>
                                  <p style="text-align: right;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><span style="color:#4A4A4A"><span><span style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif">תודה,
                                  <br>
                                          <span style="color:#1497D4;"><strong>Nirlat</strong></span></span></span></span></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]>
                  </td>
                  <![endif]-->
  
                          <!--[if mso]>
                  </tr>
                  </table>
                  <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
                    <tbody class="mcnDividerBlockOuter">
                      <tr>
                        <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 10px 18px 10px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody>
                              <tr>
                                <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  <span></span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--            
                  <td class="mcnDividerBlockInner" style="padding: 18px;">
                  <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
          -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;background-color: #fff;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding: 20px 20px 0px 20px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <!--[if mso]>
                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                  <tr>
                  <![endif]-->
                          <!--[if mso]>
                  <td valign="top" width="600" style="width:600px;">
                  <![endif]-->
                          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                            <tbody>
                              <tr>
                                <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 18px;line-height: 150%;text-align: left;">
                                  <h4 style="text-align: center;font-family: open sans,helvetica neue,helvetica,arial,sans-serif;color: #1A2275;display: block;margin: 0;padding: 0;font-size: 24px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;">
                                    <span style="color:#1497D4"><strong>Nirlat!</strong></span>
                                  </h4>
                                  <p style="text-align: center;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #202020;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 18px;line-height: 150%;"><span style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif"><span>
Nirlat
                                      </span>
                                  </span></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;background-color: #fff;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody class="mcnFollowBlockOuter">
                              <tr>
                                <td align="center" valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowBlockInner">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                    <tbody>
                                      <tr>
                                        <td align="center" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContent">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                    <tbody>
                                                      <tr>
                                                        <td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                            <tbody>
                                                              <tr>
                                                                <td valign="top" style="padding-right: 0px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td align="center" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                            <tbody>
                                                                              <tr>
                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                  <a href="http://www.facebook.com" style="text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" target="_blank"><img style="width: 150px;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" src="https://mcusercontent.com/e7bacf72d89f5a3b97e22e97d/images/561ce577-1d65-6aba-ab7a-f6ae51bb789c.png"></a>
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                          <!--[if mso]>
                            </td>
                            <![endif]-->
                                                          <!--[if mso]>
                            <td align="center" valign="top">
                            <![endif]-->
                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                            <tbody>
                                                              <tr>
                                                                <td valign="top" style="padding-right: 0;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td align="center" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                            <tbody>
                                                                              <tr>
                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                  <a href="http://mailchimp.com" target="_blank" style="text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img style="width: 150px;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" src="https://mcusercontent.com/e7bacf72d89f5a3b97e22e97d/images/445f6cd8-d608-812b-8ca9-c9ce863ebfa3.png"></a>
                                                                                </td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                          <!--[if mso]>
                                                        </td>
                                                      <![endif]-->
                                                          <!--[if mso]>
                                                          </tr>
                                                          </table>
                                                          <![endif]-->
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <!---Get the Clean Move!-->
              <tr>
                <td valign="top" id="templateFooter" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #F7BD00;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-bottom: 0px;">
  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;padding: 0px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding: 12px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <!--[if mso]>
                  <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                  <tr>
                  <![endif]-->
  
                          <!--[if mso]>
                  <td valign="top" width="600" style="width:600px;">
                  <![endif]-->
                          <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                            <tbody>
                              <tr>
  
                                <td valign="top" class="mcnTextContent" style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #ffffff;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 14px;line-height: 150%;text-align: center;">
  
                                  <div style="text-align: center;line-height: 25px;">
                                    <a href="#" style="color: #000000;text-decoration: none;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: normal;">מדיניות פרטיות
                                      </a> <span style="color:#000000">|</span>
                                    <a href="#" style="color: #000000;text-decoration: none;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: normal;">תנאי שימוש
                                      </a><span style="color:#000000">
                                      |</span>&nbsp; 
                                      <a href="" target="_blank" style="color: #fff;text-decoration: none;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: normal;"></a>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso]>
                  </td>
                  <![endif]-->
  
                          <!--[if mso]>
                  </tr>
                  </table>
                  <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
            <!-- // END TEMPLATE -->
          </td>
        </tr>
      </table>
    </center>
    <script type="text/javascript" src="/n1cY_i/s6Wr/9/-/k1veWlQtR903nGA/ipEJtzQfX0/ejRAYyE8BQU/eFA/eRFwgZwg"></script>
  </body>
  
  </html>
  `;

  return {
    subject: emailSubject,
    html: emailHtml,
  };
};
