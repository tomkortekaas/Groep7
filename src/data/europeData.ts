export interface GeoItem {
  id: string;
  category: 'country' | 'capital' | 'water' | 'mountain';
  dutchName: string;
  englishName: string;
  description: string;
  funFacts: string[];
  emoji: string;
  coordinates: [number, number]; // [longitude, latitude]
  countryId?: string; // Only for capitals - links to country
}

export const europeData: GeoItem[] = [
  // --- LANDEN ---
  {
    id: "netherlands",
    category: "country",
    dutchName: "Nederland",
    englishName: "Netherlands",
    emoji: "🇳🇱",
    coordinates: [5.3, 52.1],
    description: "Een land in Noordwest-Europa, bekend om zijn vlakke landschap, uitgestrekte polders, historische grachtensteden en als 'de poort tot Europa' met de haven van Rotterdam, de grootste haven van Europa.",
    funFacts: [
      "Ongeveer 26% van Nederland ligt onder zeeniveau en is beschermd door dijken en duinen.",
      "De haven van Rotterdam is de grootste haven van Europa en een van de drukste ter wereld.",
      "Nederland telt meer dan 1.000 molens, waarvan er nog ongeveer 1.100 overeind staan.",
      "Het land is 's werelds grootste exporteur van tulpen en andere bloembollen.",
      "Nederlanders zijn gemiddeld de langste mensen ter wereld (mannen 184 cm, vrouwen 170 cm).",
      "Er zijn meer fietsen dan inwoners: ongeveer 23 miljoen fietsen op 17 miljoen mensen.",
      "De Nederlandse taak wordt gesproken door ongeveer 24 miljoen mensen wereldwijd.",
      "Het Rijksmuseum in Amsterdam herbergt meer dan 8.000 kunstobjecten, waaronder De Nachtwacht van Rembrandt."
    ]
  },
  {
    id: "belgium",
    category: "country",
    dutchName: "België",
    englishName: "Belgium",
    emoji: "🇧🇪",
    coordinates: [4.5, 50.5],
    description: "Een klein land bekend om middeleeuwse steden en het hoofdkwartier van de Europese Unie.",
    funFacts: [
      "België produceert meer dan 220.000 ton chocolade per jaar.",
      "De Smurfen en Kuifje komen oorspronkelijk uit België.",
      "België heeft het wereldrecord voor de langste tijd zonder regering (541 dagen)."
    ]
  },
  {
    id: "luxembourg_country",
    category: "country",
    dutchName: "Luxemburg",
    englishName: "Luxembourg",
    emoji: "🇱🇺",
    coordinates: [6.13, 49.8],
    description: "Een van de kleinste landen van Europa, ingesloten door België, Frankrijk en Duitsland.",
    funFacts: [
      "Het is het enige Groothertogdom ter wereld dat nog bestaat.",
      "Bijna de helft van de inwoners van Luxemburg komt uit het buitenland.",
      "Mensen in Luxemburg spreken vaak drie of vier talen vloeiend."
    ]
  },
  {
    id: "uk",
    category: "country",
    dutchName: "Verenigd Koninkrijk",
    englishName: "United Kingdom",
    emoji: "🇬🇧",
    coordinates: [-2.0, 54.0],
    description: "Een eilandstaat die bestaat uit vier delen: Engeland, Schotland, Wales en Noord-Ierland.",
    funFacts: [
      "De Koning is technisch gezien eigenaar van alle zwanen in open water.",
      "Je bent in het VK nooit verder dan 115 kilometer van de zee verwijderd.",
      "De Britten drinken meer dan 165 miljoen kopjes thee per dag."
    ]
  },
  {
    id: "france",
    category: "country",
    dutchName: "Frankrijk",
    englishName: "France",
    emoji: "🇫🇷",
    coordinates: [2.2, 46.6],
    description: "Het grootste land in West-Europa, beroemd om zijn eten, mode en kunst.",
    funFacts: [
      "Het Louvre in Parijs is het drukst bezochte museum ter wereld.",
      "Frankrijk heeft meer tijdzones dan welk ander land ook (door overzeese gebieden).",
      "De croissant komt eigenlijk uit Oostenrijk, niet uit Frankrijk!"
    ]
  },
  {
    id: "spain",
    category: "country",
    dutchName: "Spanje",
    englishName: "Spain",
    emoji: "🇪🇸",
    coordinates: [-3.7, 40.0],
    description: "Een zonnig land in Zuid-Europa bekend om zijn stranden en gepassioneerde cultuur.",
    funFacts: [
      "Spanje produceert bijna de helft van alle olijfolie in de wereld.",
      "In Spanje is het heel normaal om pas om 22:00 uur 's avonds te eten.",
      "Het Spaanse volkslied heeft geen tekst!"
    ]
  },
  {
    id: "switzerland",
    category: "country",
    dutchName: "Zwitserland",
    englishName: "Switzerland",
    emoji: "🇨🇭",
    coordinates: [8.2, 46.8],
    description: "Een bergachtig land in Centraal-Europa, beroemd om skiën, horloges en chocolade.",
    funFacts: [
      "Zwitserland heeft vier officiële talen: Duits, Frans, Italiaans en Reto-Romaans.",
      "Het is een van de weinige landen met een vierkante vlag.",
      "Zwitserland is al meer dan 200 jaar niet in oorlog geweest."
    ]
  },
  {
    id: "austria",
    category: "country",
    dutchName: "Oostenrijk",
    englishName: "Austria",
    emoji: "🇦🇹",
    coordinates: [14.5, 47.5],
    description: "Een Duitstalig land in de Alpen, bekend om prachtige kastelen en klassieke muziek.",
    funFacts: [
      "De beroemde componist Mozart werd hier geboren.",
      "Meer dan 60% van Oostenrijk bestaat uit bergen (de Alpen).",
      "De naaimachine is uitgevonden door een Oostenrijker."
    ]
  },
  {
    id: "italy",
    category: "country",
    dutchName: "Italië",
    englishName: "Italy",
    emoji: "🇮🇹",
    coordinates: [12.5, 42.5],
    description: "Een laarsvormig land met een lange kustlijn, beroemd om pizza en geschiedenis.",
    funFacts: [
      "Italië heeft de meeste UNESCO-werelderfgoedlocaties ter wereld.",
      "De thermometer is een Italiaanse uitvinding.",
      "Er is een fontein in Italië waar gratis rode wijn uit stroomt (in Abruzzo)."
    ]
  },
  {
    id: "germany",
    category: "country",
    dutchName: "Duitsland",
    englishName: "Germany",
    emoji: "🇩🇪",
    coordinates: [10.4, 51.2],
    description: "Een groot land in Centraal-Europa bekend om bossen, rivieren en auto-industrie.",
    funFacts: [
      "Er zijn meer dan 20.000 kastelen in Duitsland.",
      "Duitsland heeft meer dan 1.000 soorten worst.",
      "De eerste kerstboomtraditie begon in Duitsland."
    ]
  },
  {
    id: "poland",
    category: "country",
    dutchName: "Polen",
    englishName: "Poland",
    emoji: "🇵🇱",
    coordinates: [19.1, 51.9],
    description: "Een land in Centraal-Europa bekend om middeleeuwse architectuur en stevig eten.",
    funFacts: [
      "Het grootste kasteel ter wereld (Malbork) staat in Polen.",
      "Polen heeft de oudste nog bestaande grondwet van Europa.",
      "Wojtek de Beer was een officiële soldaat in het Poolse leger tijdens WOII."
    ]
  },
  {
    id: "norway",
    category: "country",
    dutchName: "Noorwegen",
    englishName: "Norway",
    emoji: "🇳🇴",
    coordinates: [8.5, 61.0],
    description: "Een Scandinavisch land met bergen, gletsjers en diepe fjorden.",
    funFacts: [
      "Noorwegen introduceerde zalmsushi in Japan in de jaren 80.",
      "De zon gaat in de zomer in het noorden wekenlang niet onder (middernachtzon).",
      "De paperclip is een Noorse uitvinding."
    ]
  },
  {
    id: "sweden",
    category: "country",
    dutchName: "Zweden",
    englishName: "Sweden",
    emoji: "🇸🇪",
    coordinates: [15.5, 62.0],
    description: "Een Scandinavisch land met duizenden eilanden, meren en uitgestrekte bossen.",
    funFacts: [
      "Er is een hotel in Zweden dat elk jaar opnieuw volledig uit ijs wordt gebouwd.",
      "Zweden importeren afval uit andere landen om energie op te wekken.",
      "De populaire game Minecraft is bedacht door een Zweed."
    ]
  },
  {
    id: "russia",
    category: "country",
    dutchName: "Rusland",
    englishName: "Russia",
    emoji: "🇷🇺",
    coordinates: [42.0, 57.0],
    description: "Het grootste land ter wereld, dat zich uitstrekt over Oost-Europa en Noord-Azië.",
    funFacts: [
      "Rusland is zo groot dat het 11 verschillende tijdzones heeft.",
      "Het Baikalmeer in Rusland bevat 20% van al het onbevroren zoetwater op aarde.",
      "Tetris is uitgevonden in Rusland."
    ]
  },

  // --- HOOFDSTEDEN ---
  {
    id: "amsterdam",
    category: "capital",
    dutchName: "Amsterdam",
    englishName: "Amsterdam",
    emoji: "🍫",
    coordinates: [4.9, 52.37],
    countryId: "netherlands",
    description: "De hoofdstad van Nederland, bekend om zijn kunst en uitgebreide grachtengordel.",
    funFacts: [
      "De huizen in Amsterdam zijn zo smal omdat je vroeger belasting betaalde op breedte.",
      "De hele stad is gebouwd op houten palen in de modder.",
      "Er liggen ongeveer 2.500 woonboten in de grachten van Amsterdam."
    ]
  },
  {
    id: "brussels",
    category: "capital",
    dutchName: "Brussel",
    englishName: "Brussels",
    emoji: "🍟",
    coordinates: [4.5, 50.8],
    countryId: "belgium",
    description: "De hoofdstad van België en het bestuurscentrum van de Europese Unie.",
    funFacts: [
      "Het symbool van de stad is een klein standbeeldje van een plassend jongetje (Manneken Pis).",
      "Brussel heeft een van de diepste zwembaden ter wereld (Nemo 33).",
      "Frieten (French Fries) zijn eigenlijk in deze regio uitgevonden, niet in Frankrijk."
    ]
  },
  {
    id: "luxembourg_city",
    category: "capital",
    dutchName: "Luxemburg",
    englishName: "Luxembourg City",
    emoji: "🏰",
    coordinates: [6.13, 49.61],
    countryId: "luxembourg_country",
    description: "De hoofdstad van Luxemburg, gebouwd te midden van diepe kloven en kliffen.",
    funFacts: [
      "De stad heeft een enorm netwerk van ondergrondse tunnels, de Kazematten.",
      "Het is een van de rijkste steden ter wereld.",
      "De oude stad staat op de UNESCO Werelderfgoedlijst."
    ]
  },
  {
    id: "london",
    category: "capital",
    dutchName: "Londen",
    englishName: "London",
    emoji: "💂",
    coordinates: [-0.13, 51.51],
    countryId: "uk",
    description: "De hoofdstad van het VK, een wereldstad met geschiedenis uit de Romeinse tijd.",
    funFacts: [
      "Big Ben is de naam van de bel in de toren, niet de toren zelf.",
      "Londen was de eerste stad ter wereld met een ondergrondse metro.",
      "Meer dan 300 talen worden gesproken in Londen."
    ]
  },
  {
    id: "paris",
    category: "capital",
    dutchName: "Parijs",
    englishName: "Paris",
    emoji: "🗼",
    coordinates: [2.35, 48.86],
    countryId: "france",
    description: "De hoofdstad van Frankrijk, wereldcentrum voor kunst, mode en gastronomie.",
    funFacts: [
      "De Eiffeltoren was bedoeld als tijdelijk bouwwerk voor 20 jaar.",
      "Parijs heeft een 'nep-Parijs' gebouwd in WO1 om bommenwerpers te misleiden.",
      "Er zijn meer dan 1.800 bakkerijen in Parijs."
    ]
  },
  {
    id: "madrid",
    category: "capital",
    dutchName: "Madrid",
    englishName: "Madrid",
    emoji: "💃",
    coordinates: [-3.7, 40.42],
    countryId: "spain",
    description: "De hoofdstad van Spanje, bekend om elegante boulevards, rijke Europese kunst en een bruisend nachtleven. De stad is sinds de late jaren '70 het centrum van de culturele beweging 'La Movida'.",
    funFacts: [
      "Madrid is de hoogst gelegen hoofdstad van Europa (ongeveer 667 meter boven zeeniveau).",
      "De naam Madrid komt mogelijk van het Arabische 'majrā' wat 'waterstroom' of 'bron' betekent.",
      "Het is de enige hoofdstad in Europa die door Moslims is gesticht (als 'Magerit' in de 9e eeuw).",
      "Madrid staat bekend om zijn bruisende nachtleven met bars en clubs die open blijven tot 6 uur 's ochtends.",
      "De 'cocido madrileño' (een kikkererwtenstoof) is een van de meest emblematische gerechten van de stad.",
      "Bocata de calamares (inktvis sandwich) is een typische Madrileense culinaire specialiteit.",
      "Het koninklijk paleis in Madrid is het grootste van West-Europa."
    ]
  },
  {
    id: "bern",
    category: "capital",
    dutchName: "Bern",
    englishName: "Bern",
    emoji: "🐻",
    coordinates: [7.45, 46.95],
    countryId: "switzerland",
    description: "De bondsstad van Zwitserland, gebouwd in een bocht van de rivier de Aare.",
    funFacts: [
      "Volgens de legende is de stad vernoemd naar een beer die de stichter had gevangen.",
      "Einstein ontwikkelde zijn relativiteitstheorie toen hij in Bern woonde.",
      "Het oude centrum heeft 6 kilometer aan overdekte winkelpromenades."
    ]
  },
  {
    id: "vienna",
    category: "capital",
    dutchName: "Wenen",
    englishName: "Vienna",
    emoji: "🎻",
    coordinates: [16.37, 48.21],
    countryId: "austria",
    description: "De hoofdstad van Oostenrijk, gelegen aan de Donau en beroemd om keizerlijke paleizen.",
    funFacts: [
      "Wenen wordt de 'Stad van de Muziek' genoemd omdat veel componisten er woonden.",
      "De sneeuwbol is uitgevonden in Wenen.",
      "De dierentuin van Wenen is de oudste ter wereld (uit 1752)."
    ]
  },
  {
    id: "rome",
    category: "capital",
    dutchName: "Rome",
    englishName: "Rome",
    emoji: "🏛️",
    coordinates: [12.5, 41.9],
    countryId: "italy",
    description: "De hoofdstad van Italië, met bijna 3000 jaar aan wereldwijd invloedrijke kunst.",
    funFacts: [
      "Rome heeft een heel ander land binnen zijn stadsgrenzen: Vaticaanstad.",
      "Katten hebben speciale rechten in Rome; ze mogen leven waar ze willen.",
      "Mensen gooien elke dag duizenden euro's in de Trevifontein (voor het goede doel)."
    ]
  },
  {
    id: "berlin",
    category: "capital",
    dutchName: "Berlijn",
    englishName: "Berlin",
    emoji: "🧸",
    coordinates: [13.4, 52.52],
    countryId: "germany",
    description: "De hoofdstad van Duitsland, bekend om zijn kunstscene en moderne monumenten.",
    funFacts: [
      "Berlijn heeft meer bruggen dan Venetië!",
      "De stad is negen keer groter dan Parijs in oppervlakte.",
      "Er zijn drie operahuizen in Berlijn."
    ]
  },
  {
    id: "warsaw",
    category: "capital",
    dutchName: "Warschau",
    englishName: "Warsaw",
    emoji: "🧜",
    coordinates: [21.01, 52.23],
    countryId: "poland",
    description: "De hoofdstad van Polen, prachtig herbouwd na de Tweede Wereldoorlog.",
    funFacts: [
      "Het symbool van de stad is een zeemeermin die de stad beschermt.",
      "Warschau wordt ook wel het 'Parijs van het Noorden' genoemd.",
      "Het historische centrum is zo goed herbouwd dat het op de UNESCO-lijst staat."
    ]
  },
  {
    id: "oslo",
    category: "capital",
    dutchName: "Oslo",
    englishName: "Oslo",
    emoji: "🕊️",
    coordinates: [10.75, 59.91],
    countryId: "norway",
    description: "De hoofdstad van Noorwegen, gelegen aan de zuidkust aan het hoofd van de Oslofjord.",
    funFacts: [
      "De Nobelprijs voor de Vrede wordt elk jaar in Oslo uitgereikt.",
      "De helft van de gemeente Oslo bestaat uit bos en parken.",
      "De kerstboom op Trafalgar Square in Londen is elk jaar een cadeau van Oslo."
    ]
  },
  {
    id: "stockholm",
    category: "capital",
    dutchName: "Stockholm",
    englishName: "Stockholm",
    emoji: "👑",
    coordinates: [18.07, 59.33],
    countryId: "sweden",
    description: "De hoofdstad van Zweden, verspreid over 14 eilanden en meer dan 50 bruggen.",
    funFacts: [
      "Het metrosysteem van Stockholm staat bekend als de langste kunstgalerij ter wereld.",
      "Je kunt in het midden van de stad vissen op zalm.",
      "Het koninklijk paleis in Stockholm heeft meer dan 600 kamers."
    ]
  },
  {
    id: "moscow",
    category: "capital",
    dutchName: "Moskou",
    englishName: "Moscow",
    emoji: "❄️",
    coordinates: [37.62, 55.76],
    countryId: "russia",
    description: "De hoofdstad van Rusland, bekend om de kleurrijke koepels van de Basiliuskathedraal.",
    funFacts: [
      "De metro van Moskou vervoert 9 miljoen mensen per dag.",
      "Het Kremlin is het grootste nog bewoonde fort in Europa.",
      "Miljonairs in Moskou kopen soms ambulances om de file te omzeilen."
    ]
  },

  // --- WATEREN ---
  {
    id: "north_sea",
    category: "water",
    dutchName: "Noordzee",
    englishName: "North Sea",
    emoji: "🌊",
    coordinates: [3.0, 58.0],
    description: "Een zee van de Atlantische Oceaan tussen Groot-Brittannië, Scandinavië en de Benelux.",
    funFacts: [
      "Het is een van de drukste scheepvaartroutes ter wereld.",
      "Er liggen duizenden scheepswrakken op de bodem van de Noordzee.",
      "Doggersbank was vroeger een landbrug waar mammoeten liepen."
    ]
  },
  {
    id: "baltic_sea",
    category: "water",
    dutchName: "Oostzee",
    englishName: "Baltic Sea",
    emoji: "🧊",
    coordinates: [20.0, 58.5],
    description: "Een zee ingesloten door Scandinavië, Finland, de Baltische staten en Noord-Europa.",
    funFacts: [
      "Het water is veel minder zout dan in andere zeeën (brak water).",
      "In de winter bevriest bijna de helft van de zee soms.",
      "Barnsteen (versteend hars) spoelt hier vaak aan op het strand."
    ]
  },
  {
    id: "mediterranean",
    category: "water",
    dutchName: "Middellandse Zee",
    englishName: "Mediterranean Sea",
    emoji: "☀️",
    coordinates: [18.0, 36.0],
    description: "Een zee verbonden met de Atlantische Oceaan, omringd door het Middellandse Zeegebied.",
    funFacts: [
      "De naam betekent letterlijk 'midden van het land' in het Latijn.",
      "Het water verdampt hier sneller dan er regen valt.",
      "Dolfijnen en zeeschildpadden komen hier veel voor."
    ]
  },
  {
    id: "english_channel",
    category: "water",
    dutchName: "Het Kanaal",
    englishName: "English Channel",
    emoji: "⛴️",
    coordinates: [-0.5, 50.5],
    description: "Het water dat Zuid-Engeland scheidt van Noord-Frankrijk.",
    funFacts: [
      "Je kunt eronderdoor reizen met de trein via de 'Chunnel'.",
      "Het is de drukste scheepvaartroute ter wereld.",
      "De eerste persoon zwom het Kanaal over in 1875 (Matthew Webb)."
    ]
  },
  {
    id: "gibraltar",
    category: "water",
    dutchName: "Straat van Gibraltar",
    englishName: "Strait of Gibraltar",
    emoji: "🐒",
    coordinates: [-5.6, 35.8],
    description: "Een nauwe zeestraat die de Atlantische Oceaan met de Middellandse Zee verbindt.",
    funFacts: [
      "Op het smalste punt liggen Europa en Afrika maar 14 km uit elkaar.",
      "Er leven wilde apen op de rots van Gibraltar.",
      "Dolfijnen zwemmen hier vaak met de boten mee."
    ]
  },
  {
    id: "danube",
    category: "water",
    dutchName: "Donau",
    englishName: "Danube River",
    emoji: "🎵",
    coordinates: [20.0, 47.5],
    description: "De op één na langste rivier van Europa, die door 10 verschillende landen stroomt.",
    funFacts: [
      "De Donau stroomt door meer hoofdsteden (4) dan enige andere rivier.",
      "De rivier verandert vaak van kleur, van blauw naar groen tot bruin.",
      "Er ligt een verzonken eiland in de Donau (Ada Kaleh)."
    ]
  },
  {
    id: "thames",
    category: "water",
    dutchName: "Theems",
    englishName: "River Thames",
    emoji: "🌉",
    coordinates: [-0.5, 51.48],
    description: "Een belangrijke rivier in Zuid-Engeland die dwars door Londen stroomt.",
    funFacts: [
      "Meer dan 200 bruggen kruisen de rivier de Theems.",
      "Vroeger vroor de Theems dicht en hielden ze 'Frost Fairs' op het ijs.",
      "Er zwemmen soms zeehonden en zelfs walvissen de rivier op."
    ]
  },
  {
    id: "seine",
    category: "water",
    dutchName: "Seine",
    englishName: "Seine River",
    emoji: "🎨",
    coordinates: [2.0, 48.6],
    description: "Een beroemde rivier in Noord-Frankrijk die door het hart van Parijs stroomt.",
    funFacts: [
      "De as van Jeanne d'Arc zou in de Seine zijn gestrooid.",
      "Je kunt 's zomers zonnen op kunstmatige stranden langs de Seine (Paris Plages).",
      "De oudste brug over de Seine heet gek genoeg 'Nieuwe Brug' (Pont Neuf)."
    ]
  },
  {
    id: "rhone",
    category: "water",
    dutchName: "Rhône",
    englishName: "Rhône River",
    emoji: "🌊",
    coordinates: [5.0, 44.0],
    description: "Een grote rivier in Frankrijk en Zwitserland, die uitmondt in de Middellandse Zee.",
    funFacts: [
      "Het is een van de weinige grote Europese rivieren die naar het zuiden stroomt.",
      "De Rhône was een belangrijke handelsroute voor de Romeinen.",
      "De rivier staat bekend om zijn krachtige stroming."
    ]
  },
  {
    id: "rhine",
    category: "water",
    dutchName: "Rijn",
    englishName: "Rhine River",
    emoji: "🏰",
    coordinates: [7.0, 51.0],
    description: "Een van de belangrijkste rivieren van Europa, van de Alpen tot de Noordzee.",
    funFacts: [
      "Kastelen werden langs de Rijn gebouwd om tol te eisen van schepen.",
      "De Rijn is de drukste waterweg van Europa.",
      "In de zomer kun je op sommige plekken in de Rijn zwemmen."
    ]
  },
  {
    id: "scheldt",
    category: "water",
    dutchName: "Schelde",
    englishName: "Scheldt River",
    emoji: "🚢",
    coordinates: [4.0, 51.15],
    description: "Een rivier die door Noord-Frankrijk, West-België en Zuidwest-Nederland stroomt.",
    funFacts: [
      "De Schelde is al eeuwenlang cruciaal voor de handel in Antwerpen.",
      "Tijdens oorlogen werd de Schelde vaak geblokkeerd om de vijand te stoppen.",
      "Er leeft een zeldzame vissoort, de houting, die weer terugkomt in de Schelde."
    ]
  },
  {
    id: "volga",
    category: "water",
    dutchName: "Volga",
    englishName: "Volga River",
    emoji: "🐟",
    coordinates: [45.0, 54.0],
    description: "De langste rivier van Europa (3.531 km), de belangrijkste waterweg van Rusland en de historische wieg van de Russische staat.",
    funFacts: [
      "In Rusland noemen ze de rivier liefkozend 'Moeder Volga' en het is een nationaal symbool.",
      "De Volga is verbonden met de Baltische Zee, Witte Zee, Zee van Azov en Zwarte Zee via kanalen.",
      "Grote steden aan de Volga zijn onder andere Moskou (via kanaal), Nizhny Novgorod, Kazan en Volgograd.",
      "De rivier wordt voor scheepvaart verbreed met grote dammen en sluiten uit de Stalin-tijd.",
      "De Volga-delta is de grootste rivierdelta van Europa en mondt uit in de Kaspische Zee.",
      "Tot 60% van het water komt uit smeltende sneeuw, de rest uit grondwater en regenval."
    ]
  },

  // --- GEBERGTEN ---
  {
    id: "alps",
    category: "mountain",
    dutchName: "Alpen",
    englishName: "The Alps",
    emoji: "🎿",
    coordinates: [10.5, 46.8],
    description: "De hoogste en meest uitgestrekte bergketen die volledig in Europa ligt.",
    funFacts: [
      "Ötzi de ijsmummie (5300 jaar oud) werd hier in het ijs gevonden.",
      "De Alpen groeien nog steeds een heel klein beetje elk jaar door platentektoniek.",
      "Hannibal trok met olifanten over de Alpen om Rome aan te vallen."
    ]
  },
  {
    id: "pyrenees",
    category: "mountain",
    dutchName: "Pyreneeën",
    englishName: "The Pyrenees",
    emoji: "🐐",
    coordinates: [0.5, 42.7],
    description: "Een bergketen die het Iberisch Schiereiland scheidt van de rest van Europa.",
    funFacts: [
      "Het kleine land Andorra ligt volledig verborgen in deze bergen.",
      "Er leven nog bruine beren in het wild in de Pyreneeën.",
      "Herders gebruiken hier een speciale fluit-taal om over grote afstanden te communiceren."
    ]
  },
  {
    id: "caucasus",
    category: "mountain",
    dutchName: "Kaukasus",
    englishName: "Caucasus Mountains",
    emoji: "🧗",
    coordinates: [44.0, 42.5],
    description: "Een bergsysteem op de grens van Europa en Azië.",
    funFacts: [
      "Hier ligt de berg Elbroes, die eigenlijk de hoogste berg van Europa is (hoger dan de Mont Blanc).",
      "Volgens de Griekse mythe werd Prometheus hier aan een rots geketend.",
      "Er worden meer dan 40 verschillende talen gesproken in deze regio."
    ]
  },
  {
    id: "ural",
    category: "mountain",
    dutchName: "Oeral",
    englishName: "Ural Mountains",
    emoji: "💎",
    coordinates: [59.0, 56.0],
    description: "Een bergketen die van noord naar zuid door westelijk Rusland loopt.",
    funFacts: [
      "Geografen beschouwen deze bergen als de grens tussen Europa en Azië.",
      "De Oeral is een van de oudste bergketens ter wereld (250-300 miljoen jaar oud).",
      "Het gebied is extreem rijk aan mineralen en edelstenen."
    ]
  }
];

// Helper functie om een willekeurig weetje te krijgen
export const getRandomFunFact = (itemId: string): string | null => {
  const item = europeData.find(i => i.id === itemId);
  if (item && item.funFacts.length > 0) {
    return item.funFacts[Math.floor(Math.random() * item.funFacts.length)];
  }
  return null;
};

// Helper functie om item op id te vinden
export const getItemById = (id: string): GeoItem | undefined => {
  return europeData.find(item => item.id === id);
};

// Helper functie om land te vinden voor een hoofdstad
export const getCountryForCapital = (capitalId: string): GeoItem | undefined => {
  const capital = europeData.find(item => item.id === capitalId);
  if (capital?.countryId) {
    return europeData.find(item => item.id === capital.countryId);
  }
  return undefined;
};

// Wikipedia zoektermen voor disambiguatie
export const wikiSearchTerms: Record<string, { nl: string; en: string }> = {
  netherlands: { nl: 'Nederland (land)', en: 'Netherlands' },
  belgium: { nl: 'België (land)', en: 'Belgium' },
  luxembourg_country: { nl: 'Luxemburg (land)', en: 'Luxembourg' },
  uk: { nl: 'Verenigd Koninkrijk', en: 'United Kingdom' },
  france: { nl: 'Frankrijk (land)', en: 'France' },
  spain: { nl: 'Spanje (land)', en: 'Spain' },
  switzerland: { nl: 'Zwitserland (land)', en: 'Switzerland' },
  austria: { nl: 'Oostenrijk (land)', en: 'Austria' },
  italy: { nl: 'Italië (land)', en: 'Italy' },
  germany: { nl: 'Duitsland (land)', en: 'Germany' },
  poland: { nl: 'Polen (land)', en: 'Poland' },
  norway: { nl: 'Noorwegen (land)', en: 'Norway' },
  sweden: { nl: 'Zweden (land)', en: 'Sweden' },
  russia: { nl: 'Rusland (land)', en: 'Russia' },
  amsterdam: { nl: 'Amsterdam (stad)', en: 'Amsterdam' },
  brussels: { nl: 'Brussel (stad)', en: 'Brussels' },
  luxembourg_city: { nl: 'Luxemburg (stad)', en: 'Luxembourg City' },
  london: { nl: 'Londen (stad)', en: 'London' },
  paris: { nl: 'Parijs (stad)', en: 'Paris' },
  madrid: { nl: 'Madrid (stad)', en: 'Madrid' },
  bern: { nl: 'Bern (stad)', en: 'Bern' },
  vienna: { nl: 'Wenen (stad)', en: 'Vienna' },
  rome: { nl: 'Rome (stad)', en: 'Rome' },
  berlin: { nl: 'Berlijn (stad)', en: 'Berlin' },
  warsaw: { nl: 'Warschau (stad)', en: 'Warsaw' },
  oslo: { nl: 'Oslo (stad)', en: 'Oslo' },
  stockholm: { nl: 'Stockholm (stad)', en: 'Stockholm' },
  moscow: { nl: 'Moskou (stad)', en: 'Moscow' },
  north_sea: { nl: 'Noordzee (zee)', en: 'North Sea' },
  baltic_sea: { nl: 'Oostzee (zee)', en: 'Baltic Sea' },
  mediterranean: { nl: 'Middellandse Zee', en: 'Mediterranean Sea' },
  english_channel: { nl: 'Het Kanaal (zeestraat)', en: 'English Channel' },
  gibraltar: { nl: 'Straat van Gibraltar', en: 'Strait of Gibraltar' },
  danube: { nl: 'Donau (rivier)', en: 'Danube' },
  thames: { nl: 'Theems (rivier)', en: 'River Thames' },
  seine: { nl: 'Seine (rivier)', en: 'Seine' },
  rhone: { nl: 'Rhône (rivier)', en: 'Rhône' },
  rhine: { nl: 'Rijn (rivier)', en: 'Rhine' },
  scheldt: { nl: 'Schelde (rivier)', en: 'Scheldt' },
  volga: { nl: 'Wolga (rivier)', en: 'Volga' },
  alps: { nl: 'Alpen (gebergte)', en: 'Alps' },
  pyrenees: { nl: 'Pyreneeën (gebergte)', en: 'Pyrenees' },
  caucasus: { nl: 'Kaukasus (gebergte)', en: 'Caucasus Mountains' },
  ural: { nl: 'Oeral (gebergte)', en: 'Ural Mountains' },
};
