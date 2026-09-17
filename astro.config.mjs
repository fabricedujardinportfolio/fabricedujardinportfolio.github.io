// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fabricedujardinportfolio.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Feuilles de style toujours externes : compatible CSP stricte.
    inlineStylesheets: 'never',
  },
  security: {
    // Astro génère la balise <meta http-equiv="content-security-policy"> avec le hachage
    // de chaque script/style qu'il produit. Aucune ressource tierce n'est autorisée.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://api.web3forms.com",
        "form-action 'self' https://api.web3forms.com mailto:",
        "base-uri 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  vite: {
    build: {
      // Jamais de ressource encodée en base64 dans le HTML (CSP).
      assetsInlineLimit: 0,
    },
  },
});
