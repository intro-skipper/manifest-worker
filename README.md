# Intro Skipper Manifest Woker

Jellyfin currently has no way to limit the maximum ABI version. This means that people can install incompatible versions of a plugin.
To prevent this, we have created a worker that reads the Jellyfin version from the user-agent header when a request is made to the worker and returns the correct version.

## Use it in Jellyfin

```
https://manifest.intro-skipper.workers.dev/manifest.json
```

## Development

```
npm install
npm run dev
```

```
npm run deploy
```
