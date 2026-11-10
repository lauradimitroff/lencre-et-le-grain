# L'Encre & le Grain

[![CI](https://github.com/lauradimitroff/lencre-et-le-grain/actions/workflows/ci.yml/badge.svg)](https://github.com/lauradimitroff/lencre-et-le-grain/actions/workflows/ci.yml)

Site vitrine d'un **café-librairie fictif**, réalisé pour un portfolio de développeuse web.
Un café de spécialité avant tout, avec un coin librairie, une carte 100 % végétale et des
accords « livre + café ».

**Site en ligne : [lencre-et-le-grain.vercel.app](https://lencre-et-le-grain.vercel.app)**

> Ce commerce n'existe pas : le lieu, la carte du café, l'adresse et les horaires sont inventés,
> et le site le signale partout où c'est utile. Les **livres présentés sont réels** (éditions
> françaises, prix publics indicatifs relevés le 29 octobre 2026). Leurs résumés sont rédigés
> pour le site et leurs couvertures sont des illustrations génériques, pas celles des éditeurs.
> Aucune commande, réservation ou inscription n'est possible : le site sert uniquement à consulter.

## Format

L'accueil est une **page unique** : hero en photo pleine largeur, extrait de la carte (« les plus
demandés »), quatre coups de cœur du coin librairie, esprit du lieu, accords livre + café avec un
petit quiz (« Quel livre avec quel café ? »), newsletter de démonstration et pied de page. Le café
passe en premier partout (menu, accueil, boutons) : c'est l'activité principale. Chaque aperçu
renvoie à sa page complète, et le menu mène directement à ces pages, pré-rendues comme l'accueil :

- [`/carte`](https://lencre-et-le-grain.vercel.app/carte) : la carte complète du café, avec un
  filtre allergènes (« Sans gluten », « Sans fruits à coque », « Sans soja »)
- [`/librairie`](https://lencre-et-le-grain.vercel.app/librairie) : toute la sélection du coin librairie,
  avec filtres par genre, détails et prix indicatifs
- [`/histoire`](https://lencre-et-le-grain.vercel.app/histoire) : l'histoire (inventée) du lieu
- [`/contact`](https://lencre-et-le-grain.vercel.app/contact) : infos pratiques, plan illustratif
  et formulaire de démonstration. Il valide la saisie, simule l'envoi, puis précise que rien
  n'a été envoyé ni enregistré (aucune requête réseau, vérifié par un test)
- [`/credits`](https://lencre-et-le-grain.vercel.app/credits) : photos, polices et sources

Une page 404 sert les adresses inconnues.

Quelques détails :

- **Badge « Ouvert maintenant / Fermé »** dans le hero et le pied de page, calculé dans le
  navigateur à l'heure de Paris à partir des horaires (fictifs), et mis à jour chaque minute
- **Transitions douces entre les pages** avec la View Transitions API ; l'en-tête reste en place.
  Rien ne change dans les navigateurs qui ne la gèrent pas ou en mouvement réduit
- **Menu mobile en panneau latéral**, avec focus gardé dans le panneau

## Stack et choix techniques

- **Vue 3** (Composition API, `<script setup>`) + **TypeScript** strict
- **Vite 6**
- **Vue Router 4**
- **vite-ssg** pour pré-rendre chaque route en HTML statique au build
- **@unhead/vue** pour le titre, les méta-descriptions, la balise canonique et Open Graph
- **Vitest** + **@vue/test-utils** pour les tests unitaires
- **Playwright** + **axe-core** pour les tests de bout en bout et d'accessibilité
- **GitHub Actions** et **Lighthouse CI** pour l'intégration continue
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

Le coin librairie vit sur le sable clair, le café sur le kraft. Le logo réunit les deux :
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
tests/                 Tests unitaires Vitest
e2e/                   Tests de bout en bout Playwright (parcours, quiz, accessibilité)
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
- **Image d'aperçu de partage propre à chaque page** (1200 × 630, dans `public/og/`), générée
  par `npm run og` : un modèle HTML aux couleurs du site rendu par le Chromium de Playwright.
  Les images sont versionnées, le build n'a donc pas besoin de navigateur
- `sitemap.xml` et `robots.txt` générés à partir des pages réellement produites
- Pages d'erreur marquées `noindex`
- Images Unsplash redimensionnées par leur CDN (`srcset`, AVIF/WebP automatique),
  dimensions fixées pour éviter les décalages de mise en page, `loading="lazy"` sauf pour le hero
- Polices auto-hébergées en sous-ensembles latin, sans appel à Google Fonts
- Aucune bibliothèque d'animation : une directive d'une cinquantaine de lignes et du CSS. Elle
  mesure les éléments par lots pour éviter les recalculs de mise en page en série (le temps de
  blocage de `/librairie` sur mobile est passé de 710 ms à 0)
- Une seule feuille de style pour tout le site (≈ 12 Ko compressée), plutôt qu'une par composant

## Tests et intégration continue

- **Tests unitaires (Vitest)** : données du catalogue (carte végétale, identifiants, prix),
  filtres, formulaire, fichiers SEO et logique du quiz, testée sur toutes les combinaisons
  de réponses.
- **Tests de bout en bout (Playwright)** sur la version pré-rendue, en format ordinateur et
  mobile : chaque page répond sans erreur JavaScript, le menu mène aux bonnes pages, les filtres
  fonctionnent, aucune page ne déborde, et le quiz se joue à la souris comme au clavier
  (focus déplacé à chaque question).
- **Accessibilité automatique (axe-core)** : règles WCAG 2.1 A et AA sur chaque page et sur le
  résultat du quiz. C'est ce test qui a repéré un contraste insuffisant sur l'en-tête de la carte.
- **GitHub Actions** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) à chaque push et
  pull request : types, tests unitaires, build, tests Playwright, puis **Lighthouse CI**
  ([`lighthouserc.json`](lighthouserc.json)) qui bloque si l'accessibilité passe sous 95, ou les
  bonnes pratiques et le SEO sous 90. Mesure en profil mobile (4G lente simulée, processeur
  ralenti) : 100 en accessibilité, bonnes pratiques et SEO sur les quatre pages principales, de 82
  à 88 en performance, sans aucun décalage de mise en page. L'essentiel de l'écart vient de
  Newsreader : la version avec taille optique (≈ 280 Ko pour le romain et l'italique) est gardée
  volontairement, car elle donne leur finesse aux grands titres.

Pour lancer les tests de bout en bout la première fois : `npx playwright install chromium`.

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
| `npm test` | Lance les tests unitaires une fois |
| `npm run og` | Régénère les images d'aperçu de partage dans `public/og/` |
| `npm run test:e2e` | Construit le site puis lance les tests Playwright (ordinateur et mobile) |
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
