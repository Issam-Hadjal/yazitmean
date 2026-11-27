# YazItMean API

Backend API for **YazItMean**, a conversation intelligence platform designed to explore, analyze, and compare conversations.

## Overview

This application provides the backend services for YazItMean.

Its future responsibilities include:

- Importing and processing conversation data.
- Computing statistics and analytical insights.
- Managing conversation metadata.
- Providing authenticated access to private resources.
- Communicating with PostgreSQL and private media storage.

**Current status:** Initial FastAPI scaffold with a health endpoint and automated tests.

Database connections, authentication, and conversation processing are not yet implemented.

## Technology Stack

- **Python 3.13** — Runtime
- **FastAPI** — API framework
- **Uvicorn** — ASGI server
- **uv** — Python environment and dependency management
- **pytest** — Automated testing
- **Ruff** — Linting and formatting

## Prerequisites

- Python 3.13
- uv package manager

The `.python-version` file specifies the Python version used for local development.

## Getting Started

All commands below are executed from `apps/api`.

### 1. Install dependencies

```bash
uv sync --locked
```

This creates or updates the local `.venv` environment using the committed `uv.lock` file.

### 2. Start the development server

```bash
uv run uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

The API is available at `http://127.0.0.1:8000`.

The `--reload` option is intended for local development only.

### 3. Explore the API

| Endpoint            | Description                          |
| ------------------- | ------------------------------------ |
| `GET /health`       | Returns the API health status        |
| `GET /docs`         | Interactive Swagger UI documentation |
| `GET /openapi.json` | OpenAPI specification                |

Expected response from `GET /health`:

```json
{
  "status": "ok",
  "service": "yazitmean-api"
}
```

## Development Commands

### Run tests

```bash
uv run pytest -q
```

### Check linting

```bash
uv run ruff check .
```

### Check formatting

```bash
uv run ruff format --check .
```

### Automatically fix supported lint issues

```bash
uv run ruff check --fix .
```

### Format Python files

```bash
uv run ruff format .
```

## Project Structure

```text
apps/api/
├── .python-version
├── pyproject.toml
├── uv.lock
├── README.md
├── src/
│   └── api/
│       ├── __init__.py
│       └── main.py
└── tests/
    └── test_health.py
```

## Environment and Security

The application will support three isolated environments:

| Environment | Git branch | Database project    |
| ----------- | ---------- | ------------------- |
| DEV         | `dev`      | `yazitmean-dev`     |
| STAGING     | `staging`  | `yazitmean-staging` |
| PROD        | `prod`     | `yazitmean-prod`    |

Database connections are not configured yet.

Security requirements:

- Never commit credentials, tokens, or database connection strings.
- Keep local secrets outside version control.
- Access private data only through authenticated and authorized backend requests.
- Keep development and staging data separate from production data.
- Do not import real conversations until access controls and storage protections are implemented.

## Repository

This application belongs to the YazItMean pnpm monorepo.

Frontend development is managed separately through the root workspace scripts. Python dependencies are managed locally through uv.

Development follows the repository's documented Git workflow, with atomic commits, documented Pull Requests, and promotion through `dev`, `staging`, and `prod`.
