/**
 * Andres Midia — edite só este arquivo para trocar dados da página.
 * Preços em reais (número). O pop-up calcula 10% em cima desses valores.
 */
const SITE = {
  whatsapp: "5593999999999",
  instagram: "https://instagram.com/andresmidia",
  cnpj: "00.000.000/0001-00",
  cidade: "Santarém/PA",

  /** URL do Google Apps Script (web app). Deixe "" para não enviar. */
  webhookUrl: "",

  precos: {
    essencial: 997,
    crm: 1697,
    verbaAnuncio: 1500,
  },

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
