# YazItMean — Security Architecture

## 1. Security Objectives

YazItMean manipule des conversations privées et des médias personnels.

La sécurité est une exigence fondamentale du projet.

Principes :

- Deny by default.
- Least privilege.
- Defense in depth.
- Isolation des espaces utilisateurs.
- Protection des données personnelles.
- Traçabilité des opérations sensibles.
- Aucun secret dans le dépôt Git.

## 2. Authentication

Technologie : Better Auth autohébergé.

### Registration Policy

Les inscriptions publiques sont désactivées.

Un compte peut être créé uniquement :

- Lors du provisionnement initial d'un titulaire.
- Par un processus d'invitation contrôlé.
- Par une opération administrative autorisée.

La création de compte doit être protégée côté serveur.

Masquer le bouton d'inscription ne constitue pas une protection suffisante.

### Sessions

- Cookies Secure en production.
- Cookies HttpOnly lorsque applicables.
- Protection contre les attaques CSRF.
- Vérification des origines autorisées.
- Expiration des sessions.
- Possibilité de révoquer une session.

## 3. Authentication Between Services

L'application privée utilise Better Auth pour connecter les utilisateurs.

FastAPI doit vérifier les jetons reçus.

Vérifications obligatoires :

- Signature cryptographique.
- Expiration.
- Émetteur attendu.
- Audience attendue.
- Identité de l'utilisateur.

Les clés publiques peuvent être récupérées via JWKS.

Aucun secret d'authentification ne doit être exposé au navigateur.

## 4. Workspace Authorization

Chaque titulaire possède un espace privé.

Un utilisateur peut appartenir à plusieurs espaces.

Rôles prévus :

### Owner

- Administrer l'espace.
- Gérer les membres et invitations.
- Importer et supprimer des données.
- Accéder aux analyses et médias.

### Editor

- Consulter les données autorisées.
- Importer et modifier certains contenus.
- Ajouter des analyses.

### Viewer

- Consulter les conversations autorisées.
- Consulter les médias et analyses autorisés.
- Aucun droit de modification.

Les permissions doivent être vérifiées côté serveur.

Le rôle et le workspace_id ne doivent jamais être acceptés comme preuves d'autorisation lorsqu'ils proviennent du navigateur.

## 5. Invitation Security

Chaque invitation doit :

- Être créée par un utilisateur autorisé.
- Être liée à un espace précis.
- Être associée à une adresse e-mail vérifiée.
- Avoir une durée de validité limitée.
- Être utilisable une seule fois.
- Pouvoir être annulée par le titulaire.

La création d'un compte invité ne doit jamais ouvrir les inscriptions publiques.

Une invitation expirée ou révoquée doit être refusée.

## 6. Access Revocation

Lorsqu'un membre est supprimé :

- Ses permissions sur l'espace sont révoquées.
- Les appels API ultérieurs doivent être refusés.
- Aucune nouvelle URL de média ne peut lui être délivrée.

Les URL temporaires précédemment délivrées peuvent rester valides jusqu'à leur expiration.

La révocation ne peut pas supprimer les copies de données déjà téléchargées.

## 7. Database Security

Technologie : Neon PostgreSQL.

Chaque donnée privée est rattachée à un espace.

Les requêtes doivent être filtrées selon les droits réels de l'utilisateur.

Mesures prévues :

- Connexions chiffrées.
- Identifiants stockés dans des secrets.
- Permissions minimales des comptes techniques.
- Requêtes paramétrées.
- Migrations versionnées.
- Sauvegardes protégées.

Une défense supplémentaire par PostgreSQL Row Level Security pourra être mise en place.

## 8. Media Security

Technologie : Cloudflare R2.

Les buckets contenant les médias personnels sont privés.

Les médias ne doivent jamais être exposés via une URL publique permanente.

Les accès passent par :

1. Authentification.
2. Vérification des droits sur l'espace.
3. Vérification des droits sur le fichier.
4. Génération d'une URL temporaire.

Les URL temporaires doivent avoir une durée de validité courte.

## 9. API Security

Chaque endpoint privé doit :

- Vérifier l'authentification.
- Contrôler les permissions.
- Valider les paramètres.
- Refuser les accès non autorisés.
- Éviter l'exposition des informations sensibles.

Mesures prévues :

- Validation des entrées.
- Limitation des requêtes sensibles.
- Configuration CORS restrictive.
- Protection contre les injections.
- Journalisation sans données privées.
- Gestion sécurisée des erreurs.

## 10. Environment Isolation

Trois environnements :

- DEV
- PREPROD
- PROD

Chaque environnement possède :

- Ses secrets.
- Sa base de données.
- Son service d'authentification.
- Son stockage média.

DEV et PREPROD utilisent uniquement des données fictives.

Les données personnelles réelles sont réservées à PROD.

Aucun environnement non productif ne doit accéder aux ressources PROD.

## 11. Repository Security

Le dépôt Git ne doit jamais contenir :

- Archives WhatsApp réelles.
- Photos, vidéos ou audios privés.
- Mots de passe.
- Clés API.
- Jetons d'accès.
- Fichiers .env contenant des secrets.
- Sauvegardes de bases de données réelles.

Un contrôle des secrets sera intégré à la CI.

## 12. Privacy and Analytics

Les messages originaux sont conservés séparément des résultats d'analyse.

Chaque observation doit pouvoir être reliée à ses sources.

Les résultats comportementaux doivent distinguer :

- Faits observables.
- Mesures statistiques.
- Interprétations.
- Incertitudes et limites.

Aucune analyse ne doit être présentée comme un diagnostic psychologique.

Les données privées ne doivent pas être transmises à un fournisseur d'IA externe sans décision explicite et contrôle préalable.

## 13. Required Security Tests

Avant tout import réel en production :

- Refuser l'accès sans authentification.
- Refuser les inscriptions publiques.
- Refuser l'accès à un autre espace.
- Refuser toute élévation de privilèges.
- Vérifier les invitations expirées.
- Vérifier les invitations révoquées.
- Vérifier la révocation des membres.
- Protéger les médias privés.
- Vérifier l'isolation DEV/PREPROD/PROD.
- Vérifier l'absence de secrets dans Git.

## 14. Future Improvements

Fonctionnalités envisagées :

- Authentification à deux facteurs.
- Journal d'audit.
- Gestion des appareils et sessions.
- Politique de conservation des données.
- Export et suppression des données personnelles.
- Protection avancée contre les abus.
- Conformité du futur SaaS commercial.

## 15. Implementation Status

Ce document définit les exigences de sécurité.

Les protections décrites devront être implémentées, testées et validées avant tout traitement de données personnelles en production.
