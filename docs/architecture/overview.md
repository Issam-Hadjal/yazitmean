# YazItMean — System Architecture

## 1. Project Overview

YazItMean est une plateforme SaaS d'analyse approfondie de conversations privées.

Elle permet aux utilisateurs d'importer, explorer et analyser leurs conversations afin d'identifier des tendances statistiques, chronologiques et comportementales.

La plateforme doit être modulaire, sécurisée, évolutive et compatible avec un futur modèle commercial.

## 2. Core Architecture

Le projet adopte une architecture modulaire organisée dans un monorepo.

### Applications

- `web-public` : vitrine publique et démonstrations.
- `web-private` : interface privée d'analyse.
- `auth` : service d'authentification et de gestion des utilisateurs.
- `api` : backend et accès aux données.

### Shared Packages

- `ui` : composants React partagés.
- `types` : définitions TypeScript communes.

### Analysis Engine

Modules Python dédiés :

- Import et traitement WhatsApp.
- Statistiques.
- Analyse chronologique.
- Analyse comportementale.
- Analyse comparative.
- Traitement multimédia.

Les traitements longs sont découplés des requêtes web.

## 3. Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Motion
- Apache ECharts

### Backend

- Python
- FastAPI
- Polars
- NumPy
- SciPy

### Authentication

- Better Auth autohébergé
- Node.js
- Better Auth Organization Plugin
- JWT / JWKS

### Database

- Neon PostgreSQL

### Media Storage

- Cloudflare R2

### Deployment

- Vercel
- GitHub Actions

## 4. Applications

### Public Application

Responsabilités :

- Présentation de YazItMean.
- Description des fonctionnalités.
- Démonstrations interactives fictives.
- Présentation d'une éventuelle offre SaaS.

Aucune donnée personnelle réelle ne doit être exposée.

### Private Application

Responsabilités :

- Connexion et gestion des sessions.
- Gestion des espaces utilisateurs.
- Import et consultation des conversations.
- Exploration des médias.
- Visualisation des statistiques.
- Chronologies et analyses comportementales.
- Comparaison de plusieurs conversations.
- Gestion des membres et invitations.

### Authentication Service

Better Auth assure :

- Authentification des utilisateurs.
- Gestion des sessions.
- Gestion des organisations et membres.
- Invitations.
- Émission de jetons vérifiables.

Les inscriptions publiques sont désactivées.

La création de comptes se fait par un processus contrôlé.

### API Service

FastAPI assure :

- Vérification de l'authentification.
- Vérification des permissions.
- Lecture et recherche des conversations.
- Accès aux statistiques et analyses.
- Gestion sécurisée des médias.
- Exposition des résultats des traitements.

## 5. Data Architecture

### Main Entities

- User
- Workspace
- WorkspaceMember
- Invitation
- Conversation
- Participant
- Message
- Media
- Analysis
- Event

### Workspace Model

Chaque espace possède :

- Un titulaire.
- Des membres éventuellement invités.
- Des conversations.
- Des médias.
- Des statistiques et analyses.

Chaque ressource privée est associée à un `workspace_id`.

Un utilisateur peut appartenir à plusieurs espaces.

Les participants WhatsApp sont distincts des utilisateurs de YazItMean.

## 6. Authorization Model

Trois rôles sont prévus :

### Owner

- Gérer son espace.
- Importer et supprimer des données.
- Consulter toutes les analyses.
- Inviter et révoquer des membres.
- Gérer les permissions.

### Editor

- Consulter les données autorisées.
- Importer et modifier certains contenus.
- Ajouter des analyses.

### Viewer

- Consulter les conversations autorisées.
- Consulter les médias et analyses autorisés.
- Aucun droit de modification.

Les permissions sont contrôlées côté serveur.

L'appartenance à un espace ne garantit pas automatiquement toutes les permissions.

## 7. Data Flow

### Authentication dans l'app

1. L'utilisateur ouvre l'application privée.
2. Il s'authentifie via Better Auth.
3. Better Auth établit une session sécurisée.
4. L'application contacte FastAPI.
5. FastAPI valide l'identité et les permissions.
6. L'accès aux données autorisées est accordé.

### Conversation Import

1. Le titulaire fournit une archive.
2. L'archive est contrôlée.
3. Les messages sont extraits et normalisés.
4. Les médias sont identifiés et associés.
5. Les données sont enregistrées dans PostgreSQL.
6. Les médias sont stockés dans R2.
7. Les résultats d'import sont vérifiés.

Les imports doivent être idempotents et reprendre après une interruption.

### Analytics

1. Les messages structurés sont sélectionnés.
2. Les traitements statistiques sont exécutés.
3. Les résultats sont enregistrés séparément.
4. L'API expose les résultats.
5. React affiche les visualisations.

Les observations doivent pouvoir être reliées aux messages d'origine.

## 8. Environment Strategy

Trois environnements indépendants :

- DEV : branche `dev`.
- PREPROD : branche `staging`.
- PROD : branche `prod`.

Chaque environnement possède :

- Sa propre base de données.
- Sa propre configuration d'authentification.
- Son propre stockage média.
- Ses propres secrets.

DEV et PREPROD utilisent uniquement des données fictives.

Les données personnelles réelles sont réservées à PROD après validation des protections.

## 9. Deployment Strategy

Quatre projets Vercel sont envisagés :

- web-public
- web-private
- auth
- api

L'application privée devra exposer ses services derrière une origine commune lorsque nécessaire, notamment pour les sessions et cookies.

Les détails du routage et de l'authentification interservices seront validés avant production.

Les traitements lourds pourront être exécutés par des workers distincts.

## 10. Security Principles

- Authentification obligatoire.
- Inscriptions publiques fermées.
- Autorisations par espace et ressource.
- Principe du moindre privilège.
- Stockage privé des médias.
- HTTPS en production.
- Secrets exclus de Git.
- Isolation stricte des environnements.
- Aucune donnée réelle dans la vitrine.
- Sauvegardes et restauration vérifiées.

## 11. Analytics Principles

- Préserver les messages originaux.
- Séparer les résultats calculés des sources.
- Documenter les méthodes statistiques.
- Éviter les conclusions psychologiques non fondées.
- Distinguer observations et interprétations.
- Conserver les références aux messages justificatifs.
- Permettre le recalcul des résultats.

## 12. Future SaaS Evolution

L'architecture doit permettre ultérieurement :

- Inscription de nouveaux titulaires.
- Gestion de plusieurs espaces.
- Abonnements et facturation.
- Quotas d'utilisation.
- Traitements analytiques distribués.
- Gestion des données personnelles et des consentements.
- Évolution de l'infrastructure selon la charge.

Ces fonctionnalités ne font pas partie de la V0.1.

## 13. Architecture Status

Ce document décrit l'architecture cible.

Les composants ne sont pas encore implémentés.

Les détails techniques seront affinés et documentés au fil du développement.
