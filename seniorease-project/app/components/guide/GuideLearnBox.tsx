type GuideLearnBoxProps = {
  title?: string;
  items: string[];
};

export default function GuideLearnBox({
  title = 'Wat u leert',
  items,
}: GuideLearnBoxProps) {
  return (
    <div className="bg-gold rounded-2xl p-6 sm:p-7">
      <h2 className="font-serif text-white text-senior-lg sm:text-[1.5rem] font-semibold mb-4">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-white text-senior-sm sm:text-senior-base leading-relaxed"
          >
            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-paper shrink-0" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
