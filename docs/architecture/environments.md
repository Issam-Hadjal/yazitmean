# YazItMean — Environment Strategy

## 1. Overview

YazItMean utilise trois environnements indépendants :

- DEV : Development
- PREPROD : Preproduction
- PROD : Production

Chaque environnement possède ses propres ressources, configurations et secrets.

Objectifs :

- Protéger les données de production.
- Tester les fonctionnalités avant publication.
- Garantir des déploiements reproductibles.
- Éviter les interactions entre environnements.

## 2. DEV — Development

### Purpose

Environnement dédié au développement et aux tests.

### Configuration

- Git branch : `develop`
- Feature branches : `feature/*`
- Frontend : Vite en local
- Backend : FastAPI en local
- Auth : Better Auth DEV
- Database : Neon DEV
- Storage : Cloudflare R2 DEV

### Data Policy

- Données fictives uniquement.
- Aucune archive WhatsApp réelle.
- Aucun accès aux ressources PROD.
- Les données peuvent être réinitialisées.

### Development Workflow

1. Créer une branche feature depuis develop.
2. Développer une fonctionnalité.
3. Exécuter les tests.
4. Créer un commit atomique.
5. Ouvrir une Pull Request vers develop.
6. Fusionner après validation.

## 3. PREPROD — Preproduction

### Purpose dans PREPROD

Environnement destiné à valider les versions avant leur publication.

### Configuration dans PREPROD

- Git branch : `staging`
- Hosting : Vercel Preview
- Database : Neon PREPROD
- Auth : Better Auth PREPROD
- Storage : Cloudflare R2 PREPROD

La branche staging utilise une configuration Preview dédiée.

Les autres déploiements Preview ne doivent pas recevoir automatiquement les secrets PREPROD.

### Data Policy dans PREPROD

- Données fictives représentatives.
- Aucune copie automatique des données PROD.
- Ressources indépendantes de DEV et PROD.

### Validation

Avant une promotion vers PROD :

- Tests automatisés réussis.
- Tests d'authentification validés.
- Permissions et invitations vérifiées.
- Migrations SQL testées.
- Accès aux médias contrôlés.
- Absence de secrets exposés.
- Validation fonctionnelle effectuée.

## 4. PROD — Production

### Purpose dans PROD

Environnement stable accessible aux utilisateurs autorisés.

### Configuration dans PROD

- Git branch : `main`
- Hosting : Vercel Production
- Database : Neon PROD
- Auth : Better Auth PROD
- Storage : Cloudflare R2 PROD

### Data Policy dans l'environnement PROD

- Données personnelles réelles autorisées.
- Isolation stricte des espaces utilisateurs.
- Accès contrôlé par authentification et permissions.
- Sauvegardes protégées.
- Aucune exposition publique des médias privés.

Les données réelles ne seront importées qu'après validation de la sécurité.

## 5. Environment Isolation

Chaque environnement dispose de :

- Sa propre base de données.
- Son propre service d'authentification.
- Ses propres sessions utilisateurs.
- Son propre stockage multimédia.
- Ses propres variables d'environnement.
- Ses propres secrets et identifiants.

Il est interdit de :

- Partager des secrets entre environnements.
- Connecter DEV ou PREPROD à la base PROD.
- Utiliser des médias réels dans les démonstrations.
- Copier automatiquement les données PROD vers PREPROD.
- Exposer des identifiants sensibles dans Git.

## 6. Git Branching Strategy

Branches principales :

- `develop` : DEV
- `staging` : PREPROD
- `main` : PROD

Branches temporaires :

- `feature/*`
- `fix/*`

Promotion :

feature/\* -> develop -> staging -> main

Chaque promotion doit être validée avant la suivante.

Les fusions doivent préserver les commits atomiques.

## 7. Deployment Strategy

YazItMean prévoit quatre projets Vercel :

- web-public
- web-private
- auth
- api

Les projets utilisent des configurations distinctes selon l'environnement.

Les déploiements PREPROD sont associés à staging.

Les déploiements PROD sont associés à main.

Les déploiements de feature branches sont considérés comme non fiables pour l'accès aux données privées.

## 8. Environment Variables

Les variables d'environnement seront gérées par :

- Des fichiers locaux non versionnés pour DEV.
- Les paramètres sécurisés Vercel pour les déploiements.
- Les gestionnaires de secrets des fournisseurs concernés.

Les fichiers `.env` contenant des secrets ne doivent jamais être commités.

Des fichiers `.env.example` sans secrets pourront être versionnés ultérieurement.

## 9. Database Migrations

Les migrations doivent suivre cet ordre :

1. DEV
2. PREPROD
3. PROD

Chaque migration doit être :

- Versionnée.
- Reproductible.
- Testée avant production.
- Compatible avec la stratégie de déploiement.

Les migrations destructives nécessitent une procédure de sauvegarde et de restauration.

## 10. Release Policy

Une version peut être publiée lorsque :

- Les fonctionnalités prévues sont terminées.
- Les tests sont réussis.
- Les changements ont été validés en PREPROD.
- Les permissions et accès privés sont corrects.
- Les migrations sont validées.
- Aucun secret n'est exposé.

La promotion du code ne doit jamais entraîner une copie des données entre environnements.

## 11. Future Evolution

L'architecture pourra évoluer vers :

- Des workers dédiés.
- Des traitements asynchrones.
- Des tests de charge.
- Une infrastructure SaaS commerciale.
- Une gestion avancée des déploiements.

Ces fonctionnalités ne sont pas requises pour la V0.1.
