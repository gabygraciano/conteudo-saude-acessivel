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
    titulo: 'Pequenos movimentos, grandes ganhos para sua saúde',
    resumo: 'Descubra como se movimentar pode ajudar a controlar a pressão alta e o diabetes.',
    conteudo_texto: `<p>Movimentar o corpo é um dos melhores remédios para controlar a pressão alta e o diabetes.</p>
<p><strong>E o melhor: você não precisa ser atleta.</strong> Caminhar, dançar ou brincar com os netos — tudo conta!</p>`,
    benefit_cards: [
      { title: 'Ajuda a baixar a pressão.' },
      { title: 'Mantém o açúcar controlado' },
      { title: 'Você dorme melhor e acorda com mais disposição.' },
      { title: 'Melhora a memória, o raciocínio e o humor.' }
    ],
    time_goal: {
      title: 'A meta ideal: 30 minutos por dia, 5 vezes por semana.',
      tip: 'Dica: Você pode dividir em 3 sessões de 10 minutinhos!'
    },
    activities: [
      { icon: '<i class="ph ph-sneaker"></i>', name: 'Caminhada', tip: 'Comece com 10 min e aumente aos poucos' },
      { icon: '<i class="ph ph-music-notes"></i>', name: 'Dança', tip: 'Forró, samba, qualquer ritmo vale!' },
      { icon: '<i class="ph ph-swimming-pool"></i>', name: 'Hidroginástica', tip: 'Ideal para dores nas articulações' },
      { icon: '<i class="ph ph-person-arms-spread"></i>', name: 'Alongamento', tip: 'Melhora flexibilidade e relaxa' },
      { icon: '<i class="ph ph-bicycle"></i>', name: 'Pedalar', tip: 'Bom pro coração e como transporte' },
      { icon: '<i class="ph ph-volleyball"></i>', name: 'Esportes', tip: 'Futebol, vôlei, bocha com amigos' }
    ],
    caution: 'Fale com seu médico antes de começar.\nBeba água, use roupas leves e prefira horários frescos. Se sentir tontura ou dor no peito, pare e procure ajuda.',
    videos: {
      urls: [
        'https://www.youtube.com/watch?v=kQGmkSrceN0',
        'https://www.youtube.com/watch?v=p7CPYGYaQu4',
        'https://www.youtube.com/watch?v=KbxiB1mOoyM',
        'https://www.youtube.com/watch?v=1bZFKLHezc4'
      ]
    },
    cta: {
      titulo: 'Academia da Cidade',
      subtitulo: 'Exercício gratuito perto de você!',
      horario: 'Seg a sex: 5h30–11h30 e 14h–20h',
      descricao: 'Equipamentos e instrutores profissionais para você cuidar do corpo sem pagar nada de segunda a sábado.'
    },
    imagem_url: '',
    imagem_legenda: '',
    tags: 'exercicio, caminhada, atividade, movimento, academia da cidade'
  },
  {
    id: 'alimentacao-saudavel',
    categoria: 'geral',
    titulo: 'Comida de verdade faz bem pra tudo!',
    resumo: 'Descubra como escolhas simples na alimentação podem trazer mais energia e saúde para o seu dia a dia.',
    conteudo_texto: `
      <p style="margin-bottom: 24px;">Controlar a saúde começa no prato, mas não precisa ser complicado.</p>
      <p style="margin-bottom: 32px;"><strong>O segredo é trocar</strong> o que vem em pacotes pelo que vem da terra.</p>
    `,
    avoid_cards: [
      'Temperos e<br/>caldos<br/>prontos',
      'Embutidos e<br/>processados:<br/><span style="font-weight: 500; font-size: 0.85rem;">salsicha, presunto, mortadela...</span>',
      'Comidas de pacote<br/>e "pós": <span style="font-weight: 500; font-size: 0.85rem;">miojo, salgadinhos e refrescos em pó.</span>',
      'Alimentos<br/>prontos<br/>congelados'
    ],
    benefit_cards: [
      { title: 'Mais energia e disposição para o dia a dia.' },
      { title: 'Melhora no funcionamento do intestino.' },
      { title: 'Ajuda a controlar peso e o açúcar.' },
      { title: 'Coração forte e pressão sob controle.' }
    ],
    time_goal: null,
    activities: null,
    caution: 'Se você tem restrições alimentares específicas (como intolerância a glúten ou alergias), procure a orientação de um nutricionista no posto de saúde mais próximo.',
    videos: {
      title: 'Comida de verdade faz bem!',
      post_text: '<strong>Resumo para decorar:</strong> tudo que dura muito tempo dentro de uma caixa ou saquinho provavelmente tem sal ou açúcar demais para você.',
      urls: [
        'https://www.youtube.com/watch?v=Ng7oA2M4f7o',
        'https://www.youtube.com/watch?v=0yFG6EDhXq8'
      ]
    },
    cta: {
      link_only: true,
      titulo: 'Precisa de ajuda para montar seu cardápio?',
      descricao: 'A Secretaria de Saúde oferece consultas com nutricionistas para ajudar no controle da sua saúde, <strong>peça o encaminhamento.</strong>',
      link_url: 'https://conecta.recife.pe.gov.br/servico/502'
    },
    imagem_url: '',
    imagem_legenda: '',
    tags: 'alimentacao, nutricao, comida, dieta, frutas, legumes, receita'
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

// ===== ACADEMIAS RECIFE =====
// Coordenadas aproximadas baseadas nos bairros
export const ACADEMIAS_DA_CIDADE = [
  { nome: 'Academia Recife - Polo Hipódromo', endereco: 'Rua Ascenço Ferreira, S/N, Praça do Hipódromo - Hipódromo', lat: -8.0350, lng: -34.8850 },
  { nome: 'Academia Recife - Polo Ibura', endereco: 'Av. Pernambuco, S/N, Praça Maria Sampaio Lucena - Cohab', lat: -8.1260, lng: -34.9400 },
  { nome: 'Academia Recife - Polo Torre', endereco: 'Rua José de Holanda, S/N, Praça da Torre - Torre', lat: -8.0590, lng: -34.9105 },
  { nome: 'Academia Recife - Polo Engenho do Meio', endereco: 'Rua Manuel Alves Deusdara, S/N, Praça Dr. Arnaldo Assunção - Engenho do Meio', lat: -8.0490, lng: -34.9530 },
  { nome: 'Academia Recife - Polo Coque', endereco: 'Rua Água Doce, S/N, Praça de Joana Bezerra - Ilha Joana Bezerra', lat: -8.0680, lng: -34.8850 },
  { nome: 'Academia Recife - Polo Jaqueira', endereco: 'Av. Rui Barbosa, S/N, Parque da Jaqueira - Jaqueira', lat: -8.0380, lng: -34.9095 },
  { nome: 'Academia Recife - Polo Água Fria', endereco: 'Av. Beberibe, S/N, Praça Academia Recife - Água Fria', lat: -8.0150, lng: -34.8870 },
  { nome: 'Academia Recife - Polo Barro', endereco: 'Rua Padre Diogo Rodrigues, S/N, Praça Academia Recife - Barro', lat: -8.0940, lng: -34.9450 },
  { nome: 'Academia Recife - Polo Santos Dumont', endereco: 'Rua Almirante Nelson Fernandes, S/N, Centro Esportivo Santos Dumont - Boa Viagem', lat: -8.1200, lng: -34.9000 },
  { nome: 'Academia Recife - Polo Casa Amarela', endereco: 'Rua Marino de Melo Berenguer, 5673 - Casa Amarela', lat: -8.0196, lng: -34.9283 },
  { nome: 'Academia Recife - Polo Mustardinha', endereco: 'Rua Neto Campelo Junior, S/N, Praça do ABC - Mustardinha', lat: -8.0725, lng: -34.9230 },
  { nome: 'Academia Recife - Polo IPSEP', endereco: 'Av. Presidente Kennedy, S/N, Praça Robert Kennedy - IPSEP', lat: -8.1020, lng: -34.9230 },
  { nome: 'Academia Recife - Polo Lagoa do Araçá', endereco: 'Rua Nova Verona, S/N, Academia Recife Lagoa do Araçá - Imbiribeira', lat: -8.1100, lng: -34.9150 },
  { nome: 'Academia Recife - Polo Santo Amaro', endereco: 'Av. Gov. Agamenon Magalhães, S/N, Praça Academia Recife - Santo Amaro', lat: -8.0550, lng: -34.8850 },
  { nome: 'Academia Recife - Polo Santana', endereco: 'Rua Astério Rufino Alves, S/N, Parque Santana - Santana', lat: -8.0130, lng: -34.9320 },
  { nome: 'Academia Recife - Polo Macaxeira', endereco: 'Av. Norte Miguel Arraes de Alencar, S/N, Parque Urbano da Macaxeira - Macaxeira', lat: -8.0095, lng: -34.9197 },
  { nome: 'Academia Recife - Polo Boa Viagem', endereco: 'Av. Boa Viagem, S/N, Segundo Jardim - Boa Viagem', lat: -8.1130, lng: -34.8950 },
  { nome: 'Academia Recife - Polo Várzea', endereco: 'Rua Afonso Ferreira Maia, S/N, Praça da Várzea - Várzea', lat: -8.0415, lng: -34.9565 }
];

