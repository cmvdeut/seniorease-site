'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NuttigeLinksPage() {
  const informatieSecties = [
    {
      title: 'Reismaatjes Gezocht',
      icon: '✈️',
      content: [
        {
          subtitle: 'Samen op reis',
          text: [
            'Reizen is leuker samen! Veel senioren zoeken reismaatjes.',
            'U kunt samen plannen, kosten delen en nieuwe plekken ontdekken.',
            'Er zijn verschillende betrouwbare manieren om reismaatjes te vinden.'
          ],
          links: [
            { name: 'Omroep MAX - Reismaatjes', url: 'https://www.maxvandaag.nl' },
            { name: 'SeniorWeb - Reizen', url: 'https://www.seniorweb.nl' }
          ]
        },
        {
          subtitle: 'Reisorganisaties voor senioren',
          text: [
            'Veel reisorganisaties bieden speciale reizen voor senioren.',
            'U reist in een groep met leeftijdsgenoten.',
            'Alles wordt voor u geregeld, u hoeft alleen te genieten.'
          ],
          links: [
            { name: 'SENIORENREIZEN.nl', url: 'https://www.seniorenreizen.nl' },
            { name: 'ANWB Reizen - Senioren', url: 'https://www.anwb.nl/reizen' }
          ]
        }
      ]
    },
    {
      title: 'Buddy\'s en Vrienden Gezocht',
      icon: '🤝',
      content: [
        {
          subtitle: 'Wat is een buddy?',
          text: [
            'Een buddy is iemand die regelmatig tijd met u doorbrengt.',
            'Samen koffie drinken, wandelen, of gewoon gezellig praten.',
            'Het helpt tegen eenzaamheid en geeft u gezelschap.'
          ]
        },
        {
          subtitle: 'Waar vind ik een buddy?',
          text: [
            'Veel gemeenten hebben buddy-projecten.',
            'Vrijwilligersorganisaties koppelen senioren aan buddy\'s.',
            'Vraag bij uw gemeente of welzijnsorganisatie naar mogelijkheden.'
          ],
          links: [
            { name: 'Humanitas - Maatjesproject', url: 'https://www.humanitas.nl' },
            { name: 'Vrijwilligerscentrale', url: 'https://www.vrijwilligerswerk.nl' }
          ]
        },
        {
          subtitle: 'Online buddy\'s vinden',
          text: [
            'Er zijn betrouwbare websites waar u contact kunt leggen.',
            'Altijd voorzichtig zijn en eerst online praten voordat u afspreekt.',
            'Vertel altijd iemand waar u naartoe gaat.'
          ],
          links: [
            { name: 'Omroep MAX - Contact', url: 'https://www.maxvandaag.nl' }
          ]
        }
      ]
    },
    {
      title: 'Kennissenkring Uitbreiden',
      icon: '👥',
      content: [
        {
          subtitle: 'Activiteiten en clubs',
          text: [
            'Doe mee met activiteiten in uw buurt.',
            'Veel gemeenten organiseren activiteiten voor senioren.',
            'Bibliotheken, buurthuizen en kerken hebben vaak activiteiten.'
          ],
          links: [
            { name: 'Omroep MAX - Activiteiten', url: 'https://www.maxvandaag.nl' }
          ]
        },
        {
          subtitle: 'Hobby\'s en interesses',
          text: [
            'Zoek mensen met dezelfde hobby\'s.',
            'Bijvoorbeeld: kaarten, lezen, wandelen, koken, tuinieren.',
            'Veel verenigingen hebben seniorenafdelingen.'
          ],
          links: [
            { name: 'KBO-PCOB - Activiteiten', url: 'https://www.kbo-pcob.nl' },
            { name: 'SeniorWeb - Activiteiten', url: 'https://www.seniorweb.nl' }
          ]
        },
        {
          subtitle: 'Online communities',
          text: [
            'Er zijn betrouwbare online communities voor senioren.',
            'Praat met anderen, deel ervaringen, maak nieuwe vrienden.',
            'Altijd voorzichtig zijn en alleen op betrouwbare websites.'
          ],
          links: [
            { name: 'Omroep MAX Community', url: 'https://www.maxvandaag.nl' },
            { name: 'SeniorWeb Forum', url: 'https://www.seniorweb.nl' }
          ]
        }
      ]
    },
    {
      title: 'Andere Betrouwbare Bronnen',
      icon: '🔗',
      content: [
        {
          subtitle: 'Gemeente en welzijn',
          text: [
            'Uw gemeente kan u helpen met activiteiten en contacten.',
            'Welzijnsorganisaties organiseren vaak activiteiten voor senioren.',
            'Vraag bij uw gemeente naar mogelijkheden.'
          ]
        },
        {
          subtitle: 'Bibliotheek',
          text: [
            'Veel bibliotheken hebben activiteiten voor senioren.',
            'Boekenclubs, computercursussen, lezingen.',
            'Gratis of tegen lage kosten.'
          ]
        },
        {
          subtitle: 'Kerk en geloofsgemeenschap',
          text: [
            'Veel kerken hebben activiteiten voor senioren.',
            'Koffieochtenden, maaltijden, uitstapjes.',
            'Ook als u niet gelovig bent, kunt u vaak meedoen.'
          ]
        },
        {
          subtitle: 'Belangenverenigingen',
          text: [
            'KBO-PCOB is de grootste belangenvereniging voor senioren.',
            'Ze organiseren activiteiten en bijeenkomsten.',
            'Lid worden kan nieuwe contacten opleveren.'
          ],
          links: [
            { name: 'KBO-PCOB', url: 'https://www.kbo-pcob.nl' }
          ]
        }
      ]
    },
    {
      title: 'Veiligheid en Voorzichtigheid',
      icon: '⚠️',
      content: [
        {
          subtitle: 'Bij het zoeken van contact',
          text: [
            'Wees altijd voorzichtig bij het leggen van nieuwe contacten.',
            'Spreek eerst online of telefonisch af voordat u elkaar ontmoet.',
            'Vertel altijd iemand waar u naartoe gaat en met wie u afspreekt.',
            'Spreek de eerste keer af op een openbare plek (bijv. café, bibliotheek).'
          ]
        },
        {
          subtitle: 'Online veiligheid',
          text: [
            'Gebruik alleen betrouwbare websites (zoals MAX Vandaag, SeniorWeb).',
            'Geef nooit persoonlijke gegevens aan onbekenden.',
            'Wees voorzichtig met het delen van foto\'s en adresgegevens.',
            'Bij twijfel: vraag hulp aan iemand die u vertrouwt.'
          ],
          links: [
            { name: 'Veiliginternetten.nl', url: 'https://www.veiliginternetten.nl' }
          ]
        },
        {
          subtitle: 'Als iets niet klopt',
          text: [
            'Vertrouw op uw gevoel: als iets niet goed voelt, doe het niet.',
            'Meld verdachte situaties bij de politie of Fraudehelpdesk.',
            'Praat erover met familie, vrienden of een hulpverlener.'
          ],
          links: [
            { name: 'Fraudehelpdesk', url: 'https://www.fraudehelpdesk.nl' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span className="text-2xl">←</span>
              <span className="text-senior-base">Terug</span>
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={50} 
                height={50}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-senior-2xl font-bold text-primary mb-0.5">
                  Contact & Activiteiten
                </h1>
                <p className="text-senior-sm text-gray-600">
                  Reismaatjes, buddy's en nieuwe contacten vinden
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8 mb-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4 text-center">
              💡 Nieuwe Contacten Leggen
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed text-center">
              Op zoek naar reismaatjes, een buddy, of gewoon nieuwe mensen leren kennen? 
              Hier vindt u betrouwbare manieren om contact te leggen en uw kennissenkring uit te breiden.
            </p>
          </div>

          {/* Informatie Secties */}
          <div className="space-y-8">
            {informatieSecties.map((sectie, sectieIndex) => (
              <div key={sectieIndex} className="bg-white rounded-2xl shadow-lg border-4 border-primary p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{sectie.icon}</div>
                  <h2 className="text-senior-2xl font-bold text-primary">
                    {sectie.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {sectie.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-neutral-cream rounded-xl p-5 border-2 border-neutral-stone">
                      <h3 className="text-senior-lg font-bold text-primary mb-3">
                        {item.subtitle}
                      </h3>
                      <ul className="space-y-2 mb-4">
                        {item.text.map((regel, regelIndex) => (
                          <li key={regelIndex} className="text-senior-base text-gray-700 leading-relaxed flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{regel}</span>
                          </li>
                        ))}
                      </ul>
                      {item.links && item.links.length > 0 && (
                        <div className="mt-4 pt-4 border-t-2 border-neutral-stone">
                          <p className="text-senior-sm font-bold text-gray-700 mb-2">Betrouwbare websites:</p>
                          <div className="flex flex-wrap gap-3">
                            {item.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-senior-sm font-bold
                                         hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                              >
                                {link.name} →
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Belangrijke Tip */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-senior-base font-bold text-blue-900 mb-3">
              💡 Tip: Begin Dichtbij
            </h3>
            <p className="text-senior-sm text-blue-800 leading-relaxed">
              Begin met activiteiten in uw eigen buurt. Vraag bij uw gemeente, bibliotheek of buurthuis 
              naar activiteiten voor senioren. Vaak is het makkelijker om contact te leggen met mensen 
              die dichtbij wonen.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
