# YazItMean — Git Workflow

## 1. Objectives

YazItMean utilise Git et GitHub pour assurer un développement structuré, traçable et maintenable.

Principes fondamentaux :

- Un commit = un changement cohérent et vérifiable.
- Les messages de commit sont rédigés en anglais.
- Les fonctionnalités sont développées indépendamment.
- Chaque modification doit pouvoir être comprise et revue.
- Les environnements sont isolés.
- Les tests sont effectués avant intégration.
- Les données personnelles et secrets sont exclus de Git.

## 2. Branching Strategy

### Prod Branches

| Branch    | Environment | Purpose                         |
| --------- | ----------- | ------------------------------- |
| `dev`     | DEV         | Intégration des fonctionnalités |
| `staging` | PREPROD     | Validation avant production     |
| `prod`    | PROD        | Version stable                  |

### Temporary Branches

- `feature/*` : nouvelles fonctionnalités.
- `fix/*` : corrections de bugs.
- `refactor/*` : restructuration du code.
- `docs/*` : documentation.
- `chore/*` : maintenance et configuration.

Exemples :

- `feature/user-authentication`
- `feature/workspace-invitations`
- `feature/conversation-statistics`
- `fix/media-access`
- `docs/api-documentation`

Les branches temporaires sont généralement créées depuis `dev`.

## 3. Initial Repository Setup

Le dépôt est initialisé sur `prod`.

Le premier commit contient uniquement la documentation fondatrice :

`docs(architecture): define system architecture`

La mise en place du monorepo, puis la création de `dev` et `staging`, seront effectuées lors des étapes prévues du projet.

Aucun environnement de production contenant des données personnelles ne sera activé à cette étape.

## 4. Conventional Commits

Format obligatoire :

`type(scope): description`

### Types

| Type       | Usage                                       |
| ---------- | ------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité                     |
| `fix`      | Correction de bug                           |
| `docs`     | Documentation                               |
| `refactor` | Restructuration sans changement fonctionnel |
| `test`     | Tests                                       |
| `chore`    | Maintenance et configuration                |
| `ci`       | Intégration et déploiement                  |
| `perf`     | Optimisation des performances               |

### Examples

- `feat(auth): implement secure login`
- `feat(workspaces): add member invitations`
- `feat(analytics): calculate message statistics`
- `fix(media): prevent unauthorized access`
- `test(auth): verify registration restrictions`
- `docs(architecture): define system architecture`
- `ci(vercel): configure preview deployments`

## 5. Atomic Commit Rules

Chaque commit doit :

1. Représenter un changement logique unique.
2. Posséder un message clair en anglais.
3. Contenir uniquement les fichiers nécessaires.
4. Préserver le fonctionnement du code.
5. Inclure les tests pertinents lorsque nécessaire.
6. Ne contenir aucun secret ni donnée personnelle.

Une fonctionnalité complexe peut être divisée en plusieurs commits.

Exemple pour les invitations :

- `feat(database): add invitation schema`
- `feat(auth): implement invitation acceptance`
- `feat(workspaces): add invitation management`
- `test(invitations): verify invitation permissions`

Les modifications indépendantes ne doivent pas être regroupées artificiellement.

## 6. Development Workflow

Pour une nouvelle fonctionnalité :

1. Se placer sur `dev`.
2. Mettre à jour la branche locale.
3. Créer une branche `feature/*`.
4. Développer une modification cohérente.
5. Exécuter les tests pertinents.
6. Examiner les modifications.
7. Créer un commit atomique.
8. Pousser la branche sur GitHub.
9. Ouvrir une Pull Request vers `dev`.
10. Valider puis fusionner la Pull Request.

Les commits atomiques doivent être préservés lors de la fusion.

Le squash systématique n'est pas utilisé.

## 7. Commit Verification

Avant chaque commit :

```bash
git status --short
git diff
```

Ajouter uniquement les fichiers concernés :

```bash
git add path/to/file
```

Vérifier les changements préparés :

```bash
git diff --cached
git diff --cached --check
```

Créer le commit :

```bash
git commit -m "feat(scope): describe the change"
```

Vérifier :

```bash
git log -1 --oneline
git status --short
```

## 8. Pull Request Rules

Chaque Pull Request doit contenir :

- Un titre explicite en anglais.
- Une description des changements.
- Les fonctionnalités concernées.
- Les tests exécutés.
- Les éventuels risques.
- Les migrations nécessaires.
- Les captures d'écran si l'interface change.

Une Pull Request doit avoir un périmètre fonctionnel cohérent.

Les contrôles CI doivent réussir avant la fusion.

## 9. Environment Promotion

Le code suit le parcours :

`feature/* -> dev -> staging -> prod`

### DEV

- Développement quotidien.
- Tests unitaires et d'intégration.
- Données fictives.

### PREPROD

- Validation fonctionnelle.
- Tests d'authentification et de permissions.
- Tests des migrations.
- Tests de déploiement.
- Données fictives représentatives.

### PROD

- Version validée.
- Déploiement stable.
- Données réelles protégées.
- Surveillance des erreurs.

Une promotion de code ne doit jamais copier les données entre environnements.

## 10. Branch Protection

Les branches `prod` et `staging` doivent être protégées.

Protections prévues :

- Pull Request obligatoire lorsque la configuration GitHub le permet.
- Tests CI obligatoires.
- Interdiction des push directs après configuration.
- Contrôle des migrations.
- Historique Git préservé.

Les restrictions seront configurées selon les possibilités de l'offre GitHub utilisée.

## 11. Testing Policy

Avant intégration :

- Lint.
- Type checking.
- Tests unitaires pertinents.
- Tests d'intégration si nécessaires.
- Vérification des secrets.
- Validation du build.

Les fonctionnalités sensibles nécessitent des tests supplémentaires.

Exemples :

- Authentification.
- Invitations.
- Autorisations multi-tenant.
- Accès aux médias.
- Import de conversations.

## 12. Database Migrations

Les migrations PostgreSQL sont versionnées dans Git.

Ordre de validation :

1. DEV
2. PREPROD
3. PROD

Les migrations destructives nécessitent :

- Une analyse d'impact.
- Une sauvegarde.
- Une procédure de restauration.
- Une validation préalable en PREPROD.

## 13. Versioning

YazItMean utilise Semantic Versioning.

Format :

`MAJOR.MINOR.PATCH`

Exemples :

- `v0.1.0` : fondations applicatives.
- `v0.2.0` : import WhatsApp.
- `v0.3.0` : statistiques.
- `v0.4.0` : analyses avancées.
- `v1.0.0` : première version stable complète.

Les versions validées sont identifiées par des tags Git.

## 14. Security Rules

Ne jamais committer :

- Des archives WhatsApp réelles.
- Des conversations privées.
- Des fichiers multimédias personnels.
- Des mots de passe.
- Des clés API.
- Des jetons d'authentification.
- Des fichiers `.env` contenant des secrets.
- Des sauvegardes de production.

Les fichiers de configuration d'exemple peuvent être versionnés uniquement s'ils ne contiennent aucune donnée sensible.

## 15. Rollback Strategy

Chaque modification doit rester identifiable.

En cas de problème :

- Examiner les commits concernés.
- Privilégier `git revert` pour annuler un commit déjà partagé.
- Ne pas réécrire l'historique des branches partagées.
- Vérifier les migrations avant toute restauration.
- Tester la correction avant un nouveau déploiement.

## 16. Workflow Status

Ce document définit les conventions Git de YazItMean.

Les branches supplémentaires, protections GitHub et pipelines CI seront configurés progressivement.

Le premier commit prévu est :

`docs(architecture): define system architecture`
