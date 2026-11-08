import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let cached: NeonQueryFunction<false, false> | null = null;

export function getNeonSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL?.trim() || process.env.NEON_DATABASE_URL?.trim();
  if (!url) {
    throw new Error('DATABASE_URL (Neon) ontbreekt');
  }
  if (!cached) {
    cached = neon(url);
  }
  return cached;
}

export function isNeonConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim() || process.env.NEON_DATABASE_URL?.trim());
}
