/**
 * Andres Midia — edite só este arquivo para trocar dados da página.
 * Preços em reais (número). O pop-up calcula 10% em cima desses valores.
 */
const SITE = {
  whatsapp: "5593999999999",
  instagram: "https://instagram.com/andresmidia",
  cnpj: "00.000.000/0001-00",
  cidade: "Santarém/PA",

  /** Mensagens que passam na faixa de destaque no topo da página. */
  ticker: [
    "Diagnóstico gratuito",
    "Anúncios no Google e Meta Ads",
    "Dentro das regras do CFM",
    "Vagas limitadas este mês",
  ],

  /** URL do Google Apps Script (web app). Deixe "" para não enviar. */
  webhookUrl: "",

  precos: {
    essencial: 997,
    crm: 1697,
    verbaAnuncio: 1500,
  },

  /** PREENCHA AQUI os dois gestores de tráfego responsáveis pelos projetos. */
  gestores: [
    {
      nome: "Gabriel Andres",
      cargo: "Gestor Estratégico",
      especialidade: "Google Ads para médicos, telecom e outros",
      bio: "+ de 1MM gerenciados, com ampla experiência em tráfego no Google para médicos, telecom e outros.",
      foto: "img/gabriel-andres.png",
    },
    {
      nome: "João Alex",
      cargo: "Gestor de Tráfego",
      especialidade: "Tráfego pago e automação com IA",
      bio: "+ de 6 anos de experiência e + de R$ 3 milhões em verba gerenciada para 30+ clientes em agro, alimentos, arquitetura e construção. Domino Meta Ads e Google Ads — da estrutura de campanhas e testes de criativos à segmentação e otimização, com análise de dados no GA4 para decidir onde cada real rende mais. Construo automações com n8n, OpenAI e Evolution API, incluindo SDR e atendimento com IA no WhatsApp, além de funis e CRM integrados com Supabase/PostgreSQL e otimização do Perfil da Empresa no Google para negócios locais.",
      foto: "img/joao-alex.png",
    },
  ],

  depoimentos: [
    {
      texto: "Em poucas semanas a agenda de particulares ficou mais preenchida. O relatório semanal deixa claro o que está funcionando.",
      nome: "Dra. Exemplo",
      detalhe: "Dermatologia · Santarém",
    },
    {
      texto: "Parei de depender só de indicação. Os contatos chegam no WhatsApp já com a especialidade que a gente atende.",
      nome: "Dr. Exemplo",
      detalhe: "Ortopedia · Santarém",
    },
    {
      texto: "O acompanhamento é próximo e os anúncios respeitam o tom da clínica. Sem promessa milagrosa, só paciente qualificado.",
      nome: "Clínica Exemplo",
      detalhe: "Oftalmologia · Santarém",
    },
  ],
};
