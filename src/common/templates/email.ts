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
								<p>Best regards,<br>Krishna Wardrobe Team</p>
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

  const emailHtml = ` `;

  return {
    subject: emailSubject,
    html: emailHtml,
  };
};
