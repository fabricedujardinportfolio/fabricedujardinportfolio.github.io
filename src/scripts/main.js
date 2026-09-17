/* Comportements du site : navigation mobile, thème, apparitions au défilement,
   compteurs, texte défilant, filtres, visionneuse d'images, formulaire de contact.
   Aucune dépendance, ~4 Ko. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Thème clair / sombre ---------- */
function initTheme() {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const apply = (t) => {
    root.setAttribute('data-theme', t);
    btn.setAttribute('aria-label', t === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
  };
  apply(root.getAttribute('data-theme') || 'dark');
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* stockage indisponible : on ignore */
    }
  });
}

/* ---------- Menu mobile ---------- */
function initNav() {
  const btn = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.body.classList.toggle('nav-open', !open);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  window.matchMedia('(min-width: 860px)').addEventListener('change', close);
}

/* ---------- Header compact au défilement ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Apparition au défilement ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Compteurs ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const run = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) {
    counters.forEach(run);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e.target);
        io.unobserve(e.target);
      }
    });
  });
  counters.forEach((el) => io.observe(el));
}

/* ---------- Texte qui s'écrit ---------- */
function initTyping() {
  const el = document.querySelector('[data-rotate]');
  if (!el) return;
  let phrases;
  try {
    phrases = JSON.parse(el.dataset.rotate);
  } catch {
    return;
  }
  if (!Array.isArray(phrases) || !phrases.length) return;
  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }
  let i = 0;
  let txt = '';
  let deleting = false;
  const step = () => {
    const full = phrases[i % phrases.length];
    txt = deleting ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1);
    el.textContent = txt;
    let delay = deleting ? 40 : 70;
    if (!deleting && txt === full) {
      delay = 2000;
      deleting = true;
    } else if (deleting && txt === '') {
      deleting = false;
      i++;
      delay = 400;
    }
    setTimeout(step, delay);
  };
  step();
}

/* ---------- Filtres (projets, parcours) ---------- */
function initFilters() {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSel = group.dataset.filterGroup;
    const container = document.querySelector(targetSel);
    const items = document.querySelectorAll(`${targetSel} .filterable`);
    const empty = document.querySelector(`${targetSel} ~ .filter-empty, ${targetSel} .filter-empty`);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.filter;
        if (container) container.dataset.filtered = '';
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        let shown = 0;
        items.forEach((item) => {
          const cats = (item.dataset.cat || '').split(' ');
          const show = value === '*' || cats.includes(value);
          item.classList.toggle('is-hidden', !show);
          if (show) {
            shown++;
            // relance l'animation d'apparition
            item.style.animation = 'none';
            void item.offsetWidth;
            item.style.animation = '';
          }
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  });
}

/* ---------- Visionneuse d'images (dialog natif) ---------- */
function initLightbox() {
  const dialog = document.querySelector('dialog.lightbox');
  const links = Array.from(document.querySelectorAll('a[data-lightbox]'));
  if (!dialog || !links.length) return;
  const img = dialog.querySelector('img');
  const cap = dialog.querySelector('.lightbox__caption');
  const counter = dialog.querySelector('.lightbox__counter');
  let index = 0;
  const show = (i) => {
    index = (i + links.length) % links.length;
    const a = links[index];
    img.src = a.href;
    img.alt = a.dataset.alt || '';
    if (cap) cap.textContent = a.dataset.alt || '';
    if (counter) counter.textContent = `${index + 1} / ${links.length}`;
  };
  links.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('close', () => {
    img.removeAttribute('src');
  });
}

/* ---------- Formulaire de contact ---------- */
function initContactForm() {
  const form = document.querySelector('form[data-contact]');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const endpoint = form.dataset.endpoint;
  const to = form.dataset.mailto;
  const setStatus = (msg, ok) => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.state = ok ? 'ok' : 'error';
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Piège anti-robot : un champ caché rempli = robot.
    if (form.querySelector('[name="botcheck"]')?.value) return;
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';

    if (!endpoint) {
      // Sans service tiers : on ouvre le client mail avec le message pré-rempli.
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent('Contact depuis le portfolio')}&body=${encodeURIComponent(body)}`;
      setStatus('Votre logiciel de messagerie devrait s\'ouvrir avec le message pré-rempli.', true);
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    setStatus('Envoi en cours…', true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: form.dataset.key,
          subject: 'Contact depuis le portfolio',
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        form.reset();
        setStatus('Merci, votre message est bien parti. Je vous réponds rapidement.', true);
      } else {
        throw new Error(json.message || 'Erreur');
      }
    } catch {
      setStatus(`L\'envoi a échoué. Vous pouvez m\'écrire directement à ${to}.`, false);
    } finally {
      btn.disabled = false;
    }
  });
}

/* ---------- Adresse e-mail assemblée côté client (anti-collecte) ---------- */
function initEmail() {
  document.querySelectorAll('[data-user][data-domain]').forEach((el) => {
    const address = `${el.dataset.user}@${el.dataset.domain}`;
    if (el.tagName === 'A') el.href = `mailto:${address}`;
    if (el.dataset.fill !== undefined) el.textContent = address;
  });
}

/* ---------- Bouton Imprimer (page CV) ---------- */
function initPrint() {
  document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));
}

initPrint();
initTheme();
initNav();
initHeader();
initReveal();
initCounters();
initTyping();
initFilters();
initLightbox();
initContactForm();
initEmail();
