-- SeniorEase lesmateriaal: consent + fulfillment idempotency (Neon Postgres)
-- Run once against the Neon database (SQL editor or psql).

CREATE TABLE IF NOT EXISTS lesmateriaal_consents (
  consent_id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  reference_id TEXT NOT NULL,
  product_label TEXT NOT NULL,
  buyer_type TEXT NOT NULL CHECK (buyer_type IN ('consumer', 'organization')),
  consent_version TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  consent_text_hash TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'bound', 'paid', 'orphan')),
  CONSTRAINT lesmateriaal_consents_email_check CHECK (position('@' IN email) > 1)
);

CREATE INDEX IF NOT EXISTS lesmateriaal_consents_email_idx
  ON lesmateriaal_consents (email);

CREATE INDEX IF NOT EXISTS lesmateriaal_consents_created_idx
  ON lesmateriaal_consents (created_at DESC);

CREATE TABLE IF NOT EXISTS lesmateriaal_fulfillments (
  stripe_session_id TEXT PRIMARY KEY,
  consent_id UUID REFERENCES lesmateriaal_consents (consent_id),
  reference_id TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'mail_sent', 'mail_failed', 'mail_skipped', 'completed')),
  consent_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_error TEXT
);

CREATE INDEX IF NOT EXISTS lesmateriaal_fulfillments_status_idx
  ON lesmateriaal_fulfillments (status);
