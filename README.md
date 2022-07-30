# Centro

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

The place where you were.

## Quick start

### Environemt variables

[Dotenv](https://github.com/motdotla/dotenv) is a zero-dependency module that loads environment variables from a .env file into `process.env`. Storing configuration in the environment separate from code is based on The [Twelve-Factor App](http://12factor.net/config) methodology.

Before run the development server, please put information in `.env.development` file in the root of `web` directory.

```dosini
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_GOOGLE_MAPS_APIKEY_JAVASCRIPT=YOUR_GOOGLE_MAPS_APIKEY_JAVASCRIPT
REACT_APP_GOOGLE_MAPS_ID_CENTRO=YOUR_STYLE_CUSTOMIZED_GOOGLE_MAPS_ID
REACT_APP_GOOGLE_MAPS_ID_GOOGLE=YOUR_DEFAULT_STYLE_GOOGLE_MAPS_ID
```

## Development rules

### Commit massages

This projetc use [Conventional Commit](https://www.conventionalcommits.org/) for creating an explicit commit history. To commit, run `yarn commit` instead of `git commit`, then [commitizen](https://github.com/commitizen/cz-cli) will support you to consider the commit message.

### Versioning

This project follows [Semantic Versioning](https://semver.org/). In order to update the version, we run `npx semantic-release` in [release workflow](https://github.com/KazuyaHara/centro/blob/main/.github/workflows/release.yml). This workflow will automatically update the version number in `package.json` and `web/package.json`. And also automatically generate a `CHANGELOG.md`.
