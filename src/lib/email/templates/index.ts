interface ReminderEmailParams {
  schoolName: string;
  deadline: string;
  daysRemaining: number;
  schoolUrl: string;
}

export function buildReminderEmailHtml({ schoolName, deadline, daysRemaining, schoolUrl }: ReminderEmailParams): string {
  const urgencyColor = daysRemaining <= 3 ? '#b91c1c' : daysRemaining <= 7 ? '#c2410c' : '#15803d';
  const urgencyText = daysRemaining <= 1
    ? '明天截止！請立即行動'
    : daysRemaining <= 3
      ? '即將截止，請盡快處理'
      : daysRemaining <= 7
        ? '截止日期臨近'
        : '申請截止提醒';

  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      ${urgencyText}
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您收藏嘅學校即將到達申請截止日期
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">學校名稱</p>
      <p style="font-size: 17px; font-weight: 600; color: #020617; margin: 0 0 16px;">${schoolName}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">截止日期</p>
      <p style="font-size: 15px; color: #020617; margin: 0;">
        ${deadline}
        <span style="color: ${urgencyColor}; font-weight: 600;">
          （還有 ${daysRemaining} 天）
        </span>
      </p>
    </div>
    <a href="${schoolUrl}" style="display: block; text-align: center; background: #020617; color: white; padding: 12px 24px; border-radius: 14px; text-decoration: none; font-size: 14px; font-weight: 500;">
      查看學校詳情
    </a>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此郵件由 HKSchoolPlace 自動發送，您可以喺賬號頁面管理提醒設定。
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
      多謝您嘅投稿！
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您提交嘅面試情報已收到，我哋會盡快審核。
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">學校</p>
      <p style="font-size: 15px; font-weight: 600; color: #020617; margin: 0 0 12px;">${schoolName}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">學年</p>
      <p style="font-size: 15px; color: #020617; margin: 0;">${academicYear}</p>
    </div>
    <p style="font-size: 13px; color: #64748b; margin: 0;">
      審核通過後，您嘅情報將展示喺學校詳情頁面，幫助更多家長了解面試情況。
    </p>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此郵件由 HKSchoolPlace 自動發送。
    </p>
  </div>
</body>
</html>`;
}

interface WelcomeEmailParams {
  displayName: string;
}

export function buildWelcomeEmailHtml({ displayName }: WelcomeEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      歡迎加入 HKSchoolPlace！
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      你好，${displayName}！感謝您註冊 HKSchoolPlace，我哋幫您輕鬆搵到最啱嘅幼稚園。
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 14px; font-weight: 600; color: #020617; margin: 0 0 12px;">快速開始：</p>
      <ul style="font-size: 14px; color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
        <li>瀏覽全港幼稚園，查看即時學額狀態</li>
        <li>收藏心儀學校（最多 10 間），隨時追蹤</li>
        <li>開啟截止提醒，唔怕錯過申請期限</li>
        <li>對比最多 3 間學校，一目了然</li>
      </ul>
    </div>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://hkschoolplace.com'}/kg" style="display: block; text-align: center; background: #020617; color: white; padding: 12px 24px; border-radius: 14px; text-decoration: none; font-size: 14px; font-weight: 500;">
      開始搵學校
    </a>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此郵件由 HKSchoolPlace 自動發送。如有疑問，歡迎聯絡我哋。
    </p>
  </div>
</body>
</html>`;
}
