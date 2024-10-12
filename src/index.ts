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

// Utility function to get version-specific JSON data
const getVersionData = (majorMinorVersion: string) => {
  switch (majorMinorVersion) {
    case '10.10':
      return json1010;
    case '10.9':
      return json109;
    case '10.8':
      return json108;
    default:
      return json1010; // Default fallback to 10.10.json
  }
};

// Route to handle requests based on User-Agent
app.get('/', async (c) => {
  const userAgent = c.req.header('User-Agent');

  if (userAgent?.startsWith('Jellyfin-Server/')) {
    const version = userAgent.split('/')[1]?.split('.').slice(0, 2).join('.');
    const versions = getVersionData(version);

    // Combine common data with the version-specific data
    const responseJson = { ...commonJson, versions };
    return c.json(responseJson);
  }

  // Default response for non-matching User-Agent
  return c.redirect('https://github.com/intro-skipper/intro-skipper');
});

// Route to handle direct versioned manifest.json requests
app.get('/:version/manifest.json', async (c) => {
  const version = c.req.param('version').split('.').slice(0, 2).join('.');
  const versions = getVersionData(version);

  // Combine common data with the version-specific data
  const responseJson = { ...commonJson, versions };
  return c.json(responseJson);
});

// Export the Hono app as the default handler
export default app;
