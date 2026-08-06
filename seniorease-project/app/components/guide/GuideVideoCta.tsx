type GuideVideoCtaProps = {
  title?: string;
  description: string;
  href: string;
  linkLabel: string;
};

export default function GuideVideoCta({
  title = 'Liever kijken dan lezen?',
  description,
  href,
  linkLabel,
}: GuideVideoCtaProps) {
  return (
    <div className="bg-gold/15 border border-gold/40 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="text-3xl text-gold" aria-hidden>
        ▶
      </div>
      <div>
        <h3 className="font-serif text-navy text-senior-lg font-semibold mb-2">{title}</h3>
        <p className="text-navy/80 text-senior-sm mb-4 leading-relaxed">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[52px] px-6 py-3 font-semibold text-white bg-gold hover:bg-gold-light rounded-2xl transition-colors text-senior-sm"
        >
          {linkLabel} →
        </a>
      </div>
    </div>
  );
}
