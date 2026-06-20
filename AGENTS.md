# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a clean workspace with no established source tree. Keep the root focused on project metadata and documentation. As implementation is added, use a conventional layout:

- `src/` for application or library source code.
- `tests/` for automated tests that mirror the `src/` structure.
- `assets/` for static files such as images, fixtures, or sample data.
- `docs/` for design notes, usage guides, and architecture decisions.

Avoid placing generated outputs, caches, or local-only files in the repository.

## Build, Test, and Development Commands

This is currently a static website with no package manager or build step.

- Open `index.html` in a browser to play locally.
- Use GitHub Pages with the repository root as the publishing source to host it.

The optional spelling check uses an online dictionary API from the browser. The game still works if that request is unavailable.

## Coding Style & Naming Conventions

Follow the conventions of the language and framework added to the project. Until tool-specific rules exist, use clear names, small modules, and consistent formatting. Prefer:

- Descriptive file names such as `capability_registry.py` or `capability-card.tsx`.
- `PascalCase` for classes and components.
- `camelCase` for JavaScript/TypeScript functions and variables.
- `snake_case` for Python functions and variables.

Add formatter and linter configuration with the first implementation, and run it before submitting changes.

## Testing Guidelines

Place tests in `tests/` and name them after the behavior under test. Examples include `test_registry_loads_defaults.py` or `capability-card.test.tsx`. New features should include focused tests for expected behavior and edge cases. Bug fixes should include a regression test where practical.

## Commit & Pull Request Guidelines

Git history was not available in this environment, so no repository-specific commit convention could be detected. Use short, imperative commit messages, for example `Add capability registry tests`.

Pull requests should include a concise description, linked issues when applicable, test results, and screenshots for visual changes. Keep PRs narrowly scoped so reviewers can validate behavior quickly.

## Agent-Specific Instructions

Before editing, inspect the current tree and preserve any user changes. Do not introduce unrelated scaffolding or dependencies unless the task requires them. Update this guide when project structure, commands, or conventions become established.

The repository owner is learning Codex and prefers concise explanations with concrete commands and file references. Ask clarifying questions only when needed; otherwise inspect the repository, make reasonable assumptions, and proceed.
