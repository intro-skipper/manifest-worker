import { Hono } from 'hono';

import json1010 from './10.10.json';
import json109 from './10.9.json';
import json108 from './10.8.json';

// Common metadata (static data stored in the worker)
const commonJson = {
  "guid": "c83d86bb-a1e0-4c35-a113-e2101cf4ee6b",
  "name": "Intro Skipper",
  "overview": "Automatically detect and skip intros in television episodes",
  "description": "Analyzes the audio of television episodes and detects introduction sequences.",
  "owner": "AbandonedCart, rlauuzo, jumoog (forked from ConfusedPolarBear)",
  "category": "General",
  "imageUrl": "https://raw.githubusercontent.com/jumoog/intro-skipper/master/images/logo.png"
};

const app = new Hono();

app.get('/', async (c) => {
  // Get the User-Agent header
  const userAgent = c.req.header('User-Agent');

  // Check if the User-Agent starts with "Jellyfin-Server/"
  if (userAgent && userAgent.startsWith('Jellyfin-Server/')) {
    // Extract the version part (e.g., "10.9.3")
    const version = userAgent.split('/')[1];

    // Split the version by "." and keep only the major and minor parts (e.g., "10.9")
    const versionParts = version.split('.');
    if (versionParts.length >= 2) {
      const majorMinorVersion = versionParts[0] + '.' + versionParts[1];
      try {
        let versions;
        switch (version) {
          case '10.10':
            versions = json1010;  // Serve 10.10.json
            break;
          case '10.9':
            versions = json109;   // Serve 10.9.json
            break;
          case '10.8':
            versions = json108;   // Serve 10.8.json
            break;
          default:
            versions = json1010;  // Serve 10.10.json
            break;
        }

        // Combine common data with the version-specific data
        const responseJson = {
          ...commonJson,            // Include the common metadata
          versions     // Add the version-specific data
        };

        // Return the combined JSON response
        return c.json(responseJson);
      } catch (err) {
        // If version not found or error in loading, return 404
        return c.json({ error: 'Version not found' }, 404);
      }
    }
  }

  // Default response if User-Agent is invalid or doesn't match
  return c.redirect('https://github.com/intro-skipper/intro-skipper')
});

app.get('/:version/manifest.json', async (c) => {
  // Extract version from the URL
  const version = c.req.param('version');
  try {
    let versions;
    switch (version) {
      case '10.10':
        versions = json1010;  // Serve 10.10.json
        break;
      case '10.9':
        versions = json109;   // Serve 10.9.json
        break;
      case '10.8':
        versions = json108;   // Serve 10.8.json
        break;
      default:
        versions = json1010;  // Serve 10.10.json
        break;
    }

    // Combine common data with the version-specific data
    const responseJson = {
      ...commonJson,            // Include the common metadata
      versions     // Add the version-specific data
    };

    // Return the combined JSON response
    return c.json(responseJson);

  } catch (err) {
    // If version not found or error in loading, return 404
    return c.json({ error: 'Version not found' }, 404);
  }
});

// Export the Hono app as the default handler
export default app;
