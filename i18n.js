/* Void — languages. The page is written in English; French comes from the dictionary below.
   The language follows the browser (French if it comes before English in its preferences),
   unless the visitor picked one, which is then remembered. */
(() => {
  'use strict';

  const FR = {
    'meta.title': 'Void — Des apps qui s\'effacent',
    'meta.desc': 'La suite Void : un navigateur, des notes, bientôt un calendrier et le courrier. Natives sur Mac, sans compte, sans bruit.',

    'nav.home': 'Void, retour en haut',
    'nav.sections': 'Sections',
    'nav.browser': 'Navigateur',
    'nav.notes': 'Notes',
    'nav.soon': 'Bientôt',
    'nav.colors': 'Couleurs',
    'nav.langShort': 'EN',
    'nav.langLabel': 'Switch to English',
    'nav.theme': 'Basculer le thème clair ou sombre',
    'nav.download': 'Télécharger',

    'hero.eyebrow': 'La suite Void',
    'hero.title': 'Des apps qui <span class="fade-word">s\'effacent</span>.',
    'hero.sub': 'Un navigateur, des notes. Bientôt un calendrier et le courrier. Natives sur Mac, sans compte, sans bruit — il ne reste que ce que vous faites.',
    'hero.cta': 'Télécharger pour Mac',
    'hero.cta2': 'Découvrir la suite',
    'void.line': 'Rien ici. <span>C\'est voulu.</span>',
    'void.short': 'Rien ici. C\'est voulu.',

    'manifesto.label': 'Manifeste',
    'manifesto.text': 'Void part d\'une idée simple : l\'outil doit disparaître derrière ce que vous faites. Une page, quelques pixels autour. Pas de compte, pas de serveur, pas de bruit. Juste la page, la note, la journée.',

    'suite.eyebrow': 'La suite',
    'suite.title': 'Une même façon de faire.<br><span class="muted">Quatre apps.</span>',
    'suite.lead': 'Même palette pastel, même cadre neutre ou teinté, même thème sombre par défaut. Elles se parlent entre elles, et à personne d\'autre.',
    'suite.void': 'Un navigateur qui s\'efface.',
    'suite.notes': 'Des notes qui s\'effacent derrière le texte.',
    'suite.calendar': 'Un calendrier qui s\'efface.',
    'suite.mail': 'Le courrier, en silence.',
    'tag.preview': 'Préversion 0.2',
    'tag.soon': 'Bientôt',
    'tag.wip': 'En préparation',

    'browser.tagline': 'Un navigateur qui s\'efface.',
    'browser.lead': 'Une page, quelques pixels de chrome autour, rien d\'autre. Construit sur WebKit, le moteur de macOS — pas de Chromium, pas d\'Electron.',
    'browser.stat1': 'Mo, l\'app entière',
    'browser.stat2': 'dépendance externe',
    'browser.stat3': 'iPhone et iPad aussi',

    'step1.t': 'Une page. Rien d\'autre.',
    'step1.p': 'Le chrome se fait discret : une barre latérale, la page, et un nouvel onglet qui ne vous demande rien.',
    'step2.t': 'Les onglets à gauche, ou en haut.',
    'step2.p': 'Barre latérale ou barre du haut, au choix. On bascule sans perdre la page, en pleine animation.',
    'step3.t': 'Des espaces vraiment séparés.',
    'step3.p': 'Personnel, Travail : chaque espace a ses onglets et son propre stockage. Connecté ici, pas là. Un balayage à deux doigts pour passer de l\'un à l\'autre.',
    'step4.t': 'La barre d\'adresse calcule.',
    'step4.p': '« 10 km en miles », « 20 % de 150 », « √2 » : le résultat s\'affiche pendant la frappe. Tout est calculé sur place, rien n\'est envoyé.',
    'step5.t': 'Deux pages côte à côte.',
    'step5.p': '<kbd>⌥⌘S</kbd> et l\'onglet précédent vient à côté. Un clic dans une page lui donne la main.',
    'step6.t': 'Une teinte à vous.',
    'step6.p': 'Neutre, ou l\'une de huit teintes pastel, avec deux halos diffus. Le cadre devient légèrement translucide.',
    'step7.t': 'La réunion vous suit.',
    'step7.p': 'Pendant un appel Meet, Teams ou Zoom, quittez l\'onglet : la réunion passe dans une petite fenêtre flottante, boutons compris.',

    'mock.mars': 'Mars (planète) — Wikipédia',
    'mock.marsUrl': 'fr.wikipedia.org/wiki/Mars',
    'mock.search': 'Rechercher ou saisir une adresse',
    'mock.personal': 'Personnel',
    'mock.work': 'Travail',
    'mock.newTab': 'Nouvel onglet',
    'mock.later': 'À lire plus tard',
    'mock.blackhole': 'Trou noir — Wikipédia',
    'mock.w1': 'Linear — Feuille de route',
    'mock.w3': 'Agenda partagé',
    'mock.w4': 'Figma — Maquettes',
    'mock.w5': 'Notion — Comptes rendus',
    'mock.ntSub': '⌘T pour ouvrir un onglet · ⌘⇧N pour une fenêtre privée',
    'mock.copy': '↓ ↩ copier',
    'mock.searchFor': 'Rechercher',
    'mock.tab': 'Onglet',

    'b1.k': 'Bloqueur intégré',
    'b1.t': 'Les publicités ne se chargent même pas.',
    'b1.p': 'Environ 150 règles compilées par WebKit, appliquées avant le chargement, sans script. Désactivable par site.',
    'b1.ad': 'Publicité',
    'b1.count': 'règles, compilées une fois',
    'b2.k': 'Mode lecture',
    'b2.t': 'L\'article, et seulement lui.',
    'b3.k': 'Extensions Chrome',
    'b3.t': 'Depuis le Chrome Web Store.',
    'b3.p': 'Le bouton « Ajouter à Chrome » devient « Ajouter à Void ».',
    'b3.a': 'Ajouter à Chrome',
    'b3.b': 'Ajouter à Void',
    'b4.k': 'Onglets en veille',
    'b4.t': 'Inactif ? Il dort.',
    'b4.p': 'Après 30 minutes, un onglet libère sa mémoire et revient à la même position d\'un clic.',
    'b4.mem': 'Mémoire',
    'b5.k': 'Fenêtres privées',
    'b5.t': 'Fermée, oubliée.',
    'b5.p': 'Un stockage en mémoire, détruit à la fermeture. Cadre ardoise, impossible à confondre.',
    'b5.badge': 'Privé',
    'b6.k': 'Léger, par construction',
    'b6.t': 'Le Mac a déjà le moteur. Void n\'apporte que le reste.',
    'b6.p': 'Une seule vue web créée au lancement ; les autres onglets dorment jusqu\'au clic. Les scripts de Void vivent dans un monde isolé, invisibles des pages.',
    'b6.unit': 'Mo',

    'notes.tagline': 'Des notes qui s\'effacent derrière le texte.',
    'notes.lead': 'Une liste, un texte, et la mise en forme se fait en tapant. Enregistré sur le Mac, automatiquement. Aucun compte.',
    'nmock.search': 'Rechercher dans Personnel',
    'nmock.all': 'Toutes les notes',
    'nmock.home': 'Maison',
    'nmock.travel': 'Voyages',
    'nmock.lisbon': 'Carnet de voyage — Lisbonne',
    'nmock.time': '15:41',
    'nmock.books': 'Livres à lire',
    'nmock.date': '22 août',
    'nmock.label': 'Démonstration : une note qui se met en forme pendant la frappe',
    'chip.h1': 'Titre',
    'chip.h2': 'Intertitre',
    'chip.li': 'Liste',
    'chip.todo': 'Case à cocher',
    'chip.b': 'Gras',
    'chip.i': 'Italique',
    'chip.mark': 'Surligné',
    'chip.quote': 'Citation',

    'listen.k': 'Écouter',
    'listen.t': 'Écouter, transcrire, résumer.',
    'listen.p': 'Le micro, le son du Mac — un appel, une vidéo — ou les deux. Ce qui est dit s\'écrit phrase par phrase, les voix sont séparées, et Apple Intelligence en fait un résumé. Sur l\'appareil : rien de ce qui est entendu ne part.',
    'listen.l1': 'Trois onglets : Notes, Transcription, Résumé',
    'listen.l2': 'Enregistrement gardé, ≈ 10 Mo par heure',
    'listen.l3': '« Moi » et « Eux », ou les voix nommées',
    'lmock.title': 'Revue produit',
    'lmock.meta': 'Aujourd\'hui · 10:00',
    'lmock.notes': 'Notes',
    'lmock.trans': 'Transcription',
    'lmock.sum': 'Résumé',
    'lmock.bar': 'Écoute · micro et son du Mac',
    'lmock.stop': 'Arrêter',

    'lock.k': 'Verrouiller',
    'lock.t': 'Cachée aussitôt. Touch ID pour la rouvrir.',
    'lock.p': 'Une note verrouillée disparaît sans rien demander. Pour la lire, Touch ID — ou le mot de passe du Mac. L\'app ne voit ni empreinte ni mot de passe.',
    'lockm.title': 'Codes et références',
    'lockm.meta': 'Modifiée hier à 18:20',
    'lockm.l1': 'Interphone : bâtiment B, deuxième porte.',
    'lockm.l2': 'Wi-Fi de l\'atelier : demander à Léa.',
    'lockm.l3': 'Numéro d\'adhérent : voir la carte bleue pâle.',
    'lockm.l4': 'Garde-meuble : box 14, allée C.',
    'lockm.locked': 'Note verrouillée',
    'lockm.btn': 'Déverrouiller avec Touch ID',

    'bridge.t': 'Du navigateur à la note, en un geste.',
    'bridge.p': 'Sélectionnez un passage dans Void, clic droit, « Envoyer vers Void Notes » : le texte arrive avec son titre et son lien. Une image aussi. Dans une nouvelle note, ou à la fin d\'une note existante.',
    'bmock.url': 'fr.wikipedia.org',
    'bmock.text': 'Mars est la quatrième planète du Système solaire. <span class="br-sel">Sa couleur rouge vient de l\'oxyde de fer présent à sa surface.</span> Elle possède deux petits satellites.',
    'bmock.copy': 'Copier',
    'bmock.search': 'Rechercher « Sa couleur… »',
    'bmock.send': 'Envoyer vers Void Notes',
    'bmock.fly': 'Mars (planète)',
    'bmock.newp': 'Sa couleur rouge vient de l\'oxyde de fer…',
    'bmock.i1': 'Trois jours en octobre…',
    'bmock.i2': 'Le Désert des Tartares…',
    'bmock.groceries': 'Courses',
    'bmock.i3': 'Lait, citrons, pain…',

    'm1.t': 'Note rapide',
    'm1.p': 'Depuis la barre des menus, sans quitter ce que vous faites.',
    'm2.t': 'Album d\'images',
    'm2.p': 'Une grande image et de plus petites, sous le titre.',
    'm3.p': 'Collé, il arrive mis en forme. Exporté, il se lit partout.',
    'm4.t': 'Synchronisation',
    'm4.p': 'Facultative, par un dossier d\'iCloud Drive. Aucun serveur à nous.',
    'm5.t': 'Espaces et dossiers',
    'm5.p': 'Sous-dossiers, trente icônes, épinglées, archives.',
    'm6.t': 'Sur iPhone',
    'm6.p': 'Les mêmes notes, l\'écoute qui continue écran verrouillé.',

    'soon.eyebrow': 'Bientôt dans la suite',
    'soon.title': 'La journée,<br><span class="muted">et le courrier.</span>',
    'cal.p': 'Un calendrier qui s\'efface. Il fonctionne dès le premier lancement, sans compte ni autorisation. Vos calendriers iCloud ou Google s\'ajoutent si vous le souhaitez.',
    'cal.d1': 'lun. 12',
    'cal.d2': 'mar.',
    'cal.d3': 'mer. 14',
    'cal.d4': 'jeu. 15',
    'cal.d5': 'ven. 16',
    'cal.e1': 'Déjeuner avec Léa',
    'cal.e2': 'Atelier',
    'cal.e3': 'Escalade',
    'cal.e4': 'Dentiste',
    'mail.p': 'Le courrier, en silence. Une boîte de réception qui ne réclame rien, dans le même cadre que le reste de la suite.',
    'mail.yesterday': 'Hier',
    'mail.studio': 'Atelier',
    'mail.library': 'Bibliothèque',
    'mail.mon': 'Lun.',

    'colors.eyebrow': 'Personnalisation',
    'colors.title': 'À votre couleur.<br><span class="muted">Partout à la fois.</span>',
    'colors.lead': 'Cinq couleurs d\'accent en tons pastel, huit teintes de fenêtre. Les mêmes dans chaque app de la suite. Essayez : cette page suit.',
    'colors.accent': 'Couleur',
    'colors.accentLabel': 'Couleur d\'accent',
    'colors.tint': 'Teinte de la fenêtre',
    'colors.theme': 'Thème',
    'colors.open': 'Ouvrir',
    'c.violet': 'Violet',
    'c.blue': 'Bleu',
    'c.green': 'Vert',
    'c.pink': 'Rose',
    't.none': 'Neutre',
    't.rose': 'Rose',
    't.peach': 'Pêche',
    't.lemon': 'Citron',
    't.sage': 'Sauge',
    't.mint': 'Menthe',
    't.sky': 'Ciel',
    't.lavender': 'Lavande',
    't.mauve': 'Mauve',
    'th.dark': 'Sombre',
    'th.light': 'Clair',

    'pr.title': 'Ce qu\'il n\'y a pas.',
    'pr.lead': 'Les apps Void se définissent surtout par ce qu\'elles laissent de côté.',
    'pr1.t': 'Pas de compte',
    'pr1.p': 'Elles fonctionnent dès le premier lancement. Rien à créer, rien à confirmer.',
    'pr2.t': 'Pas de serveur',
    'pr2.p': 'Vos données restent sur le Mac. La synchronisation passe par votre propre iCloud Drive.',
    'pr3.t': 'Pas de Chromium',
    'pr3.p': 'Swift, SwiftUI et les moteurs d\'Apple. Des apps natives, qui démarrent vite.',
    'pr4.t': 'Pas de superflu',
    'pr4.p': 'Quelques mégaoctets, aucune dépendance inutile. Rien à l\'écran qui ne serve.',

    'cta.title': 'Rien ici.<br><span class="muted">C\'est voulu.</span>',
    'cta.lead': 'Préversions pour Mac (Apple silicon, macOS 14 ou plus récent).',
    'cta.void': 'Void pour Mac',
    'cta.notes': 'Void Notes pour Mac',
    'cta.fine': 'Mises à jour intégrées, depuis GitHub. Aucun autre serveur.',
    'footer.label': 'Pied de page',
    'footer.lang': 'Langue',
  };

  /* Content of the animated demos, per language. */
  const CONTENT = {
    en: {
      locale: 'en-US',
      queries: [
        ['10 km in miles', '6.2137 miles'],
        ['20% of 150', '30'],
        ['72 °F in °C', '22.22 °C'],
        ['√2', '1.41421356'],
        ['2^10', '1,024'],
      ],
      doc: [
        { cls: 'h1', mk: '# ', chip: 'h1', segs: ['Travel journal — Lisbon'] },
        { meta: 'Created Sep 28, 2026  ·  Edited today at 3:41 PM' },
        { segs: ['Three days in October, no tight schedule. The plan: walk, ', { w: '**', tag: 'strong', t: 'eat', chip: 'b' }, ', and keep the afternoons for ', { w: '*', tag: 'em', t: 'doing nothing', chip: 'i' }, '.'] },
        { cls: 'h2', mk: '## ', chip: 'h2', segs: ['Don\'t miss'] },
        { cls: 'li', mk: '- ', chip: 'li', segs: ['The Senhora do Monte viewpoint at sunrise'] },
        { cls: 'li', mk: '- ', chip: 'li', segs: ['A pastel de nata ', { w: '**', tag: 'strong', t: 'still warm', chip: 'b' }, ', ', { w: '==', tag: 'mark', t: 'only in Belém', chip: 'mark' }] },
        { cls: 'h2', mk: '## ', chip: 'h2', segs: ['Before leaving'] },
        { cls: 'todo', mk: '- [ ] ', chip: 'todo', segs: ['Book the train to Sintra'] },
        { cls: 'todo', mk: '- [ ] ', chip: 'todo', segs: ['Check my passport'] },
        { cls: 'quote', mk: '> ', chip: 'quote', segs: ['Travel light. Come back with stories.'] },
      ],
      stamp: '10:00 AM — Listening',
      lines: [
        ['Me', 'Shall we go with the week view by default?'],
        ['Them', 'Yes, and the month stays one click away.'],
        ['Me', 'Noted: pastel colors for events.'],
        ['Them', 'And nothing leaves the Mac. That\'s the whole point.'],
      ],
      summary: 'The week view will be the default, with the month one click away. Events keep pastel colors. Data never leaves the Mac: that\'s the principle agreed on.',
    },
    fr: {
      locale: 'fr-FR',
      queries: [
        ['10 km en miles', '6,2137 miles'],
        ['20 % de 150', '30'],
        ['72 °F en °C', '22,22 °C'],
        ['√2', '1,41421356'],
        ['2^10', '1024'],
      ],
      doc: [
        { cls: 'h1', mk: '# ', chip: 'h1', segs: ['Carnet de voyage — Lisbonne'] },
        { meta: 'Créée 28 sept. 2026  ·  Modifiée aujourd\'hui à 15:41' },
        { segs: ['Trois jours en octobre, sans programme serré. L\'idée : marcher, ', { w: '**', tag: 'strong', t: 'manger', chip: 'b' }, ', et garder les après-midi pour ', { w: '*', tag: 'em', t: 'ne rien faire', chip: 'i' }, '.'] },
        { cls: 'h2', mk: '## ', chip: 'h2', segs: ['À ne pas manquer'] },
        { cls: 'li', mk: '- ', chip: 'li', segs: ['Le miradouro da Senhora do Monte au lever du jour'] },
        { cls: 'li', mk: '- ', chip: 'li', segs: ['Un pastel de nata ', { w: '**', tag: 'strong', t: 'encore tiède', chip: 'b' }, ', ', { w: '==', tag: 'mark', t: 'pas ailleurs qu\'à Belém', chip: 'mark' }] },
        { cls: 'h2', mk: '## ', chip: 'h2', segs: ['Avant de partir'] },
        { cls: 'todo', mk: '- [ ] ', chip: 'todo', segs: ['Réserver le train pour Sintra'] },
        { cls: 'todo', mk: '- [ ] ', chip: 'todo', segs: ['Vérifier la carte d\'identité'] },
        { cls: 'quote', mk: '> ', chip: 'quote', segs: ['Partir léger. Revenir avec des histoires.'] },
      ],
      stamp: '10:00 — Écoute',
      lines: [
        ['Moi', 'On part sur la vue semaine par défaut ?'],
        ['Eux', 'Oui, et le mois reste à un clic dans la barre.'],
        ['Moi', 'Je note : des couleurs pastel pour les événements.'],
        ['Eux', 'Et rien qui ne sorte du Mac. C\'est le principe.'],
      ],
      summary: 'La vue semaine sera affichée par défaut, le mois restant accessible d\'un clic. Les événements gardent des couleurs pastel. Les données ne quittent pas le Mac : c\'est le principe retenu.',
    },
  };

  const DICTS = { fr: FR };
  const root = document.documentElement;

  // The English text is the page itself: keep a copy before translating anything.
  const EN = {};
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  const parseAttrs = (el) => el.dataset.i18nAttr.split(';').map((pair) => pair.split(':').map((s) => s.trim()));
  textEls.forEach((el) => { const k = el.dataset.i18n; if (!(k in EN)) EN[k] = el.innerHTML; });
  attrEls.forEach((el) => parseAttrs(el).forEach(([attr, k]) => { if (!(k in EN)) EN[k] = el.getAttribute(attr); }));

  const listeners = [];
  let lang = root.lang === 'fr' ? 'fr' : 'en';

  const t = (key) => (lang !== 'en' && DICTS[lang][key] != null ? DICTS[lang][key] : EN[key]);

  function apply() {
    root.lang = lang;
    textEls.forEach((el) => { const v = t(el.dataset.i18n); if (v != null && el.innerHTML !== v) el.innerHTML = v; });
    attrEls.forEach((el) => parseAttrs(el).forEach(([attr, k]) => { const v = t(k); if (v != null) el.setAttribute(attr, v); }));
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    root.classList.remove('i18n-wait');
  }

  function set(next, remember = true) {
    if (next !== 'en' && !DICTS[next]) return;
    if (remember) {
      try {
        const p = JSON.parse(localStorage.getItem('void-prefs') || '{}');
        p.lang = next;
        localStorage.setItem('void-prefs', JSON.stringify(p));
      } catch (e) {}
    }
    if (next === lang) return;
    lang = next;
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  document.querySelectorAll('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => set(lang === 'fr' ? 'en' : 'fr')));
  document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => set(b.dataset.lang)));

  apply();

  window.VoidI18n = {
    get lang() { return lang; },
    get content() { return CONTENT[lang]; },
    t,
    set,
    onChange: (fn) => listeners.push(fn),
  };
})();
