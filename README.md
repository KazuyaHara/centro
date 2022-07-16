# Centro

The place where you were.

## Development rules

### Commit massages

This projetc use [Conventional Commit](https://www.conventionalcommits.org/) for creating an explicit commit history. To commit, run `yarn commit` instead of `git commit`, then [commitizen](https://github.com/commitizen/cz-cli) will support you to consider the commit message.

### Versioning

This project follows [Semantic Versioning](https://semver.org/). In order to update the version, we run `npx semantic-release` in [release workflow](https://github.com/KazuyaHara/centro/blob/main/.github/workflows/release.yml). This workflow will automatically update the version number in `package.json`. And also automatically generate a `CHANGELOG.md`.
