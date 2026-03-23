interface ReminderEmailParams {
  schoolName: string;
  deadline: string;
  daysRemaining: number;
  schoolUrl: string;
}

export function buildReminderEmailHtml({ schoolName, deadline, daysRemaining, schoolUrl }: ReminderEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      申请截止提醒
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您收藏的学校即将到达申请截止日期
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">学校名称</p>
      <p style="font-size: 17px; font-weight: 600; color: #020617; margin: 0 0 16px;">${schoolName}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">截止日期</p>
      <p style="font-size: 15px; color: #020617; margin: 0;">
        ${deadline}
        <span style="color: ${daysRemaining <= 3 ? '#b91c1c' : daysRemaining <= 7 ? '#c2410c' : '#15803d'}; font-weight: 600;">
          （还有 ${daysRemaining} 天）
        </span>
      </p>
    </div>
    <a href="${schoolUrl}" style="display: block; text-align: center; background: #020617; color: white; padding: 12px 24px; border-radius: 14px; text-decoration: none; font-size: 14px; font-weight: 500;">
      查看学校详情
    </a>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此邮件由 HKSchoolPlace 自动发送，您可以在账号页面管理提醒设置。
    </p>
  </div>
</body>
</html>`;
}

interface SubmissionConfirmEmailParams {
  schoolName: string;
  academicYear: string;
}

export function buildSubmissionConfirmHtml({ schoolName, academicYear }: SubmissionConfirmEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      感谢您的投稿！
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您提交的面试情报已收到，我们会尽快审核。
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">学校</p>
      <p style="font-size: 15px; font-weight: 600; color: #020617; margin: 0 0 12px;">${schoolName}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">学年</p>
      <p style="font-size: 15px; color: #020617; margin: 0;">${academicYear}</p>
    </div>
    <p style="font-size: 13px; color: #64748b; margin: 0;">
      审核通过后，您的情报将展示在学校详情页面，帮助更多家长了解面试情况。
    </p>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此邮件由 HKSchoolPlace 自动发送。
    </p>
  </div>
</body>
</html>`;
}
