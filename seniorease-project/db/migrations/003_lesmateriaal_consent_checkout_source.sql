-- Mark consents created via afgeschermde Sessions live-test (variant C).
-- Durable webhook recognition after LESMATERIAAL_SESSIONS_TEST_SECRET rotate/off.

ALTER TABLE lesmateriaal_consents
  ADD COLUMN IF NOT EXISTS checkout_source TEXT
  CHECK (
    checkout_source IS NULL
    OR checkout_source IN ('sessions_live_test')
  );

CREATE INDEX IF NOT EXISTS lesmateriaal_consents_checkout_source_idx
  ON lesmateriaal_consents (checkout_source)
  WHERE checkout_source IS NOT NULL;
