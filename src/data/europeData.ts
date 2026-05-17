export interface GeoItem {
  id: string;
  category: 'country' | 'capital' | 'city' | 'water' | 'mountain' | 'region';
  dutchName: string;
  englishName: string;
  description: string;
  funFacts: string[];
  englishFunFacts?: string[];
  emoji: string;
  coordinates: [number, number]; // [longitude, latitude]
  countryId?: string; // Only for capitals/cities - links to country
}

export const europeData: GeoItem[] = [
  // --- LANDEN ---
  {
    id: "germany",
    category: "country",
    dutchName: "Duitsland",
    englishName: "Germany",
    emoji: "🇩🇪",
    coordinates: [10.5, 51.2],
    description: "Het grootste land in de Europese Unie, bekend om zijn industrie, bossen en bierculuur.",
    funFacts: [
      "Duitsland heeft meer dan 1.300 brouwerijen — meer dan welk ander land ter wereld.",
      "Het Zwarte Woud (Schwarzwald) is een van de dichtste bossen van Europa.",
      "De autobahn heeft op sommige stukken geen maximumsnelheid.",
      "Duitsland heeft 47 UNESCO Werelderfgoedsites — een van de meeste ter wereld.",
      "De Berlijnse Muur stond van 1961 tot 1989 en verdeelde de stad in twee."
    ],
    englishFunFacts: [
      "Germany has over 1,300 breweries — more than any other country in the world.",
      "The Black Forest (Schwarzwald) is one of the densest forests in Europe.",
      "The Autobahn has no speed limit on some sections.",
      "Germany has 47 UNESCO World Heritage Sites — one of the most in the world.",
      "The Berlin Wall stood from 1961 to 1989 and divided the city in two."
    ]
  },
  {
    id: "luxembourg",
    category: "country",
    dutchName: "Luxemburg",
    englishName: "Luxembourg",
    emoji: "🇱🇺",
    coordinates: [6.13, 49.75],
    description: "Een van de kleinste landen van Europa, ingeklemd tussen Duitsland, België en Frankrijk.",
    funFacts: [
      "Luxemburg heeft het hoogste bruto nationaal inkomen per hoofd ter wereld.",
      "Het land heeft drie officiële talen: Luxemburgs, Frans en Duits.",
      "Luxemburg is het enige groothertogdom ter wereld dat nog bestaat.",
      "Meer dan 47% van de werknemers in Luxemburg pendelt dagelijks vanuit het buitenland.",
      "De EU-instellingen, waaronder het Europees Hof van Justitie, zijn gevestigd in Luxemburg."
    ],
    englishFunFacts: [
      "Luxembourg has the highest gross national income per capita in the world.",
      "The country has three official languages: Luxembourgish, French, and German.",
      "Luxembourg is the only Grand Duchy in the world that still exists.",
      "Over 47% of workers in Luxembourg commute daily from abroad.",
      "EU institutions, including the European Court of Justice, are located in Luxembourg."
    ]
  },
  {
    id: "france",
    category: "country",
    dutchName: "Frankrijk",
    englishName: "France",
    emoji: "🇫🇷",
    coordinates: [2.5, 46.5],
    description: "Het grootste land van West-Europa, bekend om zijn kunst, keuken, mode en cultuur.",
    funFacts: [
      "Frankrijk is het meest bezochte land ter wereld, met meer dan 90 miljoen toeristen per jaar.",
      "De Eiffeltoren werd gebouwd in 1889 als tijdelijke constructie voor de Wereldtentoonstelling.",
      "Frankrijk produceert meer dan 1.200 verschillende soorten kaas.",
      "Het land heeft zowel oceaankusten als mediterrane kust, bergen én vlaktes.",
      "De Tour de France wielerwedstrijd wordt elk jaar gehouden en begon in 1903."
    ],
    englishFunFacts: [
      "France is the most visited country in the world, with over 90 million tourists per year.",
      "The Eiffel Tower was built in 1889 as a temporary structure for the World Exhibition.",
      "France produces over 1,200 different types of cheese.",
      "The country has both Atlantic and Mediterranean coastlines, mountains, and plains.",
      "The Tour de France cycling race is held every year and began in 1903."
    ]
  },
  {
    id: "switzerland",
    category: "country",
    dutchName: "Zwitserland",
    englishName: "Switzerland",
    emoji: "🇨🇭",
    coordinates: [8.2, 46.8],
    description: "Een bergachtig land in het hart van Europa, bekend om zijn neutraliteit, banken en chocolade.",
    funFacts: [
      "Zwitserland is al meer dan 500 jaar neutraal en heeft nooit deelgenomen aan een internationale oorlog.",
      "Het Zwitserse Rode Kruis werd in 1863 opgericht in Genève.",
      "Er zijn meer dan 1.500 meren in Zwitserland.",
      "Zwitserland heeft vier officiële talen: Duits, Frans, Italiaans en Reto-Romaans.",
      "De Zwitserse chocolade en het Zwitserse horloge zijn wereldberoemd om hun kwaliteit."
    ],
    englishFunFacts: [
      "Switzerland has been neutral for over 500 years and has never participated in an international war.",
      "The Swiss Red Cross was founded in Geneva in 1863.",
      "There are over 1,500 lakes in Switzerland.",
      "Switzerland has four official languages: German, French, Italian, and Romansh.",
      "Swiss chocolate and Swiss watches are world-famous for their quality."
    ]
  },
  {
    id: "austria",
    category: "country",
    dutchName: "Oostenrijk",
    englishName: "Austria",
    emoji: "🇦🇹",
    coordinates: [14.5, 47.5],
    description: "Een bergachtig land in Centraal-Europa, vroeger het centrum van het grote Habsburgse Rijk.",
    funFacts: [
      "Wenen was eeuwenlang de hoofdstad van het machtige Habsburgse Keizerrijk.",
      "Mozart, Beethoven en Schubert leefden en werkten in Oostenrijk.",
      "Meer dan 60% van Oostenrijk bestaat uit berggebied (Alpen).",
      "De Weense koffiehuiscultuur staat op de UNESCO lijst van immaterieel erfgoed.",
      "Oostenrijk was de eerste republiek die vrouwen stemrecht gaf (1918)."
    ],
    englishFunFacts: [
      "Vienna was for centuries the capital of the powerful Habsburg Empire.",
      "Mozart, Beethoven, and Schubert lived and worked in Austria.",
      "Over 60% of Austria consists of mountain terrain (Alps).",
      "The Viennese coffeehouse culture is on the UNESCO intangible heritage list.",
      "Austria was the first republic to give women the right to vote (1918)."
    ]
  },

  // --- STEDEN (HOOFDSTEDEN) ---
  {
    id: "berlin",
    category: "capital",
    dutchName: "Berlijn",
    englishName: "Berlin",
    emoji: "🐻",
    coordinates: [13.4, 52.52],
    countryId: "germany",
    description: "De hoofdstad en grootste stad van Duitsland, een bruisende metropool vol kunst en geschiedenis.",
    funFacts: [
      "Berlijn heeft meer bruggen dan Venetië: ruim 960 stuks.",
      "De stad is negen keer zo groot als Parijs binnen de stadsgrenzen.",
      "Berlijn heeft meer musea dan regenachtige dagen per jaar.",
      "De Berlijnse Muur werd op 9 november 1989 geopend na massale protesten.",
      "De Brandenburger Tor is het symbool van de hereniging van Duitsland."
    ],
    englishFunFacts: [
      "Berlin has more bridges than Venice: over 960 of them.",
      "The city is nine times the size of Paris within its city limits.",
      "Berlin has more museums than rainy days per year.",
      "The Berlin Wall was opened on 9 November 1989 after mass protests.",
      "The Brandenburg Gate is the symbol of German reunification."
    ]
  },
  {
    id: "luxembourg_city",
    category: "capital",
    dutchName: "Luxemburg",
    englishName: "Luxembourg City",
    emoji: "🏰",
    coordinates: [6.13, 49.61],
    countryId: "luxembourg",
    description: "De hoofdstad van Luxemburg, gebouwd op rotsen met indrukwekkende kastelruïnes en ravijnen.",
    funFacts: [
      "De oude stad van Luxemburg staat op de UNESCO Werelderfgoedlijst.",
      "De stad heeft een ondergronds netwerk van tunnels, de 'Bock Casemates', uit de 17e eeuw.",
      "Luxemburg-stad is zetel van drie EU-instellingen: het Hof van Justitie, het Rekenhof en het Parlement.",
      "De stad ligt op een hoge rots die drie rivieren omringt.",
      "Meer dan 170 nationaliteiten wonen in Luxemburg-stad."
    ],
    englishFunFacts: [
      "The old city of Luxembourg is on the UNESCO World Heritage List.",
      "The city has an underground network of tunnels, the 'Bock Casemates', from the 17th century.",
      "Luxembourg City is the seat of three EU institutions: the Court of Justice, the Court of Auditors, and Parliament.",
      "The city sits on a high rock surrounded by three rivers.",
      "Over 170 nationalities live in Luxembourg City."
    ]
  },
  {
    id: "paris",
    category: "capital",
    dutchName: "Parijs",
    englishName: "Paris",
    emoji: "🗼",
    coordinates: [2.35, 48.85],
    countryId: "france",
    description: "De hoofdstad van Frankrijk, wereldberoemd als stad van licht, liefde, kunst en mode.",
    funFacts: [
      "De Louvre in Parijs is het drukstbezochte museum ter wereld.",
      "Parijs heeft meer dan 450 parken en tuinen.",
      "De metro van Parijs opende in 1900 en heeft nu meer dan 300 stations.",
      "Parijs staat ook bekend als 'La Ville Lumière' (de stad van het licht).",
      "De Notre-Dame kathedraal trekt jaarlijks meer bezoekers dan de Eiffeltoren."
    ],
    englishFunFacts: [
      "The Louvre in Paris is the most visited museum in the world.",
      "Paris has over 450 parks and gardens.",
      "The Paris Métro opened in 1900 and now has over 300 stations.",
      "Paris is also known as 'La Ville Lumière' (the City of Light).",
      "Notre-Dame Cathedral attracts more visitors annually than the Eiffel Tower."
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
    description: "De hoofdstad van Zwitserland, een middeleeuwse stad met arcades en een historische binnenstad.",
    funFacts: [
      "De historische binnenstad van Bern staat op de UNESCO Werelderfgoedlijst.",
      "Bern heeft meer dan 6 kilometer overdekte arcades — een van de langste ter wereld.",
      "De naam Bern zou afkomstig zijn van het woord 'beer' (beer/bear in Duits).",
      "Albert Einstein woonde in Bern toen hij zijn relativiteitstheorie ontwikkelde (1905).",
      "De Zytglogge (Tijdklokkentoren) in Bern dateert uit de 13e eeuw."
    ],
    englishFunFacts: [
      "The historic old city of Bern is on the UNESCO World Heritage List.",
      "Bern has over 6 kilometres of covered arcades — one of the longest in the world.",
      "The name Bern is said to come from the word 'bear' (Bär in German).",
      "Albert Einstein lived in Bern when he developed his theory of relativity (1905).",
      "The Zytglogge (Clock Tower) in Bern dates from the 13th century."
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
    description: "De hoofdstad van Oostenrijk, wereldberoemd om zijn klassieke muziek, koffiehuizen en keizerlijke paleizen.",
    funFacts: [
      "Wenen werd meerdere jaren op rij gekozen als de meest leefbare stad ter wereld.",
      "Mozart, Beethoven, Brahms en Strauss leefden en werkten allemaal in Wenen.",
      "Het Wiener Prater heeft het oudste nog werkende reuzenrad ter wereld (1897).",
      "Wenen heeft meer dan 100 musea.",
      "Het Schönbrunn paleis in Wenen heeft 1.441 kamers."
    ],
    englishFunFacts: [
      "Vienna was voted the world's most liveable city for several years in a row.",
      "Mozart, Beethoven, Brahms, and Strauss all lived and worked in Vienna.",
      "The Wiener Prater has the world's oldest still-operating Ferris wheel (1897).",
      "Vienna has over 100 museums.",
      "The Schönbrunn Palace in Vienna has 1,441 rooms."
    ]
  },

  // --- STEDEN (NIET-HOOFDSTEDEN) ---
  {
    id: "hamburg",
    category: "city",
    dutchName: "Hamburg",
    englishName: "Hamburg",
    emoji: "⚓",
    coordinates: [10.0, 53.55],
    countryId: "germany",
    description: "De op één na grootste stad van Duitsland en een van de grootste havens van Europa.",
    funFacts: [
      "Hamburg heeft de op twee na grootste haven van Europa.",
      "De stad heeft meer bruggen dan Venetië, Amsterdam en Londen samen.",
      "The Beatles begonnen hun carrière in de clubs van Hamburg.",
      "Hamburg heeft meer millionairs per inwoner dan welke andere stad in Duitsland.",
      "De Speicherstadt (opslagstad) in Hamburg is de grootste historische pakhuiswijk ter wereld."
    ],
    englishFunFacts: [
      "Hamburg has the third-largest port in Europe.",
      "The city has more bridges than Venice, Amsterdam, and London combined.",
      "The Beatles began their career in the clubs of Hamburg.",
      "Hamburg has more millionaires per capita than any other city in Germany.",
      "The Speicherstadt (warehouse city) in Hamburg is the largest historic warehouse district in the world."
    ]
  },
  {
    id: "cologne",
    category: "city",
    dutchName: "Keulen",
    englishName: "Cologne",
    emoji: "⛪",
    coordinates: [6.96, 50.93],
    countryId: "germany",
    description: "Een grote stad aan de Rijn, thuisbasis van de beroemde gotische Keulse Dom.",
    funFacts: [
      "De Keulse Dom werd begonnen in 1248 en duurde 632 jaar om te bouwen (klaar in 1880).",
      "Eau de Cologne is vernoemd naar de stad Keulen (Köln in het Duits).",
      "Keulen is de vierde grootste stad van Duitsland.",
      "De stad werd tijdens WO2 voor 90% verwoest maar de Dom bleef staan.",
      "Keulen heeft een van de grootste carnavalsfeesten ter wereld."
    ],
    englishFunFacts: [
      "Cologne Cathedral was begun in 1248 and took 632 years to build (completed 1880).",
      "Eau de Cologne is named after the city of Cologne (Köln in German).",
      "Cologne is the fourth-largest city in Germany.",
      "The city was 90% destroyed in WW2 but the Cathedral remained standing.",
      "Cologne has one of the largest carnival celebrations in the world."
    ]
  },
  {
    id: "bordeaux",
    category: "city",
    dutchName: "Bordeaux",
    englishName: "Bordeaux",
    emoji: "🍷",
    coordinates: [-0.58, 44.84],
    countryId: "france",
    description: "Een havenstad in Zuid-Frankrijk, wereldberoemd als centrum van de wijnproductie.",
    funFacts: [
      "Bordeaux is de wijnhoofdstad van de wereld: de regio produceert 700 miljoen flessen per jaar.",
      "De binnenstad van Bordeaux staat op de UNESCO Werelderfgoedlijst.",
      "Bordeaux heeft de grootste verzameling 18e-eeuwse architectuur in Europa na Parijs.",
      "De stad ligt aan de Gironde-estuarium, op 100 km van de Atlantische Oceaan.",
      "Bordeaux heeft de grootste stadstram buiten Parijs in Frankrijk."
    ],
    englishFunFacts: [
      "Bordeaux is the wine capital of the world: the region produces 700 million bottles per year.",
      "The city centre of Bordeaux is on the UNESCO World Heritage List.",
      "Bordeaux has the largest collection of 18th-century architecture in Europe after Paris.",
      "The city lies on the Gironde estuary, 100 km from the Atlantic Ocean.",
      "Bordeaux has the largest city tram outside Paris in France."
    ]
  },
  {
    id: "lyon",
    category: "city",
    dutchName: "Lyon",
    englishName: "Lyon",
    emoji: "🦁",
    coordinates: [4.83, 45.74],
    countryId: "france",
    description: "De gastronomische hoofdstad van Frankrijk, gelegen aan de samenvloeiing van de Rhône en de Saône.",
    funFacts: [
      "Lyon wordt beschouwd als de gastronomische hoofdstad van Frankrijk.",
      "De Lumièrebrothers, uitvinders van de film, werden geboren in Lyon.",
      "De historische binnenstad van Lyon staat op de UNESCO Werelderfgoedlijst.",
      "Lyon had 's nachts 's werelds eerste elektrische straatverlichting (1857).",
      "De stad is het centrum van de zijde-industrie in Europa geweest."
    ],
    englishFunFacts: [
      "Lyon is considered the gastronomic capital of France.",
      "The Lumière brothers, inventors of cinema, were born in Lyon.",
      "The historic city centre of Lyon is on the UNESCO World Heritage List.",
      "Lyon had the world's first electric street lighting at night (1857).",
      "The city has been the centre of the silk industry in Europe."
    ]
  },
  {
    id: "geneva",
    category: "city",
    dutchName: "Genève",
    englishName: "Geneva",
    emoji: "🕊️",
    coordinates: [6.15, 46.2],
    countryId: "switzerland",
    description: "Een internationaal centrum voor diplomatie aan het meer van Genève, aan de voet van de Alpen.",
    funFacts: [
      "Genève herbergt meer dan 40 internationale organisaties, waaronder de VN en het Rode Kruis.",
      "Het Meer van Genève is het grootste meer van West-Europa.",
      "De Jet d'Eau, de fontein in het meer, spuit water 140 meter omhoog.",
      "CERN, het grootste deeltjesversnellerlaboratorium ter wereld, ligt bij Genève.",
      "Genève geldt als de duurste stad om in te leven ter wereld."
    ],
    englishFunFacts: [
      "Geneva is home to over 40 international organisations, including the UN and the Red Cross.",
      "Lake Geneva is the largest lake in Western Europe.",
      "The Jet d'Eau, the fountain in the lake, shoots water 140 metres into the air.",
      "CERN, the world's largest particle accelerator laboratory, is located near Geneva.",
      "Geneva is considered the most expensive city to live in the world."
    ]
  },
  {
    id: "marseille",
    category: "city",
    dutchName: "Marseille",
    englishName: "Marseille",
    emoji: "⛵",
    coordinates: [5.37, 43.3],
    countryId: "france",
    description: "De grootste havenstad van Frankrijk, gelegen aan de Middellandse Zee, met een rijke mediterrane cultuur.",
    funFacts: [
      "Marseille is de oudste stad van Frankrijk, gesticht door Griekse kolonisten rond 600 v.Chr.",
      "De haven van Marseille is de grootste van Frankrijk en een van de grootste van Europa.",
      "De bouillabaisse, een beroemde vissoep, stamt oorspronkelijk uit Marseille.",
      "Marseille is de tweede grootste stad van Frankrijk na Parijs.",
      "De kathedraal La Major van Marseille is een van de grootste kerken van Europa."
    ],
    englishFunFacts: [
      "Marseille is the oldest city in France, founded by Greek colonists around 600 BC.",
      "The port of Marseille is the largest in France and one of the largest in Europe.",
      "Bouillabaisse, a famous fish stew, originally comes from Marseille.",
      "Marseille is the second largest city in France after Paris.",
      "The La Major cathedral in Marseille is one of the largest churches in Europe."
    ]
  },
  {
    id: "munich",
    category: "city",
    dutchName: "München",
    englishName: "Munich",
    emoji: "🍺",
    coordinates: [11.58, 48.14],
    countryId: "germany",
    description: "De hoofdstad van de deelstaat Beieren, bekend om Oktoberfest, kunst en de Beierse cultuur.",
    funFacts: [
      "Het Oktoberfest in München is het grootste volksfeest ter wereld, met 6 miljoen bezoekers per jaar.",
      "München heeft drie van de tien beste universiteiten van Duitsland.",
      "BMW (Bayerische Motoren Werke) werd opgericht in München in 1916.",
      "De stad ligt op 530 meter hoogte en heeft prachtig uitzicht op de Alpen.",
      "De Hofbräuhaus in München is een van de bekendste bierhallen ter wereld."
    ],
    englishFunFacts: [
      "Oktoberfest in Munich is the world's largest folk festival, attracting 6 million visitors per year.",
      "Munich has three of the top ten universities in Germany.",
      "BMW (Bayerische Motoren Werke) was founded in Munich in 1916.",
      "The city sits at 530 metres altitude and has a beautiful view of the Alps.",
      "The Hofbräuhaus in Munich is one of the most famous beer halls in the world."
    ]
  },

  // --- WATEREN ---
  {
    id: "mediterranean",
    category: "water",
    dutchName: "Middellandse Zee",
    englishName: "Mediterranean Sea",
    emoji: "🌊",
    coordinates: [15.0, 37.0],
    description: "Een bijna geheel ingesloten zee tussen Europa, Afrika en Azië, het hart van de westerse beschaving.",
    funFacts: [
      "De Middellandse Zee beslaat een oppervlakte van 2,5 miljoen km².",
      "Rondom de Middellandse Zee zijn de culturen van Griekenland, Rome en Egypte ontstaan.",
      "Het water is zouter en warmer dan de Atlantische Oceaan.",
      "Meer dan 450 miljoen mensen wonen langs de kusten van de Middellandse Zee.",
      "De Straat van Gibraltar is de smalle verbinding met de Atlantische Oceaan."
    ],
    englishFunFacts: [
      "The Mediterranean Sea covers an area of 2.5 million km².",
      "The civilisations of Greece, Rome, and Egypt arose around the Mediterranean.",
      "The water is saltier and warmer than the Atlantic Ocean.",
      "Over 450 million people live along the shores of the Mediterranean.",
      "The Strait of Gibraltar is the narrow connection to the Atlantic Ocean."
    ]
  },
  {
    id: "english_channel",
    category: "water",
    dutchName: "Het Kanaal",
    englishName: "English Channel",
    emoji: "⛴️",
    coordinates: [-1.5, 50.5],
    description: "Het water dat Zuid-Engeland scheidt van Noord-Frankrijk, de drukste scheepvaartroute ter wereld.",
    funFacts: [
      "Onder Het Kanaal loopt de Eurotunnel, waarmee je in 35 minuten per trein reist.",
      "Het Kanaal is de drukste scheepvaartroute ter wereld: dagelijks varen er meer dan 500 schepen doorheen.",
      "De eerste persoon die Het Kanaal overzwom was Matthew Webb in 1875.",
      "Op het smalste punt is Het Kanaal slechts 34 kilometer breed (Nauw van Calais).",
      "Het Kanaal ontstond circa 8.000 jaar geleden toen de zeespiegel steeg na de ijstijd."
    ],
    englishFunFacts: [
      "Beneath the Channel runs the Eurotunnel, connecting England and France by train in 35 minutes.",
      "The English Channel is the world's busiest shipping lane: over 500 ships pass through daily.",
      "The first person to swim the Channel was Matthew Webb in 1875.",
      "At its narrowest point, the Channel is only 34 kilometres wide (Strait of Dover).",
      "The Channel formed around 8,000 years ago when sea levels rose after the Ice Age."
    ]
  },
  {
    id: "rhone",
    category: "water",
    dutchName: "Rhône",
    englishName: "Rhône",
    emoji: "🏞️",
    coordinates: [4.8, 44.5],
    description: "Een rivier die ontspringt in de Zwitserse Alpen en uitmondt in de Middellandse Zee.",
    funFacts: [
      "De Rhône is 812 kilometer lang en stroomt door Zwitserland en Frankrijk.",
      "De Rhône-vallei is een van de beroemdste wijnregio's van Frankrijk.",
      "Bij Lyon splitst de Rhône zich en vormt samen met de Saône de stad.",
      "De rivier levert elektriciteit via meerdere stuwdammen.",
      "Het meer van Genève wordt gevoed door de Rhône."
    ],
    englishFunFacts: [
      "The Rhône is 812 kilometres long and flows through Switzerland and France.",
      "The Rhône Valley is one of France's most famous wine regions.",
      "At Lyon the Rhône merges with the Saône to shape the city.",
      "The river generates electricity via several dams.",
      "Lake Geneva is fed by the Rhône."
    ]
  },
  {
    id: "seine",
    category: "water",
    dutchName: "Seine",
    englishName: "Seine",
    emoji: "🌉",
    coordinates: [2.5, 49.0],
    description: "De rivier die door het hart van Parijs stroomt en uitmondt in het Kanaal bij Normandië.",
    funFacts: [
      "De Seine is 775 kilometer lang.",
      "Parijs is gebouwd op een eiland in de Seine: het Île de la Cité.",
      "Langs de Seine liggen meer dan 37 bruggen in Parijs.",
      "De kades van de Seine in Parijs staan op de UNESCO Werelderfgoedlijst.",
      "De Normandische stranden, bron van D-Day in 1944, liggen bij de monding van de Seine."
    ],
    englishFunFacts: [
      "The Seine is 775 kilometres long.",
      "Paris was built on an island in the Seine: the Île de la Cité.",
      "Over 37 bridges span the Seine in Paris.",
      "The banks of the Seine in Paris are on the UNESCO World Heritage List.",
      "The Normandy beaches, site of D-Day in 1944, are near the mouth of the Seine."
    ]
  },
  {
    id: "danube",
    category: "water",
    dutchName: "Donau",
    englishName: "Danube",
    emoji: "💙",
    coordinates: [17.0, 47.8],
    description: "De op één na langste rivier van Europa, die door tien landen stroomt van Duitsland tot de Zwarte Zee.",
    funFacts: [
      "De Donau stroomt door meer landen dan welke andere rivier ter wereld: 10 landen.",
      "De rivier is 2.860 kilometer lang.",
      "Wenen, Boedapest en Belgrado liggen alle drie aan de Donau.",
      "De beroemde wals 'De Blauwe Donau' van Johann Strauss is geïnspireerd op deze rivier.",
      "De Donau mondt uit in de Zwarte Zee in Roemenië."
    ],
    englishFunFacts: [
      "The Danube flows through more countries than any other river in the world: 10 countries.",
      "The river is 2,860 kilometres long.",
      "Vienna, Budapest, and Belgrade all lie on the Danube.",
      "The famous waltz 'The Blue Danube' by Johann Strauss was inspired by this river.",
      "The Danube flows into the Black Sea in Romania."
    ]
  },
  {
    id: "rhine",
    category: "water",
    dutchName: "Rijn",
    englishName: "Rhine",
    emoji: "🚢",
    coordinates: [7.5, 50.5],
    description: "Een van de belangrijkste rivieren van Europa, die ontspringt in de Alpen en uitmondt in de Noordzee.",
    funFacts: [
      "De Rijn is 1.230 kilometer lang en stroomt door Zwitserland, Duitsland en Nederland.",
      "Het Rijnland is een van de dichtst bevolkte en industrieel meest actieve gebieden van Europa.",
      "De Lorelei is een beroemde rots langs de Rijn in Duitsland, omgeven door legendes.",
      "De Rijn is een van de drukstbevaren rivieren ter wereld.",
      "Via de Rijn zijn Rotterdam en de rest van Europa verbonden met het achterland."
    ],
    englishFunFacts: [
      "The Rhine is 1,230 kilometres long and flows through Switzerland, Germany, and the Netherlands.",
      "The Rhine Valley is one of Europe's most densely populated and industrially active areas.",
      "The Lorelei is a famous rock along the Rhine in Germany, surrounded by legends.",
      "The Rhine is one of the most heavily trafficked rivers in the world.",
      "Via the Rhine, Rotterdam and the rest of Europe are connected to the hinterland."
    ]
  },

  // --- REGIO'S ---
  {
    id: "ruhrgebiet",
    category: "region",
    dutchName: "Ruhrgebied",
    englishName: "Ruhr Area",
    emoji: "🏭",
    coordinates: [7.2, 51.5],
    description: "Het grootste stedelijke en industriële gebied van Duitsland, gelegen langs de rivier de Ruhr.",
    funFacts: [
      "Het Ruhrgebied was in de 19e en 20e eeuw het industriële hart van Europa.",
      "De regio telt meer dan 5 miljoen inwoners in steden als Essen, Dortmund en Bochum.",
      "Ooit waren er meer dan 200 actieve kolenmijnen in het Ruhrgebied.",
      "De regio ondergaat nu een grote transformatie van industrie naar cultuur en technologie.",
      "De Zeche Zollverein, een voormalige kolenmijn in Essen, staat op de UNESCO Werelderfgoedlijst."
    ],
    englishFunFacts: [
      "The Ruhr Area was the industrial heart of Europe in the 19th and 20th century.",
      "The region has over 5 million inhabitants in cities such as Essen, Dortmund, and Bochum.",
      "There were once over 200 active coal mines in the Ruhr Area.",
      "The region is now undergoing a major transformation from industry to culture and technology.",
      "The Zeche Zollverein, a former coal mine in Essen, is on the UNESCO World Heritage List."
    ]
  },

  // --- GEBERGTEN ---
  {
    id: "pyrenees",
    category: "mountain",
    dutchName: "Pyreneeën",
    englishName: "Pyrenees",
    emoji: "🏔️",
    coordinates: [0.5, 42.7],
    description: "Een bergketen die de grens vormt tussen Frankrijk en Spanje, van de Atlantische Oceaan tot de Middellandse Zee.",
    funFacts: [
      "De Pyreneeën strekken zich over 430 kilometer uit van de Atlantische Oceaan tot de Middellandse Zee.",
      "De hoogste top is de Pico de Aneto in Spanje, op 3.404 meter.",
      "Andorra, een van de kleinste landen ter wereld, ligt verscholen in de Pyreneeën.",
      "De Pyreneeën vormen een natuurlijke grens tussen Frankrijk en Spanje.",
      "De Tour de France trekt elk jaar over de beklimmingen van de Pyreneeën."
    ],
    englishFunFacts: [
      "The Pyrenees stretch over 430 kilometres from the Atlantic Ocean to the Mediterranean Sea.",
      "The highest peak is the Pico de Aneto in Spain, at 3,404 metres.",
      "Andorra, one of the smallest countries in the world, is tucked away in the Pyrenees.",
      "The Pyrenees form a natural border between France and Spain.",
      "The Tour de France crosses the climbs of the Pyrenees every year."
    ]
  },
  {
    id: "alps",
    category: "mountain",
    dutchName: "Alpen",
    englishName: "Alps",
    emoji: "⛰️",
    coordinates: [10.0, 46.5],
    description: "Het grootste gebergte van Europa, dat zich uitstrekt over acht landen in het hart van Europa.",
    funFacts: [
      "De Alpen strekken zich over 1.200 kilometer uit door acht landen.",
      "De Mont Blanc (4.808 m) is de hoogste berg van de Alpen en van geheel West-Europa.",
      "Meer dan 150 miljoen toeristen bezoeken de Alpen elk jaar.",
      "De Alpen zijn de bron van grote rivieren als de Rijn, Rhône, Po en Donau.",
      "De Alpen werden gevormd door de botsing van de Afrikaanse en Euraziatische tektonische platen."
    ],
    englishFunFacts: [
      "The Alps stretch over 1,200 kilometres through eight countries.",
      "Mont Blanc (4,808 m) is the highest mountain in the Alps and in all of Western Europe.",
      "Over 150 million tourists visit the Alps every year.",
      "The Alps are the source of major rivers such as the Rhine, Rhône, Po, and Danube.",
      "The Alps were formed by the collision of the African and Eurasian tectonic plates."
    ]
  },
];

// Helper functie om een willekeurig weetje te krijgen
export const getRandomFunFact = (itemId: string, lang: 'nl' | 'en' = 'nl'): string | null => {
  const item = europeData.find(i => i.id === itemId);
  if (item) {
    const facts = lang === 'nl' ? item.funFacts : (item.englishFunFacts || []);
    if (facts.length > 0) {
      return facts[Math.floor(Math.random() * facts.length)];
    }
  }
  return null;
};

// Helper functie om item op id te vinden
export const getItemById = (id: string): GeoItem | undefined => {
  return europeData.find(item => item.id === id);
};

// Helper functie om land te vinden voor een stad/hoofdstad
export const getCountryForCapital = (capitalId: string): GeoItem | undefined => {
  const capital = europeData.find(item => item.id === capitalId);
  if (capital?.countryId) {
    return europeData.find(item => item.id === capital.countryId);
  }
  return undefined;
};

// Wikipedia zoektermen voor disambiguatie
export const wikiSearchTerms: Record<string, { nl: string; en: string }> = {
  germany: { nl: 'Duitsland', en: 'Germany' },
  luxembourg: { nl: 'Luxemburg (land)', en: 'Luxembourg' },
  france: { nl: 'Frankrijk', en: 'France' },
  switzerland: { nl: 'Zwitserland', en: 'Switzerland' },
  austria: { nl: 'Oostenrijk (land)', en: 'Austria' },
  berlin: { nl: 'Berlijn (stad)', en: 'Berlin' },
  luxembourg_city: { nl: 'Luxemburg (stad)', en: 'Luxembourg City' },
  paris: { nl: 'Parijs (stad)', en: 'Paris' },
  bern: { nl: 'Bern (stad)', en: 'Bern' },
  vienna: { nl: 'Wenen', en: 'Vienna' },
  hamburg: { nl: 'Hamburg (stad)', en: 'Hamburg' },
  cologne: { nl: 'Keulen', en: 'Cologne' },
  bordeaux: { nl: 'Bordeaux (stad)', en: 'Bordeaux' },
  lyon: { nl: 'Lyon (stad)', en: 'Lyon' },
  geneva: { nl: 'Genève (stad)', en: 'Geneva' },
  marseille: { nl: 'Marseille (stad)', en: 'Marseille' },
  munich: { nl: 'München', en: 'Munich' },
  mediterranean: { nl: 'Middellandse Zee', en: 'Mediterranean Sea' },
  english_channel: { nl: 'Het Kanaal (zeestraat)', en: 'English Channel' },
  rhone: { nl: 'Rhône (rivier)', en: 'Rhône' },
  seine: { nl: 'Seine (rivier)', en: 'Seine' },
  danube: { nl: 'Donau (rivier)', en: 'Danube' },
  rhine: { nl: 'Rijn (rivier)', en: 'Rhine' },
  ruhrgebiet: { nl: 'Ruhrgebied', en: 'Ruhr Area' },
  pyrenees: { nl: 'Pyreneeën', en: 'Pyrenees' },
  alps: { nl: 'Alpen', en: 'Alps' },
};
