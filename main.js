/* Void — site de la suite. Aucune dépendance. */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const sleep = (ms) => (ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve());
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const i18n = window.VoidI18n;

  /* ---------- Préférences : accent, teinte, thème ---------- */
  const prefs = { theme: root.dataset.theme, accent: root.dataset.accent, tint: root.dataset.tint };
  const metaTheme = $('meta[name="theme-color"]');

  function applyPrefs(save = true) {
    root.dataset.theme = prefs.theme;
    root.dataset.accent = prefs.accent;
    root.dataset.tint = prefs.tint;
    $$('[data-accent-picker] button').forEach((b) => b.setAttribute('aria-checked', b.dataset.v === prefs.accent));
    $$('[data-tint-picker] button').forEach((b) => b.setAttribute('aria-checked', b.dataset.v === prefs.tint));
    $$('[data-theme-picker] button').forEach((b) => b.setAttribute('aria-checked', b.dataset.v === prefs.theme));
    requestAnimationFrame(() => metaTheme.setAttribute('content', getComputedStyle(document.body).backgroundColor));
    if (save) {
      try {
        const stored = JSON.parse(localStorage.getItem('void-prefs') || '{}');
        localStorage.setItem('void-prefs', JSON.stringify({ ...stored, ...prefs }));
      } catch (e) {}
    }
  }
  const bindPicker = (sel, key) => $$(`${sel} button`).forEach((b) => b.addEventListener('click', () => { prefs[key] = b.dataset.v; applyPrefs(); }));
  bindPicker('[data-accent-picker]', 'accent');
  bindPicker('[data-tint-picker]', 'tint');
  bindPicker('[data-theme-picker]', 'theme');
  $('#theme-toggle').addEventListener('click', () => { prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark'; applyPrefs(); });
  applyPrefs(false);

  /* ---------- Icône de Void Calendar : la grille de points d'un mois ---------- */
  $$('.ai-dots').forEach((g) => {
    const ns = 'http://www.w3.org/2000/svg';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      if (r === 0 && c >= 3) continue; // l'éclipse occupe le coin
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', 22 + c * 14); dot.setAttribute('cy', 34 + r * 14); dot.setAttribute('r', 3.2);
      g.append(dot);
    }
  });

  /* ---------- Maquettes : mise à l'échelle ---------- */
  const mocks = $$('[data-mock]');
  mocks.forEach((m) => { m.style.setProperty('--w', m.dataset.w); m.style.setProperty('--h', m.dataset.h); });
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) e.target.style.setProperty('--s', e.contentRect.width / Number(e.target.dataset.w));
  });
  mocks.forEach((m) => ro.observe(m));

  /* ---------- Apparition au défilement ---------- */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    }
  }, { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach((el) => io.observe(el));
  const ioStats = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { countUp(e.target); ioStats.unobserve(e.target); }
  }, { threshold: .6 });
  $$('.stats [data-count]').forEach((el) => ioStats.observe(el));

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const to = Number(el.dataset.count), pre = el.dataset.prefix || '';
    if (reduced) { el.textContent = pre + to; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = clamp((t - t0) / dur);
      el.textContent = pre + Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString(i18n.content.locale);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Lueur qui suit le pointeur ---------- */
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- Visibilité (pour ne faire tourner que les démos à l'écran) ---------- */
  const visible = new WeakMap();
  const ioVis = new IntersectionObserver((entries) => {
    for (const e of entries) visible.set(e.target, e.isIntersecting);
  }, { threshold: .25 });
  const watch = (el) => { visible.set(el, false); ioVis.observe(el); return el; };
  async function whenVisible(el) { while (!visible.get(el)) await sleep(250); }

  /* ---------- Défilement : hero, manifeste, histoire, navigation ---------- */
  const nav = $('#nav');
  const hero = $('[data-hero]');
  const eclWrap = $('[data-ecl]');
  const heroCopy = $('[data-hero-copy]');
  const voidLine = $('[data-hero-void]');
  const hint = $('[data-hero-hint]');
  const words = $('[data-words]');
  const story = $('[data-story]');
  const browser = $('[data-browser]');
  const steps = $$('[data-story-steps] li');
  const storyBar = $('[data-story-bar]');
  const navLinks = $$('.nav-links a');
  const sections = navLinks.map((a) => $(a.getAttribute('href')));

  // Le manifeste, mot à mot (redécoupé quand la langue change).
  let wordEls = [];
  function splitWords() {
    const text = words.textContent.trim();
    words.textContent = '';
    text.split(/\s+/).forEach((w, i) => {
      if (i) words.append(' ');
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = w;
      words.append(span);
    });
    wordEls = $$('.w', words);
  }
  splitWords();
  i18n.onChange(() => { splitWords(); manifestoFrame(); });

  const easeIn = (t) => t * t * t;
  let vh = innerHeight, vw = innerWidth;
  addEventListener('resize', () => { vh = innerHeight; vw = innerWidth; onScroll(); });

  function heroFrame() {
    const r = hero.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh));
    hero.style.setProperty('--p', p);
    if (reduced) {
      heroCopy.style.opacity = 1 - clamp(p / .3);
      voidLine.style.opacity = clamp((p - .55) / .2);
      return;
    }
    // Le texte s'en va, l'éclipse grandit jusqu'à ce que son disque sombre remplisse l'écran.
    const tCopy = clamp(p / .22);
    heroCopy.style.opacity = 1 - tCopy;
    heroCopy.style.transform = `translateY(${-tCopy * 90}px)`;
    heroCopy.style.filter = `blur(${tCopy * 8}px)`;
    hint.style.opacity = 1 - clamp(p / .08);

    const es = eclWrap.offsetWidth;
    const target = (Math.hypot(vw, vh) / (es * .86)) * 1.25;
    const tz = easeIn(clamp((p - .06) / .62));
    const scale = 1 + (target - 1) * tz;
    const dy = (vh * .5 - (eclWrap.offsetTop + es * .455)) * clamp((p - .06) / .45);
    eclWrap.style.transform = `translateY(${dy}px) scale(${scale})`;

    const tv = clamp((p - .7) / .14);
    voidLine.style.opacity = tv;
    voidLine.style.transform = `translateY(${(1 - tv) * 30}px)`;
    voidLine.style.filter = `blur(${(1 - tv) * 10}px)`;
  }

  function manifestoFrame() {
    const r = words.getBoundingClientRect();
    const p = clamp((vh * .82 - r.top) / (r.height + vh * .35));
    const n = Math.round(p * wordEls.length);
    wordEls.forEach((w, i) => w.classList.toggle('on', i < n));
  }

  let currentStep = -1;
  function storyFrame() {
    const r = story.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh));
    const n = steps.length;
    const s = Math.min(n - 1, Math.floor(p * n));
    storyBar.parentElement.style.setProperty('--sp', p);
    if (s !== currentStep) setStep(s);
  }

  function navFrame() {
    nav.classList.toggle('scrolled', scrollY > 30);
    let active = -1;
    sections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top < vh * .5) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === active));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      heroFrame();
      manifestoFrame();
      storyFrame();
      navFrame();
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Un clic sur une étape y amène.
  steps.forEach((li, i) => li.addEventListener('click', () => {
    const top = story.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + ((i + .5) / steps.length) * (story.offsetHeight - vh), behavior: 'smooth' });
  }));

  /* ---------- Histoire du navigateur : une animation par étape ---------- */
  let stepGen = 0;
  const timers = [];
  const every = (ms, fn) => timers.push(setInterval(fn, ms));
  const hues = [0, 55, 95, 150, 185, 235, 285, 330];

  function setStep(s) {
    currentStep = s;
    const gen = ++stepGen;
    timers.splice(0).forEach(clearInterval);
    browser.dataset.step = s;
    browser.classList.remove('space-2', 'side-b');
    steps.forEach((li, i) => li.classList.toggle('active', i === s));

    if (s === 2) every(2000, () => browser.classList.toggle('space-2'));
    if (s === 3) runCommandBar(gen);
    if (s === 4) every(1800, () => browser.classList.toggle('side-b'));
    if (s === 5) {
      let k = 0;
      browser.style.setProperty('--mh', hues[k]);
      every(1200, () => { k = (k + 1) % hues.length; browser.style.setProperty('--mh', hues[k]); });
    }
  }

  // La barre d'adresse qui calcule, frappe après frappe (dans la langue de la page).
  const cmdText = $('[data-cmd-text]'), cmdEcho = $('[data-cmd-echo]');
  const cmdResult = $('[data-cmd-result]'), cmdValue = $('[data-cmd-value]');
  async function runCommandBar(gen) {
    const alive = () => gen === stepGen;
    let qi = 0;
    while (alive()) {
      const queries = i18n.content.queries;
      const [q, v] = queries[qi++ % queries.length];
      cmdResult.classList.remove('show');
      for (let i = 1; i <= q.length && alive(); i++) {
        cmdText.textContent = cmdEcho.textContent = q.slice(0, i);
        await sleep(reduced ? 0 : 55 + Math.random() * 50);
      }
      if (!alive()) break;
      cmdValue.textContent = v;
      cmdResult.classList.add('show');
      await sleep(1900);
      for (let i = q.length; i >= 0 && alive(); i--) {
        cmdText.textContent = cmdEcho.textContent = q.slice(0, i);
        if (i === q.length - 2) cmdResult.classList.remove('show');
        await sleep(reduced ? 0 : 18);
      }
      await sleep(250);
    }
    cmdText.textContent = cmdEcho.textContent = '';
    cmdResult.classList.remove('show');
  }

  /* ---------- Démos rejouées : un changement de langue les relance ---------- */
  const ABORT = Symbol('abort');
  function loop(el, play) {
    let gen = 0;
    const guard = (g) => { if (g !== gen) throw ABORT; };
    watch(el);
    const run = async () => {
      const g = gen;
      try {
        await whenVisible(el);
        while (await play(g, guard)) { guard(g); await whenVisible(el); }
      } catch (e) { if (e !== ABORT) throw e; }
    };
    i18n.onChange(() => { gen++; run(); });
    run();
  }

  /* ---------- Void Notes : la mise en forme se fait en tapant ---------- */
  const typer = $('[data-typer]');
  const chips = $$('[data-chip]');
  const checkSvg = '<svg viewBox="0 0 24 24"><use href="#i-check"/></svg>';
  const chipOn = (name) => chips.forEach((c) => c.classList.toggle('on', c.dataset.chip === name));
  const charDelay = (ch) => (reduced ? 0 : ch === ' ' ? 14 : 22 + Math.random() * 30);

  async function playNote(g, guard) {
    const wait = async (ms) => { await sleep(reduced ? 0 : ms); guard(g); };
    const typeInto = async (target, caret, str) => {
      const node = document.createTextNode('');
      target.insertBefore(node, caret);
      for (const ch of str) {
        await whenVisible(typer);
        guard(g);
        node.data += ch;
        await wait(charDelay(ch));
      }
      return node;
    };

    typer.innerHTML = '';
    typer.classList.remove('fade');
    chipOn(null);
    const caret = document.createElement('i');
    caret.className = 'caret';
    const todos = [];

    for (const line of i18n.content.doc) {
      if (line.meta) {
        const m = document.createElement('p');
        m.className = 'meta';
        m.textContent = line.meta;
        typer.append(m);
        await wait(350);
        continue;
      }
      const el = document.createElement('div');
      el.className = 'l';
      typer.append(el);
      el.append(caret);
      let target = el;

      if (line.mk) {
        chipOn(line.chip);
        const mk = document.createElement('span');
        mk.className = 'mk';
        el.insertBefore(mk, caret);
        for (const ch of line.mk) { mk.textContent += ch; await wait(60); }
        await wait(260);
        el.classList.add(line.cls);
        mk.classList.add('gone');
        if (line.cls === 'todo') {
          const cb = document.createElement('span');
          cb.className = 'cb';
          cb.innerHTML = checkSvg;
          el.prepend(cb);
          const txt = document.createElement('span');
          txt.className = 'txt';
          el.append(txt);
          txt.append(caret);
          target = txt;
          todos.push(el);
        }
        setTimeout(() => mk.remove(), 320);
        await wait(200);
        chipOn(null);
      }

      for (const seg of line.segs) {
        if (typeof seg === 'string') { await typeInto(target, caret, seg); continue; }
        chipOn(seg.chip);
        const open = document.createElement('span'); open.className = 'mk';
        target.insertBefore(open, caret);
        for (const ch of seg.w) { open.textContent += ch; await wait(70); }
        const inner = await typeInto(target, caret, seg.t);
        const close = document.createElement('span'); close.className = 'mk';
        target.insertBefore(close, caret);
        for (const ch of seg.w) { close.textContent += ch; await wait(70); }
        await wait(240);
        const styled = document.createElement(seg.tag);
        styled.textContent = seg.t;
        target.insertBefore(styled, open);
        open.remove(); inner.remove(); close.remove();
        await wait(160);
        chipOn(null);
      }
      await wait(260);
    }

    if (reduced) { todos[0]?.classList.add('done'); return false; }
    await wait(900);
    todos[0]?.classList.add('done');
    await wait(4200);
    typer.classList.add('fade');
    await wait(700);
    return true;
  }
  loop(typer, playNote);

  /* ---------- Écouter, transcrire, résumer ---------- */
  const listen = $('[data-listen]');
  const trans = $('[data-ltrans]'), sum = $('[data-lsum]'), ltime = $('[data-ltime]');
  const tabT = $('[data-ltab="t"]'), tabR = $('[data-ltab="r"]');
  $$('.l-wave i', listen).forEach((b, i) => b.style.setProperty('--n', (i * 7) % 11));

  const moveIndicator = (tab) => {
    listen.style.setProperty('--il', `${tab.offsetLeft}px`);
    listen.style.setProperty('--iw', `${tab.offsetWidth}px`);
  };
  let seconds = 12 * 60 + 4;
  setInterval(() => {
    if (!visible.get(listen)) return;
    seconds++;
    ltime.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }, 1000);

  async function playListen(g, guard) {
    const wait = async (ms) => { await sleep(reduced ? 0 : ms); guard(g); };
    const wordsInto = async (p, text, delay) => {
      const spans = text.split(' ').map((w) => { const s = document.createElement('span'); s.className = 'wd'; s.textContent = w + ' '; p.append(s); return s; });
      for (const s of spans) { await whenVisible(listen); guard(g); s.classList.add('on'); await wait(delay); }
    };
    const c = i18n.content;

    listen.classList.remove('show-sum');
    tabT.classList.add('on'); tabR.classList.remove('on');
    moveIndicator(tabT);
    trans.innerHTML = '';
    const stamp = document.createElement('p');
    stamp.className = 'l-stamp';
    stamp.textContent = c.stamp;
    trans.append(stamp);
    sum.innerHTML = '';
    for (const [who, text] of c.lines) {
      const p = document.createElement('p');
      p.className = 'l-line';
      const b = document.createElement('b');
      b.textContent = who;
      p.append(b);
      trans.append(p);
      await wordsInto(p, text, 120);
      await wait(500);
    }
    if (reduced) return false;
    await wait(1400);
    tabT.classList.remove('on'); tabR.classList.add('on');
    moveIndicator(tabR);
    listen.classList.add('show-sum');
    const p = document.createElement('p');
    p.className = 'l-line';
    sum.append(p);
    await wait(400);
    await wordsInto(p, c.summary, 70);
    await wait(4000);
    return true;
  }
  loop(listen, playListen);

  /* ---------- Verrou : Touch ID ---------- */
  const lock = $('[data-lock]');
  (async () => {
    watch(lock);
    lock.classList.add('locked');
    if (reduced) return;
    for (;;) {
      await whenVisible(lock);
      await sleep(1800);
      lock.classList.add('scanning');
      await sleep(1300);
      lock.classList.remove('scanning', 'locked');
      await sleep(2800);
      lock.classList.add('locked');
    }
  })();

  /* ---------- Du navigateur à la note ---------- */
  const bridge = $('[data-bridge]');
  (async () => {
    watch(bridge);
    if (reduced) { bridge.className = 'win bridge s4'; return; }
    for (;;) {
      await whenVisible(bridge);
      bridge.className = 'win bridge';
      await sleep(900);
      bridge.classList.add('s1');
      await sleep(1100);
      bridge.classList.add('s2');
      await sleep(1300);
      bridge.className = 'win bridge s3';
      await sleep(900);
      bridge.classList.add('s4');
      await sleep(3200);
    }
  })();
})();
