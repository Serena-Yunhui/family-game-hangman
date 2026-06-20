# Family Hangman

A small, kid-friendly Hangman website for playing spelling games together.

## Play Locally

Open `index.html` in a browser.

## Features

- Host prompt for a secret word with 5 or more letters.
- Reminder for the guesser to close their eyes.
- Optional online spelling check before play starts.
- One-letter guessing with repeated guesses ignored.
- Hangman drawing that grows after wrong guesses.
- Optional 3 extra wrong guesses after the default 6-guess limit.
- Sad-face drawing pieces for the extra guesses.
- Slower sparkle and letter-pop effects when the guesser finds a correct letter.

## GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml` that uploads the repository root as a static GitHub Pages site whenever `main` is pushed.

Before the workflow can deploy successfully, Pages must be enabled for the repository and the Pages source must be set to GitHub Actions. The workflow asks `actions/configure-pages` to enable Pages when GitHub allows it, but the most reliable setup is to select the GitHub Actions source in repository settings.

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Save, then re-run the failed workflow or push another commit to `main`.

If `actions/configure-pages` reports `HttpError: Not Found` while calling the Pages REST API, Pages is still not enabled for the repository or the repository is not configured to build with GitHub Actions. Use the setup steps above, then re-run the workflow.

The workflow uses current GitHub-maintained action versions that run on Node.js 24, avoiding Node.js 20 deprecation warnings.

## Push to GitHub

If you create an empty GitHub repository first, connect this local project from the repository root:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/family-hangman.git
git push -u origin main
```
