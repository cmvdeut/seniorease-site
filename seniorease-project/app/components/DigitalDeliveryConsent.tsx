'use client';

import Link from 'next/link';
import {
  DIGITAL_CONSENT_CHECKBOX_LABEL,
  DIGITAL_CONSENT_ORG_NOTE,
} from '@/lib/digital-delivery-consent';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  /** Toon toelichting voor organisatielicenties */
  showOrganizationNote?: boolean;
};

/**
 * Niet vooraf aangevinkte toestemming voor directe digitale levering.
 */
export default function DigitalDeliveryConsent({
  checked,
  onChange,
  id = 'digital-delivery-consent',
  showOrganizationNote = false,
}: Props) {
  return (
    <div className="rounded-senior border border-navy/15 bg-white px-4 py-4 space-y-3">
      <label htmlFor={id} className="flex gap-3 items-start cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1.5 h-5 w-5 shrink-0 rounded border-navy/30 text-gold focus:ring-gold"
        />
        <span className="text-navy/85 text-senior-sm leading-relaxed">
          {DIGITAL_CONSENT_CHECKBOX_LABEL}{' '}
          <Link href="/voorwaarden" className="text-gold underline hover:text-gold-light">
            Meer in de voorwaarden
          </Link>
          .
        </span>
      </label>
      {showOrganizationNote ? (
        <p className="text-navy/55 text-senior-xs leading-relaxed m-0 pl-8">
          {DIGITAL_CONSENT_ORG_NOTE}
        </p>
      ) : null}
    </div>
  );
}
