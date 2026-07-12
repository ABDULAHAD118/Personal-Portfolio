interface ContactData {
    name: string;
    email: string;
    service: string;
    message: string;
}

const SOCIALS = {
    github: process.env.GITHUB_URL || 'https://github.com/ABDULAHAD118',
    linkedin:
        process.env.LINKEDIN_URL ||
        'https://www.linkedin.com/in/abdulahad018/',
    instagram:
        process.env.INSTAGRAM_URL ||
        'https://www.instagram.com/abdulahadhussain8/',
};

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abdulahadhussain.tech';

const BORDER = 'border-collapse:collapse;';
const FONT = "font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;";

const FOOTER = `
<tr>
  <td style="padding:0 40px;">
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
  </td>
</tr>
<tr>
  <td style="padding:24px 40px 8px;text-align:center;">
    <p style="margin:0 0 14px;color:#9ca3af;font-size:13px;${FONT}">Connect with me</p>
    <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="${BORDER}">
      <tr>
        <td style="margin:0;padding:0 4px;">
          <a href="${SOCIALS.github}" target="_blank" style="text-decoration:none;">
            <img src="${SITE_URL}/social/github.png" alt="GitHub" width="28" height="28" style="display:block;border:0;outline:none;text-decoration:none;" />
          </a>
        </td>
        <td style="margin:0;padding:0 4px;">
          <a href="${SOCIALS.linkedin}" target="_blank" style="text-decoration:none;">
            <img src="${SITE_URL}/social/linkedin.png" alt="LinkedIn" width="28" height="28" style="display:block;border:0;outline:none;text-decoration:none;" />
          </a>
        </td>
        <td style="margin:0;padding:0 4px;">
          <a href="${SOCIALS.instagram}" target="_blank" style="text-decoration:none;">
            <img src="${SITE_URL}/social/instagram.png" alt="Instagram" width="28" height="28" style="display:block;border:0;outline:none;text-decoration:none;" />
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td style="padding:16px 40px 32px;text-align:center;">
    <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.6;${FONT}">
      Abdulahad Hussain &middot; Full-Stack Web Developer<br />
      <a href="${SITE_URL}" target="_blank" style="color:#7c3aed;text-decoration:none;">${SITE_URL}</a>
    </p>
  </td>
</tr>`;

export function buildOwnerEmail(data: ContactData): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f5;${FONT}-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;${BORDER}background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#7c3aed;padding:40px 40px 36px;text-align:center;">
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;${FONT}">Portfolio Contact Form</p>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;${FONT}letter-spacing:-0.3px;">New Message Received</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:14px;${FONT}">Someone reached out through your portfolio</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}">
                <tr>
                  <td style="padding:0 0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 2px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;${FONT}">From</p>
                          <p style="margin:0;color:#111827;font-size:16px;font-weight:700;${FONT}">${data.name}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 2px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;${FONT}">Email</p>
                          <a href="mailto:${data.email}" style="margin:0;color:#7c3aed;font-size:14px;font-weight:600;text-decoration:none;${FONT}">${data.email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 6px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;${FONT}">Service Interested In</p>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="${BORDER}">
                            <tr>
                              <td style="padding:5px 14px;background-color:#f3e8ff;border-radius:6px;${FONT}">
                                <span style="color:#7c3aed;font-size:12px;font-weight:700;">${data.service}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
                      <tr>
                        <td style="padding:18px;">
                          <p style="margin:0 0 6px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;${FONT}">Message</p>
                          <p style="margin:0;color:#111827;font-size:14px;line-height:1.75;white-space:pre-wrap;${FONT}">${data.message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td>${FOOTER}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyEmail(data: ContactData): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for reaching out!</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f5;${FONT}-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;${BORDER}background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#7c3aed;padding:40px 40px 36px;text-align:center;">
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;${FONT}">Abdulahad Hussain</p>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;${FONT}letter-spacing:-0.3px;">Thank You, ${data.name}!</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:14px;${FONT}">I&rsquo;ve received your message</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${BORDER}">
                <tr>
                  <td style="padding:0 0 20px;${FONT}">
                    <p style="margin:0;color:#111827;font-size:15px;line-height:1.7;">
                      Hi <strong>${data.name}</strong>,
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;${FONT}">
                    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">
                      Thank you for reaching out! I have received your message regarding <strong style="color:#7c3aed;">${data.service}</strong> and will get back to you as soon as possible.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 28px;${FONT}">
                    <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">
                      Best regards,<br />
                      <strong style="color:#111827;">Abdulahad Hussain</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td>${FOOTER}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
