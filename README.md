# L'Encre & le Grain

Site vitrine d'un **café-librairie fictif**, réalisé pour un portfolio de développeuse web.
Café de spécialité, librairie indépendante, carte 100 % végétale et accords « livre + café ».

**Site en ligne : [lencre-et-le-grain.vercel.app](https://lencre-et-le-grain.vercel.app)**

> Ce commerce n'existe pas : le lieu, la carte du café, l'adresse et les horaires sont inventés,
> et le site le signale partout où c'est utile. Les **livres présentés sont réels** (éditions
> françaises, prix publics indicatifs relevés le 29 octobre 2026). Leurs résumés sont rédigés
> pour le site et leurs couvertures sont des illustrations génériques, pas celles des éditeurs.
> Aucune commande, réservation ou inscription n'est possible : le site sert uniquement à consulter.

## Format

L'accueil est une **page unique** : hero en photo pleine largeur, quatre coups de cœur de la
librairie, extrait de la carte (« les plus demandés »), esprit du lieu, accords livre + café,
newsletter de démonstration et pied de page. Chaque aperçu renvoie à sa page complète, et le
menu mène directement à ces pages, pré-rendues comme l'accueil :

- [`/librairie`](https://lencre-et-le-grain.vercel.app/librairie) : toute la sélection de livres,
  avec filtres par genre, détails et prix indicatifs
- [`/carte`](https://lencre-et-le-grain.vercel.app/carte) : la carte complète du café
- [`/histoire`](https://lencre-et-le-grain.vercel.app/histoire) : l'histoire (inventée) du lieu
- [`/credits`](https://lencre-et-le-grain.vercel.app/credits) : photos, polices et sources

Une page 404 sert les adresses inconnues.

## Stack et choix techniques

- **Vue 3** (Composition API, `<script setup>`) + **TypeScript** strict
- **Vite 6**
- **Vue Router 4**
- **vite-ssg** pour pré-rendre chaque route en HTML statique au build
- **@unhead/vue** pour le titre, les méta-descriptions, la balise canonique et Open Graph
- **Vitest** + **@vue/test-utils** pour les tests
- Polices auto-hébergées avec **Fontsource** : Newsreader (titres) et Instrument Sans (texte)

### Pourquoi Vue 3 + Vite + vite-ssg plutôt que Nuxt ?

Une application Vue + Vite classique est rendue côté client : le HTML envoyé est vide
jusqu'à l'exécution du JavaScript, ce qui gêne le référencement et le partage sur les réseaux.

- **Nuxt** règle ce problème (SSR/SSG, routing par fichiers, modules SEO), mais ajoute une
  couche de conventions et de dépendances. Il dépasse aussi la stack demandée.
- **vite-ssg** garde Vue 3 + Vite tel quel et **génère au build un fichier HTML complet par
  route**. Les robots reçoivent tout le contenu, le titre et les balises méta. Vue reprend
  ensuite la main côté client (hydratation).

Le site n'a pas de données dynamiques par utilisateur : la génération statique suffit et se
déploie sur Vercel comme de simples fichiers. Ce n'est **pas** du rendu serveur à la demande :
un contenu modifié nécessite un nouveau build. Si le projet évolue vers un vrai catalogue ou
un compte client, Nuxt deviendrait pertinent.

## Direction artistique

Mélange de deux pistes explorées en amont :

- **Base éditoriale** : nom, palette lumineuse, Newsreader en italique pour l'esperluette,
  ombres légères, filtres en pilule.
- **Structure d'atelier** : filets marron chaud, étiquettes « tamponnées », boutons en
  capitales et **papier kraft pour tout l'univers du café**.

La librairie vit sur le sable clair, le café sur le kraft. Le logo réunit les deux :
l'esperluette italique dans un tampon circulaire.

| Rôle | Couleur |
| --- | --- |
| Sable clair (librairie, accents clairs) | `#F3E3D0` |
| Ivoire / crème (fonds) | `#FCFAF5` / `#F6F0E4` |
| Marron chaud foncé (principale, contraste) | `#4E3020` |
| Caramel (accents : accroches, italiques, prix) | `#8C5230` |
| Kraft (univers café) | `#D8C3A0` |
| Brun café / torréfié | `#6E4B32` / `#3D2A1C` |

Toutes les valeurs (couleurs, typos, espacements, rayons, durées) sont centralisées dans
[`src/styles/tokens.css`](src/styles/tokens.css).

## Architecture

```
src/
├── components/
│   ├── layout/   En-tête, pied de page, logo, bandeau de démonstration
│   ├── ui/       Briques réutilisables : bouton, titre de section, image, filtres, étiquette
│   ├── books/    Couverture générée, fiche livre
│   ├── cafe/     Carte du café, ligne de produit
│   └── home/     Sections de la page d'accueil
├── composables/  usePageMeta (SEO), useBookFilter (filtres)
├── config/       Configuration du site (URL publique, image Open Graph)
├── data/         Données de démonstration : livres, carte, accords, photos, infos pratiques
├── directives/   v-reveal (apparition au défilement)
├── pages/        Une page par route
├── router/       Routes et comportement de défilement
├── services/     Accès aux données (point d'entrée unique pour les composants)
├── styles/       Tokens, styles de base
├── types/        Types TypeScript du catalogue
└── utils/        Formatage des prix, pluriels
scripts/seo-files.ts   Génère sitemap.xml et robots.txt après le build
tests/                 Tests Vitest
```

**Données séparées de l'affichage.** Les composants ne lisent jamais `src/data/` directement :
ils passent par [`src/services/catalog.ts`](src/services/catalog.ts). Pour brancher une API
plus tard, seules ces fonctions changent. Les prix sont stockés en centimes, et les accords
référencent livres et boissons par identifiant, comme le ferait une base de données.

**Couvertures illustrées.** Les couvertures sont dessinées à partir des données (couleurs et
motif SVG), dans la charte du site. Les couvertures des éditeurs, protégées par le droit
d'auteur, ne sont pas reproduites. Le site le précise sous la sélection et dans le pied de page.

## Accessibilité

- HTML sémantique, un seul `h1` par page, hiérarchie de titres cohérente
- Lien d'évitement « Aller au contenu », focus visible partout
- Menu mobile avec `aria-expanded`, fermeture par Échap et retour du focus
- Filtres en boutons `aria-pressed`, nombre de résultats annoncé (`role="status"`)
- Formulaire avec libellé explicite, erreurs reliées au champ (`aria-describedby`, `aria-invalid`)
- Contrastes vérifiés (WCAG AA minimum, la plupart des paires dépassent 7:1)
- Animations désactivées si `prefers-reduced-motion: reduce`. Le contenu pré-rendu est visible
  sans JavaScript.

## SEO et performances

- HTML pré-rendu avec titre, méta-description, canonique et Open Graph uniques par page
- `sitemap.xml` et `robots.txt` générés à partir des pages réellement produites
- Pages d'erreur marquées `noindex`
- Images Unsplash redimensionnées par leur CDN (`srcset`, AVIF/WebP automatique),
  dimensions fixées pour éviter les décalages de mise en page, `loading="lazy"` sauf pour le hero
- Polices auto-hébergées en sous-ensembles latin, sans appel à Google Fonts
- Aucune bibliothèque d'animation : une directive d'une trentaine de lignes et du CSS

## Installation et commandes

Prérequis : **Node.js 20 ou plus** (un fichier `.nvmrc` est fourni).

```bash
nvm use
```

```bash
npm install
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement sur http://localhost:5173 |
| `npm run build` | Vérification TypeScript puis génération statique dans `dist/` |
| `npm run preview` | Sert le dossier `dist/` en local pour tester le build |
| `npm test` | Lance les tests une fois |
| `npm run test:watch` | Tests en mode surveillance |
| `npm run typecheck` | Vérification TypeScript seule |

Variable d'environnement (voir [`.env.example`](.env.example)) :

- `VITE_SITE_URL` : URL publique du site, utilisée pour les balises canoniques,
  Open Graph et le sitemap.

## Déploiement

1. **Installer les dépendances** : `npm install`
2. **Lancer en local** : `npm run dev`
3. **Construire pour la production** : `npm run build`, puis `npm run preview` pour vérifier
4. **Publier sur GitHub** : créer un dépôt **vide** (sans README ni .gitignore), puis
   `git remote add origin https://github.com/lauradimitroff/lencre-et-le-grain.git` et
   `git push -u origin main`
5. **Importer dans Vercel** : *Add New… → Project*, choisir le dépôt. Le fichier
   [`vercel.json`](vercel.json) fixe la commande de build et le dossier `dist`. Ajouter
   `VITE_SITE_URL` dans *Settings → Environment Variables* avec l'URL définitive, puis redéployer.
6. **Vérifier la production** : afficher le code source de la page (le contenu doit y être),
   ouvrir `/sitemap.xml` et `/robots.txt`, tester une URL inconnue (page 404), et passer
   Lighthouse en navigation privée.

Vercel ajoute automatiquement un en-tête `noindex` sur les déploiements de prévisualisation :
seule l'URL de production est indexable.

## Notes

- `npm audit` signale des vulnérabilités dans des dépendances **de développement** de Vitest 3
  (aucune dans le code livré). La correction passe par Vitest 4, qui demande Node 20.19 ou plus.
- Photographies : [Unsplash](https://unsplash.com), licence Unsplash. Le détail est sur la page
  `/credits`, alimentée par [`src/data/images.ts`](src/data/images.ts).
