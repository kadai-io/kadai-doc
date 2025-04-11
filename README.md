[![Docusaurus 3.6.3](https://img.shields.io/badge/Docusaurus-3.6.3-blue?logo=docusaurus&link=https://docusaurus.io/docs/3.6.3)](https://docusaurus.io/docs/3.6.3)
[![CI](https://github.com/kadai-io/kadai-doc/actions/workflows/github-actions.yml/badge.svg)](https://github.com/kadai-io/kadai-doc/actions/workflows/github-actions.yml)

# KADAI - Documentation for the open source task management library

This repository contains the [website](http://kadai.io/) for the documentation of [KADAI](https://github.com/kadai-io/kadai).

KADAI is a task management component open source library. It can be embedded into your application or be operated standalone if appropriate. Beside the basic task management functionalities, KADAI adds workbaskets and classifications to control and monitor a large amount of Tasks within a larger organization.

## 🔨Build
This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

```bash
  yarn build
```
This command generates static content into the `build` directory and can be served using any static contents hosting service.

```bash
  yarn start
```
This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## 📚Versioning
We align versioning of our documentation with the release of major versions in terms of [Semantic Versioning](https://semver.org/).

Therefore, we keep patching the _current_ (major) version until the _next_ (major) version is released.
The [`/docs`](./docs) folder represents the _current_ version while older, unmaintained versions reside in [`/versioned_docs`](./versioned_docs).

Let's consider publishing the _next_ version `A.B.C` and assume our _current_ version is `X.Y.Z`.
We want to publish `A.B.C`. Therefore:
1. open a command-line in the project's root and run
```bash
  npm run docusaurus docs:version X.Y.Z
```
2. set the label of the new _current_ version `A.B.C` in [`/docusaurus.config.js`](./docusaurus.config.js) at `config.presets.docs.versions.current.label` to `vA.B.C`,
```js
({
  // ...
  versions: {
    current: {
      label: 'vA.B.C',
      path: '/',
      badge: true
    },
    // ...
  }
  // ...
})
```
3. add the new _previous_ version `X.Y.Z` there:
```js
({
  // ...
  versions: {
    current: {
      label: 'vA.B.C',
      path: '/',
      badge: true
    },
    "X.Y.Z": {
      label: 'vX.Y.Z',
      path: 'X.Y.Z',
      badge: true
    },
    // ...
  }
  // ...
})
```
4. move the version `"current"` in [`./versions.json`](./versions.json) above `"X.Y.Z"`, it should now look like:
```json
[
  "current",
  "X.Y.Z"
]
```

You did it! The _current_ version is now `A.B.C` and the _previous_ version is now `X.Y.Z`.
Now we maintain the _current_ version simply by editing in the [`/docs`](./docs) folder.

If we need to edit an older version, e.g. the _previous_ version, we can edit in `/versioned_docs/version-X.Y.Z`. 

## 📨Contact

If you have any questions or ideas feel free to create an [issue](https://github.com/kadai-io/kadai/issues), contact us
via [GitHub Discussions](https://github.com/kadai-io/kadai/discussions) or E-mail us at [kadai@envite.de](mailto:kadai@envite.de).

We love listening to your feedback, and of course also discussing the project roadmap and possible use cases with you!

This open source project is being developed by [envite consulting GmbH](https://www.envite.de/)
with the support of the open source community.

---
[![envite consulting GmbH](static/img/envite-black.png)](https://envite.de/)
---