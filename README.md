![Preview gif](./~github/preview.gif)

All configuration is done through the json files in `/src/scripts/`. They should be self-explanatory.

If you want to remove the `atob` dependency in `/src/scripts/key.js` then remove the `atob` import, and remove the usage in that file.

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
