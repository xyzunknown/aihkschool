// ============================================================
// Programme reminder email templates
// ============================================================

interface ProgrammeEmailParams {
  programmeName: string;
  venue: string;
  fee: number | null;
  enrolmentOpenAt: string;
  programmeUrl: string;
}

/**
 * 報名前一天提醒郵件
 */
export function buildProgrammeDayBeforeHtml({
  programmeName,
  venue,
  fee,
  enrolmentOpenAt,
  programmeUrl,
}: ProgrammeEmailParams): string {
  const feeText = fee === 0 ? "免費" : fee ? `HK$${fee}` : "費用待定";
  const openTime = enrolmentOpenAt
    ? new Date(enrolmentOpenAt).toLocaleString("zh-HK", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Hong_Kong",
      })
    : "時間待定";

  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      明天開放報名！
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您訂閱嘅 SmartPLAY 課程即將開放報名
    </p>
    <div style="background: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">課程名稱</p>
      <p style="font-size: 17px; font-weight: 600; color: #020617; margin: 0 0 16px;">${programmeName}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">場地</p>
      <p style="font-size: 15px; color: #020617; margin: 0 0 16px;">${venue}</p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">報名開放時間</p>
      <p style="font-size: 15px; color: #020617; margin: 0 0 16px;">
        ${openTime}
        <span style="color: #c2410c; font-weight: 600;">（明天）</span>
      </p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">費用</p>
      <p style="font-size: 15px; color: ${fee === 0 ? "#059669" : "#020617"}; margin: 0;">${feeText}</p>
    </div>
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px;">
      <p style="font-size: 13px; color: #92400e; margin: 0;">
        ⏰ 熱門課程開放即秒殺！建議提前設好鬧鐘，開放時間一到即刻登入 SmartPLAY 報名。
      </p>
    </div>
    <a href="${programmeUrl}" style="display: block; text-align: center; background: #020617; color: white; padding: 12px 24px; border-radius: 14px; text-decoration: none; font-size: 14px; font-weight: 500;">
      查看課程詳情
    </a>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此郵件由 HKSchoolPlace 自動發送。您可以喺賬號頁面管理課程訂閱。
    </p>
  </div>
</body>
</html>`;
}

/**
 * 報名正式開放提醒郵件
 */
export function buildProgrammeNowOpenHtml({
  programmeName,
  venue,
  fee,
  enrolmentOpenAt,
  programmeUrl,
}: ProgrammeEmailParams): string {
  const feeText = fee === 0 ? "免費" : fee ? `HK$${fee}` : "費用待定";
  const openTime = enrolmentOpenAt
    ? new Date(enrolmentOpenAt).toLocaleString("zh-HK", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Hong_Kong",
      })
    : "現在";

  return `
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px;">
    <h1 style="font-size: 20px; font-weight: 600; color: #020617; margin: 0 0 8px;">
      🔔 課程報名已開放！
    </h1>
    <p style="font-size: 15px; color: #64748b; margin: 0 0 24px;">
      您訂閱嘅課程現在可以報名
    </p>
    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #059669; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">課程名稱</p>
      <p style="font-size: 17px; font-weight: 600; color: #020617; margin: 0 0 16px;">${programmeName}</p>
      <p style="font-size: 13px; color: #059669; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">場地</p>
      <p style="font-size: 15px; color: #020617; margin: 0 0 16px;">${venue}</p>
      <p style="font-size: 13px; color: #059669; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">開放時間</p>
      <p style="font-size: 15px; color: #020617; margin: 0 0 16px;">${openTime}</p>
      <p style="font-size: 13px; color: #059669; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">費用</p>
      <p style="font-size: 15px; color: ${fee === 0 ? "#059669" : "#020617"}; margin: 0;">${feeText}</p>
    </div>
    <a href="https://www.smartplay.lcsd.gov.hk" style="display: block; text-align: center; background: #059669; color: white; padding: 14px 24px; border-radius: 14px; text-decoration: none; font-size: 15px; font-weight: 600; margin-bottom: 12px;">
      立即前往 SmartPLAY 報名 →
    </a>
    <a href="${programmeUrl}" style="display: block; text-align: center; color: #64748b; padding: 8px; text-decoration: none; font-size: 13px;">
      查看課程詳情
    </a>
    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0;">
      此郵件由 HKSchoolPlace 自動發送。您可以喺賬號頁面管理課程訂閱。
    </p>
  </div>
</body>
</html>`;
}
