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

After the repository is on GitHub, enable Pages from the repository settings:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Select the default branch and the repository root.
5. Save, then open the published Pages link.

## Push to GitHub

If you create an empty GitHub repository first, connect this local project from the repository root:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/family-hangman.git
git push -u origin main
```
