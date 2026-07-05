import Link from "next/link";

export const metadata = {
  title: "Hobby's – SeniorEase",
  description:
    "Apps en tips voor muziek, foto's, e-books en fietsen. Ontdek uitleg voor senioren.",
  alternates: {
    canonical: "https://seniorease.nl/hobbys",
  },
};

const items = [
  { title: "Foto Archief", href: "/foto-archief", description: "Personen labelen op oude groepsfoto's — past bij uw foto-album." },
  { title: "E-books lezen", href: "/uitleg/ebooks", description: "Digitaal lezen op telefoon, tablet of e-reader." },
  { title: "Spotify en DAB", href: "/uitleg/muziek-radio", description: "Muziek en radio luisteren via apps." },
  { title: "E-bike apps", href: "/uitleg/e-bike", description: "Routes plannen en fietsapps gebruiken." },
  { title: "Hoofdtelefoon", href: "/uitleg/hoofdtelefoon", description: "Draadloze hoofdtelefoon koppelen en gebruiken." },
  { title: "Foto's maken", href: "/uitleg/fotos-maken", description: "Betere foto's maken met uw telefoon." },
  { title: "Foto's ordenen", href: "/uitleg/fotos-ordenen", description: "Uw foto's overzichtelijk bewaren." },
  { title: "Videobellen", href: "/uitleg/videobellen", description: "Gezicht tot gezicht bellen met familie." },
];

export default function HobbysPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Hobby&apos;s
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Ontdek apps en tips voor muziek, foto&apos;s, e-books en fietsen.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-8">
              Hier vindt u uitleg en handige tools voor uw hobby&apos;s: foto&apos;s beheren, e-books lezen, muziek en radio, fietsen met de e-bike en meer.
            </p>

            <h2 className="text-senior-xl font-bold text-primary mb-4">Artikelen en tools</h2>
            <ul className="space-y-3" aria-label="Hobby's overzicht">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl border-2 border-primary/30 bg-neutral-cream/50 p-4 text-senior-base font-semibold text-primary hover:border-primary hover:bg-primary/5 hover:underline focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                  >
                    <span>{item.title}</span>
                    <span className="text-senior-sm font-normal text-gray-600">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-senior-base text-gray-600 mt-8 pt-6 border-t border-neutral-stone">
              <strong>Tip:</strong> Meer handige hulpmiddelen vindt u bij{" "}
              <Link href="/extras" className="font-semibold text-primary hover:underline">
                Handige extra&apos;s
              </Link>.
            </p>

            <p className="mt-6 pt-4 border-t border-neutral-stone">
              <Link
                href="/"
                className="text-senior-base font-bold text-primary hover:text-primary-dark underline"
              >
                ← Terug naar home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
