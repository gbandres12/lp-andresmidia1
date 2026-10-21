const brl = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const discount = (value) => Math.round(value * 0.9);

const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

const MSG_CONTATO =
  "Olá! Vi a página da Andres Midia e quero mais pacientes particulares na agenda.";
const MSG_DESCONTO =
  "Olá! Vi a página da Andres Midia e quero fechar o plano de tráfego com 10% de desconto.";

function track(name) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name });
  if (typeof window.gtag === "function") {
    const map = {
      Lead: "generate_lead",
      Contact: "contact",
      ExitPopupView: "exit_popup_view",
      ExitPopupClick: "exit_popup_click",
    };
    window.gtag("event", map[name] || name);
  }
  if (typeof window.fbq === "function") {
    const map = {
      Lead: "Lead",
      Contact: "Contact",
      ExitPopupView: "ExitPopupView",
      ExitPopupClick: "ExitPopupClick",
    };
    window.fbq("trackCustom", map[name] || name);
    if (name === "Lead") window.fbq("track", "Lead");
    if (name === "Contact") window.fbq("track", "Contact");
  }
}

function fillPrices() {
  const map = {
    essencial: SITE.precos.essencial,
    crm: SITE.precos.crm,
    verba: SITE.precos.verbaAnuncio,
  };
  document.querySelectorAll("[data-price]").forEach((node) => {
    node.textContent = brl(map[node.dataset.price]);
  });
  document.querySelector("[data-off='essencial-old']").textContent = brl(SITE.precos.essencial);
  document.querySelector("[data-off='essencial-new']").textContent = brl(discount(SITE.precos.essencial));
  document.querySelector("[data-off='crm-old']").textContent = brl(SITE.precos.crm);
  document.querySelector("[data-off='crm-new']").textContent = brl(discount(SITE.precos.crm));
}

function renderQuotes() {
  const root = document.querySelector("#depoimentos");
  root.innerHTML = SITE.depoimentos
    .map(
      (item) => `
      <figure class="quote">
        <p>“${item.texto}”</p>
        <footer>${item.nome}<span>${item.detalhe}</span></footer>
      </figure>`
    )
    .join("");
}

function bindWhatsAppClicks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const kind = el.dataset.wa;
    el.href = waLink(kind === "desconto" ? MSG_DESCONTO : MSG_CONTATO);
    el.addEventListener("click", () => {
      track("Contact");
      if (kind === "desconto") track("ExitPopupClick");
    });
  });
}

function bindForm() {
  const form = document.querySelector("#lead-form");
  const note = document.querySelector("#form-note");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const text = `Olá! Sou ${data.nome}, da ${data.clinica} em ${data.cidade}. Meu WhatsApp é ${data.whatsapp}. Quero saber sobre a gestão de tráfego pago para a clínica.`;
    track("Lead");
    if (SITE.webhookUrl) {
      try {
        await fetch(SITE.webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...data, origem: "lp-andres-midia", enviadoEm: new Date().toISOString() }),
        });
      } catch {
        note.textContent = "Não foi possível registrar na planilha. O WhatsApp vai abrir mesmo assim.";
      }
    }
    window.open(waLink(text), "_blank", "noopener");
    form.reset();
  });
}

function bindFaq() {
  document.querySelectorAll(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

const POPUP_KEY = "andres-exit-seen";
let popupShown = false;

function openPopup() {
  if (popupShown || sessionStorage.getItem(POPUP_KEY)) return;
  popupShown = true;
  sessionStorage.setItem(POPUP_KEY, "1");
  const modal = document.querySelector("#exit-modal");
  modal.classList.add("open");
  modal.removeAttribute("hidden");
  track("ExitPopupView");
  document.querySelector("#exit-close").focus();
}

function closePopup() {
  const modal = document.querySelector("#exit-modal");
  modal.classList.remove("open");
  modal.setAttribute("hidden", "");
}

function bindPopup() {
  const modal = document.querySelector("#exit-modal");
  document.querySelector("#exit-close").addEventListener("click", closePopup);
  document.querySelector("#exit-dismiss").addEventListener("click", closePopup);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closePopup();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopup();
  });

  const desktop = window.matchMedia("(min-width: 900px) and (hover: hover)").matches;
  if (desktop) {
    document.documentElement.addEventListener("mouseout", (event) => {
      if (event.clientY <= 0 && !event.relatedTarget) openPopup();
    });
    return;
  }

  window.setTimeout(openPopup, 30000);
  let lastY = window.scrollY;
  let lastT = performance.now();
  window.addEventListener(
    "scroll",
    () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT;
      const dy = lastY - y;
      if (dt > 0 && dt < 250 && dy > 90 && lastY > 240) openPopup();
      lastY = y;
      lastT = now;
    },
    { passive: true }
  );
  history.pushState({ andres: 1 }, "");
  window.addEventListener("popstate", () => {
    openPopup();
    history.pushState({ andres: 1 }, "");
  });
}

document.querySelector("#cnpj").textContent = SITE.cnpj;
document.querySelector("#cidade-footer").textContent = SITE.cidade;
document.querySelector("#ig-link").href = SITE.instagram;

document.querySelectorAll(".hero-copy, .hero-photo, .hero-panel, .wide-photo, .ethics, .plan, .quote, .faq-item, .final-grid > div").forEach((node) => {
  node.classList.add("reveal");
});

const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!motion && "IntersectionObserver" in window) {
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      seen.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((node) => seen.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
}

fillPrices();
renderQuotes();
bindWhatsAppClicks();
bindForm();
bindFaq();
bindPopup();
