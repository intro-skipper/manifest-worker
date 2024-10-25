# Why?

Jellyfin currently has no way to limit the maximum ABI version. This means that people can install incompatible versions of a plugin. Unfortunately, the error is only visible after restarting Jellyfin. The average user expects to be offered only working and compatible versions.

## Cloudflare Domain Redirect Rules

> [!TIP]
> Instead of Cloudflare workers, a better, more cost-effective way

Instead of using cloudflare workers, we connected a domain to cloudflare and used domain redirect rules.

Rules -> Redirect Rules

All rules are `Custom filter expressions`

| **Field**  | **Operator**    | **Value**               | **URL redirect Type** | **URL**                                                                                      | Status code |
|------------|-----------------|-------------------------|-----------------------|----------------------------------------------------------------------------------------------|-------------|
| User Agent | strict wildcard | Jellyfin-Server/10.10.* | Static                | <https://raw.githubusercontent.com/intro-skipper/intro-skipper/refs/heads/10.10/manifest.json> | 302         |
| User Agent | strict wildcard | Jellyfin-Server/10.9.*  | Static                | <https://raw.githubusercontent.com/intro-skipper/intro-skipper/refs/heads/10.9/manifest.json>  | 302         |
| User Agent | strict wildcard | Jellyfin-Server/10.8.*  | Static                | <https://raw.githubusercontent.com/intro-skipper/intro-skipper/refs/heads/10.8/manifest.json>  | 302         |
