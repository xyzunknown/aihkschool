-- Infer fee_monthly_hkd from fee_annual_hkd / 10
-- Schools with no monthly fee data but have annual fee
-- Generated: 2026-05-05

UPDATE schools SET fee_monthly_hkd = ROUND(fee_annual_hkd / 10.0)
WHERE fee_monthly_hkd IS NULL
  AND fee_annual_hkd IS NOT NULL
  AND fee_annual_hkd > 0
  AND is_active = true;
