// =========================================================================
// 1. CENTRO DI CONTROLLO UNICO (MODIFICA QUI TESTI, LINK, SQUADRE E TEMPI)
// =========================================================================
const GAME_CONFIG = {
  branding: {
    gameTitle: "ERM, ACTUALLY!",
    preRevealLabel: "IL GIOCO",
    logoImageUrl: "https://forre01.github.io/Erm-Actually-/Icona.png"
  },
  buzzer: {
    qrImageUrl: "https://forre01.github.io/Erm-Actually-/qrcodebuzzer.png",
    joinUrl: "",
    caption: "Scannerizzami e facciamo una prova"
  },
  audio: {
    musicRoundSrc: "https://forre01.github.io/Erm-Actually-/Categorie(2).mp3",
    introSrc: "https://forre01.github.io/Erm-Actually-/presentazione.mp3",
    gameLoopSrc: "https://forre01.github.io/Erm-Actually-/Musicadelgioco.mp3",
    finaleLoopSrc: "https://forre01.github.io/Erm-Actually-/Gambling.mp3"
  },
  credits: {
    formatText: "Da un format di La Sedia a 2 Gambe",
    notaryKicker: "CON LA PARTECIPAZIONE STRAORDINARIA DI:",
    notaryName: "MARTINA COME NOTAIA",
    hostName: "Forre",
    hostFriendlyWord: "amichevole",
    hostEvilWord: "malevolo"
  },
  teams: {
    green: { label: "Squadra Verde", players: ["ADRIANA", "SAMUELE"] },
    blue:  { label: "Squadra Blu",   players: ["ANGELO", "SELO"] },
    pink:  { label: "Squadra Rosa",  players: ["GIORGIA", "GIADA"] }
  },
  timelineSec: {
    totalDuration: 106,
    formatBanner: 3.0,
    greenShow: 10.0,
    greenTeam: 14.0,
    greenPlayers: 18.0,
    blueShow: 26.0,
    blueTeam: 30.0,
    bluePlayers: 34.0,
    pinkShow: 42.0,
    pinkTeam: 46.0,
    pinkPlayers: 50.0,
    scene2Notary: 62.0,
    scene3HostFriendly: 78.0,
    evilSwitchAndTitle: 90.0
  }
};

const musicCategories = [
  { id: 1, song: "Never Gonna Give You Up", category: "MEME E INTERNET" },
  { id: 2, song: "I sogni son desideri", category: "DISNEY" },
  { id: 3, song: "Teenage Dream", category: "COSE DA TEENAGER" },
  { id: 4, song: "Il cielo d'Irlanda", category: "GEOGRAFIA" },
  { id: 5, song: "Notti magiche", category: "SPORT" },
  { id: 6, song: "Adeste Fideles", category: "NATALE" }
];

const RULES_ITEMS = [
  "Ci sono <strong>6 categorie</strong> divise in caselle da <strong>200, 300, 400 e 500 punti</strong>. Più alto è il valore, più gli errori sono difficili da scovare.",
  "Si sceglie una casella e il presentatore legge una descrizione apparentemente corretta, in cui si nascondono <strong>esattamente 3 errori</strong>.",
  "Potete prenotarvi in qualsiasi momento, anche mentre il presentatore sta ancora leggendo, ma è <strong>vietato prenotarsi prima che la parola o la frase sbagliata sia stata pronunciata a voce alta</strong>.",
  "Ogni risposta deve iniziare con <strong>“Erm, Actually...”</strong>: se ve ne dimenticate, la risposta è nulla. Poi potete indicare l’errore e correggerlo, oppure limitarvi a indicarlo.",
  "<strong>Errore trovato e corretto bene:</strong> + valore della casella. <strong>Errore sbagliato o correzione sbagliata:</strong> − valore della casella.",
  "<strong>Se vi limitate a indicare l’errore:</strong> guadagnate i punti normalmente, ma un altro giocatore può provare a dare la correzione prima della rivelazione degli errori: se la sua correzione è giusta, i punti passano a lui e voi non guadagnate nulla; se è sbagliata, voi tenete i punti e lui li perde dal suo montepunti.",
  "<strong>Se la vostra correzione è sbagliata:</strong> perdete i punti e un altro giocatore può provare a correggere, con le stesse regole."
];

const EXAMPLE_CONFIG = {
  title: "La Divina Commedia",
  players: ["Paola", "Gianfranco", "Sid"],
  baseText:
    "La Divina Commedia è il capolavoro della letteratura italiana. All'inizio dell'opera, il protagonista Dante si perde all'interno di una selva oscura e viene salvato dal fantasma del poeta {{ERR1}}, che si offre di fargli da guida. I due poeti iniziano così il loro lungo viaggio scendendo nei gironi dell'Inferno, dove incontrano l'iconico traghettatore di anime Caronte, descritto come un vecchio con la barba bianca e {{ERR2}}, che trasporta i peccatori a bordo della sua {{ERR3}}.",
  finalBannerText:
    "ERM, ACTUALLY! DA ADESSO GLI ERRORI SI VEDRANNO SOLO ALLA FINE DELL'AFFERMAZIONE E QUANDO NESSUNO AVRÀ ALTRO DA CORREGGERE",
  steps: [
    {
      label: "Passo 0 · Testo iniziale",
      note: "Il presentatore legge la descrizione con i 3 errori nascosti. Premi 'Passo successivo' per avanzare di un passaggio alla volta.",
      scores: { Paola: 0, Gianfranco: 0, Sid: 0 },
      slots: {
        ERR1: { text: "Giacomo Leopardi", state: "hidden" },
        ERR2: { text: "gli occhi circondati da fiamme di fuoco", state: "hidden" },
        ERR3: { text: "bicicletta da corsa", state: "hidden" }
      }
    },
    {
      label: "Passo 1A · Paola indica l'errore 1",
      note: "Paola: “Erm, actually... Non è Giacomo Leopardi.” (Indica solo l'errore senza ancora darne la correzione).",
      scores: { Paola: 0, Gianfranco: 0, Sid: 0 },
      slots: {
        ERR1: { text: "Giacomo Leopardi", state: "wrong" },
        ERR2: { text: "gli occhi circondati da fiamme di fuoco", state: "hidden" },
        ERR3: { text: "bicicletta da corsa", state: "hidden" }
      }
    },
    {
      label: "Passo 1B · Gianfranco corregge in Virgilio (+100)",
      note: "Gianfranco: “Erm, actually... Non è Giacomo Leopardi, ma Virgilio.” -> Gianfranco +100.",
      scores: { Paola: 0, Gianfranco: 100, Sid: 0 },
      slots: {
        ERR1: { text: "Virgilio", state: "fixed" },
        ERR2: { text: "gli occhi circondati da fiamme di fuoco", state: "hidden" },
        ERR3: { text: "bicicletta da corsa", state: "hidden" }
      }
    },
    {
      label: "Passo 2A · Paola indica 'fiamme' e Sid prova 'laser'",
      note: "Paola indica “occhi circondati da fiamme”; Sid prova “Erm, actually... Non sono circondati da fiamme ma sono circondati da laser”.",
      scores: { Paola: 0, Gianfranco: 100, Sid: 0 },
      slots: {
        ERR1: { text: "Virgilio", state: "fixed" },
        ERR2: { text: "gli occhi circondati da laser", state: "wrong" },
        ERR3: { text: "bicicletta da corsa", state: "hidden" }
      }
    },
    {
      label: "Passo 2B · Rivelazione 'ruote di fuoco' (scambio punti)",
      note: "Il presentatore rivela “ruote di fuoco”: Paola ottiene +100, Sid perde -100 per la correzione sbagliata, Gianfranco resta a 100.",
      scores: { Paola: 100, Gianfranco: 100, Sid: -100 },
      slots: {
        ERR1: { text: "Virgilio", state: "fixed" },
        ERR2: { text: "gli occhi circondati da ruote di fuoco", state: "fixed" },
        ERR3: { text: "bicicletta da corsa", state: "hidden" }
      }
    },
    {
      label: "Passo 3A · Sid prova 'monopattino' (-100 / totale -200)",
      note: "Sid: “Erm, actually... Non su una bicicletta ma su un monopattino.” -> Correzione sbagliata: Sid -100 (totale -200).",
      scores: { Paola: 100, Gianfranco: 100, Sid: -200 },
      slots: {
        ERR1: { text: "Virgilio", state: "fixed" },
        ERR2: { text: "gli occhi circondati da ruote di fuoco", state: "fixed" },
        ERR3: { text: "monopattino", state: "wrong" }
      }
    },
    {
      label: "Passo 3B · Correzione finale in 'barca'",
      note: "Caronte trasporta i peccatori a bordo della sua barca.",
      scores: { Paola: 100, Gianfranco: 100, Sid: -200 },
      slots: {
        ERR1: { text: "Virgilio", state: "fixed" },
        ERR2: { text: "gli occhi circondati da ruote di fuoco", state: "fixed" },
        ERR3: { text: "barca", state: "fixed" }
      },
      showFinalBanner: true
    }
  ]
};

const BOARD_CATEGORIES = [
  {
    id: "meme",
    label: "MEME E INTERNET",
    levels: {
      200: {
        title: "MEME E INTERNET - 200 PUNTI",
        prompt:
          "Il Rickroll è uno degli scherzi più antichi di Internet: consiste nel nascondere dietro un finto link il video di 'Never Gonna Let You Down', canzone del 1987. Il fenomeno è nato quasi per caso, come variante di un altro scherzo diffuso sulla stessa piattaforma, il Duckroll, e si è poi evoluto fino a diventare una tradizione del 1° gennaio, con siti e aziende che lo usano per fare scherzi ai loro utenti. Il successo è esploso intorno al 2007 e il video ha poi superato il miliardo di visualizzazioni su YouTube. Negli anni si è evoluto in innumerevoli varianti: nel 2008 il cantante è persino comparso a sorpresa su un carro durante la parata del Ringraziamento di Macy's a New York, tra lo stupore del pubblico. Il cantante Rick Springfield, all'epoca quasi dimenticato, ha ritrovato nuova popolarità grazie al meme.",
        correction:
          "Il Rickroll è uno degli scherzi più antichi di Internet: consiste nel nascondere dietro un finto link il video di '<span class='ex-tag-wrong'>Never Gonna Let You Down</span>', canzone del 1987. Il fenomeno è nato quasi per caso, come variante di un altro scherzo diffuso sulla stessa piattaforma, il Duckroll, e si è poi evoluto fino a diventare una tradizione del <span class='ex-tag-wrong'>1° gennaio</span>, con siti e aziende che lo usano per fare scherzi ai loro utenti. Il successo è esploso intorno al 2007 e il video ha poi superato il miliardo di visualizzazioni su YouTube. Negli anni si è evoluto in innumerevoli varianti: nel 2008 il cantante è persino comparso a sorpresa su un carro durante la parata del Ringraziamento di Macy's a New York, tra lo stupore del pubblico. Il cantante <span class='ex-tag-wrong'>Rick Springfield</span>, all'epoca quasi dimenticato, ha ritrovato nuova popolarità grazie al meme."
      },
      300: {
        title: "MEME E INTERNET - 300 PUNTI",
        prompt:
          "Il meme Doge ha per protagonista Kabosu, una cagnolina giapponese di razza Husky immortalata in una foto del 2010. Kabosu viveva con la maestra d'asilo Atsuko Sato, che l'aveva adottata da un rifugio per animali. L'immagine veniva accompagnata da frasi sgrammaticate come 'much wow', scritte con il carattere Arial. Il meme è celebre anche per la grafica: le scritte compaiono in diversi colori sparse attorno al muso del cane, con pensieri in inglese stentato come 'so scare' e 'very language'. Nel 2021 una versione digitale della foto originale è stata venduta come NFT per circa quattro milioni di dollari. Qualche anno prima, nel 2013, il suo muso ha ispirato Dogecoin, una criptovaluta nata per scherzo e poi sostenuta pubblicamente dal miliardario Jeff Bezos. Per anni è stata uno dei volti più celebri del web e la sua immagine è rimasta un simbolo della cultura dei meme.",
        correction:
          "Il meme Doge ha per protagonista Kabosu, una cagnolina giapponese di razza <span class='ex-tag-wrong'>Husky</span> immortalata in una foto del 2010. Kabosu viveva con la maestra d'asilo Atsuko Sato, che l'aveva adottata da un rifugio per animali. L'immagine veniva accompagnata da frasi sgrammaticate come 'much wow', scritte con il carattere <span class='ex-tag-wrong'>Arial</span>. Il meme è celebre anche per la grafica: le scritte compaiono in diversi colori sparse attorno al muso del cane, con pensieri in inglese stentato come 'so scare' e 'very language'. Nel 2021 una versione digitale della foto originale è stata venduta come NFT per circa quattro milioni di dollari. Qualche anno prima, nel 2013, il suo muso ha ispirato Dogecoin, una criptovaluta nata per scherzo e poi sostenuta pubblicamente dal miliardario <span class='ex-tag-wrong'>Jeff Bezos</span>. Per anni è stata uno dei volti più celebri del web e la sua immagine è rimasta un simbolo della cultura dei meme."
      },
      400: {
        title: "MEME E INTERNET - 400 PUNTI",
        prompt:
          "Grumpy Cat, il cui vero nome era Tardar Sauce, è nata nell'aprile del 2012 a Morristown, in California. Il suo muso perennemente imbronciato era dovuto a una forma di nanismo felino e a un prognatismo della mascella. La foto che l'ha resa famosa fu pubblicata nel settembre dello stesso anno da Bryan Bundesen, fratello della proprietaria Tabatha, sul sito Imgur, e nel giro di pochi giorni fece il giro del mondo. La gatta è diventata una vera azienda: ha avuto libri, pupazzi, una statua di cera al Madame Tussauds di San Francisco e, come protagonista di un film natalizio televisivo del 2014, la voce dell'attrice Aubrey Plaza. Nel 2018 un tribunale americano ha condannato un'azienda di bevande, che aveva usato la sua immagine per un caffè chiamato Grumppuccino senza rispettare gli accordi, a un risarcimento di 710.000 dollari. La gatta è morta nel maggio del 2019. Il successo è stato tale da portarla a partecipare a eventi e incontri con i fan, tra cui una comparsata al festival South by Southwest di Los Angeles nel 2013. La sua espressione si è prestata a infiniti meme, con battute sarcastiche sulla giornata appena iniziata.",
        correction:
          "Grumpy Cat, il cui vero nome era Tardar Sauce, è nata nell'aprile del 2012 a <span class='ex-tag-wrong'>Morristown, in California</span>. Il suo muso perennemente imbronciato era dovuto a una forma di nanismo felino e a un prognatismo della mascella. La foto che l'ha resa famosa fu pubblicata nel settembre dello stesso anno da Bryan Bundesen, <span class='ex-tag-wrong'>fratello della proprietaria</span> Tabatha, sul sito Imgur, e nel giro di pochi giorni fece il giro del mondo. La gatta è diventata una vera azienda: ha avuto libri, pupazzi, una statua di cera al Madame Tussauds di San Francisco e, come protagonista di un film natalizio televisivo del 2014, la voce dell'attrice Aubrey Plaza. Nel 2018 un tribunale americano ha condannato un'azienda di bevande, che aveva usato la sua immagine per un caffè chiamato Grumppuccino senza rispettare gli accordi, a un risarcimento di 710.000 dollari. La gatta è morta nel maggio del 2019. Il successo è stato tale da portarla a partecipare a eventi e incontri con i fan, tra cui una comparsata al festival South by Southwest di <span class='ex-tag-wrong'>Los Angeles</span> nel 2013. La sua espressione si è prestata a infiniti meme, con battute sarcastiche sulla giornata appena iniziata."
      },
      500: {
        title: "MEME E INTERNET - 500 PUNTI",
        prompt:
          "Twitter è stato fondato nel marzo del 2006 da Jack Dorsey, Noah Glass, Biz Stone ed Mark Zuckerberg. Il primo messaggio, scritto da Dorsey, fu pubblicato nel 2006 e diceva: 'just setting up my twttr'. Il suo logo era un uccellino azzurro chiamato Larry, in omaggio al cestista Larry Bird. All'inizio ogni messaggio poteva contenere al massimo 140 caratteri, un limite pensato per stare nel formato degli SMS, che nel novembre 2017 fu portato a 240. Un singolo messaggio si chiama tweet e può essere rilanciato da altri utenti con il retweet, mentre gli hashtag sono stati proposti nel 2007. Tra le sue funzioni più riconoscibili c'erano le tendenze, cioè gli argomenti più discussi del momento, che per anni sono stati un modo per capire cosa interessasse al pubblico. Nel 2013 il social è stato quotato in borsa a Londra e nell'ottobre del 2022 è stato acquistato da Elon Musk per circa 44 miliardi di dollari. Nel luglio del 2023 ha cambiato nome in X. Il social è stato usato da giornalisti, politici e celebrità per comunicare direttamente con i propri follower.",
        correction:
          "Twitter è stato fondato nel marzo del 2006 da Jack Dorsey, Noah Glass, Biz Stone ed <span class='ex-tag-wrong'>Mark Zuckerberg</span>. Il primo messaggio, scritto da Dorsey, fu pubblicato nel 2006 e diceva: 'just setting up my twttr'. Il suo logo era un uccellino azzurro chiamato Larry, in omaggio al cestista Larry Bird. All'inizio ogni messaggio poteva contenere al massimo 140 caratteri, un limite pensato per stare nel formato degli SMS, che nel novembre 2017 fu portato a <span class='ex-tag-wrong'>240</span>. Un singolo messaggio si chiama tweet e può essere rilanciato da altri utenti con il retweet, mentre gli hashtag sono stati proposti nel 2007. Tra le sue funzioni più riconoscibili c'erano le tendenze, cioè gli argomenti più discussi del momento, che per anni sono stati un modo per capire cosa interessasse al pubblico. Nel 2013 il social è stato quotato in borsa a <span class='ex-tag-wrong'>Londra</span> e nell'ottobre del 2022 è stato acquistato da Elon Musk per circa 44 miliardi di dollari. Nel luglio del 2023 ha cambiato nome in X. Il social è stato usato da giornalisti, politici e celebrità per comunicare direttamente con i propri follower."
      }
    }
  },
  {
    id: "disney",
    label: "DISNEY",
    levels: {
      200: {
        title: "DISNEY - 200 PUNTI",
        prompt:
          "Frozen - Il regno di ghiaccio è un film Disney uscito nel 2013, liberamente ispirato alla fiaba La Regina delle Nevi di Hans Christian Andersen. La storia è ambientata nel regno di Corona, dove vivono le sorelle Elsa e Anna. Elsa è nata con il potere di creare ghiaccio e neve e, dopo aver perso il controllo della magia, fugge in montagna e si costruisce un palazzo di ghiaccio cantando Let It Go, brano che ha vinto l'Oscar come miglior canzone originale. Il film è stato per anni il maggiore incasso della storia dell'animazione. Anna parte a cercarla insieme a Kristoff, un pescatore accompagnato dalla renna Sven. Nella storia compaiono anche i troll di roccia, che vivono in una valle nascosta e conoscono i segreti della magia di Elsa, mentre il malvagio principe Hans, proveniente dalle Isole del Sud, tradisce Anna proprio quando ha più bisogno d'aiuto. Per tutto il film li accompagna anche il pupazzo di neve Olaf, che sogna di vivere l'inverno. Il seguito, Frozen II, è uscito nel 2019.",
        correction:
          "Frozen - Il regno di ghiaccio è un film Disney uscito nel 2013, liberamente ispirato alla fiaba La Regina delle Nevi di Hans Christian Andersen. La storia è ambientata nel regno di <span class='ex-tag-wrong'>Corona</span>, dove vivono le sorelle Elsa e Anna. Elsa è nata con il potere di creare ghiaccio e neve e, dopo aver perso il controllo della magia, fugge in montagna e si costruisce un palazzo di ghiaccio cantando Let It Go, brano che ha vinto l'Oscar come miglior canzone originale. Il film è stato per anni il maggiore incasso della storia dell'animazione. Anna parte a cercarla insieme a Kristoff, un <span class='ex-tag-wrong'>pescatore</span> accompagnato dalla renna Sven. Nella storia compaiono anche i troll di roccia, che vivono in una valle nascosta e conoscono i segreti della magia di Elsa, mentre il malvagio principe Hans, proveniente dalle Isole del Sud, tradisce Anna proprio quando ha più bisogno d'aiuto. Per tutto il film li accompagna anche il pupazzo di neve Olaf, che sogna di vivere <span class='ex-tag-wrong'>l'inverno</span>. Il seguito, Frozen II, è uscito nel 2019."
      },
      300: {
        title: "DISNEY - 300 PUNTI",
        prompt:
          "Il Re Leone è un film Disney uscito nel 1994 e ambientato nella savana africana. La storia, ispirata in parte all'Amleto di Shakespeare, è accompagnata dalle musiche di Hans Zimmer e dalle canzoni di Phil Collins, tra cui Il cerchio della vita. Il piccolo Simba assiste alla morte del padre Mufasa, travolto da una mandria di gnu per colpa dell'invidioso zio Scar. Convinto di essere il responsabile, Simba fugge e trova rifugio presso il suricato Timon e il facocero Pumbaa, che gli insegnano il motto Hakuna Matata. Da adulto, Simba torna nelle Terre del Branco, incoraggiato dall'amica d'infanzia Sarabi, per sfidare lo zio e riprendersi il trono. Tra i personaggi ricordiamo anche Rafiki, il saggio mandrillo che aiuta Simba a ritrovare la propria strada. Nel 2019 la Disney ne ha realizzato un remake, diretto da Tim Burton, in computer grafica fotorealistica e il musical tratto dal film, a Broadway, è tra gli spettacoli più longevi e redditizi di sempre.",
        correction:
          "Il Re Leone è un film Disney uscito nel 1994 e ambientato nella savana africana. La storia, ispirata in parte all'Amleto di Shakespeare, è accompagnata dalle musiche di Hans Zimmer e dalle canzoni di <span class='ex-tag-wrong'>Phil Collins</span>, tra cui Il cerchio della vita. Il piccolo Simba assiste alla morte del padre Mufasa, travolto da una mandria di gnu per colpa dell'invidioso zio Scar. Convinto di essere il responsabile, Simba fugge e trova rifugio presso il suricato Timon e il facocero Pumbaa, che gli insegnano il motto Hakuna Matata. Da adulto, Simba torna nelle Terre del Branco, incoraggiato dall'amica d'infanzia <span class='ex-tag-wrong'>Sarabi</span>, per sfidare lo zio e riprendersi il trono. Tra i personaggi ricordiamo anche Rafiki, il saggio mandrillo che aiuta Simba a ritrovare la propria strada. Nel 2019 la Disney ne ha realizzato un remake, diretto da <span class='ex-tag-wrong'>Tim Burton</span>, in computer grafica fotorealistica e il musical tratto dal film, a Broadway, è tra gli spettacoli più longevi e redditizi di sempre."
      },
      400: {
        title: "DISNEY - 400 PUNTI",
        prompt:
          "Aladdin è un film Disney uscito nel novembre del 1992 e diretto da Ron Clements e John Musker, gli stessi registi de La Bella e la Bestia. La storia si svolge nella città immaginaria di Agrabah, dove vive Aladdin, un ladruncolo di strada accompagnato dalla scimmietta Abu, che si innamora della principessa Jasmine, a sua volta legata alla tigre Rajah. Le musiche sono di Alan Menken e il brano A Whole New World ha vinto l'Oscar come miglior canzone originale. L'antagonista è Jafar, sceicco del Sultano, che con il suo pappagallo Iago cerca di impadronirsi di una lampada magica custodita nella Caverna delle Meraviglie. Nel film il Genio, doppiato nell'originale da Robin Williams, spiega di non poter uccidere nessuno, né far innamorare qualcuno, né riportare in vita i morti. Il film ha dato origine a due seguiti, Il ritorno di Jafar e Aladdin e il re dei ladri, e nel 2019 ne è stato realizzato un remake in live action con Will Smith nel ruolo del Genio. Il tappeto volante, personaggio privo di voce, riesce a esprimere emozioni solo attraverso i movimenti. Un'ultima curiosità: l'ingresso della Caverna delle Meraviglie ha la forma di una gigantesca testa di leone.",
        correction:
          "Aladdin è un film Disney uscito nel novembre del 1992 e diretto da Ron Clements e John Musker, gli stessi registi de <span class='ex-tag-wrong'>La Bella e la Bestia</span>. La storia si svolge nella città immaginaria di Agrabah, dove vive Aladdin, un ladruncolo di strada accompagnato dalla scimmietta Abu, che si innamora della principessa Jasmine, a sua volta legata alla tigre Rajah. Le musiche sono di Alan Menken e il brano A Whole New World ha vinto l'Oscar come miglior canzone originale. L'antagonista è Jafar, <span class='ex-tag-wrong'>sceicco</span> del Sultano, che con il suo pappagallo Iago cerca di impadronirsi di una lampada magica custodita nella Caverna delle Meraviglie. Nel film il Genio, doppiato nell'originale da Robin Williams, spiega di non poter uccidere nessuno, né far innamorare qualcuno, né riportare in vita i morti. Il film ha dato origine a due seguiti, Il ritorno di Jafar e Aladdin e il re dei ladri, e nel 2019 ne è stato realizzato un remake in live action con Will Smith nel ruolo del Genio. Il tappeto volante, personaggio privo di voce, riesce a esprimere emozioni solo attraverso i movimenti. Un'ultima curiosità: l'ingresso della Caverna delle Meraviglie ha la forma di una gigantesca testa di <span class='ex-tag-wrong'>leone</span>."
      },
      500: {
        title: "DISNEY - 500 PUNTI",
        prompt:
          "Le follie dell'imperatore è un film Disney uscito nel 2000, la cui lavorazione fu tormentata: il progetto originale, intitolato Il Regno della Luna, era un dramma epico che venne completamente riscritto in chiave comica. È ambientato in un impero ispirato alle civiltà precolombiane del Sudamerica, dove il giovane e viziato imperatore Kuzco, doppiato nell'originale da Ben Stiller, decide di demolire il villaggio del contadino Pacha per costruirci la sua villa estiva. La perfida consigliera Yzma, appena licenziata, vuole avvelenarlo, ma il suo goffo assistente Kronk sbaglia fiala e trasforma l'imperatore in un lama. Mentre Kuzco e Pacha attraversano la giungla per tornare al palazzo, Yzma finisce per trasformarsi lei stessa in un gattino. Kronk è un personaggio buffo, che sa parlare con gli scoiattoli e ama preparare bocconcini di broccoli per ogni occasione. Il film è stato accolto molto bene dal pubblico e ha dato origine a una serie televisiva derivata, La nuova scuola dell'imperatore. Lo stile del film si discosta dai classici Disney per l'umorismo basato su battute continue, in cui spesso il protagonista si rivolge direttamente al pubblico.",
        correction:
          "Le follie dell'imperatore è un film Disney uscito nel 2000, la cui lavorazione fu tormentata: il progetto originale, intitolato <span class='ex-tag-wrong'>Il Regno della Luna</span>, era un dramma epico che venne completamente riscritto in chiave comica. È ambientato in un impero ispirato alle civiltà precolombiane del Sudamerica, dove il giovane e viziato imperatore Kuzco, doppiato nell'originale da <span class='ex-tag-wrong'>Ben Stiller</span>, decide di demolire il villaggio del contadino Pacha per costruirci la sua villa estiva. La perfida consigliera Yzma, appena licenziata, vuole avvelenarlo, ma il suo goffo assistente Kronk sbaglia fiala e trasforma l'imperatore in un lama. Mentre Kuzco e Pacha attraversano la giungla per tornare al palazzo, Yzma finisce per trasformarsi lei stessa in un gattino. Kronk è un personaggio buffo, che sa parlare con gli scoiattoli e ama preparare <span class='ex-tag-wrong'>bocconcini di broccoli</span> per ogni occasione. Il film è stato accolto molto bene dal pubblico e ha dato origine a una serie televisiva derivata, La nuova scuola dell'imperatore. Lo stile del film si discosta dai classici Disney per l'umorismo basato su battute continue, in cui spesso il protagonista si rivolge direttamente al pubblico."
      }
    }
  },
  {
    id: "teen",
    label: "COSE DA TEENAGER",
    levels: {
      200: {
        title: "COSE DA TEENAGER - 200 PUNTI",
        prompt:
          "Le boyband hanno segnato l'adolescenza di tanti ragazzi tra la fine degli anni 2000 e gli anni 2010. Gli One Direction sono nati dal talent show britannico X Factor, dove vinsero, e hanno conquistato il mondo con il singolo What Makes You Beautiful. Il gruppo nacque unendo cinque concorrenti che si erano presentati come solisti: Harry Styles, Niall Horan, Louis Tomlinson, Liam Payne e Zayn Malik. Il loro album d'esordio si intitolava Up All Night. In Italia, a conquistare le adolescenti ci hanno pensato i Finley, quartetto pop punk di Legnano, in provincia di Milano. Il nome è un omaggio alla stella dell'NBA Michael Jordan, e a lanciarli fu il produttore Claudio Cecchetto, che li portò in tv a TRL su MTV. Il debutto con l'album Tutto è possibile e il singolo Diventerai una star li rese idoli dei teenager, e nel 2008 parteciparono a Sanremo con Ricordi, piazzandosi quinti. Dall'America arrivarono invece i Big Time Rush, nati come protagonisti di una serie TV di Nickelodeon: quattro giocatori di hockey del Texas si trasferiscono a Los Angeles per formare una band, guidati dal produttore Gustavo Rocque. I quattro attori, Kendall Schmidt, James Maslow, Carlos PenaVega e Logan Henderson, hanno poi dato vita a un vero gruppo pop, e tra i loro brani più noti c'è Boyfriend.",
        correction:
          "Le boyband hanno segnato l'adolescenza di tanti ragazzi tra la fine degli anni 2000 e gli anni 2010. Gli One Direction sono nati dal talent show britannico X Factor, dove <span class='ex-tag-wrong'>vinsero</span>, e hanno conquistato il mondo con il singolo What Makes You Beautiful. Il gruppo nacque unendo cinque concorrenti che si erano presentati come solisti: Harry Styles, Niall Horan, Louis Tomlinson, Liam Payne e Zayn Malik. Il loro album d'esordio si intitolava Up All Night. In Italia, a conquistare le adolescenti ci hanno pensato i Finley, quartetto pop punk di Legnano, in provincia di Milano. Il nome è un omaggio alla stella dell'NBA Michael Jordan, e a lanciarli fu il produttore Claudio Cecchetto, che li portò in tv a TRL su MTV. Il debutto con l'album Tutto è possibile e il singolo Diventerai una star li rese idoli dei teenager, e nel 2008 parteciparono a Sanremo con <span class='ex-tag-wrong'>Ricordi</span>, piazzandosi quinti. Dall'America arrivarono invece i Big Time Rush, nati come protagonisti di una serie TV di Nickelodeon: quattro giocatori di hockey del <span class='ex-tag-wrong'>Texas</span> si trasferiscono a Los Angeles per formare una band, guidati dal produttore Gustavo Rocque. I quattro attori, Kendall Schmidt, James Maslow, Carlos PenaVega e Logan Henderson, hanno poi dato vita a un vero gruppo pop, e tra i loro brani più noti c'è Boyfriend."
      },
      300: {
        title: "COSE DA TEENAGER - 300 PUNTI",
        prompt:
          "Facebook è nato nel 2004 in un dormitorio dell'università di Yale, ideato da Mark Zuckerberg con alcuni compagni di corso. All'inizio si chiamava 'TheFacebook' e il pulsante 'Mi piace' è arrivato solo nel 2009. Tra le prime funzioni c'era il poke, un colpetto virtuale per attirare l'attenzione degli amici, mentre i profili si riempivano di foto caricate dopo le serate. La sua interfaccia è dominata dal colore verde, scelto, secondo molti, perché Zuckerberg non distingue bene il rosso e il verde. Nel 2012 l'azienda ha acquistato Instagram per circa un miliardo di dollari. Dopo il boom tra i giovani statunitensi, il social si è aperto al pubblico generale nel 2006 e in pochi anni ha raggiunto centinaia di milioni di iscritti in tutto il mondo. La storia della sua nascita ha ispirato il film The Social Network, uscito nel 2010, nel quale Mark Zuckerberg è interpretato da Andrew Garfield.",
        correction:
          "Facebook è nato nel 2004 in un dormitorio dell'università di <span class='ex-tag-wrong'>Yale</span>, ideato da Mark Zuckerberg con alcuni compagni di corso. All'inizio si chiamava 'TheFacebook' e il pulsante 'Mi piace' è arrivato solo nel 2009. Tra le prime funzioni c'era il poke, un colpetto virtuale per attirare l'attenzione degli amici, mentre i profili si riempivano di foto caricate dopo le serate. La sua interfaccia è dominata dal colore <span class='ex-tag-wrong'>verde</span>, scelto, secondo molti, perché Zuckerberg non distingue bene il rosso e il verde. Nel 2012 l'azienda ha acquistato Instagram per circa un miliardo di dollari. Dopo il boom tra i giovani statunitensi, il social si è aperto al pubblico generale nel 2006 e in pochi anni ha raggiunto centinaia di milioni di iscritti in tutto il mondo. La storia della sua nascita ha ispirato il film The Social Network, uscito nel 2010, nel quale Mark Zuckerberg è interpretato da <span class='ex-tag-wrong'>Andrew Garfield</span>."
      },
      400: {
        title: "COSE DA TEENAGER - 400 PUNTI",
        prompt:
          "Gangnam Style è il successo mondiale cantato dal rapper sudcoreano PSY, pubblicato il 15 luglio del 2012 dall'etichetta SM Entertainment. Il titolo si riferisce al quartiere Gangnam di Seul, simbolo di vita lussuosa, che il brano prende in giro con ironia. Il video, famoso per la buffa danza del cammello, è stato il primo della storia a superare il miliardo di visualizzazioni su YouTube, nel dicembre dello stesso anno. Nel 2014 le visualizzazioni sono diventate così tante da superare il limite del contatore di YouTube, basato su numeri a 32 bit, costringendo il sito ad aggiornare il sistema. Il successo del brano ha contribuito a far conoscere nel mondo la musica pop sudcoreana, il cosiddetto K-pop, aprendo la strada a gruppi che negli anni successivi avrebbero conquistato le classifiche internazionali. Il brano ha fatto ballare persino il segretario generale dell'ONU Kofi Annan e ha portato PSY a esibirsi in tutto il mondo, ma il record di video più visto del sito è stato superato solo nel 2017 da See You Again.",
        correction:
          "Gangnam Style è il successo mondiale cantato dal rapper sudcoreano PSY, pubblicato il 15 luglio del 2012 dall'etichetta <span class='ex-tag-wrong'>SM Entertainment</span>. Il titolo si riferisce al quartiere Gangnam di Seul, simbolo di vita lussuosa, che il brano prende in giro con ironia. Il video, famoso per la buffa danza <span class='ex-tag-wrong'>del cammello</span>, è stato il primo della storia a superare il miliardo di visualizzazioni su YouTube, nel dicembre dello stesso anno. Nel 2014 le visualizzazioni sono diventate così tante da superare il limite del contatore di YouTube, basato su numeri a 32 bit, costringendo il sito ad aggiornare il sistema. Il successo del brano ha contribuito a far conoscere nel mondo la musica pop sudcoreana, il cosiddetto K-pop, aprendo la strada a gruppi che negli anni successivi avrebbero conquistato le classifiche internazionali. Il brano ha fatto ballare persino il segretario generale dell'ONU <span class='ex-tag-wrong'>Kofi Annan</span> e ha portato PSY a esibirsi in tutto il mondo, ma il record di video più visto del sito è stato superato solo nel 2017 da See You Again."
      },
      500: {
        title: "COSE DA TEENAGER - 500 PUNTI",
        prompt:
          "Pokémon GO è un gioco per smartphone sviluppato da Niantic, azienda fondata da John Hanke e nata all'interno di Microsoft, la stessa che in precedenza aveva creato il gioco in realtà aumentata Ingress. I giocatori camminano per le città per catturare le creature, lanciano Poké Ball sullo schermo e visitano i PokéStop per rifornirsi di oggetti. È stato lanciato nel luglio del 2016, prima in Australia, Nuova Zelanda e Giappone. L'app ha avuto effetti anche nel mondo reale: in diverse città i giocatori si ritrovavano in gruppo nei luoghi più frequentati dalle creature e il gioco è stato oggetto di polemiche per i rischi legati alla distrazione di chi camminava con lo sguardo fisso sullo schermo. Alla fine del tutorial si sceglie una delle tre squadre: Mystic, Valor e Instinct, ognuna guidata da un capo. Il capo del Team Valor, quello rosso, è Blanche, mentre il Team Instinct, giallo, ha come guida Spark. Il gioco ha fatto riscoprire a molti trentenni la passione per i Pokémon vissuta durante l'infanzia.",
        correction:
          "Pokémon GO è un gioco per smartphone sviluppato da Niantic, azienda fondata da John Hanke e nata all'interno di <span class='ex-tag-wrong'>Microsoft</span>, la stessa che in precedenza aveva creato il gioco in realtà aumentata Ingress. I giocatori camminano per le città per catturare le creature, lanciano Poké Ball sullo schermo e visitano i PokéStop per rifornirsi di oggetti. È stato lanciato nel luglio del 2016, prima in Australia, Nuova Zelanda e Giappone. L'app ha avuto effetti anche nel mondo reale: in diverse città i giocatori si ritrovavano in gruppo nei luoghi più frequentati dalle creature e il gioco è stato oggetto di polemiche per i rischi legati alla distrazione di chi camminava con lo sguardo fisso sullo schermo. Alla fine del tutorial si sceglie una delle tre squadre: Mystic, Valor e Instinct, ognuna guidata da un capo. Il capo del Team Valor, quello rosso, è <span class='ex-tag-wrong'>Blanche</span>, mentre il Team Instinct, giallo, ha come guida Spark. Il gioco ha fatto riscoprire a molti <span class='ex-tag-wrong'>trentenni</span> la passione per i Pokémon vissuta durante l'infanzia."
      }
    }
  },
  {
    id: "sport",
    label: "SPORT",
    levels: {
      200: {
        title: "SPORT - 200 PUNTI",
        prompt:
          "Nel 2006 l'Italia ha vinto il Mondiale di calcio in Germania, battendo in finale a Berlino la Spagna ai calci di rigore, dopo l'espulsione di Zidane per una testata a Materazzi. La squadra, guidata dal CT Marcello Lippi, aveva come capitano Roberto Baggio, che a fine anno vinse anche il Pallone d'Oro. La finale è terminata 1-1 dopo i tempi supplementari, con le reti di Zidane su rigore e di Materazzi di testa, e il rigore decisivo è stato trasformato da Fabio Grosso. Per l'Italia fu il quarto titolo mondiale della sua storia, dopo quelli del 1934, del 1938 e del 1982, e arrivò in un momento difficile per il calcio italiano, travolto dallo scandalo di Tangentopoli, esploso poche settimane prima del torneo.",
        correction:
          "Nel 2006 l'Italia ha vinto il Mondiale di calcio in Germania, battendo in finale a Berlino <span class='ex-tag-wrong'>la Spagna</span> ai calci di rigore, dopo l'espulsione di Zidane per una testata a Materazzi. La squadra, guidata dal CT Marcello Lippi, aveva come capitano <span class='ex-tag-wrong'>Roberto Baggio</span>, che a fine anno vinse anche il Pallone d'Oro. La finale è terminata 1-1 dopo i tempi supplementari, con le reti di Zidane su rigore e di Materazzi di testa, e il rigore decisivo è stato trasformato da Fabio Grosso. Per l'Italia fu il quarto titolo mondiale della sua storia, dopo quelli del 1934, del 1938 e del 1982, e arrivò in un momento difficile per il calcio italiano, travolto dallo scandalo di <span class='ex-tag-wrong'>Tangentopoli</span>, esploso poche settimane prima del torneo."
      },
      300: {
        title: "SPORT - 300 PUNTI",
        prompt:
          "Le Olimpiadi moderne sono nate nel 1896 ad Atene, per iniziativa del barone tedesco Pierre de Coubertin. Le Olimpiadi si svolgono ogni quattro anni e il loro motto è Citius, Altius, Fortius. Nel corso della storia i Giochi hanno subito diversi stop, causati soprattutto dalle due guerre mondiali, che hanno cancellato le edizioni del 1916, del 1940 e del 1944, e più di recente dalla pandemia, che ha fatto rinviare di un anno i Giochi di Tokyo, svolti poi nel 2021. Il simbolo è formato da sei anelli intrecciati, che rappresentano i continenti. Esistono un'edizione estiva e una invernale, che dal 1994 si alternano a distanza di due anni. La fiaccola viene accesa tradizionalmente a Delfi e portata fino alla città ospitante. Nel 2026 le Olimpiadi invernali si sono svolte in Italia, a Milano e Cortina d'Ampezzo.",
        correction:
          "Le Olimpiadi moderne sono nate nel 1896 ad Atene, per iniziativa del barone <span class='ex-tag-wrong'>tedesco</span> Pierre de Coubertin. Le Olimpiadi si svolgono ogni quattro anni e il loro motto è Citius, Altius, Fortius. Nel corso della storia i Giochi hanno subito diversi stop, causati soprattutto dalle due guerre mondiali, che hanno cancellato le edizioni del 1916, del 1940 e del 1944, e più di recente dalla pandemia, che ha fatto rinviare di un anno i Giochi di Tokyo, svolti poi nel 2021. Il simbolo è formato da <span class='ex-tag-wrong'>sei</span> anelli intrecciati, che rappresentano i continenti. Esistono un'edizione estiva e una invernale, che dal 1994 si alternano a distanza di due anni. La fiaccola viene accesa tradizionalmente a <span class='ex-tag-wrong'>Delfi</span> e portata fino alla città ospitante. Nel 2026 le Olimpiadi invernali si sono svolte in Italia, a Milano e Cortina d'Ampezzo."
      },
      400: {
        title: "SPORT - 400 PUNTI",
        prompt:
          "Michael Schumacher, nato a Hürth, in Austria, nel 1969, ha debuttato in Formula 1 nel 1991 al Gran Premio del Belgio con la Jordan, per passare subito dopo alla Benetton. Con quest'ultima ha vinto i suoi primi due titoli mondiali, nel 1994 e nel 1995, prima di trasferirsi alla Ferrari nel 1996. Con il Cavallino ha conquistato cinque titoli consecutivi tra il 2000 e il 2004, spesso in lotta con il finlandese Mika Häkkinen della McLaren. Si è ritirato una prima volta nel 2006 per poi tornare in pista nel 2010 con la Williams, restando fino al 2012. Il suo record di sette titoli è stato eguagliato da Lewis Hamilton nel 2020. Nel dicembre del 2013 ha subito un grave incidente sugli sci a Courchevel, sulle Alpi francesi. Nella sua carriera ha ottenuto 91 vittorie nei Gran Premi, un record rimasto imbattuto fino al 2020, ed è ricordato dai tifosi con il soprannome di Kaiser.",
        correction:
          "Michael Schumacher, nato a Hürth, in <span class='ex-tag-wrong'>Austria</span>, nel 1969, ha debuttato in Formula 1 nel 1991 al Gran Premio del Belgio con la Jordan, per passare subito dopo alla Benetton. Con quest'ultima ha vinto i suoi primi due titoli mondiali, nel 1994 e nel 1995, prima di trasferirsi alla Ferrari nel 1996. Con il Cavallino ha conquistato cinque titoli consecutivi tra il 2000 e il 2004, spesso in lotta con il finlandese Mika Häkkinen della McLaren. Si è ritirato una prima volta nel 2006 per poi tornare in pista nel 2010 con la <span class='ex-tag-wrong'>Williams</span>, restando fino al 2012. Il suo record di sette titoli è stato eguagliato da Lewis Hamilton nel 2020. Nel dicembre del 2013 ha subito un grave incidente sugli sci a <span class='ex-tag-wrong'>Courchevel</span>, sulle Alpi francesi. Nella sua carriera ha ottenuto 91 vittorie nei Gran Premi, un record rimasto imbattuto fino al 2020, ed è ricordato dai tifosi con il soprannome di Kaiser."
      },
      500: {
        title: "SPORT - 500 PUNTI",
        prompt:
          "Michael Jordan è nato a Chicago nel 1963 ed è cresciuto in North Carolina, dove con l'università locale ha segnato il canestro decisivo nella finale NCAA del 1982. Nel draft del 1984 fu scelto dai Chicago Bulls con la terza scelta assoluta. Con i Bulls ha vinto sei titoli NBA, tre tra il 1991 e il 1993 e altri tre tra il 1996 e il 1998. Nel 1993, dopo la morte del padre, si è ritirato per dedicarsi al baseball, giocando nelle leghe minori con i Birmingham Barons, squadra affiliata ai Chicago Cubs. È tornato nell'NBA nel marzo del 1995, con la frase 'I'm back', indossando inizialmente il numero 45. Nel 1996 è stato protagonista del film Space Jam. Con la nazionale statunitense ha vinto l'oro olimpico nel 1984 e poi con il celebre Dream Team a Atlanta nel 1992. Dopo il definitivo ritiro nel 2003, al termine di un'esperienza con i Washington Wizards, è diventato proprietario di una squadra, gli Charlotte Hornets, e a lui è dedicata una linea di scarpe, le Air Jordan, tra le più vendute al mondo.",
        correction:
          "Michael Jordan è nato a <span class='ex-tag-wrong'>Chicago</span> nel 1963 ed è cresciuto in North Carolina, dove con l'università locale ha segnato il canestro decisivo nella finale NCAA del 1982. Nel draft del 1984 fu scelto dai Chicago Bulls con la terza scelta assoluta. Con i Bulls ha vinto sei titoli NBA, tre tra il 1991 e il 1993 e altri tre tra il 1996 e il 1998. Nel 1993, dopo la morte del padre, si è ritirato per dedicarsi al baseball, giocando nelle leghe minori con i Birmingham Barons, squadra affiliata ai <span class='ex-tag-wrong'>Chicago Cubs</span>. È tornato nell'NBA nel marzo del 1995, con la frase 'I'm back', indossando inizialmente il numero 45. Nel 1996 è stato protagonista del film Space Jam. Con la nazionale statunitense ha vinto l'oro olimpico nel 1984 e poi con il celebre Dream Team a <span class='ex-tag-wrong'>Atlanta</span> nel 1992. Dopo il definitivo ritiro nel 2003, al termine di un'esperienza con i Washington Wizards, è diventato proprietario di una squadra, gli Charlotte Hornets, e a lui è dedicata una linea di scarpe, le Air Jordan, tra le più vendute al mondo."
      }
    }
  },
  {
    id: "geo",
    label: "GEOGRAFIA",
    levels: {
      200: {
        title: "GEOGRAFIA - 200 PUNTI",
        prompt:
          "L'Italia è divisa in 20 regioni. La più piccola per superficie è la Valle d'Aosta, mentre il fiume più lungo del Paese è il Tevere, che attraversa la Pianura Padana. Il Po nasce dal Monviso, in Piemonte, e sfocia nel mare Adriatico formando un grande delta tra Veneto ed Emilia-Romagna. Il lago più grande d'Italia, a cavallo tra Lombardia, Veneto e Trentino, è il Lago Maggiore. Nel suo territorio si trovano inoltre tre tra i vulcani più famosi: l'Etna, lo Stromboli e il Vesuvio. Un'altra curiosità è che l'Italia ospita al suo interno due piccoli Stati indipendenti: la Città del Vaticano, a Roma, e la Repubblica di San Marino, tra la Toscana e le Marche.",
        correction:
          "L'Italia è divisa in 20 regioni. La più piccola per superficie è la Valle d'Aosta, mentre il fiume più lungo del Paese è <span class='ex-tag-wrong'>il Tevere</span>, che attraversa la Pianura Padana. Il Po nasce dal Monviso, in Piemonte, e sfocia nel mare Adriatico formando un grande delta tra Veneto ed Emilia-Romagna. Il lago più grande d'Italia, a cavallo tra Lombardia, Veneto e Trentino, è <span class='ex-tag-wrong'>il Lago Maggiore</span>. Nel suo territorio si trovano inoltre tre tra i vulcani più famosi: l'Etna, lo Stromboli e il Vesuvio. Un'altra curiosità è che l'Italia ospita al suo interno due piccoli Stati indipendenti: la Città del Vaticano, a Roma, e la Repubblica di San Marino, tra la Toscana e <span class='ex-tag-wrong'>le Marche</span>."
      },
      300: {
        title: "GEOGRAFIA - 300 PUNTI",
        prompt:
          "Il Brasile è il Paese più grande del Sudamerica. La sua capitale è Rio de Janeiro, costruita appositamente negli anni '50, e la lingua ufficiale è il portoghese. Nel Paese vivono oltre duecento milioni di persone e la città più popolosa è San Paolo. Il Sudamerica è attraversato per tutta la lunghezza dalla catena montuosa degli Urali, mentre nel nord scorre il Rio delle Amazzoni. Brasilia, inaugurata nel 1960, è stata progettata dall'urbanista Lúcio Costa e dall'architetto Oscar Niemeyer. Il Paese ospita gran parte della foresta amazzonica, spesso definita il polmone verde del pianeta, e ha vinto più Mondiali di calcio di qualsiasi altra nazionale, cinque in totale. Il carnevale di Buenos Aires è uno dei più celebri al mondo.",
        correction:
          "Il Brasile è il Paese più grande del Sudamerica. La sua capitale è <span class='ex-tag-wrong'>Rio de Janeiro</span>, costruita appositamente negli anni '50, e la lingua ufficiale è il portoghese. Nel Paese vivono oltre duecento milioni di persone e la città più popolosa è San Paolo. Il Sudamerica è attraversato per tutta la lunghezza dalla catena montuosa <span class='ex-tag-wrong'>degli Urali</span>, mentre nel nord scorre il Rio delle Amazzoni. Brasilia, inaugurata nel 1960, è stata progettata dall'urbanista Lúcio Costa e dall'architetto Oscar Niemeyer. Il Paese ospita gran parte della foresta amazzonica, spesso definita il polmone verde del pianeta, e ha vinto più Mondiali di calcio di qualsiasi altra nazionale, cinque in totale. Il carnevale di <span class='ex-tag-wrong'>Buenos Aires</span> è uno dei più celebri al mondo."
      },
      400: {
        title: "GEOGRAFIA - 400 PUNTI",
        prompt:
          "L'Africa è un continente di record. Il Nilo, lungo circa 6.650 chilometri, nasce dall'unione di due rami: il Nilo Bianco, che parte dal lago Vittoria, e il Nilo Azzurro, che nasce dal lago Tana in Sudan. I due rami si uniscono a Khartoum e il fiume prosegue attraverso l'Egitto fino a sfociare nel mar Mediterraneo. Il Sahara è il deserto caldo più grande del pianeta e copre circa nove milioni di chilometri quadrati. Il Paese più esteso del continente è la Repubblica Democratica del Congo, mentre quello più popoloso è la Nigeria. Il continente è anche tra i più ricchi di biodiversità, con parchi famosi come il Serengeti in Tanzania e il Kruger in Sudafrica, e ospita animali simbolo come l'elefante, la giraffa e il leone. La vetta più alta, il Kilimangiaro, si innalza in Tanzania fino a 5.895 metri. Il continente comprende 54 Paesi riconosciuti, e il Zanzibar è la sua isola più grande.",
        correction:
          "L'Africa è un continente di record. Il Nilo, lungo circa 6.650 chilometri, nasce dall'unione di due rami: il Nilo Bianco, che parte dal lago Vittoria, e il Nilo Azzurro, che nasce dal lago Tana in <span class='ex-tag-wrong'>Sudan</span>. I due rami si uniscono a Khartoum e il fiume prosegue attraverso l'Egitto fino a sfociare nel mar Mediterraneo. Il Sahara è il deserto caldo più grande del pianeta e copre circa nove milioni di chilometri quadrati. Il Paese più esteso del continente è <span class='ex-tag-wrong'>la Repubblica Democratica del Congo</span>, mentre quello più popoloso è la Nigeria. Il continente è anche tra i più ricchi di biodiversità, con parchi famosi come il Serengeti in Tanzania e il Kruger in Sudafrica, e ospita animali simbolo come l'elefante, la giraffa e il leone. La vetta più alta, il Kilimangiaro, si innalza in Tanzania fino a 5.895 metri. Il continente comprende 54 Paesi riconosciuti, e <span class='ex-tag-wrong'>il Zanzibar</span> è la sua isola più grande."
      },
      500: {
        title: "GEOGRAFIA - 500 PUNTI",
        prompt:
          "L'Australia è l'unico Paese al mondo che occupa un intero continente. La sua capitale è Canberra, una città progettata a tavolino dall'architetto americano Walter Burley Griffin, mentre le città più famose sono Sydney e Melbourne. A Sydney sorge l'Opera House, inaugurata nel 1973 e progettata dall'architetto Frank Gehry, di origine danese. La lingua ufficiale è l'inglese e la moneta è il dollaro australiano. L'isola più grande che dipende dall'Australia è la Tasmania, a sud, mentre le popolazioni indigene del Paese, gli aborigeni, vivono sul territorio da oltre sessantamila anni. La Grande Barriera Corallina, lunga oltre 2.000 chilometri, si estende davanti alla costa del Nuovo Galles del Sud ed è patrimonio dell'UNESCO dal 1981. Sul suo stemma compaiono due animali simbolo: il canguro e l'emù. Al centro del Paese sorge Uluru, una gigantesca roccia rossa sacra al popolo Maori, sulla quale dal 2019 è vietato arrampicarsi.",
        correction:
          "L'Australia è l'unico Paese al mondo che occupa un intero continente. La sua capitale è Canberra, una città progettata a tavolino dall'architetto americano Walter Burley Griffin, mentre le città più famose sono Sydney e Melbourne. A Sydney sorge l'Opera House, inaugurata nel 1973 e progettata dall'architetto <span class='ex-tag-wrong'>Frank Gehry</span>, di origine danese. La lingua ufficiale è l'inglese e la moneta è il dollaro australiano. L'isola più grande che dipende dall'Australia è la Tasmania, a sud, mentre le popolazioni indigene del Paese, gli aborigeni, vivono sul territorio da oltre sessantamila anni. La Grande Barriera Corallina, lunga oltre 2.000 chilometri, si estende davanti alla costa del <span class='ex-tag-wrong'>Nuovo Galles del Sud</span> ed è patrimonio dell'UNESCO dal 1981. Sul suo stemma compaiono due animali simbolo: il canguro e l'emù. Al centro del Paese sorge Uluru, una gigantesca roccia rossa sacra al popolo <span class='ex-tag-wrong'>Maori</span>, sulla quale dal 2019 è vietato arrampicarsi."
      }
    }
  },
  {
    id: "natale",
    label: "NATALE",
    levels: {
      200: {
        title: "NATALE - 200 PUNTI",
        prompt:
          "Il panettone è il dolce natalizio più celebre d'Italia e nasce a Torino. Secondo una leggenda, sarebbe stato inventato alla corte di Ludovico il Moro, alla fine del Quattrocento, da un giovane aiutante di cucina di nome Toni, che avrebbe salvato il dolce di un banchetto andato male aggiungendo burro, uova, uvetta e canditi. Il nome deriverebbe proprio da pan de Toni, cioè pane di Toni. La preparazione richiede una lievitazione lunga e delicata, che può durare più di un giorno, e per questo il panettone artigianale si ottiene con il lievito di birra. Oltre al panettone, la tradizione italiana comprende il torrone di Cremona, il panforte di Siena e gli struffoli di Napoli, piccole palline di pasta fritte e ricoperte di miele. Il grande rivale del panettone è però il pandoro, nato a Padova e brevettato da Domenico Melegatti nel 1894, con la sua caratteristica forma a stella a otto punte, che si serve spolverato di zucchero a velo.",
        correction:
          "Il panettone è il dolce natalizio più celebre d'Italia e nasce a <span class='ex-tag-wrong'>Torino</span>. Secondo una leggenda, sarebbe stato inventato alla corte di Ludovico il Moro, alla fine del Quattrocento, da un giovane aiutante di cucina di nome Toni, che avrebbe salvato il dolce di un banchetto andato male aggiungendo burro, uova, uvetta e canditi. Il nome deriverebbe proprio da pan de Toni, cioè pane di Toni. La preparazione richiede una lievitazione lunga e delicata, che può durare più di un giorno, e per questo il panettone artigianale si ottiene con <span class='ex-tag-wrong'>il lievito di birra</span>. Oltre al panettone, la tradizione italiana comprende il torrone di Cremona, il panforte di Siena e gli struffoli di Napoli, piccole palline di pasta fritte e ricoperte di miele. Il grande rivale del panettone è però il pandoro, nato a <span class='ex-tag-wrong'>Padova</span> e brevettato da Domenico Melegatti nel 1894, con la sua caratteristica forma a stella a otto punte, che si serve spolverato di zucchero a velo."
      },
      300: {
        title: "NATALE - 300 PUNTI",
        prompt:
          "Il primo presepe vivente della storia fu realizzato da San Francesco d'Assisi nel 1223 a Greccio, un piccolo borgo in provincia di Perugia. Il santo volle rappresentare la nascita di Gesù con una vera mangiatoia, un bue e un asinello, per far capire alla gente la povertà di quella notte a Betlemme. Nei secoli successivi la tradizione si diffuse in tutta Italia e a Napoli, nella celebre via Toledo, le botteghe artigiane producono ancora oggi statuine in terracotta, tra cui i personaggi del quotidiano e dello spettacolo. Nella tradizione, il presepe viene allestito l'8 dicembre, giorno dell'Immacolata, e Gesù Bambino viene collocato nella mangiatoia solo la notte di Natale. I tre Re Magi, Melchiorre, Gaspare e Baldassarre, arrivano nel presepe il 6 gennaio, giorno dell'Epifania, e portano in dono oro, incenso e argento.",
        correction:
          "Il primo presepe vivente della storia fu realizzato da San Francesco d'Assisi nel 1223 a Greccio, un piccolo borgo in provincia di <span class='ex-tag-wrong'>Perugia</span>. Il santo volle rappresentare la nascita di Gesù con una vera mangiatoia, un bue e un asinello, per far capire alla gente la povertà di quella notte a Betlemme. Nei secoli successivi la tradizione si diffuse in tutta Italia e a Napoli, nella celebre <span class='ex-tag-wrong'>via Toledo</span>, le botteghe artigiane producono ancora oggi statuine in terracotta, tra cui i personaggi del quotidiano e dello spettacolo. Nella tradizione, il presepe viene allestito l'8 dicembre, giorno dell'Immacolata, e Gesù Bambino viene collocato nella mangiatoia solo la notte di Natale. I tre Re Magi, Melchiorre, Gaspare e Baldassarre, arrivano nel presepe il 6 gennaio, giorno dell'Epifania, e portano in dono oro, incenso e <span class='ex-tag-wrong'>argento</span>."
      },
      400: {
        title: "NATALE - 400 PUNTI",
        prompt:
          "Babbo Natale deriva dalla figura di San Nicola, vescovo di Bari vissuto nel IV secolo e ricordato per la generosità verso i poveri. I suoi resti si trovano proprio a Bari, dove furono portati dai marinai nel 1087, e per questo la città pugliese lo festeggia ogni anno a inizio maggio. Nei Paesi Bassi la sua figura prese il nome di Sinterklaas, da cui deriva l'inglese Santa Claus. L'immagine moderna con il vestito rosso e bianco fu resa popolare dalle pubblicità della Pepsi, disegnate dall'illustratore Haddon Sundblom a partire dagli anni Trenta. Secondo la tradizione Babbo Natale vive al Polo Nord, anche se in Finlandia la città di Rovaniemi ospita il suo villaggio ufficiale. Le sue renne trainano la slitta nella notte del 24 dicembre, e la più famosa, Rudolph, fu inventata nel 1939 da Robert May per i grandi magazzini Macy's.",
        correction:
          "Babbo Natale deriva dalla figura di San Nicola, vescovo di <span class='ex-tag-wrong'>Bari</span> vissuto nel IV secolo e ricordato per la generosità verso i poveri. I suoi resti si trovano proprio a Bari, dove furono portati dai marinai nel 1087, e per questo la città pugliese lo festeggia ogni anno a inizio maggio. Nei Paesi Bassi la sua figura prese il nome di Sinterklaas, da cui deriva l'inglese Santa Claus. L'immagine moderna con il vestito rosso e bianco fu resa popolare dalle pubblicità della <span class='ex-tag-wrong'>Pepsi</span>, disegnate dall'illustratore Haddon Sundblom a partire dagli anni Trenta. Secondo la tradizione Babbo Natale vive al Polo Nord, anche se in Finlandia la città di Rovaniemi ospita il suo villaggio ufficiale. Le sue renne trainano la slitta nella notte del 24 dicembre, e la più famosa, Rudolph, fu inventata nel 1939 da Robert May per i grandi magazzini <span class='ex-tag-wrong'>Macy's</span>."
      },
      500: {
        title: "NATALE - 500 PUNTI",
        prompt:
          "Il Canto di Natale è un racconto di Charles Dickens, pubblicato a Parigi con il sottotitolo Una storia di fantasmi per Natale. Il protagonista è Ebenezer Scrooge, un vecchio e avaro uomo d'affari che odia il Natale e liquida ogni festa con l'esclamazione 'Bah, sciocchezze!'. La vigilia di Natale riceve la visita del fantasma del suo ex socio Jacob Marley, che trascina pesanti catene fatte di casseforti e lucchetti, e poi quella di tre spiriti: il Natale Passato, il Natale Presente e il Natale Futuro. Tra le persone che incontra c'è il suo impiegato Bob Cratchit, padre del piccolo Tiny Tim, un bambino malato. Al risveglio Scrooge è un uomo nuovo e diventa generoso con tutti. La storia è stata adattata infinite volte. Nel cortometraggio Disney Il Canto di Natale di Topolino, del 1983, Zio Paperone è Scrooge, Topolino è Bob Cratchit e Paperino è il fantasma di Marley. Nei Simpson il signor Burns è spesso uno Scrooge: nell'episodio Natale riveduto e corretto lo si vede in quei panni, con Smithers nelle vesti del fantasma di Marley. Nel film Bah, Humduck! dei Looney Tunes, uscito nel 2006, l'avaro è Daffy Duck, proprietario di un enorme supermercato, mentre Bugs Bunny è il suo dipendente, sul modello di Bob Cratchit.",
        correction:
          "Il Canto di Natale è un racconto di Charles Dickens, pubblicato a <span class='ex-tag-wrong'>Parigi</span> con il sottotitolo Una storia di fantasmi per Natale. Il protagonista è Ebenezer Scrooge, un vecchio e avaro uomo d'affari che odia il Natale e liquida ogni festa con l'esclamazione 'Bah, sciocchezze!'. La vigilia di Natale riceve la visita del fantasma del suo ex socio Jacob Marley, che trascina pesanti catene fatte di casseforti e lucchetti, e poi quella di tre spiriti: il Natale Passato, il Natale Presente e il Natale Futuro. Tra le persone che incontra c'è il suo impiegato Bob Cratchit, padre del piccolo Tiny Tim, un bambino malato. Al risveglio Scrooge è un uomo nuovo e diventa generoso con tutti. La storia è stata adattata infinite volte. Nel cortometraggio Disney Il Canto di Natale di Topolino, del 1983, Zio Paperone è Scrooge, Topolino è Bob Cratchit e <span class='ex-tag-wrong'>Paperino</span> è il fantasma di Marley. Nei Simpson il signor Burns è spesso uno Scrooge: nell'episodio Natale riveduto e corretto lo si vede in quei panni, con Smithers nelle vesti del fantasma di Marley. Nel film Bah, Humduck! dei Looney Tunes, uscito nel 2006, l'avaro è Daffy Duck, proprietario di un enorme supermercato, mentre <span class='ex-tag-wrong'>Bugs Bunny</span> è il suo dipendente, sul modello di Bob Cratchit."
      }
    }
  }
];

const GIRO_DI_BOA_CONFIG = {
  title: "Mitologia",
  rules:
    "Ciascuno di voi deve scrivere segretamente su un foglietto quanti punti intende scommettere — potete gamblare fino a tutti i punti che possedete in questo momento. Una volta raccolte le scommesse, svelerò la categoria misteriosa e leggerò l'affermazione relativa. Attenzione: a differenza del tabellone principale, in questa frase si nasconde UN SOLO ERRORE. Avrete 30 secondi di tempo per scrivere sul foglio la correzione. Chi indovina raddoppia i punti scommessi; chi sbaglia li perde!",
  prompt:
    "Gli dèi dell'Olimpo, secondo la mitologia greca, erano dodici e vivevano sul monte Olimpo, in Grecia. Zeus, re degli dèi e signore del cielo e del fulmine, era sposato con sua sorella Era, protettrice del matrimonio. I suoi fratelli Poseidone e Ade governavano rispettivamente i mari e gli inferi. Atena, dea della saggezza, nacque dalla testa di Zeus già adulta e armata, mentre Afrodite, dea dell'amore, era sposata con Ares, il fabbro degli dèi. Apollo e Artemide erano gemelli, figli di Zeus e della titanide Leto. Ermes, infine, era il messaggero degli dèi e portava i sandali alati. Gli dèi si riunivano in un grande palazzo sulla cima del monte per decidere il destino dei mortali, e a servirli c'erano le Muse, che proteggevano le arti, e le Ore, che regolavano il susseguirsi delle stagioni. Tra le figure più amate c'era anche Dioniso, dio del vino e del teatro.",
  correction:
    "Gli dèi dell'Olimpo, secondo la mitologia greca, erano dodici e vivevano sul monte Olimpo, in Grecia. Zeus, re degli dèi e signore del cielo e del fulmine, era sposato con sua sorella Era, protettrice del matrimonio. I suoi fratelli Poseidone e Ade governavano rispettivamente i mari e gli inferi. Atena, dea della saggezza, nacque dalla testa di Zeus già adulta e armata, mentre Afrodite, dea dell'amore, era sposata con <span class='ex-tag-wrong'>Ares</span>, il fabbro degli dèi. Apollo e Artemide erano gemelli, figli di Zeus e della titanide Leto. Ermes, infine, era il messaggero degli dèi e portava i sandali alati. Gli dèi si riunivano in un grande palazzo sulla cima del monte per decidere il destino dei mortali, e a servirli c'erano le Muse, che proteggevano le arti, e le Ore, che regolavano il susseguirsi delle stagioni. Tra le figure più amate c'era anche Dioniso, dio del vino e del teatro."
};

// =========================================================================
// 2. LOGICA DI GIOCO
// =========================================================================
const scores = { green: 0, blue: 0, pink: 0 };
const cardStages = {};
musicCategories.forEach((c) => { cardStages[c.id] = 0; });

const playedCells = {};
let activeLevel = null;
let showLevelCorrection = false;

// Fasi del Giro di Boa:
// 0 = solo regole / scommessa (categoria e testo nascosti)
// 1 = categoria svelata (regole nascoste, testo ancora nascosto)
// 2 = testo mostrato (regole nascoste, toggle correzione disponibile)
let finaleStage = 0;
let showFinaleCorrection = false;

let gameLoopAudio = null;
let finaleLoopAudio = null;
let finaleTimerInterval = null;

let introAudio = null;
let syncTimerId = null;
let manualScene = 1;
let titleRevealed = false;
let exampleStepIndex = 0;

function resetMusicHook() {
  document.getElementById("pre-know-cats")?.classList.remove("is-shown");
  document.getElementById("pre-what-game")?.classList.remove("is-shown");
}

function showMusicHook() {
  document.getElementById("pre-know-cats")?.classList.add("is-shown");
  document.getElementById("pre-what-game")?.classList.add("is-shown");
}

function resolveMediaUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();

  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return "https://drive.google.com/uc?export=download&id=" + fileMatch[1];
  }

  const queryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (queryMatch && queryMatch[1]) {
    return "https://drive.google.com/uc?export=download&id=" + queryMatch[1];
  }

  return trimmed;
}

function formatClock(sec) {
  const clamped = Math.max(0, Math.floor(sec));
  const mins = String(Math.floor(clamped / 60)).padStart(2, "0");
  const secs = String(clamped % 60).padStart(2, "0");
  return mins + ":" + secs;
}

function setTopBrandText(text, revealed) {
  const brand = document.getElementById("top-brand");
  if (!brand) return;
  brand.textContent = text;
  brand.classList.toggle("is-revealed", Boolean(revealed));
}

function unlockGameTitle() {
  titleRevealed = true;
  document.title = GAME_CONFIG.branding.gameTitle + " — Game Show";
  setTopBrandText(GAME_CONFIG.branding.gameTitle, true);

  const rulesEyebrow = document.getElementById("rules-eyebrow");
  if (rulesEyebrow) {
    rulesEyebrow.textContent = GAME_CONFIG.branding.gameTitle + " — IL REGOLAMENTO";
  }
}

function renderRulesList() {
  const ul = document.getElementById("rules-list");
  if (!ul) return;
  ul.innerHTML = RULES_ITEMS.map((item) => "<li>" + item + "</li>").join("");
}

function renderExampleStep() {
  const step = EXAMPLE_CONFIG.steps[exampleStepIndex] || EXAMPLE_CONFIG.steps[0];
  const titleEl = document.getElementById("example-title");
  const playersBar = document.getElementById("example-players-bar");
  const passageEl = document.getElementById("example-passage");
  const eventCard = document.getElementById("example-event-card");
  const finalBanner = document.getElementById("example-final-banner");

  if (titleEl) titleEl.textContent = EXAMPLE_CONFIG.title + " — " + step.label;

  if (playersBar) {
    playersBar.innerHTML = EXAMPLE_CONFIG.players
      .map((name) => {
        const pts = step.scores[name] ?? 0;
        const sign = pts > 0 ? "+" + pts : String(pts);
        const cls = pts > 0 ? "is-positive" : pts < 0 ? "is-negative" : "";
        return (
          '<div class="ex-player-pill">' +
            "<span>" + name + "</span>" +
            '<span class="ex-player-score ' + cls + '">' + sign + "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  if (passageEl) {
    let htmlText = EXAMPLE_CONFIG.baseText;
    Object.entries(step.slots).forEach(([key, slot]) => {
      let replacement = slot.text;
      if (slot.state === "wrong") {
        replacement = '<span class="ex-tag-wrong">' + slot.text + "</span>";
      } else if (slot.state === "fixed") {
        replacement = '<span class="ex-tag-fixed">' + slot.text + "</span>";
      }
      htmlText = htmlText.replace("{{" + key + "}}", replacement);
    });
    passageEl.innerHTML = htmlText;
  }

  if (eventCard) {
    eventCard.textContent = step.note;
  }

  if (finalBanner) {
    const resolvedIcon = resolveMediaUrl(GAME_CONFIG.branding.logoImageUrl);
    const iconHtml = resolvedIcon
      ? '<img src="' + resolvedIcon + '" alt="Mascotte" class="example-final-icon" />'
      : "";
    finalBanner.innerHTML =
      iconHtml +
      "<span>" + EXAMPLE_CONFIG.finalBannerText + "</span>";
    finalBanner.classList.toggle("is-visible", Boolean(step.showFinalBanner));
  }
}

function nextExampleStep() {
  if (exampleStepIndex < EXAMPLE_CONFIG.steps.length - 1) {
    exampleStepIndex += 1;
    renderExampleStep();
  }
}

function prevExampleStep() {
  if (exampleStepIndex > 0) {
    exampleStepIndex -= 1;
    renderExampleStep();
  }
}

function resetExampleSteps() {
  exampleStepIndex = 0;
  renderExampleStep();
}

function removeMusicBadgeIfPresent() {
  const badge = document.getElementById("game-music-status");
  if (badge) {
    badge.remove();
  }
}

function ensureGameLoopMusic() {
  removeMusicBadgeIfPresent();
  const src = resolveMediaUrl(GAME_CONFIG.audio.gameLoopSrc);
  if (!src) return;
  if (!gameLoopAudio) {
    gameLoopAudio = new Audio(src);
    gameLoopAudio.loop = true;
  } else if (gameLoopAudio.src !== src) {
    gameLoopAudio.src = src;
    gameLoopAudio.loop = true;
  }
  gameLoopAudio.play().catch(() => {});
}

function stopGameLoopMusic() {
  removeMusicBadgeIfPresent();
  if (gameLoopAudio) {
    gameLoopAudio.pause();
  }
}

function ensureFinaleLoopMusic() {
  removeMusicBadgeIfPresent();
  const src = resolveMediaUrl(GAME_CONFIG.audio.finaleLoopSrc);
  if (!src) return;
  if (!finaleLoopAudio) {
    finaleLoopAudio = new Audio(src);
    finaleLoopAudio.loop = true;
  } else if (finaleLoopAudio.src !== src) {
    finaleLoopAudio.src = src;
    finaleLoopAudio.loop = true;
  }
  finaleLoopAudio.play().catch(() => {});
}

function stopFinaleLoopMusic() {
  if (finaleLoopAudio) {
    finaleLoopAudio.pause();
  }
}

function cellKey(catId, pts) {
  return catId + "_" + pts;
}

function renderBoard() {
  removeMusicBadgeIfPresent();
  const grid = document.getElementById("board-grid");
  if (!grid) return;

  const pointValues = [200, 300, 400, 500];
  grid.innerHTML = BOARD_CATEGORIES.map((cat) => {
    const buttonsHtml = pointValues
      .map((pts) => {
        const key = cellKey(cat.id, pts);
        const playedClass = playedCells[key] ? " is-played" : "";
        return (
          '<button type="button" class="board-cell-btn' + playedClass + '" ' +
            'onclick="openLevel(\'' + cat.id + "', " + pts + ')">' +
            pts +
          "</button>"
        );
      })
      .join("");

    return (
      '<div class="board-col">' +
        '<div class="board-col-header">' + cat.label + "</div>" +
        buttonsHtml +
      "</div>"
    );
  }).join("");
}

function openLevel(catId, pts) {
  const cat = BOARD_CATEGORIES.find((c) => c.id === catId);
  if (!cat || !cat.levels[pts]) return;

  activeLevel = { catId, pts };
  showLevelCorrection = false;
  playedCells[cellKey(catId, pts)] = true;
  renderBoard();
  renderLevelView();
  goToScreen("screen-level");
}

function renderLevelView() {
  if (!activeLevel) return;
  const cat = BOARD_CATEGORIES.find((c) => c.id === activeLevel.catId);
  const lvl = cat?.levels[activeLevel.pts];
  if (!cat || !lvl) return;

  const eyebrow = document.getElementById("level-eyebrow");
  const title = document.getElementById("level-title");
  const modeBanner = document.getElementById("level-mode-banner");
  const textBox = document.getElementById("level-text-box");
  const toggleBtn = document.getElementById("toggle-correction-btn");
  const playedBtn = document.getElementById("toggle-played-btn");
  const quickPts = document.getElementById("level-quick-points");

  if (eyebrow) eyebrow.textContent = cat.label + " · " + activeLevel.pts + " PUNTI";
  if (title) title.textContent = lvl.title;

  if (modeBanner) {
    if (showLevelCorrection) {
      modeBanner.textContent = "ERRORI EVIDENZIATI — " + lvl.title;
      modeBanner.classList.add("is-correction");
    } else {
      modeBanner.textContent = "TESTO DA LEGGERE (3 ERRORI NASCOSTI)";
      modeBanner.classList.remove("is-correction");
    }
  }

  if (textBox) {
    textBox.innerHTML = showLevelCorrection ? lvl.correction : lvl.prompt;
  }

  if (toggleBtn) {
    toggleBtn.textContent = showLevelCorrection ? "Mostra Testo" : "Mostra Errori";
  }

  if (playedBtn) {
    const isPlayed = Boolean(playedCells[cellKey(activeLevel.catId, activeLevel.pts)]);
    playedBtn.textContent = isPlayed ? "Giocato ✓" : "Segna come giocato";
  }

  if (quickPts) {
    const v = activeLevel.pts;
    quickPts.innerHTML = ["green", "blue", "pink"]
      .map((teamKey) => {
        const teamLabel = GAME_CONFIG.teams[teamKey].label;
        return (
          '<div class="quick-pt-card">' +
            "<span>" + teamLabel + "</span>" +
            '<div class="quick-pt-btns">' +
              '<button type="button" class="plus-btn" onclick="adjustScore(\'' + teamKey + "', " + v + ')">+' + v + "</button>" +
              '<button type="button" class="minus-btn" onclick="adjustScore(\'' + teamKey + "', -" + v + ')">−' + v + "</button>" +
            "</div>" +
          "</div>"
        );
      })
      .join("");
  }
}

function toggleLevelCorrection() {
  showLevelCorrection = !showLevelCorrection;
  renderLevelView();
}

function toggleCurrentLevelPlayed() {
  if (!activeLevel) return;
  const k = cellKey(activeLevel.catId, activeLevel.pts);
  playedCells[k] = !playedCells[k];
  renderBoard();
  renderLevelView();
}

function resetFinaleTimer() {
  if (finaleTimerInterval) {
    clearInterval(finaleTimerInterval);
    finaleTimerInterval = null;
  }
  const disp = document.getElementById("finale-timer-display");
  if (disp) disp.textContent = "00:30";
}

function startFinaleTimer() {
  resetFinaleTimer();
  let remaining = 30;
  const disp = document.getElementById("finale-timer-display");
  if (disp) disp.textContent = "00:30";

  finaleTimerInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      if (disp) disp.textContent = "00:00";
      resetFinaleTimer();
      return;
    }
    if (disp) {
      disp.textContent = "00:" + String(remaining).padStart(2, "0");
    }
  }, 1000);
}

function ensureFinaleControls() {
  const headerActions = document.querySelector("#screen-finale .level-header-actions");
  if (!headerActions) return;

  let revealCatBtn = document.getElementById("reveal-finale-category-btn");
  if (!revealCatBtn) {
    revealCatBtn = document.createElement("button");
    revealCatBtn.type = "button";
    revealCatBtn.id = "reveal-finale-category-btn";
    revealCatBtn.className = "btn-secondary";
    revealCatBtn.onclick = revealFinaleCategory;

    const toggleCorrBtn = document.getElementById("toggle-finale-correction-btn");
    if (toggleCorrBtn) {
      headerActions.insertBefore(revealCatBtn, toggleCorrBtn);
    } else {
      headerActions.appendChild(revealCatBtn);
    }
  }

  let revealTextBtn = document.getElementById("reveal-finale-text-btn");
  if (!revealTextBtn) {
    revealTextBtn = document.createElement("button");
    revealTextBtn.type = "button";
    revealTextBtn.id = "reveal-finale-text-btn";
    revealTextBtn.className = "btn-primary";
    revealTextBtn.onclick = revealFinaleText;

    const toggleCorrBtn = document.getElementById("toggle-finale-correction-btn");
    if (toggleCorrBtn) {
      headerActions.insertBefore(revealTextBtn, toggleCorrBtn);
    } else {
      headerActions.appendChild(revealTextBtn);
    }
  }
}

function syncFinaleStageUi() {
  ensureFinaleControls();

  const titleEl = document.getElementById("finale-title");
  const rulesBox = document.getElementById("finale-rules-box");
  const modeBanner = document.getElementById("finale-mode-banner");
  const textBox = document.getElementById("finale-text-box");
  const revealCatBtn = document.getElementById("reveal-finale-category-btn");
  const revealTextBtn = document.getElementById("reveal-finale-text-btn");
  const toggleCorrBtn = document.getElementById("toggle-finale-correction-btn");

  if (rulesBox) {
    rulesBox.textContent = GIRO_DI_BOA_CONFIG.rules;
    // Sparisce appena viene svelata la categoria così da lasciare più spazio alla domanda
    rulesBox.style.display = finaleStage === 0 ? "block" : "none";
  }

  if (finaleStage === 0) {
    if (titleEl) titleEl.textContent = "CATEGORIA MISTERIOSA";
    if (modeBanner) {
      modeBanner.textContent = "FASE 1 · SCOMMESSE (PUOI SCOMMETTERE FINO A TUTTI I TUOI PUNTI)";
      modeBanner.classList.remove("is-correction");
    }
    if (textBox) {
      textBox.innerHTML =
        "<span style='opacity:0.65;'>Prima raccogli le scommesse e svela la categoria misteriosa, poi verrà mostrato il testo.</span>";
    }
    if (revealCatBtn) {
      revealCatBtn.style.display = "inline-block";
      revealCatBtn.textContent = "Svela Categoria";
    }
    if (revealTextBtn) {
      revealTextBtn.style.display = "none";
    }
    if (toggleCorrBtn) {
      toggleCorrBtn.style.display = "none";
    }
  } else if (finaleStage === 1) {
    if (titleEl) titleEl.textContent = GIRO_DI_BOA_CONFIG.title;
    if (modeBanner) {
      modeBanner.textContent = "CATEGORIA SVELATA: " + GIRO_DI_BOA_CONFIG.title.toUpperCase() + " — TESTO IN ARRIVO";
      modeBanner.classList.remove("is-correction");
    }
    if (textBox) {
      textBox.innerHTML =
        "<span style='opacity:0.65;'>Categoria svelata: <strong>" +
        GIRO_DI_BOA_CONFIG.title +
        "</strong>. Premi \"Mostra Testo\" quando sei pronto a leggere.</span>";
    }
    if (revealCatBtn) {
      revealCatBtn.style.display = "none";
    }
    if (revealTextBtn) {
      revealTextBtn.style.display = "inline-block";
      revealTextBtn.textContent = "Mostra Testo";
    }
    if (toggleCorrBtn) {
      toggleCorrBtn.style.display = "none";
    }
  } else {
    if (titleEl) titleEl.textContent = GIRO_DI_BOA_CONFIG.title;
    if (revealCatBtn) {
      revealCatBtn.style.display = "none";
    }
    if (revealTextBtn) {
      revealTextBtn.style.display = "none";
    }
    if (toggleCorrBtn) {
      toggleCorrBtn.style.display = "inline-block";
      toggleCorrBtn.textContent = showFinaleCorrection
        ? "Mostra Testo Giro di Boa"
        : "Mostra Errore Giro di Boa";
    }

    if (showFinaleCorrection) {
      if (modeBanner) {
        modeBanner.textContent = "ERRORE EVIDENZIATO — " + GIRO_DI_BOA_CONFIG.title.toUpperCase();
        modeBanner.classList.add("is-correction");
      }
      if (textBox) textBox.innerHTML = GIRO_DI_BOA_CONFIG.correction;
    } else {
      if (modeBanner) {
        modeBanner.textContent = "CATEGORIA: " + GIRO_DI_BOA_CONFIG.title.toUpperCase() + " — 1 SOLO ERRORE NASCOSTO";
        modeBanner.classList.remove("is-correction");
      }
      if (textBox) textBox.innerHTML = GIRO_DI_BOA_CONFIG.prompt;
    }
  }

  requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
}

function revealFinaleCategory() {
  if (finaleStage < 1) {
    finaleStage = 1;
    showFinaleCorrection = false;
    syncFinaleStageUi();
  }
}

function revealFinaleText() {
  if (finaleStage < 2) {
    finaleStage = 2;
    showFinaleCorrection = false;
    syncFinaleStageUi();
  }
}

function renderFinaleView() {
  finaleStage = 0;
  showFinaleCorrection = false;
  resetFinaleTimer();
  syncFinaleStageUi();
}

function toggleFinaleCorrection() {
  if (finaleStage < 2) return;
  showFinaleCorrection = !showFinaleCorrection;
  syncFinaleStageUi();
}

function applyConfigToDom() {
  setTopBrandText(GAME_CONFIG.branding.preRevealLabel, false);

  const finalTitle = document.getElementById("final-game-title");
  if (finalTitle) finalTitle.textContent = GAME_CONFIG.branding.gameTitle;

  const logoImg = document.getElementById("game-logo-img");
  const resolvedLogo = resolveMediaUrl(GAME_CONFIG.branding.logoImageUrl);
  if (logoImg) {
    if (resolvedLogo) {
      logoImg.src = resolvedLogo;
      logoImg.style.display = "block";
    } else {
      logoImg.removeAttribute("src");
      logoImg.style.display = "none";
    }
  }

  ["green", "blue", "pink"].forEach((key) => {
    const t = GAME_CONFIG.teams[key];
    const hudName = document.getElementById("hud-name-" + key);
    const hudMembers = document.getElementById("hud-members-" + key);
    const titleEl = document.getElementById("title-" + key);
    const p1 = document.getElementById("p-" + key + "-1");
    const p2 = document.getElementById("p-" + key + "-2");

    if (hudName) hudName.textContent = t.label;
    if (hudMembers) hudMembers.textContent = t.players[0] + " & " + t.players[1];
    if (titleEl) titleEl.textContent = t.label.toUpperCase();
    if (p1) p1.textContent = t.players[0];
    if (p2) p2.textContent = t.players[1];
  });

  const qrImg = document.getElementById("buzzer-qr-img");
  const qrCap = document.getElementById("buzzer-qr-caption");
  const resolvedQr = resolveMediaUrl(GAME_CONFIG.buzzer.qrImageUrl);
  if (qrImg) {
    if (resolvedQr) {
      qrImg.src = resolvedQr;
      qrImg.style.display = "block";
    } else if (GAME_CONFIG.buzzer.joinUrl) {
      const encoded = encodeURIComponent(GAME_CONFIG.buzzer.joinUrl);
      qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encoded;
      qrImg.style.display = "block";
    } else {
      qrImg.removeAttribute("src");
      qrImg.style.display = "none";
    }
  }
  if (qrCap) qrCap.textContent = GAME_CONFIG.buzzer.caption;

  const musicPlayer = document.getElementById("music-round-player");
  const resolvedMusic = resolveMediaUrl(GAME_CONFIG.audio.musicRoundSrc);
  if (musicPlayer && resolvedMusic) {
    musicPlayer.src = resolvedMusic;
  }
}

function adjustScore(team, delta) {
  scores[team] += delta;
  const el = document.getElementById("score-" + team);
  if (el) el.textContent = scores[team];
}

function stopAllAudio() {
  const musicPlayer = document.getElementById("music-round-player");
  if (musicPlayer) {
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
  }

  if (syncTimerId) {
    clearInterval(syncTimerId);
    syncTimerId = null;
  }
  if (introAudio) {
    introAudio.pause();
    introAudio.currentTime = 0;
    introAudio = null;
  }
}

function goToScreen(screenId) {
  stopAllAudio();
  resetFinaleTimer();

  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("is-active");

  if (screenId === "screen-board" || screenId === "screen-level") {
    stopFinaleLoopMusic();
    ensureGameLoopMusic();
  } else if (screenId === "screen-finale") {
    stopGameLoopMusic();
    ensureFinaleLoopMusic();
  } else {
    stopGameLoopMusic();
    stopFinaleLoopMusic();
  }

  if (screenId === "screen-lobby") {
    resetMusicHook();
    titleRevealed = false;
    setTopBrandText(GAME_CONFIG.branding.preRevealLabel, false);
  }

  if (screenId === "screen-music") {
    const musicPlayer = document.getElementById("music-round-player");
    const resolvedMusic = resolveMediaUrl(GAME_CONFIG.audio.musicRoundSrc);
    if (musicPlayer && resolvedMusic && musicPlayer.src !== resolvedMusic) {
      musicPlayer.src = resolvedMusic;
    }
    if (musicPlayer) {
      musicPlayer.pause();
      musicPlayer.currentTime = 0;
    }
    resetMusicHook();
  }

  if (screenId === "screen-intro") {
    resetMusicHook();
    startIntroSequence();
  }

  if (screenId === "screen-rules") {
    resetMusicHook();
    unlockGameTitle();
  }

  if (screenId === "screen-example") {
    resetMusicHook();
    unlockGameTitle();
    resetExampleSteps();
  }

  if (screenId === "screen-board") {
    resetMusicHook();
    unlockGameTitle();
    renderBoard();
  }

  if (screenId === "screen-level") {
    resetMusicHook();
    unlockGameTitle();
    renderLevelView();
  }

  if (screenId === "screen-finale") {
    resetMusicHook();
    unlockGameTitle();
    renderFinaleView();
  }
}

function updateCard(item) {
  const stage = cardStages[item.id];
  const card = document.getElementById("mcard-" + item.id);
  const body = document.getElementById("mbody-" + item.id);
  if (!card || !body) return;

  card.setAttribute("data-stage", stage);
  if (stage === 0) {
    body.innerHTML = '<div class="song-reveal">Categoria #' + item.id + "</div>";
  } else if (stage === 1) {
    body.innerHTML =
      '<div class="song-reveal">' + item.song + "</div>" +
      '<div class="category-reveal" style="opacity:0.35;font-size:1rem;">Categoria nascosta...</div>';
  } else {
    body.innerHTML =
      '<div class="song-reveal">' + item.song + "</div>" +
      '<div class="category-reveal">' + item.category + "</div>";
  }

  if (item.id === 6) {
    if (stage === 2) {
      showMusicHook();
    } else {
      resetMusicHook();
    }
  }
}

function renderMusicCards() {
  const grid = document.getElementById("music-grid");
  if (!grid) return;
  grid.innerHTML = "";

  musicCategories.forEach((item) => {
    const div = document.createElement("div");
    div.className = "music-card";
    div.id = "mcard-" + item.id;
    div.setAttribute("data-stage", "0");
    div.innerHTML =
      '<div class="card-num">CATEGORIA 0' + item.id + "</div>" +
      '<div id="mbody-' + item.id + '"></div>';
    div.addEventListener("click", () => {
      cardStages[item.id] = (cardStages[item.id] + 1) % 3;
      updateCard(item);
    });
    grid.appendChild(div);
    updateCard(item);
  });
}

function resetIntroVisuals() {
  titleRevealed = false;
  setTopBrandText(GAME_CONFIG.branding.preRevealLabel, false);

  document.querySelectorAll(".scene").forEach((sc) => sc.classList.remove("is-active"));
  document.querySelector(".format-banner")?.classList.remove("is-visible");
  document.getElementById("main-game-title")?.classList.remove("is-visible");

  ["green", "blue", "pink"].forEach((k) => {
    const slot = document.getElementById("slot-" + k);
    slot?.classList.remove("is-visible", "show-team", "show-players");
    document.getElementById("p-" + k + "-1")?.classList.remove("is-open");
    document.getElementById("p-" + k + "-2")?.classList.remove("is-open");
  });

  const adj = document.getElementById("host-adj");
  if (adj) {
    adj.textContent = GAME_CONFIG.credits.hostFriendlyWord;
    adj.className = "adj-friendly";
  }
}

function showScene(num) {
  manualScene = num;
  document.querySelectorAll(".scene").forEach((sc) => {
    sc.classList.toggle("is-active", Number(sc.dataset.scene) === num);
  });
}

function triggerEvilAndTitle() {
  const adj = document.getElementById("host-adj");
  if (adj) {
    adj.textContent = GAME_CONFIG.credits.hostEvilWord;
    adj.className = "adj-evil";
  }
  document.getElementById("main-game-title")?.classList.add("is-visible");
  if (!titleRevealed) {
    unlockGameTitle();
  }
}

function applyTimelineAtSecond(sec) {
  const t = GAME_CONFIG.timelineSec;
  const totalSec =
    introAudio && !Number.isNaN(introAudio.duration) && introAudio.duration > 0
      ? introAudio.duration
      : t.totalDuration;

  const clock = document.getElementById("intro-clock");
  if (clock) {
    clock.textContent = formatClock(sec) + " / " + formatClock(totalSec);
  }

  if (sec < t.scene2Notary) {
    showScene(1);
    if (sec >= t.formatBanner) document.querySelector(".format-banner")?.classList.add("is-visible");

    if (sec >= t.greenShow) document.getElementById("slot-green")?.classList.add("is-visible");
    if (sec >= t.greenTeam) document.getElementById("slot-green")?.classList.add("show-team");
    if (sec >= t.greenPlayers) {
      document.getElementById("slot-green")?.classList.add("show-players");
      document.getElementById("p-green-1")?.classList.add("is-open");
      document.getElementById("p-green-2")?.classList.add("is-open");
    }

    if (sec >= t.blueShow) document.getElementById("slot-blue")?.classList.add("is-visible");
    if (sec >= t.blueTeam) document.getElementById("slot-blue")?.classList.add("show-team");
    if (sec >= t.bluePlayers) {
      document.getElementById("slot-blue")?.classList.add("show-players");
      document.getElementById("p-blue-1")?.classList.add("is-open");
      document.getElementById("p-blue-2")?.classList.add("is-open");
    }

    if (sec >= t.pinkShow) document.getElementById("slot-pink")?.classList.add("is-visible");
    if (sec >= t.pinkTeam) document.getElementById("slot-pink")?.classList.add("show-team");
    if (sec >= t.pinkPlayers) {
      document.getElementById("slot-pink")?.classList.add("show-players");
      document.getElementById("p-pink-1")?.classList.add("is-open");
      document.getElementById("p-pink-2")?.classList.add("is-open");
    }
  } else if (sec < t.scene3HostFriendly) {
    showScene(2);
  } else {
    showScene(3);
    if (sec >= t.evilSwitchAndTitle) {
      triggerEvilAndTitle();
    }
  }
}

function startIntroSequence() {
  resetIntroVisuals();
  showScene(1);

  const notice = document.getElementById("intro-notice");
  const syncStatus = document.getElementById("sync-status");
  const resolvedIntro = resolveMediaUrl(GAME_CONFIG.audio.introSrc);

  if (resolvedIntro) {
    introAudio = new Audio(resolvedIntro);
    introAudio.play().catch(() => {});
    if (syncStatus) syncStatus.textContent = "Sincronizzato all'audio";
    if (notice) notice.textContent = "";

    syncTimerId = setInterval(() => {
      if (!introAudio) return;
      applyTimelineAtSecond(introAudio.currentTime);
    }, 150);
  } else {
    if (syncStatus) syncStatus.textContent = "Simulazione 01:46 (collega MP3 in GAME_CONFIG)";
    if (notice) notice.textContent = "Puoi usare Avanti / Indietro in qualsiasi momento.";
    let simSec = 0;
    syncTimerId = setInterval(() => {
      simSec = Math.min(GAME_CONFIG.timelineSec.totalDuration, simSec + 0.25);
      applyTimelineAtSecond(simSec);
    }, 250);
  }
}

function nextIntroScene() {
  if (syncTimerId) {
    clearInterval(syncTimerId);
    syncTimerId = null;
  }
  const next = Math.min(3, manualScene + 1);
  showScene(next);
  if (next === 1) {
    document.querySelector(".format-banner")?.classList.add("is-visible");
    ["green", "blue", "pink"].forEach((k) => {
      document.getElementById("slot-" + k)?.classList.add("is-visible", "show-players");
      document.getElementById("p-" + k + "-1")?.classList.add("is-open");
      document.getElementById("p-" + k + "-2")?.classList.add("is-open");
    });
  }
  if (next === 3) {
    triggerEvilAndTitle();
  }
}

function prevIntroScene() {
  if (syncTimerId) {
    clearInterval(syncTimerId);
    syncTimerId = null;
  }
  const prev = Math.max(1, manualScene - 1);
  showScene(prev);
}

function restartIntroScene() {
  stopAllAudio();
  startIntroSequence();
}

applyConfigToDom();
renderMusicCards();
renderRulesList();
renderExampleStep();
renderBoard();


// =========================================================================
// 3. ADATTAMENTO AUTOMATICO DEI TESTI (per la TV)
//    Ogni testo lungo prende la dimensione piu' grande possibile che entra
//    nello spazio disponibile. Per avere testi piu' grandi/piccoli in assoluto
//    cambia FIT_MAX_VW (limite massimo) e FIT_MIN_PX (limite minimo).
// =========================================================================
(function () {
  const FIT_MAX_VW = 3.2;
  const FIT_MIN_PX = 18;

  // [elemento di cui cambio la dimensione, elemento che non deve scorrere]
  const FIT_TARGETS = [
    ["level-text-box", "level-text-box"],
    ["finale-text-box", "finale-text-box"],
    ["example-passage", "example-passage"],
    ["rules-list", null]
  ];

  function fitOne(textEl, boxEl) {
    if (!textEl || !boxEl || boxEl.offsetParent === null) return;
    let lo = FIT_MIN_PX;
    let hi = Math.max(FIT_MIN_PX, (window.innerWidth * FIT_MAX_VW) / 100);
    for (let i = 0; i < 9; i++) {
      const mid = (lo + hi) / 2;
      textEl.style.fontSize = mid + "px";
      if (boxEl.scrollHeight <= boxEl.clientHeight + 1) lo = mid;
      else hi = mid;
    }
    textEl.style.fontSize = Math.floor(lo) + "px";
  }

  function fitAllTexts() {
    FIT_TARGETS.forEach(function (pair) {
      const textEl = document.getElementById(pair[0]);
      const boxEl = pair[1] ? document.getElementById(pair[1]) : (textEl ? textEl.closest(".rules-panel-full") : null);
      fitOne(textEl, boxEl);
    });
  }

  let fitQueued = false;
  function queueFit() {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(function () {
      fitQueued = false;
      fitAllTexts();
    });
  }

  const stage = document.querySelector(".stage");
  if (stage && window.MutationObserver) {
    new MutationObserver(queueFit).observe(stage, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });
  }
  window.addEventListener("resize", queueFit);
  queueFit();
})();
