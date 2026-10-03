// Idioma, filtro, painel em destaque, adesivos, linha do tempo e faixa de nomes.
// Os dados (PROJECTS e TEXTS) vêm de js/data.js.
(() => {
  'use strict';

  const CONFIG = {
    defaultLang: 'pt', // 'pt' | 'en'
    tilt: true,        // adesivos inclinados
    ticker: true       // faixa de nomes abaixo da abertura
  };

  const LANG_KEY = 'cyberhat-lang';
  const VIDEO_DIR = 'videos/';
  const ORDER = { live: 0, wip: 1, soon: 2 };
  const ROT = [-2.2, 1.4, -0.8, 2, -1.6, 0.9, -2.6, 1.8, -1.1, 2.4, -0.5, 1.2, -1.9, 0.6, -2.4, 1.6];

  const BY_ID = Object.fromEntries(PROJECTS.map(p => [p.id, p]));
  // Lançados primeiro (do ano mais novo ao mais antigo), depois em desenvolvimento, depois em breve
  const SORTED = [...PROJECTS].sort((a, b) => ORDER[a.st] - ORDER[b.st] || (b.y || 0) - (a.y || 0));
  const isLive = p => p.st === 'live';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);

  const header = $('.header');
  const feature = $('.feature');
  const video = $('.feature__video');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const state = { lang: loadLang(), sel: 'memoras', filter: 'all' };
  let popTimer;

  function loadLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) { /* armazenamento bloqueado */ }
    return CONFIG.defaultLang;
  }

  function saveLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* armazenamento bloqueado */ }
  }

  const t = () => TEXTS[state.lang];
  const statusOf = p => t()[p.st];
  const typesOf = p => p.types.map(k => k === 'game' ? t().game : k === 'site' ? 'Web' : 'App').join(' · ');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function hiddenSpan(className, text) {
    const node = el('span', className, text);
    node.setAttribute('aria-hidden', 'true');
    return node;
  }

  // ---------- Renderização ----------

  function renderTexts() {
    const tx = t();
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    $('meta[name="description"]').content = tx.metaDesc;
    $$('[data-i18n]').forEach(node => { node.textContent = tx[node.dataset.i18n]; });
    $$('[data-i18n-aria]').forEach(node => node.setAttribute('aria-label', tx[node.dataset.i18nAria]));
    $$('[data-lang]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.lang === state.lang)));
  }

  function renderFilters() {
    $$('[data-filter]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === state.filter)));
  }

  function renderFeature() {
    const p = BY_ID[state.sel];
    const tx = t();

    if (p.video) {
      // Com movimento reduzido, o vídeo fica parado no quadro de 1,5 s, como os da colagem
      const src = VIDEO_DIR + p.video + (reducedMotion.matches ? '#t=1.5' : '');
      if (video.getAttribute('src') !== src) video.src = src;
      // Alguns navegadores não tocam sozinhos depois de mudar o src
      if (!reducedMotion.matches) video.play().catch(() => {});
    } else if (video.hasAttribute('src')) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    video.hidden = !p.video;
    $('.feature__placeholder').hidden = !!p.video;

    const year = $('.feature__year');
    year.hidden = !isLive(p);
    year.textContent = p.y ? String(p.y) : '';

    $('.feature__status').textContent = statusOf(p);
    $('.feature__name').textContent = p.name;
    $('.feature__desc').textContent = p[state.lang];
    $('.feature__plat').textContent = p.plat;
    $('.feature__types').textContent = typesOf(p);

    const tech = $('.feature__tech');
    tech.replaceChildren(...p.tech.map(name => el('span', null, name)));
    tech.hidden = p.tech.length === 0;

    const cta = $('.feature__cta');
    const hasLink = isLive(p) && !!p.link;
    cta.hidden = !hasLink;
    if (hasLink) {
      cta.href = p.link;
      cta.replaceChildren(p.types.includes('game') ? tx.play : tx.open, ' ', hiddenSpan(null, '→'));
    }
  }

  function sticker(p, i) {
    const btn = el('button', isLive(p) ? 'sticker sticker--live' : 'sticker');
    btn.type = 'button';
    btn.dataset.open = p.id;
    if (CONFIG.tilt) btn.style.setProperty('--rot', `${ROT[i % ROT.length] * 0.8}deg`);

    const top = el('span', 'sticker__top');
    top.append(
      el('span', 'sticker__types', typesOf(p)),
      isLive(p) ? el('span', 'sticker__year', `'${String(p.y).slice(2)}`) : el('span', 'sticker__status', statusOf(p))
    );
    btn.append(top, el('span', 'sticker__name', p.name), el('span', 'sticker__tag', state.lang === 'pt' ? p.tpt : p.ten));
    return btn;
  }

  function fillGroup(group, items, offset) {
    group.hidden = items.length === 0;
    $('.stickers', group).replaceChildren(...items.map((p, i) => sticker(p, i + offset)));
  }

  function renderStickers() {
    const list = SORTED.filter(p => state.filter === 'all' || p.types.includes(state.filter));
    const live = list.filter(isLive);
    fillGroup($('.group--live'), live, 0);
    fillGroup($('.group--next'), list.filter(p => !isLive(p)), live.length);
    markSelected();
  }

  function markSelected() {
    $$('.sticker').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.open === state.sel)));
  }

  function renderTimeline() {
    const tx = t();
    const years = [...new Set(PROJECTS.filter(isLive).map(p => p.y))].sort((a, b) => a - b);

    const stations = years.map(year => {
      const items = el('div', 'station__items');
      PROJECTS.filter(p => isLive(p) && p.y === year).forEach(p => {
        const btn = el('button', 'station__item', p.name);
        btn.type = 'button';
        btn.dataset.open = p.id;
        items.append(btn);
      });
      const li = el('li', 'station');
      li.append(hiddenSpan('station__rail'), hiddenSpan('station__dot'), el('span', 'station__year', String(year)), items);
      return li;
    });

    const link = el('a', 'station__link', `${PROJECTS.filter(p => !isLive(p)).length} ${tx.projectsWord}`);
    link.href = '#proximos';
    const soon = el('li', 'station station--soon');
    soon.append(hiddenSpan('station__dot'), el('span', 'station__year', tx.soon), link);

    $('.timeline__track').replaceChildren(...stations, soon);
  }

  function renderTicker() {
    const ticker = $('.ticker');
    if (!CONFIG.ticker) {
      ticker.remove();
      return;
    }
    const names = SORTED.filter(isLive).map(p => `${p.name} ● `).join('');
    // Duas metades iguais: a animação vai até -50% e o loop não tem emenda
    $('.ticker__track').replaceChildren(el('span', null, names.repeat(2)), el('span', null, names.repeat(2)));
  }

  // ---------- Ações ----------

  function open(id) {
    if (!BY_ID[id]) return;
    state.sel = id;
    renderFeature();
    markSelected();

    feature.classList.add('is-pop');
    clearTimeout(popTimer);
    popTimer = setTimeout(() => feature.classList.remove('is-pop'), 160);

    // Rola até o painel se ele estiver atrás do menu ou abaixo de 45% da janela
    const top = feature.getBoundingClientRect().top;
    const headerH = header.offsetHeight;
    if (top < headerH - 6 || top > window.innerHeight * 0.45) {
      window.scrollTo({ top: window.scrollY + top - (headerH + 18), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  }

  function setLang(lang) {
    if (lang === state.lang || !TEXTS[lang]) return;
    state.lang = lang;
    saveLang(lang);
    renderTexts();
    renderFeature();
    renderStickers();
    renderTimeline();
  }

  function setFilter(filter) {
    if (filter === state.filter) return;
    state.filter = filter;
    renderFilters();
    renderStickers();
  }

  document.addEventListener('click', e => {
    const target = e.target.closest('[data-open], [data-lang], [data-filter], a[href="#proximos"]');
    if (!target) return;
    const { open: id, lang, filter } = target.dataset;
    if (id) open(id);
    else if (lang) setLang(lang);
    else if (filter) setFilter(filter);
    else setFilter('all'); // o link "N projetos" da linha do tempo leva à lista completa
  });

  // O menu quebra em duas linhas no celular; as âncoras e a rolagem usam a altura real dele
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }).observe(header);

  $$('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

  renderTicker();
  renderTexts();
  renderFilters();
  renderFeature();
  renderStickers();
  renderTimeline();
  // Só depois do primeiro preenchimento, para o leitor de tela não anunciar o painel ao carregar
  $('.feature__info').setAttribute('aria-live', 'polite');
})();
