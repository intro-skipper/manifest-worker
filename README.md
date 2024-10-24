# Intro Skipper Manifest Worker

Jellyfin currently has no way to limit the maximum ABI version. This means that people can install incompatible versions of a plugin. Unfortunately, the error is only visible after restarting Jellyfin. The average user expects to be offered only working and compatible versions. To prevent this, we have created a worker that reads the Jellyfin version from the `User-Agent` header when a request is made to the worker and returns the correct version.

## Use it in Jellyfin

```
https://manifest.intro-skipper.org/manifest.json
```

## Development

```
npm install
npm run dev
```

```
npm run deploy
```
