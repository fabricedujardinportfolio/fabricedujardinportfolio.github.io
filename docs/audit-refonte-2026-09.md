# Audit du portfolio et proposition de refonte

Site audité : https://fabricedujardinportfolio.github.io/ (dépôt `fabricedujardinportfolio.github.io`, branche `main`, dernier commit du 19 juin 2025).
Contrainte : site 100 % statique, hébergé sur GitHub Pages, aucun back-end.

---

## 1. État des lieux

### 1.1 Inventaire

| Élément | Constat |
|---|---|
| Base | Thème ThemeForest **Arter** (Miller Digital Design), variante jQuery, personnalisé en 2020-2022 |
| Fichiers | 177 fichiers, 13 Mo, 78 commits (majoritairement « Add files via upload ») |
| Pages HTML | 18, dont **7 réellement reliées au menu** : `index`, `portfolio-2-col`, `history`, `contact`, `portfolio-single-ressource`, `portfolio-single-intranet`, `portfolio-single-absence` |
| Pages démo du thème encore en ligne | 9 : `blog-2-col`, `blog-3-col`, `blog-post`, `onepage`, `portfolio-2-col-masonry`, `portfolio-3-col`, `portfolio-3-col-masonry`, `portfolio-single`, `portfolio-single-2` (titre « Arter », Lorem ipsum, liens ThemeForest/Behance) |
| Dépendances front | jQuery 2.1.3 (2014), Bootstrap 4.3.1, Swiper 4.4.2, anime.js 3.0.0, fancybox 3.5.7, Isotope 3.0.6, ProgressBar.js, smooth-scrollbar + overscroll, swup, typing.js, Font Awesome 5 : **11 scripts + 5 feuilles CSS, 687 Ko** |
| Polices | Poppins (18 variantes) + Courier Prime chargées depuis Google Fonts via `@import` |
| Fichiers parasites | 11 `.DS_Store`, 4 `Thumbs.db`, `css/style.css.map`, `files/cv.txt` vide, `cv 2022.pdf`, 4 thèmes couleur `color-*.css` non utilisés, 9 images blog, 13 vignettes `img/works/1..13.jpg` (copies identiques d'un même placeholder), portraits placeholder `face-*`, logos `brands/` factices, `mail.php` |
| SEO technique | `sitemap.xml` daté du 9 février 2022 et pointant vers le CV 2022, `ror.xml` et `urllist.txt` obsolètes, `sitemap.html` généré par un service tiers, pas de `robots.txt`, pas de `404.html` |

### 1.2 Fonctionnalités présentes

- **Colonne profil** (sur chaque page) : avatar zoomable, lampe « disponible », résidence/ville/âge, 3 langues en cercles animés, 9 barres de compétences animées, liste de connaissances, bouton de téléchargement du CV, 5 liens sociaux.
- **Menu** latéral avec sous-menu Portfolio, transitions de page sans rechargement (swup), défilement « lissé » (smooth-scrollbar).
- **Accueil** : préchargeur, bannière avec texte qui s'écrit tout seul, 4 compteurs animés, 2 cartes services, 4 blocs tarifs, carrousel de recommandations, logos partenaires, pied de page.
- **Projets** : filtre par techno (Isotope), grille 2 colonnes, galerie plein écran (fancybox), 3 pages détail avec carrousel de captures.
- **Histoire** : deux frises (formations / expériences) avec diplômes en popup et recommandation en popup.
- **Contact** : 3 cartes d'informations, formulaire désactivé remplacé par un lien `mailto:`.

Ces fonctionnalités sont le socle à conserver dans l'esprit (animations, réactivité, galerie, frise, filtre), mais à réimplémenter proprement.

---

## 2. Constats détaillés

### 2.1 Contenu : périmé (confirmé par l'utilisateur)

| Sujet | Sur le site | Réalité (CV janvier 2025) |
|---|---|---|
| Dernière expérience | GIEP-NC, jan. 2021 - mars 2022 | **Hélium, 2022-2025 (3 ans)** : PHP, CodeIgniter, WordPress, jQuery, JS, Vue.js. Absente du site |
| Depuis 2025 | rien | **Groupe Gladius, développeur web & mobile, depuis janvier 2026** (Laravel, React.js), d'après LinkedIn. Hélium NC : juin 2022 → octobre 2025. GIEP-NC : alternance janv. 2021 → mars 2022 puis CDD avr. → juin 2022 |
| Formations | s'arrêtent à CCI 2022 | Absentes : Vue.js 3 (Udemy, juil.-août 2024, certificat) et Perfectionnement CSS (Skazy, oct. 2025, attestation). Dates LinkedIn retenues pour la CCI (préformation sept.-oct. 2018, titre pro oct. 2019 → janv. 2022) : elles diffèrent de l'ancien site et du CV, à confirmer |
| Parcours avant le web | absent | Armée française 2010-2015 (maintenance engins et matériel informatique), BEP maintenance 2009, technicien informatique 2017, monteur pneumatique 2017. À décider si on les montre (ils expliquent le profil polyvalent et la compétence support/maintenance) |
| Compétences | HTML, CSS, JS, jQuery, Vue.js (×2), PHP, Laravel, CodeIgniter, WordPress | manquent : MySQL, Node.js, API REST, Ajax, SEO, Git/GitHub, outils graphiques (Illustrator, Affinity, Photoshop), support et maintenance informatique |
| Projets | 3 projets, tous GIEP 2021-2022 | aucun projet Hélium (3 ans), aucun lien vers du code |
| Chiffres | « 5+ années », « 30 projets », « 21 clients heureux », « 1+ honneurs » | à recalculer et à sourcer, ou à retirer |
| Âge | « 30 » en dur | 34 ans en 2026 |
| Pied de page | © 2020 | 2026 |
| Coquilles | « Codelgniter » (l minuscule au lieu de I), « Recommendations », « Diplome », « plusieur », « développer en PHP », « ma enseigner » | orthographe à reprendre partout |
| Mélange de langues | Residence, City, Age, English, Spanish, Download cv, Template author | tout en français (et éventuellement une vraie version anglaise) |

### 2.2 Bugs fonctionnels

1. **Lien CV cassé sur les 16 pages** : le lien pointe vers `files/cv Fabrice DUJARDIN 2025.pdf`, le fichier s'appelle `cv Fabrice DUJARDIN 2025-01.pdf`. Le site en ligne renvoie une erreur 404. C'est le bouton le plus important du portfolio.
2. **Compétence Vue.js en double** dans la colonne profil, avec le même identifiant `lineprog9` deux fois (HTML invalide, une seule barre s'anime).
3. **Restes du thème** visibles : sous-titre « Template author » sur l'expérience GIEP-NC, popup de recommandation fantôme « Test 2 / Lorem ipsum » dans `history.html`, blocs HTML commentés imbriqués mal fermés dans les sections recommandations (fragments ` -->` résiduels).
4. **5 liens sociaux vides** (`href="#."`) qui ouvrent un onglet vide.
5. **Sous-menu Portfolio** avec un seul item : un niveau de navigation pour rien.
6. **Logos partenaires factices** répétés sur chaque page (dont le même logo deux fois).
7. **Titre de page dupliqué** : la page Absence porte le titre de la page Intranet.
8. **Référence à une favicon inexistante** (`img/thumbnail.ico`) sur une page ; favicon réelle de 67 Ko.
9. **Formulaire de contact** : champs commentés, bouton devenu un `mailto:`, mais le JavaScript continue de poster vers `mail.php`, qui ne peut pas s'exécuter sur GitHub Pages.
10. **Préchargeur bloquant** : 2,2 s d'écran d'attente artificiel, puis animations échelonnées jusqu'à 3,2 s.
11. **Défilement remplacé** (smooth-scrollbar) : casse le défilement natif, les ancres, la restauration de position, la navigation clavier, et se réinitialise à chaque transition swup.

### 2.3 Sécurité et conformité

| Risque | Détail | Gravité |
|---|---|---|
| **Bibliothèques vulnérables** | jQuery 2.1.3 : CVE-2015-9251, CVE-2019-11358, CVE-2020-11022, CVE-2020-11023 (XSS, pollution de prototype). Bootstrap 4.3.1 : CVE-2019-8331 (XSS tooltip/popover). Exploitabilité faible sur un site statique sans saisie, mais signalé par tout scanner | Moyenne |
| **Données personnelles exposées** | Adresse postale personnelle en clair sur la page Contact, adresse complète + date de naissance + téléphone dans le CV public, âge, email en clair (récolte par robots à spam) | **Haute** |
| **Pages démo indexables** | 9 pages « Arter » avec Lorem ipsum et liens sortants vers ThemeForest/Behance, indexées sous le nom de Fabrice Dujardin. Pas de `robots.txt`, pas de `noindex` | Moyenne (image professionnelle) |
| **Aucune Content Security Policy** | Aucun en-tête ni balise `meta` CSP, pas de `Referrer-Policy`, pas de `X-Content-Type-Options`. GitHub Pages n'envoie que HSTS. Seule la balise `meta` est possible sur Pages | Moyenne |
| **Requêtes tierces** | Google Fonts chargé pour chaque visiteur : transfert d'adresse IP hors site (jurisprudence RGPD Munich 2022). Liens Google Maps raccourcis `goo.gl` (service arrêté en août 2025) | Faible / Moyenne |
| **`target="_blank"` sans `rel="noopener noreferrer"`** | sur tous les liens externes | Faible |
| **`mail.php` versionné** | inutilisable sur Pages, et vulnérable s'il l'était (aucune validation, en-tête `From` injectable) | À supprimer |
| **`style.css.map` publié** | expose l'arborescence SCSS | Cosmétique |
| **Licence du thème** | Arter est un thème payant ; le crédit auteur demandé a été retiré. Une refonte de zéro règle la question | À noter |

### 2.4 Performance

- 687 Ko de bibliothèques pour des besoins couvrables en moins de 30 Ko de JS moderne.
- Bootstrap complet (156 Ko) utilisé uniquement pour la grille.
- Image de fond `bg.jpg` : 284 Ko, 2100 × 1400, chargée deux fois par page, aucun format WebP/AVIF, aucun `srcset`, aucun `width/height` (décalage de mise en page), aucun `loading="lazy"`.
- Portrait `Dujardin-fabrice2.png` : 193 Ko non optimisé.
- Poppins en 18 variantes alors que 3 ou 4 suffisent.
- Contenu réellement visible après ~3 s à cause du préchargeur et des délais d'animation.

### 2.5 Accessibilité

- Aucune prise en charge de `prefers-reduced-motion` : les animations sont imposées.
- Boutons construits avec `<a href="#.">` et `<span>`, pas de `<button>`, pas de focus visible.
- Barres et cercles de compétences purement visuels, sans texte alternatif ni `aria`.
- Icônes Font Awesome sans `aria-hidden`, images avec `alt="brand"`, `alt="item"`, `alt="face"`.
- Texte gris `#646466` sur fond `#1e1e28` : contraste ≈ 2,7:1 (minimum 4,5:1).
- Pas de lien d'évitement, hiérarchie de titres incohérente (h5 dans la colonne avant le h1), `lang="fr"` avec des libellés en anglais.

### 2.6 SEO

- Pas d'Open Graph ni de Twitter Card : aucun aperçu lors du partage sur LinkedIn.
- Pas de `canonical`, pas de données structurées (`Person`, `WebSite`).
- 9 pages avec le titre « Arter ».
- Sitemap de 2022 pointant vers un CV obsolète.

---

## 3. Proposition de refonte

### 3.1 Principes

1. **Statique, déployé par GitHub Actions sur Pages**, aucun serveur.
2. **Contenu séparé du code** : expériences, projets, compétences dans des fichiers de données. Mettre à jour le portfolio = éditer un fichier, pas 16 pages HTML.
3. **Animations conservées et modernisées** : transitions de page, apparition au défilement, texte qui s'écrit, compteurs, galerie, filtre. Toutes désactivables via `prefers-reduced-motion`.
4. **Sécurité par défaut** : aucune ressource tierce, CSP stricte, aucune donnée personnelle sensible.
5. **Zéro dette** : plus de jQuery, Bootstrap, thème acheté, ni pages démo.

### 3.2 Pile technique recommandée

| Besoin | Choix | Pourquoi |
|---|---|---|
| Générateur | **Astro** (sortie 100 % statique) | Zéro JavaScript envoyé par défaut, composants, collections de contenu typées (JSON/Markdown), optimisation automatique des images (WebP/AVIF, `srcset`), transitions de page natives (remplace swup), sitemap et `robots.txt` intégrés, i18n intégré. Fabrice connaît Vue.js : Astro accepte des îlots Vue pour les parties interactives |
| Styles | **CSS moderne sans framework** : variables (design tokens), `grid`, `container queries`, `color-scheme` clair/sombre | Remplace Bootstrap + SCSS compilé à la main. ~15 Ko |
| Animations | **CSS scroll-driven animations + View Transitions API**, `IntersectionObserver` pour l'apparition, **anime.js v4** (ou Motion) uniquement pour le hero et les compteurs | Continuité avec l'existant, très léger, GPU |
| Galerie | **PhotoSwipe v5** (MIT) ou `<dialog>` natif | Remplace fancybox (GPL/commercial) |
| Carrousel | **Swiper 11** en îlot chargé à la demande, ou CSS `scroll-snap` | Uniquement si les recommandations dépassent 2 |
| Icônes | **SVG inline via astro-icon** (jeu Lucide ou Simple Icons pour les technos) | Remplace Font Awesome (54 Ko CSS + 5 fontes) |
| Polices | **Fontsource** (auto-hébergé, police variable) | Supprime Google Fonts, 1 fichier au lieu de 18 |
| Formulaire | **Web3Forms ou Formspree** (gratuit, statique) avec honeypot + hCaptcha ; repli `mailto:` obfusqué | Un vrai formulaire sans back-end |
| Qualité | ESLint, Prettier, `npm audit`, **Dependabot**, Lighthouse CI dans le workflow | Plus de bibliothèques qui vieillissent 10 ans |

Alternative si tu veux rester sans outil de build : Vite + HTML/CSS/JS natifs. Même design, mais génération des pages projet et optimisation des images à la main. Astro est recommandé.

### 3.3 Architecture des pages

```
/                     Accueil : hero animé, chiffres clés, stack, projets phares, parcours résumé, recommandations, appel à contact
/projets/             Grille filtrable (techno, année, contexte) — les cartes s'animent au filtre
/projets/[slug]/      Page générée par projet : contexte, mission, stack, captures (galerie), liens (démo, code)
/parcours/            Une seule frise chronologique mélangeant formations et expériences, filtrable
/contact/             Formulaire statique + liens LinkedIn / GitHub / mail
/cv.pdf               CV public sans adresse ni date de naissance
/404                  Page d'erreur personnalisée
/en/…                 (option) miroir anglais via l'i18n d'Astro
```

Fichiers de contenu : `src/content/experiences/*.json`, `src/content/projets/*.md` (avec captures), `src/content/formations/*.json`, `src/data/skills.json`, `src/data/profile.json`.

### 3.4 Direction artistique

- **Sombre par défaut, clair au choix** (bascule + respect du système), tokens de couleur ; conserver l'accent ambre `#FFC107` comme fil de continuité, ou passer à un accent plus « lagon » (turquoise) qui évoque la Nouvelle-Calédonie.
- **Hero** : dégradé animé en fond (CSS, pas d'image de 284 Ko), portrait détouré avec léger parallaxe au mouvement de la souris, phrase qui s'écrit (« je construis vos applications Laravel / Vue.js / WordPress… »), deux boutons (Projets, CV).
- **Grille « bento »** pour les chiffres, la stack et la disponibilité, à la place des 4 blocs tarifs. Les tarifs peuvent rester si tu fais encore du freelance, sinon une carte « Disponible pour un CDI / mission » suffit.
- **Compétences en badges groupés** (Back-end, Front-end, CMS, Outils, Support) plutôt que des pourcentages arbitraires : plus crédible pour un recruteur.
- **Cartes projet** avec capture, badges techno, année, survol 3D léger, ouverture en transition de page.
- **Frise unique** avec repères d'années, logos des entreprises, filtre Formations / Expériences, apparition progressive au défilement.
- **Micro-interactions** : curseur magnétique sur les boutons, soulignement animé, compteurs qui défilent une seule fois à l'apparition.
- **Réactivité** : mobile d'abord, navigation en barre basse sur mobile, colonne profil transformée en carte d'entête.

### 3.5 Mise aux normes sécurité (spécifique GitHub Pages)

- Balise `<meta http-equiv="Content-Security-Policy">` stricte : `default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; font-src 'self'; form-action 'self' https://api.web3forms.com; base-uri 'self'; object-src 'none'`. Aucun script ni style inline (Astro le permet).
- `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- `rel="noopener noreferrer"` sur tous les liens externes, générés par un composant unique.
- Aucune police, icône ou script externe : tout est dans le dépôt et versionné.
- Données personnelles : retirer l'adresse postale, la date de naissance et l'âge ; email affiché obfusqué ou uniquement via le formulaire ; nouveau CV public expurgé.
- `robots.txt`, `sitemap.xml` générés à chaque build ; suppression définitive des pages démo (redirections 301 impossibles sur Pages, on s'appuie sur le `404` et la désindexation via Search Console).
- Dépendances : `npm audit` et Dependabot hebdomadaire ; `.gitignore` pour `.DS_Store`, `Thumbs.db`, `node_modules`, `dist`.
- Fichier `.well-known/security.txt` (optionnel, bon signal pour un développeur).

### 3.6 Objectifs mesurables

| Indicateur | Aujourd'hui (estimation) | Cible |
|---|---|---|
| Poids page d'accueil | ~1,3 Mo | < 300 Ko |
| JavaScript | 687 Ko (11 fichiers) | < 40 Ko |
| Requêtes | ~35 | < 15 |
| Contenu visible | ~3 s (préchargeur) | < 1 s |
| Lighthouse (perf / a11y / bonnes pratiques / SEO) | non mesurable ici, préchargeur et jQuery pénalisants | ≥ 95 sur les quatre |
| Vulnérabilités connues | 5 CVE | 0 |

---

## 4. Plan de réalisation

### Phase 0 : correctifs immédiats sur le site actuel (½ journée)
Pour arrêter l'hémorragie avant la refonte, en un seul commit :
- corriger le lien du CV (404) ;
- supprimer les 9 pages démo, `mail.php`, `ror.xml`, `urllist.txt`, `sitemap.html`, fichiers `.DS_Store` / `Thumbs.db`, images placeholder ;
- retirer l'adresse postale et l'âge, remplacer le CV public par une version sans adresse ni date de naissance ;
- retirer « Template author », la popup « Test 2 », le Vue.js en double, les 5 liens sociaux vides, les logos factices ;
- passer le pied de page en 2026, ajouter `robots.txt`, régénérer `sitemap.xml`.

### Phase 1 : contenu (dépend de tes réponses, voir §5)
Rédaction des fichiers de données : profil, ~8 expériences, ~6 formations, compétences groupées, 3 projets existants réécrits + projets Hélium et récents, recommandations.

### Phase 2 : refonte technique (3 à 5 jours)
Initialisation Astro, design tokens, composants (Hero, Bento, ProjectCard, Timeline, SkillGroup, Testimonial, ContactForm, Nav), pages, transitions et animations, galerie, formulaire.

### Phase 3 : qualité (1 jour)
CSP, polices locales, images optimisées, accessibilité clavier et `reduced-motion`, Open Graph + JSON-LD, Lighthouse ≥ 95, tests mobile.

### Phase 4 : déploiement (½ journée)
Workflow GitHub Actions (build + déploiement Pages), Dependabot, branche `legacy-2022` pour archiver l'ancien site, soumission du nouveau sitemap dans Search Console.

---

## 5. Informations à fournir pour démarrer

1. **Poste actuel** (depuis 2025) : entreprise, dates, intitulé, technologies, missions marquantes. Le CV s'arrête à janvier 2025.
2. **Hélium (2022-2025)** : 3 ou 4 réalisations présentables (captures, description, stack, éventuellement URL publique).
3. **Freelance** : garder les tarifs et la disponibilité CDI/CDD sur le site, ou uniquement « ouvert aux opportunités » ?
4. **Langue** : français seul, ou FR + EN ?
5. **Réseaux** : URL LinkedIn, GitHub personnel, autres.
6. **Parcours avant le web** (armée, maintenance, support) : le montrer dans la frise ?
7. **Formulaire** : service gratuit type Web3Forms/Formspree (les messages arrivent par mail), ou simple lien mail ?
8. **Accent visuel** : rester sur l'ambre actuel, ou nouvelle couleur ?


---

## 6. Réalisation (17 septembre 2026, branche `refonte-2026`)

La refonte a été réalisée dans la foulée de l'audit, sur la branche `refonte-2026`, selon la pile recommandée (Astro 7, CSS natif, JavaScript maison ~5 Ko, polices auto-hébergées, CSP générée au build, déploiement GitHub Actions). Les 176 fichiers de l'ancien site ont été supprimés de la branche ; ils restent dans l'historique Git.

Contenu intégré : Groupe Gladius (2026), Hélium NC (2022-2025), GIEP-NC (alternance + CDD), IAAI-Events, Dotta, parcours avant le web, formations Skazy 2025, Udemy Vue.js 3 2024, CCI, OpenClassrooms, FUN ICN, armée, BEP ; 3 projets GIEP réécrits ; recommandation Ronny Pelage ; compétences groupées.

Reste à fournir par Fabrice (voir §5) : URL LinkedIn, projets Hélium et Gladius présentables (captures + descriptions), clé Web3Forms si formulaire par e-mail souhaité, logos Gladius / Hélium / Skazy / Udemy, CV public expurgé (adresse et date de naissance), confirmation des dates de formation CCI.

Mise en ligne : fusionner `refonte-2026` dans `main`, puis régler **Settings → Pages → Source** sur **GitHub Actions**.
