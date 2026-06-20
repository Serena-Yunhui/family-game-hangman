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

This project publishes with a branch-based GitHub Pages workflow at `.github/workflows/pages.yml`.

The workflow does not call the GitHub Pages REST API or `actions/configure-pages`. Instead, it builds a small `_site` folder from `index.html`, `src/`, and optional `assets/`, then pushes that folder to a `gh-pages` branch.

Set up Pages once in the repository settings:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set **Branch** to `gh-pages` and the folder to `/ (root)`.
6. Save, then re-run the workflow or push another commit to `main`.

Because this workflow deploys by pushing a branch, it avoids the `actions/configure-pages` `HttpError: Not Found` failure that happens when the Pages API cannot find an enabled Pages site.

## Push to GitHub

If you create an empty GitHub repository first, connect this local project from the repository root:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/family-hangman.git
git push -u origin main
```
