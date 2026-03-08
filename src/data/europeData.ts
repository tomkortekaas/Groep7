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
    id: "netherlands",
    category: "country",
    dutchName: "Nederland",
    englishName: "Netherlands",
    emoji: "🇳🇱",
    coordinates: [5.3, 52.1],
    description: "Een laaggelegen land in Noordwest-Europa, bekend om zijn tulpen, windmolens en grachten.",
    funFacts: [
      "Nederland heeft meer fietsen dan inwoners — ruim 23 miljoen fietsen voor 17 miljoen mensen.",
      "Meer dan een kwart van Nederland ligt onder zeeniveau.",
      "De Nederlandse polders zijn drooggelegd met windmolens en ingenieus waterbeheer.",
      "Nederland is 's werelds grootste exporteur van tulpen en andere bloembollen.",
      "Amsterdam heeft meer dan 100 kilometer aan grachten en meer dan 1.200 bruggen."
    ],
    englishFunFacts: [
      "The Netherlands has more bicycles than inhabitants — over 23 million bikes for 17 million people.",
      "More than a quarter of the Netherlands lies below sea level.",
      "Dutch polders were reclaimed using windmills and ingenious water management.",
      "The Netherlands is the world's largest exporter of tulips and flower bulbs.",
      "Amsterdam has over 100 kilometres of canals and more than 1,200 bridges."
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
      "België heeft het wereldrecord voor de langste tijd zonder regering: 541 dagen in 2010-2011.",
      "Bier is zo belangrijk in België dat er meer dan 1.500 verschillende biersoorten worden gebrouwen.",
      "Frieten zijn niet Frans maar Belgisch uitgevonden — vandaar ook wel 'Belgian fries'."
    ],
    englishFunFacts: [
      "Belgium produces over 220,000 tonnes of chocolate per year.",
      "The Smurfs and Tintin both originated in Belgium.",
      "Belgium holds the world record for the longest period without a government: 541 days in 2010-2011.",
      "Beer is so important in Belgium that over 1,500 different beer types are brewed there.",
      "French fries were actually invented in Belgium, not France — hence 'Belgian fries'."
    ]
  },
  {
    id: "denmark",
    category: "country",
    dutchName: "Denemarken",
    englishName: "Denmark",
    emoji: "🇩🇰",
    coordinates: [10.0, 56.0],
    description: "Een Scandinavisch land bestaande uit het schiereiland Jutland en ruim 400 eilanden.",
    funFacts: [
      "De Deense vlag (Dannebrog) is de oudste nog steeds gebruikte nationale vlag ter wereld, uit circa 1370.",
      "Denemarken staat elk jaar in de top 3 van gelukkigste landen ter wereld.",
      "De sprookjesschrijver Hans Christian Andersen ('De Kleine Zeemeermin') was een Deen.",
      "Denemarken is een van de meest fietsvriendelijke landen ter wereld.",
      "LEGO is uitgevonden door de Deen Ole Kirk Christiansen in 1932."
    ],
    englishFunFacts: [
      "The Danish flag (Dannebrog) is the oldest still-used national flag in the world, dating from around 1370.",
      "Denmark consistently ranks in the top 3 happiest countries in the world.",
      "The fairy tale writer Hans Christian Andersen ('The Little Mermaid') was Danish.",
      "Denmark is one of the most cycle-friendly countries in the world.",
      "LEGO was invented by Dane Ole Kirk Christiansen in 1932."
    ]
  },
  {
    id: "estonia",
    category: "country",
    dutchName: "Estland",
    englishName: "Estonia",
    emoji: "🇪🇪",
    coordinates: [25.0, 58.7],
    description: "Een Baltisch land met uitgestrekte bossen, duizenden eilanden en een digitale samenleving.",
    funFacts: [
      "Estland was het eerste land ter wereld dat stemmen bij verkiezingen volledig online mogelijk maakte (2005).",
      "Skype werd mede ontwikkeld door Estse programmeurs in Tallinn.",
      "Meer dan de helft van Estland is bedekt met bos.",
      "Estland heeft meer dan 2.000 eilanden in de Oostzee.",
      "De Estse taal is nauw verwant aan het Fins, maar niet aan de Slavische of Germaanse talen."
    ],
    englishFunFacts: [
      "Estonia was the first country in the world to allow fully online voting in elections (2005).",
      "Skype was partly developed by Estonian programmers in Tallinn.",
      "More than half of Estonia is covered by forest.",
      "Estonia has over 2,000 islands in the Baltic Sea.",
      "The Estonian language is closely related to Finnish, but not to Slavic or Germanic languages."
    ]
  },
  {
    id: "finland",
    category: "country",
    dutchName: "Finland",
    englishName: "Finland",
    emoji: "🇫🇮",
    coordinates: [26.0, 64.0],
    description: "Een Scandinavisch land bekend als het 'Land van duizend meren' en de geboorteplaats van de sauna.",
    funFacts: [
      "Finland heeft meer dan 188.000 meren — meer dan welk ander land ter wereld per oppervlakte.",
      "Er zijn in Finland meer saunas dan auto's: ruim 3 miljoen saunas voor 5,5 miljoen inwoners.",
      "De Kerstman woont officieel in Rovaniemi, Finland (op de Poolcirkel).",
      "Finland staat al jaren bovenaan de ranglijst van de meest geletterde landen ter wereld.",
      "De Finse taal heeft 15 naamvallen, terwijl het Nederlands er maar twee heeft."
    ],
    englishFunFacts: [
      "Finland has over 188,000 lakes — more than any other country in the world per area.",
      "Finland has more saunas than cars: over 3 million saunas for 5.5 million inhabitants.",
      "Santa Claus officially lives in Rovaniemi, Finland (on the Arctic Circle).",
      "Finland has topped the world's most literate countries ranking for years.",
      "The Finnish language has 15 grammatical cases, while English has only two."
    ]
  },
  {
    id: "ireland",
    category: "country",
    dutchName: "Ierland",
    englishName: "Ireland",
    emoji: "🇮🇪",
    coordinates: [-8.2, 53.4],
    description: "Een eilandland in West-Europa, bekend om zijn groene landschappen en rijke keltische cultuur.",
    funFacts: [
      "Halloween stamt oorspronkelijk uit Ierland, van het Keltische feest Samhain.",
      "Ierland is het enige land ter wereld waarvan het nationale symbool een muziekinstrument is: de harp.",
      "Bram Stoker, de schrijver van Dracula, werd in Dublin geboren.",
      "Ierland heeft vier officiële nationale feestdagen, waaronder St. Patrick's Day op 17 maart.",
      "Het Ierse woord voor whisky, 'uisce beatha', betekent letterlijk 'water des levens'."
    ],
    englishFunFacts: [
      "Halloween originally comes from Ireland, from the Celtic festival of Samhain.",
      "Ireland is the only country in the world whose national symbol is a musical instrument: the harp.",
      "Bram Stoker, the author of Dracula, was born in Dublin.",
      "Ireland has four official national holidays, including St. Patrick's Day on 17 March.",
      "The Irish word for whiskey, 'uisce beatha', literally means 'water of life'."
    ]
  },
  {
    id: "iceland",
    category: "country",
    dutchName: "IJsland",
    englishName: "Iceland",
    emoji: "🇮🇸",
    coordinates: [-19.0, 65.0],
    description: "Een eilandland in de Noord-Atlantische Oceaan, bekend om vulkanen, geisers en het noorderlicht.",
    funFacts: [
      "IJsland heeft geen muggen — ze bestaan simpelweg niet op het eiland.",
      "IJsland wekt bijna al zijn elektriciteit op uit hernieuwbare energie (geothermisch en waterkracht).",
      "Ondanks de naam is IJsland groener dan Groenland, dat voor 80% bedekt is met ijs.",
      "IJsland had de eerste democratisch gekozen vrouwelijke president ter wereld (Vigdís Finnbogadóttir, 1980).",
      "Er zijn meer actieve vulkanen op IJsland dan in heel Europa bij elkaar."
    ],
    englishFunFacts: [
      "Iceland has no mosquitoes — they simply don't exist on the island.",
      "Iceland generates almost all of its electricity from renewable energy (geothermal and hydroelectric).",
      "Despite its name, Iceland is greener than Greenland, which is 80% covered in ice.",
      "Iceland had the world's first democratically elected female president (Vigdís Finnbogadóttir, 1980).",
      "There are more active volcanoes in Iceland than in the rest of Europe combined."
    ]
  },
  {
    id: "latvia",
    category: "country",
    dutchName: "Letland",
    englishName: "Latvia",
    emoji: "🇱🇻",
    coordinates: [24.8, 57.0],
    description: "Een Baltisch land met uitgestrekte bossen, witte zandstranden aan de Oostzee en een rijke folklorecultuur.",
    funFacts: [
      "Riga was in de 16e eeuw een van de grootste steden in Noord-Europa.",
      "De kerstboomtraditie is mogelijk uitgevonden in Riga in 1510 — de oudste vermelding ter wereld.",
      "Letland heeft het hoogste percentage bebost gebied van alle EU-landen na Finland en Zweden.",
      "Het Lets is een van de oudste nog gesproken talen ter wereld en nauw verwant aan het Litouws.",
      "Letland heeft meer vrouwelijke managers dan welk ander Europees land ook."
    ],
    englishFunFacts: [
      "Riga was one of the largest cities in Northern Europe in the 16th century.",
      "The Christmas tree tradition may have been invented in Riga in 1510 — the oldest recorded use in the world.",
      "Latvia has the highest percentage of forested land of all EU countries after Finland and Sweden.",
      "Latvian is one of the oldest living languages in the world and closely related to Lithuanian.",
      "Latvia has more female managers than any other European country."
    ]
  },
  {
    id: "lithuania",
    category: "country",
    dutchName: "Litouwen",
    englishName: "Lithuania",
    emoji: "🇱🇹",
    coordinates: [23.9, 55.9],
    description: "Het grootste van de drie Baltische staten, met een rijke geschiedenis als vroeger grootmacht in Europa.",
    funFacts: [
      "In de 14e en 15e eeuw was het Groothertogdom Litouwen het grootste land van Europa.",
      "Litouwen was het laatste land in Europa dat officieel tot het christendom overging (1387).",
      "Basketball is in Litouwen bijna een religie — de nationale ploeg won twee keer olympisch brons.",
      "De oude binnenstad van Vilnius staat op de UNESCO Werelderfgoedlijst als een van de grootste in Europa.",
      "Litouwse amber (barnsteen) uit de Oostzee wordt al duizenden jaren verhandeld."
    ],
    englishFunFacts: [
      "In the 14th and 15th centuries, the Grand Duchy of Lithuania was the largest country in Europe.",
      "Lithuania was the last country in Europe to officially convert to Christianity (1387).",
      "Basketball is almost a religion in Lithuania — the national team won Olympic bronze twice.",
      "The old town of Vilnius is on the UNESCO World Heritage List as one of the largest in Europe.",
      "Lithuanian amber from the Baltic Sea has been traded for thousands of years."
    ]
  },
  {
    id: "norway",
    category: "country",
    dutchName: "Noorwegen",
    englishName: "Norway",
    emoji: "🇳🇴",
    coordinates: [8.5, 61.0],
    description: "Een Scandinavisch land met bergen, gletsjers en diepe fjorden langs de kust.",
    funFacts: [
      "Noorwegen introduceerde zalmsushi in Japan in de jaren '80 — nu een wereldwijde hit.",
      "In het noorden gaat de zon in de zomer wekenlang niet onder (middernachtzon).",
      "De paperclip is een Noorse uitvinding (Johan Vaaler, 1899).",
      "Noorwegen heeft een van de grootste staatsfondsen ter wereld, gevuld met olie-inkomsten.",
      "Zo'n 70% van Noorwegen bestaat uit bergen en rotsachtig terrein."
    ],
    englishFunFacts: [
      "Norway introduced salmon sushi to Japan in the 1980s — now a worldwide hit.",
      "In the north, the sun doesn't set for weeks in summer (midnight sun).",
      "The paper clip was a Norwegian invention (Johan Vaaler, 1899).",
      "Norway has one of the world's largest sovereign wealth funds, filled with oil revenues.",
      "About 70% of Norway consists of mountains and rocky terrain."
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
      "De Koning is technisch gezien eigenaar van alle zwanen in open water in het VK.",
      "Je bent in het VK nooit verder dan 115 kilometer van de zee verwijderd.",
      "Het wereldwijd bekende spel voetbal (soccer) is uitgevonden in Engeland.",
      "Het VK heeft geen geschreven grondwet — de regels staan verspreid over vele wetten en tradities.",
      "De Britten drinken meer dan 165 miljoen kopjes thee per dag."
    ],
    englishFunFacts: [
      "The King technically owns all mute swans in open water in the UK.",
      "You are never more than 115 kilometres from the sea anywhere in the UK.",
      "The globally popular sport of football (soccer) was invented in England.",
      "The UK has no written constitution — its rules are spread across many laws and traditions.",
      "The British drink over 165 million cups of tea every day."
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
      "Zweden heeft een ijshotel dat elk jaar opnieuw volledig uit ijs en sneeuw wordt gebouwd.",
      "Zweden importeert afval uit andere landen om energie op te wekken — zo weinig afval produceren ze zelf.",
      "Minecraft is uitgevonden door Zweed Markus 'Notch' Persson in 2009.",
      "De veiligheidsgordel (driehaaksgordel) is een Zweedse uitvinding van Nils Bohlin (Volvo, 1959).",
      "Zweden heeft meer dan 220.000 eilanden langs zijn kust en in zijn meren."
    ],
    englishFunFacts: [
      "Sweden has an ice hotel that is completely rebuilt from ice and snow every year.",
      "Sweden imports waste from other countries to generate energy — they produce so little waste themselves.",
      "Minecraft was invented by Swede Markus 'Notch' Persson in 2009.",
      "The three-point safety belt was a Swedish invention by Nils Bohlin (Volvo, 1959).",
      "Sweden has over 220,000 islands along its coast and in its lakes."
    ]
  },

  // --- STEDEN (HOOFDSTEDEN) ---
  {
    id: "brussels",
    category: "capital",
    dutchName: "Brussel",
    englishName: "Brussels",
    emoji: "🍟",
    coordinates: [4.35, 50.85],
    countryId: "belgium",
    description: "De hoofdstad van België en het bestuurscentrum van de Europese Unie.",
    funFacts: [
      "Het symbool van Brussel is Manneken Pis: een klein standbeeldje van een plassend jongetje.",
      "Frieten (French Fries) zijn eigenlijk in de regio rond Brussel uitgevonden, niet in Frankrijk.",
      "Brussel heeft meer dan 90 gemeenten en is officieel tweetalig (Frans en Nederlands).",
      "Het Atomium in Brussel is een bouwsel in de vorm van een ijzercel, vergroot 165 miljard keer.",
      "Brussel is de thuisbasis van de NAVO én de Europese Commissie."
    ],
    englishFunFacts: [
      "The symbol of Brussels is Manneken Pis: a small statue of a urinating boy.",
      "French fries were actually invented in the region around Brussels, not in France.",
      "Brussels has over 90 municipalities and is officially bilingual (French and Dutch).",
      "The Atomium in Brussels is a structure shaped like an iron unit cell, enlarged 165 billion times.",
      "Brussels is home to both NATO and the European Commission."
    ]
  },
  {
    id: "dublin",
    category: "capital",
    dutchName: "Dublin",
    englishName: "Dublin",
    emoji: "🍀",
    coordinates: [-6.26, 53.33],
    countryId: "ireland",
    description: "De hoofdstad van Ierland, gelegen aan de monding van de rivier de Liffey.",
    funFacts: [
      "Bram Stoker, de schrijver van Dracula, werd geboren en groeide op in Dublin.",
      "Het Book of Kells — een schitterend verluchtig manuscript uit 800 n.Chr. — wordt bewaard in Dublin.",
      "Dublin heeft meer pubs per vierkante kilometer dan welke andere hoofdstad in Europa ook.",
      "De naam Dublin stamt af van 'Dubh Linn' (Gaelisch voor 'zwarte poel').",
      "Beroemde schrijvers als Oscar Wilde, James Joyce en Samuel Beckett kwamen uit Dublin."
    ],
    englishFunFacts: [
      "Bram Stoker, the author of Dracula, was born and grew up in Dublin.",
      "The Book of Kells — a stunning illuminated manuscript from 800 AD — is kept in Dublin.",
      "Dublin has more pubs per square kilometre than any other capital in Europe.",
      "The name Dublin comes from 'Dubh Linn' (Gaelic for 'black pool').",
      "Famous writers Oscar Wilde, James Joyce, and Samuel Beckett all came from Dublin."
    ]
  },
  {
    id: "helsinki",
    category: "capital",
    dutchName: "Helsinki",
    englishName: "Helsinki",
    emoji: "🧖",
    coordinates: [24.94, 60.17],
    countryId: "finland",
    description: "De hoofdstad van Finland, gebouwd op een rotsachtig schiereiland omgeven door eilanden.",
    funFacts: [
      "Helsinki is de meest noordelijk gelegen hoofdstad ter wereld (samen met Reykjavik).",
      "De stad telt meer dan 300 eilanden rondom het schiereiland.",
      "Helsinki ontvangt elk jaar meer regen dan Amsterdam, maar heeft ook meer zonnige dagen.",
      "De stad werd gesticht door de Zweedse koning Gustaaf Vasa in 1550.",
      "Helsinki werd in 2012 uitgeroepen tot Wereldontwerp Hoofdstad door de UNESCO."
    ],
    englishFunFacts: [
      "Helsinki is the most northerly capital city in the world (together with Reykjavik).",
      "The city has over 300 islands around its peninsula.",
      "Helsinki receives more rain than Amsterdam per year, but also has more sunny days.",
      "The city was founded by Swedish King Gustav Vasa in 1550.",
      "Helsinki was named World Design Capital by UNESCO in 2012."
    ]
  },
  {
    id: "copenhagen",
    category: "capital",
    dutchName: "Kopenhagen",
    englishName: "Copenhagen",
    emoji: "🧜",
    coordinates: [12.57, 55.68],
    countryId: "denmark",
    description: "De hoofdstad van Denemarken, een levendige havenstad bekend om design, duurzaamheid en fietsen.",
    funFacts: [
      "Kopenhagen werd meerdere jaren op rij verkozen tot de meest leefbare stad ter wereld.",
      "Het beroemde standbeeld De Kleine Zeemeermin is gebaseerd op het sprookje van Hans Christian Andersen.",
      "Kopenhagen streeft ernaar de eerste CO₂-neutrale hoofdstad ter wereld te worden (doel: 2025).",
      "Meer dan 60% van de inwoners fietst dagelijks naar werk of school.",
      "In de 17e eeuw was Kopenhagen de grootste stad in Scandinavië."
    ],
    englishFunFacts: [
      "Copenhagen was voted the most liveable city in the world for several consecutive years.",
      "The famous statue The Little Mermaid is based on the fairy tale by Hans Christian Andersen.",
      "Copenhagen aims to become the world's first carbon-neutral capital (target: 2025).",
      "More than 60% of residents cycle to work or school every day.",
      "In the 17th century, Copenhagen was the largest city in Scandinavia."
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
    description: "De hoofdstad van het VK, een wereldstad met een geschiedenis die teruggaat tot de Romeinse tijd.",
    funFacts: [
      "Big Ben is de naam van de klok (bel) in de toren, niet de toren zelf.",
      "Londen was de eerste stad ter wereld met een ondergrondse metro (1863).",
      "Meer dan 300 talen worden dagelijks gesproken in Londen.",
      "De Theems (Thames) die door Londen stroomt, kan bij springtij met 7 meter in hoogte stijgen.",
      "Londen heeft meer dan 170 musea, waarvan vele gratis toegankelijk zijn."
    ],
    englishFunFacts: [
      "Big Ben is the name of the bell (clock) in the tower, not the tower itself.",
      "London was the first city in the world with an underground railway (1863).",
      "Over 300 languages are spoken daily in London.",
      "The Thames flowing through London can rise 7 metres in height during spring tides.",
      "London has over 170 museums, many of which are free to enter."
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
    description: "De hoofdstad van Noorwegen, gelegen aan de Oslofjord en omgeven door heuvels en bossen.",
    funFacts: [
      "De Nobelprijs voor de Vrede wordt elk jaar in Oslo uitgereikt.",
      "De helft van de gemeente Oslo bestaat uit bos en parken.",
      "De kerstboom op Trafalgar Square in Londen is elk jaar een cadeau van de stad Oslo.",
      "Oslo was in de middeleeuwen bekend als Christiania — die naam had het tot 1925.",
      "De Vikingschepen die in Oslo te zien zijn, zijn meer dan 1.000 jaar oud en uitstekend bewaard."
    ],
    englishFunFacts: [
      "The Nobel Peace Prize is awarded in Oslo every year.",
      "Half of Oslo municipality consists of forest and parks.",
      "The Christmas tree on Trafalgar Square in London is an annual gift from the city of Oslo.",
      "Oslo was known as Christiania in the Middle Ages — it kept that name until 1925.",
      "The Viking ships on display in Oslo are over 1,000 years old and remarkably well preserved."
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
    description: "De hoofdstad van Zweden, gebouwd op 14 eilanden en verbonden door meer dan 50 bruggen.",
    funFacts: [
      "Het metrosysteem van Stockholm staat bekend als de langste kunstgalerij ter wereld.",
      "Je kunt midden in de stad vissen op zalm — het is zelfs wettelijk toegestaan.",
      "Het koninklijk paleis in Stockholm heeft meer dan 600 kamers.",
      "Stockholm werd gesticht in 1252 en is vernoemd naar 'stock' (boomstam) en 'holm' (eilandje).",
      "Spotify, de muziekstreamingdienst, is opgericht in Stockholm (2006)."
    ],
    englishFunFacts: [
      "Stockholm's metro system is known as the world's longest art gallery.",
      "You can fish for salmon right in the city centre — it is even legally permitted.",
      "The Royal Palace in Stockholm has over 600 rooms.",
      "Stockholm was founded in 1252 and is named after 'stock' (log) and 'holm' (small island).",
      "Spotify, the music streaming service, was founded in Stockholm (2006)."
    ]
  },

  // --- STEDEN (NIET-HOOFDSTEDEN) ---
  {
    id: "antwerp",
    category: "city",
    dutchName: "Antwerpen",
    englishName: "Antwerp",
    emoji: "💎",
    coordinates: [4.4, 51.22],
    countryId: "belgium",
    description: "De grootste haven van België en een wereldcentrum voor de diamanthandel.",
    funFacts: [
      "Antwerpen verwerkt meer dan 80% van de ruwe diamanten in de wereld.",
      "De haven van Antwerpen is de op één na grootste van Europa (na Rotterdam).",
      "De schilder Peter Paul Rubens woonde en werkte in Antwerpen in de 17e eeuw.",
      "In de Middeleeuwen was Antwerpen de rijkste handelsstad van Europa.",
      "Het Centraal Station van Antwerpen wordt wel de 'Spoorwegkathedraal' genoemd."
    ],
    englishFunFacts: [
      "Antwerp processes over 80% of the world's rough diamonds.",
      "The Port of Antwerp is the second largest in Europe (after Rotterdam).",
      "Painter Peter Paul Rubens lived and worked in Antwerp in the 17th century.",
      "In the Middle Ages, Antwerp was the richest trading city in Europe.",
      "Antwerp's Central Station is nicknamed the 'Railway Cathedral'."
    ]
  },
  {
    id: "glasgow",
    category: "city",
    dutchName: "Glasgow",
    englishName: "Glasgow",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    coordinates: [-4.25, 55.87],
    countryId: "uk",
    description: "De grootste stad van Schotland, vroeger een wereldcentrum van scheepsbouw en staalindustrie.",
    funFacts: [
      "Glasgow is de grootste stad van Schotland — groter dan de hoofdstad Edinburgh.",
      "De naam Glasgow komt van het Oud-Welsh 'Glasgu', wat 'lieve groene plek' betekent.",
      "Glasgow was in de 19e eeuw een van de belangrijkste scheepsbouwsteden ter wereld.",
      "De stad organiseerde de Commonwealth Games in 2014.",
      "Glasgow heeft het grootste Victoriaans gotische gebouw buiten Westminster: de universiteitsgebouwen."
    ],
    englishFunFacts: [
      "Glasgow is Scotland's largest city — bigger than the capital Edinburgh.",
      "The name Glasgow comes from Old Welsh 'Glasgu', meaning 'dear green place'.",
      "Glasgow was one of the world's most important shipbuilding cities in the 19th century.",
      "The city hosted the Commonwealth Games in 2014.",
      "Glasgow has the largest Victorian Gothic building outside Westminster: its university buildings."
    ]
  },
  {
    id: "liverpool",
    category: "city",
    dutchName: "Liverpool",
    englishName: "Liverpool",
    emoji: "🎸",
    coordinates: [-2.99, 53.41],
    countryId: "uk",
    description: "Een havenstad in Noordwest-Engeland, wereldberoemd als geboorteplaats van The Beatles.",
    funFacts: [
      "Liverpool is de geboorteplaats van The Beatles — John, Paul, George en Ringo kwamen er allemaal vandaan.",
      "Liverpool FC en Everton FC zijn twee van de meest succesvolle voetbalclubs van Engeland.",
      "Liverpool was in de 18e en 19e eeuw een van de drukste havens van het Britse Rijk.",
      "De stad heeft meer museums en galeries dan welke Engelse stad ook, na Londen.",
      "Liverpool heeft de op één na grootste Chinatown van Groot-Brittannië."
    ],
    englishFunFacts: [
      "Liverpool is the birthplace of The Beatles — John, Paul, George and Ringo all came from there.",
      "Liverpool FC and Everton FC are two of England's most successful football clubs.",
      "Liverpool was one of the busiest ports of the British Empire in the 18th and 19th centuries.",
      "The city has more museums and galleries than any English city outside London.",
      "Liverpool has the second largest Chinatown in Great Britain."
    ]
  },

  // --- WATEREN ---
  {
    id: "north_sea",
    category: "water",
    dutchName: "Noordzee",
    englishName: "North Sea",
    emoji: "🌊",
    coordinates: [3.0, 56.0],
    description: "Een zijzee van de Atlantische Oceaan tussen Groot-Brittannië, Scandinavië en de Benelux.",
    funFacts: [
      "De Noordzee is een van de drukste scheepvaartroutes ter wereld.",
      "Er liggen duizenden scheepswrakken op de bodem van de Noordzee.",
      "Doggersbank, een ondiepe zandbank in de Noordzee, was vroeger een landbrug waar mammoeten liepen.",
      "Onder de Noordzee liggen grote aardgasreserves die door Nederland en het VK worden gewonnen.",
      "De Noordzee is relatief ondiep — gemiddeld slechts 95 meter."
    ],
    englishFunFacts: [
      "The North Sea is one of the world's busiest shipping routes.",
      "Thousands of shipwrecks lie on the bottom of the North Sea.",
      "Dogger Bank, a shallow sandbank in the North Sea, was once a land bridge where mammoths roamed.",
      "Large natural gas reserves beneath the North Sea are extracted by the Netherlands and the UK.",
      "The North Sea is relatively shallow — averaging only 95 metres deep."
    ]
  },
  {
    id: "baltic_sea",
    category: "water",
    dutchName: "Oostzee",
    englishName: "Baltic Sea",
    emoji: "🧊",
    coordinates: [18.0, 58.5],
    description: "Een ingesloten zee in Noord-Europa, omgeven door Scandinavië, Finland, de Baltische staten en Duitsland.",
    funFacts: [
      "Het water van de Oostzee is veel minder zout dan andere zeeën (brak water).",
      "In strenge winters bevriest een groot deel van de Oostzee.",
      "Barnsteen (versteend hars) spoelt hier regelmatig aan op de stranden.",
      "De Oostzee is een van de drukst bevaren binnenzeeën ter wereld.",
      "De Oostzee is pas 10.000 tot 15.000 jaar geleden ontstaan na het smelten van het landijs."
    ],
    englishFunFacts: [
      "The Baltic Sea's water is much less salty than other seas (brackish water).",
      "In harsh winters, a large part of the Baltic Sea freezes over.",
      "Amber (fossilised resin) regularly washes up on Baltic beaches.",
      "The Baltic Sea is one of the world's busiest inland seas.",
      "The Baltic Sea only formed 10,000 to 15,000 years ago after the melting of the ice sheet."
    ]
  },
  {
    id: "english_channel",
    category: "water",
    dutchName: "Het Kanaal",
    englishName: "English Channel",
    emoji: "⛴️",
    coordinates: [-0.5, 50.5],
    description: "Het water dat Zuid-Engeland scheidt van Noord-Frankrijk, de drukste scheepvaartroute ter wereld.",
    funFacts: [
      "Onder Het Kanaal loopt de Eurotunnel (Chunnel), waarmee je in 35 minuten per trein reist.",
      "Het Kanaal is de drukste scheepvaartroute ter wereld: dagelijks varen er meer dan 500 schepen doorheen.",
      "De eerste persoon die Het Kanaal overzwom was Matthew Webb in 1875.",
      "Op het smalste punt is Het Kanaal slechts 34 kilometer breed (Nauw van Calais).",
      "Het Kanaal ontstond circa 8.000 jaar geleden toen de zeespiegel steeg na de ijstijd."
    ],
    englishFunFacts: [
      "Beneath the Channel runs the Eurotunnel (Channel Tunnel), connecting England and France by train in 35 minutes.",
      "The English Channel is the world's busiest shipping lane: over 500 ships pass through daily.",
      "The first person to swim the Channel was Matthew Webb in 1875.",
      "At its narrowest point, the Channel is only 34 kilometres wide (Strait of Dover).",
      "The Channel formed around 8,000 years ago when sea levels rose after the Ice Age."
    ]
  },
  {
    id: "scheldt",
    category: "water",
    dutchName: "Schelde",
    englishName: "Scheldt River",
    emoji: "🚢",
    coordinates: [4.0, 51.15],
    description: "Een rivier die door Noord-Frankrijk, West-België en Zuidwest-Nederland stroomt naar de Noordzee.",
    funFacts: [
      "De Schelde is al eeuwenlang de levensader van de haven van Antwerpen.",
      "Tijdens oorlogen werd de Schelde regelmatig geblokkeerd om vijanden te stoppen.",
      "De houting, een zeldzame vissoort, keert terug in de Schelde dankzij beter waterkwaliteitsbeleid.",
      "De rivier is 350 kilometer lang en mondt uit in de Westerschelde in Nederland.",
      "In WO2 was de bevrijding van de Schelde cruciaal om de haven van Antwerpen te gebruiken."
    ],
    englishFunFacts: [
      "The Scheldt has been the lifeline of the Port of Antwerp for centuries.",
      "During wars, the Scheldt was regularly blocked to stop enemies.",
      "The houting, a rare fish species, is returning to the Scheldt thanks to better water quality policies.",
      "The river is 350 kilometres long and flows into the Western Scheldt in the Netherlands.",
      "In WW2, liberating the Scheldt was crucial to using the Port of Antwerp."
    ]
  },
  {
    id: "thames",
    category: "water",
    dutchName: "Theems",
    englishName: "River Thames",
    emoji: "🌉",
    coordinates: [-0.5, 51.48],
    description: "De belangrijkste rivier van Engeland, die dwars door het hart van Londen stroomt.",
    funFacts: [
      "Meer dan 200 bruggen kruisen de Theems.",
      "Vroeger vroor de Theems dicht in strenge winters en hielden ze 'Frost Fairs' op het ijs.",
      "Er worden soms zeehonden en zelfs bruinvissen de Theems op gespot.",
      "De Theems is 346 kilometer lang — de langste rivier die volledig in Engeland ligt.",
      "Rond 1858 stonk de Theems zo erg door vervuiling dat dit de 'Grote Stank' (Great Stink) werd genoemd."
    ],
    englishFunFacts: [
      "Over 200 bridges cross the Thames.",
      "In harsh winters the Thames used to freeze over and people held 'Frost Fairs' on the ice.",
      "Seals and even porpoises are occasionally spotted swimming up the Thames.",
      "The Thames is 346 kilometres long — the longest river lying entirely within England.",
      "Around 1858 the Thames smelled so bad from pollution that the event was called the 'Great Stink'."
    ]
  },

  // --- GEBERGTEN ---
  {
    id: "ardennes",
    category: "mountain",
    dutchName: "Ardennen",
    englishName: "Ardennes",
    emoji: "🌲",
    coordinates: [5.8, 50.2],
    description: "Een bosrijk heuvelgebied dat zich uitstrekt over België, Luxemburg en een deel van Duitsland.",
    funFacts: [
      "De Ardennen waren het toneel van zware gevechten in beide Wereldoorlogen.",
      "De Slag om de Ardennen (december 1944 – januari 1945) was een van de grootste slagen van de Tweede Wereldoorlog.",
      "Het gebied staat bekend om zijn dichte bossen, wildrijke natuur en pittoreske dorpjes.",
      "De Ardennen zijn geliefd bij mountainbikers, wandelaars en kajakkers.",
      "De hoogste punt van België, de Signal de Botrange (694 m), ligt in de Ardennen."
    ],
    englishFunFacts: [
      "The Ardennes were the site of heavy fighting in both World Wars.",
      "The Battle of the Bulge (December 1944 – January 1945) was one of the largest battles of World War II.",
      "The area is known for its dense forests, abundant wildlife, and picturesque villages.",
      "The Ardennes are popular with mountain bikers, hikers, and kayakers.",
      "Belgium's highest point, the Signal de Botrange (694 m), is located in the Ardennes."
    ]
  },

  // --- REGIO'S ---
  {
    id: "england",
    category: "region",
    dutchName: "Engeland",
    englishName: "England",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    coordinates: [-1.5, 52.5],
    description: "Het grootste en volkrijkste deel van het Verenigd Koninkrijk, gelegen in het zuiden van het eiland Groot-Brittannië.",
    funFacts: [
      "Voetbal (soccer) werd in Engeland uitgevonden — de eerste officiële regels werden in 1863 opgesteld.",
      "Engeland heeft geen officiële taal vastgelegd in de wet, maar Engels is de taal van het dagelijks leven.",
      "De industrie van Engeland leidde de Industriële Revolutie (18e-19e eeuw), die de wereld veranderde.",
      "De universiteiten van Oxford en Cambridge zijn twee van de oudste ter wereld.",
      "Engeland grenst aan Schotland in het noorden en Wales in het westen."
    ],
    englishFunFacts: [
      "Football (soccer) was invented in England — the first official rules were drawn up in 1863.",
      "England has no official language enshrined in law, but English is the everyday language.",
      "English industry led the Industrial Revolution (18th-19th century), which changed the world.",
      "The Universities of Oxford and Cambridge are two of the oldest in the world.",
      "England borders Scotland to the north and Wales to the west."
    ]
  },
  {
    id: "scotland",
    category: "region",
    dutchName: "Schotland",
    englishName: "Scotland",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    coordinates: [-4.2, 57.0],
    description: "Het noordelijke deel van het eiland Groot-Brittannië, bekend om zijn hooglanden, kastelen en whisky.",
    funFacts: [
      "Schotland heeft zijn eigen parlement (devolved parliament) in Edinburgh sinds 1999.",
      "De legende van het monster van Loch Ness ('Nessie') trekt elk jaar miljoenen toeristen.",
      "Scotch whisky is een van de meest geëxporteerde producten van Schotland.",
      "In Schotland is het wettelijk toegestaan om overal in de natuur te wandelen (right to roam).",
      "Het nationale dier van Schotland is de eenhoorn."
    ],
    englishFunFacts: [
      "Scotland has its own parliament (devolved parliament) in Edinburgh since 1999.",
      "The legend of the Loch Ness Monster ('Nessie') attracts millions of tourists every year.",
      "Scotch whisky is one of Scotland's most exported products.",
      "In Scotland it is legally permitted to walk anywhere in nature (right to roam).",
      "The national animal of Scotland is the unicorn."
    ]
  },
  {
    id: "flanders",
    category: "region",
    dutchName: "Vlaanderen",
    englishName: "Flanders",
    emoji: "🦁",
    coordinates: [3.7, 51.0],
    description: "De Nederlandstalige noordelijke regio van België, met steden als Brugge, Gent en Antwerpen.",
    funFacts: [
      "Vlaanderen was het toneel van intense gevechten tijdens de Eerste Wereldoorlog ('In Flanders Fields').",
      "Brugge in Vlaanderen staat bekend als het 'Venetië van het Noorden' door zijn grachten.",
      "De Vlaamse Primitieven (zoals Jan van Eyck) revolutioneerden de Europese schilderkunst in de 15e eeuw.",
      "Het Vlaamse Gewest heeft een eigen parlement en regering.",
      "Gent was in de Middeleeuwen een van de grootste steden van Noord-Europa."
    ],
    englishFunFacts: [
      "Flanders was the site of intense fighting during World War I ('In Flanders Fields').",
      "Bruges in Flanders is known as the 'Venice of the North' for its canals.",
      "The Flemish Primitives (such as Jan van Eyck) revolutionised European painting in the 15th century.",
      "The Flemish Region has its own parliament and government.",
      "Ghent was one of the largest cities in Northern Europe during the Middle Ages."
    ]
  },
  {
    id: "wallonia",
    category: "region",
    dutchName: "Wallonië",
    englishName: "Wallonia",
    emoji: "🐓",
    coordinates: [5.1, 50.3],
    description: "De Franstalige zuidelijke regio van België, met de Ardennen en een rijke industriële geschiedenis.",
    funFacts: [
      "Wallonië was in de 19e en vroege 20e eeuw een van de meest geïndustrialiseerde regio's ter wereld.",
      "De steenkoolmijnen en staalfabrieken van Luik (Liège) en Charleroi maakten de regio wereldberoemd.",
      "Het Ardennenwoud — het grootste aaneengesloten bos van Wallonië — is een paradijs voor wandelaars.",
      "Wallonië is groter dan Vlaanderen maar heeft veel minder inwoners.",
      "Het dialect Waals (Wallon) is een Romaanse taal die nog steeds door enkele tienduizenden mensen wordt gesproken."
    ],
    englishFunFacts: [
      "Wallonia was one of the most industrialised regions in the world in the 19th and early 20th century.",
      "The coal mines and steel factories of Liège and Charleroi made the region world-famous.",
      "The Ardennes forest — the largest continuous forest in Wallonia — is a paradise for hikers.",
      "Wallonia is larger than Flanders but has far fewer inhabitants.",
      "The Walloon dialect is a Romance language still spoken by tens of thousands of people."
    ]
  },
  {
    id: "scandinavia",
    category: "region",
    dutchName: "Scandinavië",
    englishName: "Scandinavia",
    emoji: "🌍",
    coordinates: [13.0, 63.5],
    description: "Een geografische en culturele regio in Noord-Europa, bestaande uit Noorwegen, Zweden en Denemarken.",
    funFacts: [
      "De Vikingen kwamen uit Scandinavië en verkenden vanuit hier in de middeleeuwen heel de wereld.",
      "Scandinavische landen bezetten elk jaar de top van de VN's ranglijst voor menselijke ontwikkeling.",
      "Het woord 'Scandinavia' stamt waarschijnlijk af van het Germaanse 'Scadin-awjo' (gevaarlijk eiland).",
      "Alle drie de Scandinavische landen hebben een rode vlag met een kruis (het Scandinavisch kruis).",
      "Finland en IJsland zijn geografisch onderdeel van de regio, maar worden cultureel soms apart beschouwd."
    ],
    englishFunFacts: [
      "The Vikings came from Scandinavia and from here explored the entire world in the Middle Ages.",
      "Scandinavian countries occupy the top of the UN's Human Development Index every year.",
      "The word 'Scandinavia' likely derives from the Germanic 'Scadin-awjo' (dangerous island).",
      "All three Scandinavian countries have a red flag with a cross (the Scandinavian Cross).",
      "Finland and Iceland are geographically part of the region but are sometimes culturally considered separate."
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
  netherlands: { nl: 'Nederland (land)', en: 'Netherlands' },
  belgium: { nl: 'België (land)', en: 'Belgium' },
  denmark: { nl: 'Denemarken', en: 'Denmark' },
  estonia: { nl: 'Estland', en: 'Estonia' },
  finland: { nl: 'Finland (land)', en: 'Finland' },
  ireland: { nl: 'Ierland (land)', en: 'Republic of Ireland' },
  iceland: { nl: 'IJsland (land)', en: 'Iceland' },
  latvia: { nl: 'Letland', en: 'Latvia' },
  lithuania: { nl: 'Litouwen', en: 'Lithuania' },
  norway: { nl: 'Noorwegen (land)', en: 'Norway' },
  uk: { nl: 'Verenigd Koninkrijk', en: 'United Kingdom' },
  sweden: { nl: 'Zweden (land)', en: 'Sweden' },
  brussels: { nl: 'Brussel (stad)', en: 'Brussels' },
  dublin: { nl: 'Dublin (stad)', en: 'Dublin' },
  helsinki: { nl: 'Helsinki (stad)', en: 'Helsinki' },
  copenhagen: { nl: 'Kopenhagen', en: 'Copenhagen' },
  london: { nl: 'Londen (stad)', en: 'London' },
  oslo: { nl: 'Oslo (stad)', en: 'Oslo' },
  stockholm: { nl: 'Stockholm (stad)', en: 'Stockholm' },
  antwerp: { nl: 'Antwerpen (stad)', en: 'Antwerp' },
  glasgow: { nl: 'Glasgow (stad)', en: 'Glasgow' },
  liverpool: { nl: 'Liverpool (stad)', en: 'Liverpool' },
  north_sea: { nl: 'Noordzee', en: 'North Sea' },
  baltic_sea: { nl: 'Oostzee', en: 'Baltic Sea' },
  english_channel: { nl: 'Het Kanaal (zeestraat)', en: 'English Channel' },
  scheldt: { nl: 'Schelde (rivier)', en: 'Scheldt' },
  thames: { nl: 'Theems', en: 'River Thames' },
  ardennes: { nl: 'Ardennen', en: 'Ardennes' },
  england: { nl: 'Engeland (regio)', en: 'England' },
  scotland: { nl: 'Schotland', en: 'Scotland' },
  flanders: { nl: 'Vlaanderen', en: 'Flanders' },
  wallonia: { nl: 'Wallonië', en: 'Wallonia' },
  scandinavia: { nl: 'Scandinavië', en: 'Scandinavia' },
};
