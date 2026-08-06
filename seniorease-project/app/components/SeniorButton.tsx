import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export const seniorBtnPrimary =
  'inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-white text-senior-sm bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)] transition-colors touch-manipulation';

export const seniorBtnSecondary =
  'inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-navy text-senior-sm bg-paper hover:bg-cream rounded-full border-2 border-navy/25 shadow-[0_2px_0_0_rgba(46,36,28,0.12)] transition-colors touch-manipulation';

type Common = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon | false;
  className?: string;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export default function SeniorButton(props: AsLink | AsButton) {
  const {
    children,
    variant = 'primary',
    icon: IconProp,
    className = '',
  } = props;
  const base = variant === 'primary' ? seniorBtnPrimary : seniorBtnSecondary;
  const Icon =
    IconProp === false
      ? null
      : IconProp ?? (variant === 'primary' ? ArrowRight : null);

  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon size={20} strokeWidth={2.25} aria-hidden /> : null}
    </>
  );

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        className={`${base} ${className}`.trim()}
      >
        {content}
      </Link>
    );
  }

  const { href: _h, icon: _i, variant: _v, children: _c, className: _cl, ...btn } =
    props as AsButton;
  return (
    <button type="button" className={`${base} ${className}`.trim()} {...btn}>
      {content}
    </button>
  );
}
