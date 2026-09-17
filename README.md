# Portfolio — Fabrice Dujardin

Site personnel de Fabrice Dujardin, développeur web & mobile à Nouméa.
En ligne : https://fabricedujardinportfolio.github.io/

Site **100 % statique**, généré avec [Astro](https://astro.build) et déployé sur GitHub Pages
par GitHub Actions. Aucun serveur, aucune base de données, aucun traceur.

## Mettre à jour le contenu

Tout le contenu vit dans `src/data/` : il suffit d'éditer un fichier JSON, de pousser sur `main`,
et le site se reconstruit tout seul.

| Fichier | Contenu |
|---|---|
| `src/data/profile.json` | Nom, titre, accroche, phrases du texte animé, liens, chemin du CV, clé du formulaire |
| `src/data/experiences.json` | Expériences professionnelles (du plus récent au plus ancien) |
| `src/data/formations.json` | Formations et diplômes |
| `src/data/projects.json` | Projets : une page est générée automatiquement par entrée (`/projets/<slug>/`) |
| `src/data/skills.json` | Compétences groupées |
| `src/data/testimonials.json` | Recommandations |

Les images vont dans `src/assets/` (elles sont converties en WebP et redimensionnées au build) :

- `src/assets/logos/<id>.png|jpg` : logo d'entreprise ou d'école, référencé par `"logo": "<id>"` ;
- `src/assets/projects/<fichier>.png` : captures d'écran, référencées dans `gallery` et `cover` ;
- `src/assets/diplomes/<id>.jpg` : diplômes, référencés par `"diploma": "<id>"`.

Le CV public est `public/cv-fabrice-dujardin.pdf`.

### Formulaire de contact

Sans configuration, le formulaire ouvre le logiciel de messagerie du visiteur avec le message
pré-rempli. Pour recevoir les messages directement par e-mail, créez une clé gratuite sur
[web3forms.com](https://web3forms.com) et renseignez-la dans `profile.json` (`web3formsKey`).

## Développer en local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère le site dans dist/
npm run preview   # sert dist/ pour vérifier le build (dont la CSP)
```

Node 22 ou plus récent (`.nvmrc` : 24).

## Sécurité

- Content Security Policy stricte générée par Astro à chaque build (hachage des scripts et styles) ;
- aucune ressource externe : polices, icônes et scripts sont dans le dépôt ;
- pas de bibliothèque tierce côté navigateur (le JavaScript du site fait ~5 Ko) ;
- mises à jour de dépendances surveillées par Dependabot ;
- adresse e-mail assemblée côté client pour limiter la collecte par les robots.

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
Dans les paramètres du dépôt, **Pages → Source** doit être réglé sur **GitHub Actions**.

L'ancien site (thème Arter, 2020-2025) reste consultable dans l'historique Git avant la
branche `refonte-2026`.
