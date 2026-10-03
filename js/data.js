// Projetos e textos PT/EN do site.
//
// Campos de cada projeto:
//   id, name
//   types   lista com 'game', 'app' e/ou 'site'
//   plat    plataformas
//   st      'live' (lançado), 'wip' (em desenvolvimento) ou 'soon' (em breve)
//   y       ano de lançamento (só nos lançados)
//   link    endereço aberto pelo botão "Abrir"/"Jogar" (só nos lançados)
//   video   arquivo em videos/ (sem vídeo, o destaque mostra "Prévia em breve")
//   tech    tecnologias
//   tpt/ten frase curta em PT/EN (adesivos)
//   pt/en   descrição em PT/EN (painel em destaque)

const PROJECTS = [
  { id: 'beebee', name: 'Bee Bee', types: ['game'], plat: 'Android · Web', st: 'live', y: 2017, link: 'https://beebee.cyberhat.com.br/', video: 'bee-bee.webm', tech: ['Godot', 'GDScript', 'Python', 'Blender'],
    tpt: 'Suba, desvie das roseiras, pegue todas as flores.', ten: 'Climb, dodge the roses, grab every flower.',
    pt: 'Jogo de subir sem parar para Android e navegador, em voxel 3D. Com um toque à esquerda ou à direita, a abelha passa pelas roseiras e precisa pegar todas as flores: perdeu uma, a partida acaba. O céu vai do dia à noite enquanto se sobe, e há sete abelhas para desbloquear.',
    en: 'An endless climbing game for Android and the browser, in 3D voxel. With a tap on the left or right, the bee slips past the rose bushes and has to collect every flower: miss one and the run is over. The sky shifts from day to night as you climb, and there are seven bees to unlock.' },
  { id: 'duelel', name: 'Duelel', types: ['site', 'app'], plat: 'Web · Android', st: 'live', y: 2021, link: 'https://duelel.cyberhat.com.br/', video: 'duelel.webm', tech: ['JavaScript', 'Node.js', 'WebSocket', 'PostgreSQL', 'Supabase'],
    tpt: 'Corrida de digitação multiplayer em tempo real.', ten: 'A real-time multiplayer typing race.',
    pt: 'Corrida de digitação multiplayer em tempo real. Enfrente outra pessoa por matchmaking automático ou sala privada via link, ou treine sozinho contra o relógio. Tem ranking de WPM e pode ser instalado como app.',
    en: 'A real-time multiplayer typing race. Face another person through automatic matchmaking or a private room via link, or train solo against the clock. It has a WPM leaderboard and can be installed as an app.' },
  { id: 'wake', name: 'Wake Wake Up', types: ['app'], plat: 'Android', st: 'live', y: 2023, link: 'https://wakewakeup.cyberhat.com.br/', video: 'wake-wake-up.webm', tech: ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM'],
    tpt: 'O despertador que só desliga depois de uma missão.', ten: 'The alarm that only stops after a mission.',
    pt: 'Despertador para Android que só desliga depois de uma missão: resolver contas ou digitar uma frase. Tem visual de rádio-relógio flip dos anos 70, permite acordar com rádios online e registra quanto tempo você leva para sair da cama.',
    en: 'An Android alarm clock that only turns off after a mission: solve math problems or type a phrase. It has a 70s flip clock radio look, lets you wake up to online radio stations and tracks how long it takes you to get out of bed.' },
  { id: 'fluva', name: 'Fluva', types: ['site', 'app'], plat: 'Desktop · Mobile', st: 'live', y: 2024, link: 'https://fluva.cyberhat.com.br/', video: 'fluva.webm', tech: ['TypeScript', 'React', 'Tauri', 'Rust', 'pdf.js'],
    tpt: 'Editor de PDF que roda inteiro no navegador.', ten: 'A PDF editor that runs entirely in your browser.',
    pt: 'Editor de PDF e imagens gratuito que roda inteiro no navegador: edite texto, junte, divida, comprima, converta e assine digitalmente (ICP-Brasil). Os arquivos nunca saem do seu aparelho.',
    en: 'A free PDF and image editor that runs entirely in the browser: edit text, merge, split, compress, convert and digitally sign (ICP-Brasil). Your files never leave your device.' },
  { id: 'cynote', name: 'Cynote', types: ['app'], plat: 'Windows · Android', st: 'live', y: 2025, link: 'https://cynote.cyberhat.com.br/', video: 'cynote.webm', tech: ['TypeScript', 'Rust', 'Dart', 'Tauri', 'Flutter'],
    tpt: 'Notas na hora: Ctrl+Shift+Space e pronto.', ten: 'Instant notes: Ctrl+Shift+Space and go.',
    pt: 'Bloco de notas rápido para Windows e Android: fica na bandeja e abre na hora com Ctrl+Shift+Space. As notas sincronizam entre PC e celular pelo Wi-Fi, sem conta e sem servidor, com um protocolo P2P próprio.',
    en: 'A fast notepad for Windows and Android: it lives in the tray and opens instantly with Ctrl+Shift+Space. Notes sync between PC and phone over Wi-Fi, with no account and no server, using a custom P2P protocol.' },
  { id: 'memoras', name: 'Memoras', types: ['site', 'app'], plat: 'Windows · Android · Web', st: 'live', y: 2026, link: 'https://memoras.cyberhat.com.br/', video: 'memoras.webm', tech: ['TypeScript', 'React', 'Electron', 'Capacitor', 'Supabase'],
    tpt: 'Seu diário, criptografado de ponta a ponta.', ten: 'Your journal, end-to-end encrypted.',
    pt: 'Diário pessoal privado para Windows, Android e web, feito com uma única base de código. Funciona sem internet, tem tranca por PIN e sincroniza entre aparelhos com criptografia de ponta a ponta.',
    en: 'A private personal journal for Windows, Android and web, built from a single codebase. It works offline, has a PIN lock and syncs across devices with end-to-end encryption.' },
  { id: 'multistreams', name: 'Multistreams', types: ['site', 'app'], plat: 'Web · Android', st: 'live', y: 2019, link: 'https://multistreams.cyberhat.com.br/', video: 'multistreams.webm', tech: ['TypeScript', 'React Native', 'Expo', 'Node.js', 'Supabase'],
    tpt: 'Twitch, YouTube e Kick numa lista só.', ten: 'Twitch, YouTube and Kick in one list.',
    pt: 'Junta Twitch, YouTube e Kick numa lista só de quem está ao vivo agora, do mais ao menos assistido, com filtros por idioma e categoria. Web e Android, com visual Y2K cromado.',
    en: "Brings Twitch, YouTube and Kick together in a single list of who's live right now, from most to least watched, with filters by language and category. Web and Android, with a chrome Y2K look." },
  { id: 'sugar', name: 'Sugar Static', types: ['game'], plat: 'Android', st: 'live', y: 2026, link: 'https://sugarstatic.cyberhat.com.br/', video: 'sugar-static.webm', tech: ['Godot 4', 'GDScript', 'Jolt Physics', 'Shaders'],
    tpt: 'Arremesse, junte doces, não deixe nada cair.', ten: 'Toss, merge sweets, let nothing fall.',
    pt: 'Jogo mobile casual de juntar doces: arremesse no prato, una iguais para criar doces maiores e não deixe nada cair. A vaquinha Glace reage a cada jogada. Todos os modelos 3D foram gerados por código.',
    en: "A casual mobile merge game with sweets: toss them onto the plate, merge matching ones to create bigger sweets and don't let anything fall. Glace the little cow reacts to every move. Every 3D model was generated with code." },
  { id: 'nerbany', name: 'Nerbany AI', types: ['site', 'app'], plat: 'Web', st: 'wip', tech: [],
    tpt: 'Suporte técnico com IA para provedores.', ten: 'AI tech support for internet providers.',
    pt: 'Atendimento técnico automatizado com IA para provedores de internet. Recebe o chamado, acessa o roteador do cliente remotamente, verifica sinal e configurações e diagnostica falhas comparando com outros clientes da região.',
    en: "Automated AI tech support for internet providers. It takes the ticket, reaches the customer's router remotely, checks signal and settings, and diagnoses faults by comparing against other customers in the region." },
  { id: 'shuriken', name: 'Shuriken Break', types: ['game'], plat: 'Mobile', st: 'wip', tech: [],
    tpt: 'Um ninja, infinitas shurikens.', ten: 'One ninja, endless shurikens.',
    pt: 'Jogo mobile infinito onde o jogador controla um ninja que deve eliminar seus inimigos com shurikens.', en: 'An endless mobile game where you control a ninja who must take down enemies with shurikens.' },
  { id: 'hathat', name: 'HatHat', types: ['site', 'app'], plat: 'Web · Mobile', st: 'soon', tech: [],
    tpt: 'A rede social que encurta distâncias.', ten: 'The social network that shrinks distances.',
    pt: 'Rede social que vai diminuir a fronteira entre as pessoas.', en: 'A social network built to shrink the distance between people.' },
  { id: 'veralo', name: 'Veralo', types: ['site', 'app'], plat: 'Web', st: 'soon', tech: [],
    tpt: 'ERP simples para comércios e delivery.', ten: 'A simple ERP for shops and delivery.',
    pt: 'ERP focado em comércios físicos e food deliveries. Automatiza todo o estoque com um design simples e minimalista.', en: 'An ERP built for physical stores and food delivery. Automates the entire inventory with a simple, minimalist design.' },
  { id: 'sperboy', name: 'Sperboy', types: ['game'], plat: 'Mobile', st: 'soon', tech: [],
    tpt: 'O primeiro jogo, de uma Game Jam de 2017.', ten: 'The first game, from a 2017 Game Jam.',
    pt: 'O primeiro jogo da casa, feito em 2017 numa Game Jam. Você controla um espermatozoide que precisa desviar de vários obstáculos até chegar ao útero.', en: 'The very first game, made in 2017 at a Game Jam. You control a sperm cell that must dodge obstacles on its way to the uterus.' },
  { id: 'claudez', name: 'Claude Z', types: ['game'], plat: 'Mobile', st: 'soon', tech: [],
    tpt: 'Plataforma infinita com um herói de correntes.', ten: 'An endless platformer with a chain-firing hero.',
    pt: 'Claude Z: Night Savior. Plataforma infinito em que você controla um super-herói que dispara correntes dos braços. Vá o mais longe possível sem morrer.', en: 'Claude Z: Night Savior. An endless platformer where you control a superhero who fires chains from his arms. Get as far as you can without dying.' },
  { id: 'punkbibi', name: 'Punk Bibi', types: ['game'], plat: 'Mobile', st: 'soon', tech: [],
    tpt: 'Puzzle de animais com uma gatinha sabotadora.', ten: 'An animal puzzle with a saboteur kitten.',
    pt: 'Puzzle casual onde você combina animais enquanto Punk Bibi, uma gatinha mágica, faz de tudo para atrapalhar.', en: 'A casual puzzle where you match animals while Punk Bibi, a magical kitten, does everything to get in your way.' },
  { id: 'guppy', name: 'Guppy', types: ['game'], plat: 'Mobile', st: 'soon', tech: [],
    tpt: 'Coma, cresça, vire o maior peixe do oceano.', ten: 'Eat, grow, become the biggest fish in the sea.',
    pt: 'Você é um peixe que cresce comendo outros peixes. Desvie dos maiores e cresça até virar o maior peixe do oceano.', en: "You're a fish that grows by eating other fish. Dodge the bigger ones and grow into the biggest fish in the ocean." }
];

const TEXTS = {
  pt: {
    metaDesc: 'Cyberhat: apps, sites e jogos independentes.',
    navProjects: 'Projetos', navAbout: 'Sobre', langLabel: 'Idioma',
    tagline: 'Apps, sites e jogos independentes.',
    sub: 'A Cyberhat cria e publica produtos próprios desde 2017: ferramentas do dia a dia, serviços para empresas e jogos para celular.',
    see: 'Ver projetos', since: 'Desde 2017', projects: 'Projetos', filterLabel: 'Filtrar por tipo',
    all: 'Todos', apps: 'Apps', games: 'Jogos', game: 'Jogo',
    released: 'Lançados', upcoming: 'Em desenvolvimento e em breve', live: 'Lançado', wip: 'Em desenvolvimento', soon: 'Em breve',
    plat: 'Plataformas', type: 'Tipo', open: 'Abrir', play: 'Jogar', noPreview: 'Prévia em breve',
    about: 'Sobre a Cyberhat', aboutLead: 'Começou com jogos. Hoje, tudo o que o estúdio cria leva o nome Cyberhat.',
    aboutBody: 'A Cyberhat começou em 2017 como um estúdio de jogos independentes, e o primeiro jogo nasceu numa Game Jam. Depois vieram os apps e os sites, e cada projeto ganhou uma identidade visual própria.',
    launches: 'Lançamentos', projectsWord: 'projetos'
  },
  en: {
    metaDesc: 'Cyberhat: independent apps, websites and games.',
    navProjects: 'Projects', navAbout: 'About', langLabel: 'Language',
    tagline: 'Independent apps, websites and games.',
    sub: 'Cyberhat has been building and shipping its own products since 2017: everyday tools, services for businesses and mobile games.',
    see: 'See projects', since: 'Since 2017', projects: 'Projects', filterLabel: 'Filter by type',
    all: 'All', apps: 'Apps', games: 'Games', game: 'Game',
    released: 'Released', upcoming: 'In development & coming soon', live: 'Released', wip: 'In development', soon: 'Coming soon',
    plat: 'Platforms', type: 'Type', open: 'Open', play: 'Play', noPreview: 'Preview soon',
    about: 'About Cyberhat', aboutLead: 'It started with games. Today, everything the studio makes carries the Cyberhat name.',
    aboutBody: 'Cyberhat started in 2017 as an independent game studio, and its first game was born at a Game Jam. Then came the apps and websites, and every project got a visual identity of its own.',
    launches: 'Launches', projectsWord: 'projects'
  }
};
