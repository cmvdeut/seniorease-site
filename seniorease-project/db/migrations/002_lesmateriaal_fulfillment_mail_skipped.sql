-- Add mail_skipped status: Preview allowlist skip (not sent, not failed).
ALTER TABLE lesmateriaal_fulfillments
  DROP CONSTRAINT IF EXISTS lesmateriaal_fulfillments_status_check;

ALTER TABLE lesmateriaal_fulfillments
  ADD CONSTRAINT lesmateriaal_fulfillments_status_check
  CHECK (status IN ('pending', 'mail_sent', 'mail_failed', 'mail_skipped', 'completed'));
