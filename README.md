# Ayoka Boutique · Administration & CRM

Projet local de la marque Ayoka, destiné à un essai client sur Netlify avant l’hébergement définitif.

## Lancer sur ce PC

Double-cliquer sur `LANCER-BOUTIQUE.cmd` pour la boutique ou `LANCER-ADMIN.cmd` pour l’administration. Le terminal doit rester ouvert pendant l’essai. Node.js et les dépendances installées sont nécessaires. Si les dépendances sont absentes, exécuter `npm ci` depuis ce dossier.

La boutique s’ouvre sur `http://127.0.0.1:5173/`, l’administration sur `/admin`, le lookbook sur `/galerie`. Si le port est occupé, Vite indique un autre port dans le terminal.

## Contenu

- Les 98 images fournies sont toutes présentes dans le lookbook : aucun fichier n’est exclu, même les logos dupliqués.
- 34 articles et 82 déclinaisons de couleur, dont 10 modèles de polos en trois couleurs chacun.
- Un diaporama contenant les 13 images de campagne, avec précédent, suivant et pause. Le défilement automatique respecte la réduction des animations.
- Catalogue avec catégories, collections, recherche, tri, couleurs, favoris, fiches et panier.
- Administration : création et édition des articles, images par couleur, prix en FCFA, stock total par article, tailles, catégories, collections, visibilité et ordre du catalogue.
- Réglages : accueil, WhatsApp, livraison et ouverture des commandes.
- Export JSON du catalogue pour conserver les essais de l’administrateur.

## Essai Netlify

Le site d’essai publié par le propriétaire est https://ayoka-boutik.netlify.app/ . Les mises à jour se déposent dans le projet existant, rubrique Deploys, à partir du dossier local `netlify-dist` ou de l’archive fournie. La mise à jour du 3 octobre avec les polos et la motion doit être republiée pour apparaître à cette adresse.

La version client est statique. Les modifications de l’admin et les images ajoutées restent dans le navigateur utilisé, dans son stockage local. Elles ne se synchronisent pas entre appareils et peuvent être perdues si le stockage du navigateur est effacé. L’export permet de récupérer le catalogue. Les modifications ne sont pas automatiquement incorporées aux sources : pour les intégrer au projet, remettre le JSON exporté au développeur.

L’administration de démonstration est librement accessible ; elle ne doit recevoir ni coordonnées clients réelles ni données confidentielles. Les commandes et les paiements réels sont désactivés. Les prix et stocks initiaux sont à renseigner, car ils n’étaient pas fournis.

Le dossier `netlify-dist` et l’archive `../ayoka-netlify-polos.zip` sont prêts à publier. Dans le compte Netlify du propriétaire, ouvrir le projet existant **ayoka-boutik**, puis **Deploys**, et déposer le contenu de l’archive décompressée. Conserver ce projet permet de garder l’adresse actuelle. `DEPLOYER-NETLIFY.cmd` reste une alternative avec connexion au compte et sélection du site existant.

Pour reconstruire : `npm run build:demo`. La configuration est dans `netlify.toml` et `vite.demo.config.ts`. Les fichiers `_redirects` permettent les accès directs à `/admin` et `/galerie`.

## Version finale avec serveur

Les routes serveur dans `app/api/` et les tables dans `db/schema.ts` préparent une version avec D1 pour le catalogue et les commandes, et R2 pour les images ajoutées. Ces routes ne s’exécutent pas sur l’essai statique Netlify. Elles sont ciblées sur Cloudflare Workers et nécessitent une adaptation pour un autre serveur (par exemple Node.js avec PostgreSQL).

Avant une mise en vente réelle : raccorder le stockage, générer et appliquer les migrations, configurer l’accès admin (variable `ADMIN_EMAIL` et fournisseur de connexion), brancher un prestataire de paiement, renseigner les données commerciales et conditions de vente, puis vérifier les parcours et la sécurité sur l’hébergement choisi. Le stock actuellement proposé est global par article ; une gestion par taille et couleur doit être ajoutée si nécessaire.

Aucun hébergement définitif n’a été publié. Un espace Sites non publié a été créé avant le choix de Netlify ; aucune source ni version n’y a été déployée.

## Figma

Équipe : Vrmvndo’s team. Fichier : https://www.figma.com/design/vKM8rkFGgKitnMdtQmQJaw

## Structure

`app/` : boutique, lookbook, admin et routes serveur. `lib/` : catalogue, types, manifeste des 98 images, stockage et adaptateur de démonstration. `public/assets/` : images optimisées. `demo/` : entrée de l’essai statique. `scripts/` : lancement et finalisation du build.

Les fichiers source de `D:\ayoka boutik` n’ont pas été modifiés. Le manifeste `lib/gallery.ts` conserve le nom de chaque fichier d’origine.

La boutique s’adresse à toute la Côte d’Ivoire. Les inscriptions Abidjan figurant sur les logos et vêtements d’origine restent préservées. Le hero présente les 13 illustrations en entier, avec les contrôles séparés sous les images.

## CRM & performances

Le dashboard présente les contacts actifs, les relances à faire, les commandes à traiter et le total des commandes terminées. Le CRM permet de créer et modifier les fiches, gérer les statuts Prospect / À relancer / Client / Archivé, les notes, tags, villes, dates de relance, et exporter un CSV. La sauvegarde JSON inclut le catalogue, les réglages, le CRM et les commandes. Les contacts de l’essai restent dans le navigateur : aucun CRM partagé ni compte admin sécurisé n’est actif sur Netlify.

Toutes les images sont optimisées en WebP avec plusieurs tailles responsives. Les visuels identiques sont mutualisés ; le diaporama charge la photo visible puis prépare la suivante. Les images hors écran se chargent progressivement. Les ajouts d’images par l’admin sont aussi redimensionnés et compressés avant stockage.

## Dashboard dynamique et identité

La vue « Piloter la boutique » rassemble les ventes terminées, les commandes à traiter, les contacts actifs et les relances à faire. Le suivi des ventes propose 7, 30 ou 90 jours, une comparaison avec la période précédente, le panier moyen et un graphique dont les barres peuvent être sélectionnées. Les montants sont calculés uniquement à partir des commandes terminées, selon leur date de création ; ce ne sont pas des paiements encaissés vérifiés par un prestataire.

Les relances et les articles à surveiller ouvrent directement leur fiche. Les actions rapides créent un article ou un contact et ouvrent les collections. Les commandes sont recherchables par numéro, client, téléphone ou ville et filtrables par statut. Les dates utilisent le fuseau Africa/Abidjan.

Le bouton Actualiser recharge les données ; la vue dashboard se met à jour chaque minute lorsqu’elle est visible. Dans l’essai, les modifications se synchronisent aussi entre les onglets du même navigateur et du même site. La synchronisation entre appareils reste à raccorder au serveur. Les indicateurs sont vides tant qu’aucune donnée n’a été enregistrée ; aucun faux client ou faux chiffre n’est livré.

Le véritable logo circulaire fourni dans `logo/ayoka abidjan.png` est utilisé pour le favicon ICO multi-tailles, le PNG 32 px, l’icône Apple 180 px et les icônes 192/512 px du manifeste. Le logo reste séparé des articles à vendre.

## Motion et interactions

La boutique utilise des transitions CSS et l’API d’animation du navigateur, sans nouvelle bibliothèque d’animation. L’arrivée du titre et des actions du hero est coordonnée ; les articles apparaissent avec un léger décalage lorsqu’ils entrent à l’écran. Les sections de campagne et les cartes de catégories ont leurs propres interactions. Les contenus restent visibles si les animations ne s’exécutent pas.

Le hero présente les 13 illustrations en entier, passe d’une image à l’autre par fondu après son chargement, propose les miniatures, l’agrandissement, précédent/suivant, pause, les flèches du clavier et le balayage horizontal sur écran tactile. Il s’arrête hors écran, dans un onglet masqué ou lors de l’agrandissement. Une seule image principale est conservée au repos, deux pendant la transition ; les miniatures utilisent les petites versions WebP.

La recherche affiche jusqu’à cinq suggestions directement ouvrables. Les couleurs changent les photos, les tailles sont sélectionnables, la photo de la fiche peut être agrandie, les favoris sont mémorisés et le panier d’essai permet l’ajout, le changement des quantités et le retrait. Les prix absents restent « Prix à venir » : aucun montant inventé n’est affiché. Le paiement et l’envoi de commandes sont toujours désactivés en démonstration. L’ouverture commerciale conserve les vérifications de prix, de stock et de disponibilité.

Toutes les animations respectent la préférence de réduction des mouvements. Le lookbook est parcourable avec les flèches du clavier. Le menu mobile donne accès aux catégories et au lookbook ; les favoris sont également accessibles sur mobile.

## Collection Polos · 3 octobre 2026

Les 30 PNG fournis dans Downloads ont été intégrés en 10 articles et 30 couleurs. Les fiches et le lookbook montrent les vues de face et de dos sans recadrage. Les originaux restent intacts. `lib/polos-manifest.json` conserve chaque nom de fichier, son empreinte SHA-256, sa couleur, son article et son poids. Le script `scripts/import-polos.py` permet de reproduire l’import avec Python et Pillow.

Chaque image dispose de versions WebP 120, 320, 640, 960 et 1536 px. Les 150 fichiers représentent 5 533 838 octets contre 71 473 563 octets pour les 30 PNG : une réduction de 92,3 % pour l’ensemble des tailles. Seule la taille adaptée est chargée à l’écran, avec chargement progressif des images hors écran.

La catégorie Polos est accessible dans le menu, les filtres et le lookbook. Les polos sont modifiables et organisables dans l’admin. Prix et stocks restent à renseigner ; les tailles proposées sont à confirmer avant les ventes. La migration du stockage de démonstration ajoute les nouveaux articles une fois, préserve les articles modifiés et masqués, leur ordre, les contacts, commandes et réglages. Elle conserve ensuite les modifications apportées aux polos.

La version compilée a été vérifiée le 4 octobre 2026. Le rapport `../VERIFICATION-AYOKA-2026-10-04.md` détaille les parcours contrôlés et les éléments à compléter avant les ventes réelles.
