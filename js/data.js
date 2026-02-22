/**
 * data.js
 * Módulo para buscar dados da Google Sheets ou do mock local.
 *
 * CONFIGURAÇÃO:
 * 1. Crie uma Google Sheets com as colunas:
 *    id | categoria | titulo | resumo | conteudo_texto | audio_url | video_url | imagem_url | imagem_legenda | tags
 *
 *    IMPORTANTE: O campo "id" deve ser um slug legível, ex: "atividade-fisica", "alimentacao-hipertensao"
 *    Esse slug será usado na URL do webview: conteudo.html?id=atividade-fisica
 *
 * 2. Publique a planilha: Arquivo → Compartilhar → Publicar na web → Planilha inteira → CSV
 *
 * 3. Substitua SHEET_ID abaixo pelo ID da sua planilha (o trecho entre /d/ e /edit na URL).
 */

// ===== CONFIGURAÇÃO =====
// Substitua pelo ID real da sua planilha do Google Sheets
const SHEET_ID = '';
const SHEET_NAME = 'Página1'; // Nome da aba da planilha

// URL da Google Sheets como CSV
function getSheetURL() {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
}

// ===== DADOS DE EXEMPLO (usados enquanto a planilha não estiver configurada) =====
// Cada item = 1 conteúdo que abre em webview independente
// O "id" é o slug usado na URL: conteudo.html?id=pressao-alta
const MOCK_DATA = [
  {
    id: 'pressao-alta',
    categoria: 'hipertensao',
    titulo: 'O que é pressão alta?',
    resumo: 'Entenda o que é a hipertensão arterial, por que ela é perigosa e como você pode controlá-la no dia a dia.',
    conteudo_texto: `<p><strong>A pressão alta</strong>, também chamada de <strong>hipertensão arterial</strong>, acontece quando o sangue faz muita força contra as paredes das artérias do corpo.</p>

<p>Pense assim: suas artérias são como mangueiras que levam o sangue para todo o corpo. Quando a pressão está alta, é como se a água passasse com muita força pela mangueira, podendo danificá-la com o tempo.</p>

<p><strong>Por que isso é perigoso?</strong></p>
<ul>
  <li>Pode causar problemas no coração</li>
  <li>Pode afetar os rins</li>
  <li>Pode causar um AVC (derrame)</li>
  <li>Pode prejudicar a visão</li>
</ul>

<p><strong>O que você pode fazer:</strong></p>
<ul>
  <li>Tomar os remédios certinho, no horário que o médico disse</li>
  <li>Comer menos sal</li>
  <li>Fazer caminhadas leves</li>
  <li>Medir a pressão regularmente</li>
  <li>Evitar estresse quando possível</li>
</ul>

<p>Lembre-se: a pressão alta geralmente <strong>não dá sintomas</strong>. Por isso, é muito importante medir com frequência, mesmo quando você se sente bem!</p>`,
    audio_url: '',
    video_url: '',
    imagem_url: '',
    imagem_legenda: '',
    tags: 'pressão, coração, hipertensão'
  },
  {
    id: 'diabetes-tipo-2',
    categoria: 'diabetes',
    titulo: 'Entendendo o diabetes tipo 2',
    resumo: 'Saiba o que é o diabetes tipo 2, como ele afeta seu corpo e dicas práticas para manter o açúcar no sangue controlado.',
    conteudo_texto: `<p><strong>O diabetes tipo 2</strong> é uma doença em que o corpo tem dificuldade de usar o açúcar (glicose) que está no sangue como energia.</p>

<p>Quando comemos, o corpo transforma boa parte da comida em açúcar. O <strong>pâncreas</strong> produz um hormônio chamado <strong>insulina</strong>, que funciona como uma "chave" que abre a porta das células para o açúcar entrar e virar energia.</p>

<p>No diabetes tipo 2, essa "chave" não funciona direito. O açúcar fica acumulado no sangue, e isso causa problemas ao longo do tempo.</p>

<p><strong>Sinais de alerta:</strong></p>
<ul>
  <li>Muita sede</li>
  <li>Vontade de fazer xixi com frequência</li>
  <li>Cansaço excessivo</li>
  <li>Visão embaçada</li>
  <li>Feridas que demoram a cicatrizar</li>
</ul>

<p><strong>Dicas para controlar:</strong></p>
<ul>
  <li>Evite doces e refrigerantes</li>
  <li>Prefira alimentos integrais</li>
  <li>Faça atividades físicas leves (como caminhada)</li>
  <li>Tome seus remédios no horário certo</li>
  <li>Meça a glicemia conforme orientação médica</li>
</ul>`,
    audio_url: '',
    video_url: '',
    imagem_url: '',
    imagem_legenda: '',
    tags: 'diabetes, açúcar, glicemia'
  },
  {
    id: 'alimentacao-hipertensao',
    categoria: 'hipertensao',
    titulo: 'Alimentação para quem tem pressão alta',
    resumo: 'Dicas simples de alimentação que ajudam a controlar a pressão arterial. Saiba o que comer e o que evitar.',
    conteudo_texto: `<p>A alimentação é uma das melhores formas de ajudar a <strong>controlar a pressão alta</strong>. Pequenas mudanças no que você come podem fazer uma grande diferença!</p>

<p><strong>Alimentos que ajudam:</strong></p>
<ul>
  <li>🍌 <strong>Banana</strong> – rica em potássio, ajuda a regular a pressão</li>
  <li>🥦 <strong>Brócolis e espinafre</strong> – cheios de nutrientes bons para o coração</li>
  <li>🐟 <strong>Peixes</strong> – como sardinha e salmão, ricos em ômega 3</li>
  <li>🧄 <strong>Alho</strong> – tempero natural que ajuda a baixar a pressão</li>
  <li>🫘 <strong>Feijão e lentilha</strong> – ricos em fibras</li>
</ul>

<p><strong>O que evitar ou reduzir:</strong></p>
<ul>
  <li>🧂 <strong>Sal em excesso</strong> – use no máximo 1 colher de chá por dia</li>
  <li>🥫 <strong>Alimentos industrializados</strong> – têm muito sódio escondido</li>
  <li>🍟 <strong>Frituras</strong> – prefira cozinhar grelhado ou assado</li>
  <li>🥤 <strong>Refrigerantes</strong> – troque por água ou sucos naturais</li>
</ul>

<p><strong>Dica importante:</strong> Acostume-se a ler os rótulos dos alimentos. Procure por "sódio" na tabela nutricional. Quanto menos, melhor!</p>`,
    audio_url: '',
    video_url: '',
    imagem_url: '',
    imagem_legenda: '',
    tags: 'alimentação, dieta, sal, comida'
  },
  {
    id: 'cuidados-pes-diabetes',
    categoria: 'diabetes',
    titulo: 'Cuidados com os pés para diabéticos',
    resumo: 'Aprenda por que o cuidado com os pés é tão importante para quem tem diabetes e veja dicas práticas do dia a dia.',
    conteudo_texto: `<p>Quem tem diabetes precisa ter um <strong>cuidado especial com os pés</strong>. Isso porque o excesso de açúcar no sangue pode, com o tempo, afetar os nervos e a circulação dos pés.</p>

<p><strong>Por que os pés precisam de atenção?</strong></p>
<ul>
  <li>O diabetes pode diminuir a sensibilidade dos pés, e você pode não sentir pequenas feridas</li>
  <li>Feridas que não são tratadas podem se tornar infecções graves</li>
  <li>A circulação mais lenta dificulta a cicatrização</li>
</ul>

<p><strong>Cuidados diários com os pés:</strong></p>
<ul>
  <li>👀 <strong>Examine seus pés todos os dias</strong> – procure feridas, bolhas, rachaduras ou mudanças na cor</li>
  <li>🧼 <strong>Lave os pés com água morna</strong> (nunca quente!) e seque bem entre os dedos</li>
  <li>🧴 <strong>Passe hidratante</strong>, mas não entre os dedos</li>
  <li>✂️ <strong>Corte as unhas em linha reta</strong>, com cuidado</li>
  <li>👟 <strong>Use sapatos confortáveis</strong>, fechados, que não apertem</li>
  <li>🧦 <strong>Use meias de algodão</strong> e troque todos os dias</li>
  <li>🚫 <strong>Nunca ande descalço</strong>, nem dentro de casa</li>
</ul>

<p><strong>Atenção:</strong> Se notar qualquer ferida, mudança de cor ou inchaço nos pés, procure seu médico o mais rápido possível!</p>`,
    audio_url: '',
    video_url: '',
    imagem_url: '',
    imagem_legenda: '',
    tags: 'pés, cuidados, feridas, circulação'
  },
  {
    id: 'tomar-remedios',
    categoria: 'geral',
    titulo: 'A importância de tomar os remédios corretamente',
    resumo: 'Entenda por que é fundamental seguir o tratamento médico certinho e veja dicas para não esquecer os horários.',
    conteudo_texto: `<p>Tomar os remédios <strong>no horário certo e na dose certa</strong> é uma das coisas mais importantes para manter sua saúde em dia, especialmente para quem tem pressão alta ou diabetes.</p>

<p><strong>O que acontece quando você para de tomar os remédios?</strong></p>
<ul>
  <li>A pressão pode subir de repente, mesmo se você estava bem</li>
  <li>O açúcar do sangue pode descontrolar</li>
  <li>Os problemas de saúde podem piorar sem você perceber</li>
</ul>

<p><strong>Dicas para não esquecer:</strong></p>
<ul>
  <li>⏰ <strong>Coloque um alarme no celular</strong> para cada horário de remédio</li>
  <li>📦 <strong>Use uma caixinha organizadora</strong> de comprimidos (com os dias da semana)</li>
  <li>📝 <strong>Peça ajuda a um familiar</strong> para lembrar</li>
  <li>🏥 <strong>Não mude a dose por conta própria</strong> – sempre fale com o médico</li>
  <li>💊 <strong>Leve seus remédios quando viajar</strong></li>
</ul>

<p><strong>Importante:</strong> Mesmo quando você se sente bem, continue tomando os remédios. Muitas doenças crônicas são silenciosas e precisam de tratamento contínuo!</p>`,
    audio_url: '',
    video_url: '',
    imagem_url: '',
    imagem_legenda: '',
    tags: 'remédios, medicamentos, adesão, tratamento'
  },
  {
    id: 'atividade-fisica',
    categoria: 'geral',
    titulo: 'Mexa-se! Atividade física para sua saúde',
    resumo: 'Descubra como se movimentar pode ajudar a controlar a pressão alta e o diabetes.',
    conteudo_texto: `<p>Movimentar o corpo é um dos melhores remédios para quem vive com <strong>pressão alta</strong> ou <strong>diabetes</strong>.</p>
<p><strong>Não precisa ser atleta.</strong> Caminhar, dançar, brincar com os netos — tudo conta!</p>`,
    benefit_cards: [
      { icon: '❤️', title: 'Coração forte', desc: 'Baixa a pressão arterial naturalmente' },
      { icon: '🩸', title: 'Açúcar controlado', desc: 'Seu corpo usa melhor a insulina' },
      { icon: '😴', title: 'Sono melhor', desc: 'Mais disposição durante o dia' },
      { icon: '🦴', title: 'Ossos firmes', desc: 'Previne quedas e fraturas' },
      { icon: '🧠', title: 'Mente ativa', desc: 'Melhora memória e raciocínio' },
      { icon: '⚖️', title: 'Peso saudável', desc: 'Reduz risco de complicações' }
    ],
    time_goal: {
      number: '30',
      unit: 'min/dia',
      detail: '5 dias por semana. Pode dividir em 3 sessões de 10 min!'
    },
    activities: [
      { icon: '🚶', name: 'Caminhada', tip: 'Comece com 10 min e aumente aos poucos' },
      { icon: '💃', name: 'Dança', tip: 'Forró, samba, qualquer ritmo vale!' },
      { icon: '🏊', name: 'Hidroginástica', tip: 'Ideal para dores nas articulações' },
      { icon: '🧘', name: 'Alongamento', tip: 'Melhora flexibilidade e relaxa' },
      { icon: '🚴', name: 'Pedalar', tip: 'Bom pro coração e como transporte' },
      { icon: '🏐', name: 'Esportes', tip: 'Futebol, vôlei, bocha com amigos' }
    ],
    tips: [
      'Vá a pé quando possível',
      'Suba escadas ao invés do elevador',
      'Faça tarefas da casa: varrer, jardinar',
      'Passeie com o cachorro',
      'Brinque com as crianças ou netos'
    ],
    caution: 'Fale com seu médico antes de começar. Beba água, use roupas leves e prefira horários frescos. Se sentir tontura ou dor no peito, pare e procure ajuda.',
    audio_url: '',
    video_url: '',
    videos: [
      'https://www.youtube.com/watch?v=kQGmkSrceN0',
      'https://www.youtube.com/watch?v=p7CPYGYaQu4',
      'https://www.youtube.com/watch?v=KbxiB1mOoyM',
      'https://www.youtube.com/watch?v=1bZFKLHezc4'
    ],
    cta: {
      titulo: 'Academia da Cidade',
      subtitulo: 'Exercício gratuito perto de você!',
      horario: 'Seg a sex: 5h30–11h30 e 14h–20h',
      descricao: 'Mais de 40 polos em Recife com profissionais de Educação Física. Ginástica, dança, caminhada e mais!'
    },
    imagem_url: '',
    imagem_legenda: '',
    tags: 'exercicio, caminhada, atividade, movimento, academia da cidade'
  }
];

/**
 * Parseia CSV string em array de objetos.
 */
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] || '').trim();
    });
    if (row.id && row.titulo) {
      data.push(row);
    }
  }
  return data;
}

/**
 * Parseia uma linha CSV respeitando aspas.
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(v => v.replace(/^"|"$/g, ''));
}

/**
 * Busca todos os conteúdos. Tenta a planilha; se falhar, usa mock.
 */
export async function fetchConteudos() {
  if (!SHEET_ID) {
    console.info('[Saúde Acessível] Usando dados de exemplo (mock). Configure o SHEET_ID em data.js para usar Google Sheets.');
    return MOCK_DATA;
  }

  try {
    const response = await fetch(getSheetURL());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();
    const data = parseCSV(csvText);
    if (data.length === 0) throw new Error('Planilha vazia');
    return data;
  } catch (error) {
    console.warn('[Saúde Acessível] Erro ao buscar planilha, usando dados de exemplo:', error.message);
    return MOCK_DATA;
  }
}

/**
 * Busca um conteúdo específico pelo ID (slug).
 * Ex: fetchConteudoById('atividade-fisica')
 */
export async function fetchConteudoById(id) {
  const conteudos = await fetchConteudos();
  return conteudos.find(c => c.id === id) || null;
}

// ===== ACADEMIAS DA CIDADE (PAC) - Recife =====
// Coordenadas aproximadas baseadas nos bairros
export const ACADEMIAS_DA_CIDADE = [
  // DS I
  { nome: 'Polo Parque da Macaxeira', endereco: 'Rua Odorico Mendes, S/N - Macaxeira', distrito: 'I', lat: -8.0095, lng: -34.9197 },
  { nome: 'Polo Parque do Caiara', endereco: 'Av. Norte, S/N - Caiara', distrito: 'I', lat: -8.0165, lng: -34.9034 },
  { nome: 'Polo Alto José Bonifácio', endereco: 'Rua São Luiz, S/N - Alto José Bonifácio', distrito: 'I', lat: -8.0378, lng: -34.8963 },
  { nome: 'Polo Praça da Encruzilhada', endereco: 'Praça da Encruzilhada - Encruzilhada', distrito: 'I', lat: -8.0380, lng: -34.8812 },
  { nome: 'Polo Sítio Novo / Dois Unidos', endereco: 'Rua Santo Elias, 161 - Dois Unidos', distrito: 'I', lat: -7.9938, lng: -34.9026 },
  // DS II
  { nome: 'Polo Chão de Estrelas', endereco: 'Av. Professor José dos Anjos, S/N - Campina do Barreto', distrito: 'II', lat: -8.0265, lng: -34.8793 },
  { nome: 'Polo Jovem CAP', endereco: 'Rua Coronel Urbano Ribeiro de Souza, S/N - Cajueiro', distrito: 'II', lat: -8.0186, lng: -34.8860 },
  { nome: 'Polo Alto do Capitão', endereco: 'Rua Tupiracaba, S/N - Dois Unidos', distrito: 'II', lat: -7.9966, lng: -34.8952 },
  { nome: 'Polo CSU Afrânio Godoy', endereco: 'Av. Aníbal Benevolo, S/N - Alto Sta. Terezinha', distrito: 'II', lat: -8.0076, lng: -34.8870 },
  // DS III
  { nome: 'Polo Ermírio de Moraes', endereco: 'Av. 17 de Agosto, 2388 - Monteiro', distrito: 'III', lat: -8.0281, lng: -34.9210 },
  { nome: 'Polo Sítio da Trindade', endereco: 'Estrada do Arraial, S/N - Casa Amarela', distrito: 'III', lat: -8.0196, lng: -34.9283 },
  { nome: 'Polo Jaqueira', endereco: 'Rua do Futuro, S/N - Parque da Jaqueira', distrito: 'III', lat: -8.0380, lng: -34.9095 },
  { nome: 'Polo Jardim do Poço', endereco: 'Av. 17 de Agosto, 2069 - Poço da Panela', distrito: 'III', lat: -8.0310, lng: -34.9200 },
  { nome: 'Polo Parque Santana', endereco: 'Rua Jorge Gomes de Sá - Parque Santana', distrito: 'III', lat: -8.0130, lng: -34.9320 },
  // DS IV
  { nome: 'Polo Praça da Av. do Forte', endereco: 'Estrada do Forte Arraial Novo Bom Jesus, S/N - Torrões', distrito: 'IV', lat: -8.0657, lng: -34.9457 },
  { nome: 'Polo Beira Rio / Torre', endereco: 'Av. Beira Rio, S/N - Torre', distrito: 'IV', lat: -8.0590, lng: -34.9105 },
  { nome: 'Polo Praça do Salgueiro', endereco: 'Praça do Salgueiro - Iputinga', distrito: 'IV', lat: -8.0440, lng: -34.9440 },
  { nome: 'Polo Cavouco', endereco: 'Praça Prof. Coelho de Almeida - Cordeiro', distrito: 'IV', lat: -8.0510, lng: -34.9480 },
  { nome: 'Polo Praça do Engenho do Meio', endereco: 'Rua Antônio Curado, S/N - Engenho do Meio', distrito: 'IV', lat: -8.0490, lng: -34.9530 },
  { nome: 'Polo Roda de Fogo', endereco: 'Av. Professor Artur Coutinho, S/N - Torrões', distrito: 'IV', lat: -8.0620, lng: -34.9510 },
  { nome: 'Polo Praça do Poeta', endereco: 'Praça do Poeta, Av. Caxangá', distrito: 'IV', lat: -8.0500, lng: -34.9600 },
  { nome: 'Polo Várzea', endereco: 'Praça da Várzea, Av. Afonso Olindense', distrito: 'IV', lat: -8.0415, lng: -34.9565 },
  // DS V
  { nome: 'Polo San Martin', endereco: 'Praça Noel Rodrigues - San Martin', distrito: 'V', lat: -8.0760, lng: -34.9310 },
  { nome: 'Polo ABC', endereco: 'Av. Manoel Gonçalves da Luz, S/N - Mustardinha', distrito: 'V', lat: -8.0725, lng: -34.9230 },
  { nome: 'Polo Praça do Mangue', endereco: 'Rua do Mangue, S/N - Afogados', distrito: 'V', lat: -8.0700, lng: -34.9020 },
  { nome: 'Polo Praça Simão Borba', endereco: 'Rua Parente Viana, S/N - Juquiá', distrito: 'V', lat: -8.0815, lng: -34.9255 },
  { nome: 'Polo Praça Heróis da Restauração', endereco: 'Rua Ipojuca - Areias', distrito: 'V', lat: -8.0800, lng: -34.9180 },
  { nome: 'Polo Praça das Lavadeiras', endereco: 'Rua Palmares, S/N - Areias', distrito: 'V', lat: -8.0785, lng: -34.9165 },
  { nome: 'Polo Jardim São Paulo', endereco: 'Praça de Jardim São Paulo', distrito: 'V', lat: -8.0850, lng: -34.9340 },
  // DS VI
  { nome: 'Polo Praia de Boa Viagem', endereco: '2º Jardim de Boa Viagem', distrito: 'VI', lat: -8.1130, lng: -34.8950 },
  { nome: 'Polo Brasília Teimosa', endereco: 'Rua João Marques dos Santos - Brasília Teimosa', distrito: 'VI', lat: -8.0830, lng: -34.8710 },
  { nome: 'Polo IPSEP', endereco: 'Praça Senador Roberto Kennedy - IPSEP', distrito: 'VI', lat: -8.1020, lng: -34.9230 },
  { nome: 'Polo Lagoa do Araçá', endereco: 'Av. José F. Lins - Imbiribeira', distrito: 'VI', lat: -8.1100, lng: -34.9150 },
  { nome: 'Polo Praça Cafesópolis', endereco: 'R. Des. Agenor Ferreira de Lima - Imbiribeira', distrito: 'VI', lat: -8.1165, lng: -34.9170 },
  // DS VII
  { nome: 'Polo Morro da Conceição', endereco: 'Praça do Morro da Conceição, 440', distrito: 'VII', lat: -8.0120, lng: -34.9160 },
  { nome: 'Polo Um Por Todos', endereco: 'Rua Vila Um Por Todos, S/N - Vasco da Gama', distrito: 'VII', lat: -8.0190, lng: -34.9370 },
  { nome: 'Polo Praça do Buriti', endereco: 'Av. Norte, S/N - Macaxeira', distrito: 'VII', lat: -8.0100, lng: -34.9230 },
  // DS VIII
  { nome: 'Polo Jordão Baixo', endereco: 'Av. Alberto Lundgren, S/N - Jordão', distrito: 'VIII', lat: -8.1350, lng: -34.9370 },
  { nome: 'Polo Ibura / Praça da Vitória', endereco: 'Av. Pernambuco, UR 01 - Cohab', distrito: 'VIII', lat: -8.1260, lng: -34.9400 },
  { nome: 'Polo UR-05', endereco: 'Rua Capitão Vicente - Cohab', distrito: 'VIII', lat: -8.1300, lng: -34.9450 },
  { nome: 'Polo Vila dos Milagres', endereco: 'Rua Cantora Dalva de Oliveira, S/N - Barro', distrito: 'VIII', lat: -8.0940, lng: -34.9450 }
];
