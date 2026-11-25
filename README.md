# YazItMean

**Beyond messages. Discover meaning.**

YazItMean est une plateforme SaaS d'analyse approfondie de conversations privées.

Elle permet d'explorer les échanges, d'identifier des tendances et de comprendre l'évolution des interactions grâce à des analyses statistiques, chronologiques et comportementales.

## Objectifs

- Importer des conversations WhatsApp et leurs médias.
- Analyser chaque conversation indépendamment.
- Comparer plusieurs conversations.
- Visualiser les statistiques et les chronologies.
- Explorer les dynamiques de communication.
- Conserver les messages originaux et leurs contextes.
- Partager un espace privé avec des utilisateurs invités.

## Architecture

- **Frontend :** React, TypeScript, Vite
- **Backend :** Python, FastAPI
- **Database :** Neon PostgreSQL
- **Authentication :** Better Auth
- **Storage :** Cloudflare R2
- **Hosting :** Vercel

## Applications

- **Public :** vitrine et démonstrations fictives.
- **Private :** application d'analyse authentifiée.
- **Auth :** gestion des comptes et invitations.
- **API :** données, statistiques et autorisations.

## Environnements

- DEV : développement
- PREPROD : validation
- PROD : production

## Documentation

- [System Architecture](docs/architecture/overview.md)
- [Environments](docs/architecture/environments.md)
- [Security](docs/architecture/security.md)
- [Git Workflow](docs/architecture/git-workflow.md)

## Project Status

Phase 0 - Initialisation et documentation.

## Confidentialité

Aucune conversation privée, archive WhatsApp ou donnée personnelle ne doit être ajoutée au dépôt Git.
