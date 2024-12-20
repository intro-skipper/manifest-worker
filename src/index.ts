import { Hono } from 'hono';
import { cache } from 'hono/cache'

interface Env {
  INTRO_SKIPPER_JSON: KVNamespace
}

const app = new Hono<{ Bindings: Env }>()

// Cache options
const cacheOptions = {
  cacheName: 'app-cache',
  cacheControl: 'max-age=3600',
};

// Utility function to fetch version-specific JSON from KV
async function getVersionDataFromKV(version: string, env: Env): Promise<Object | null> {
  // Retrieve the version-specific JSON from KV using c.env.<KV_BINDING_NAME>
  const versions = await env.INTRO_SKIPPER_JSON.get(version, { type: 'json' });

  // Fallback to '10.10' JSON if version is not found
  if (!versions) {
    return await env.INTRO_SKIPPER_JSON.get('10.10', { type: 'json' });
  }

  return versions;
}

// Route to handle requests based on User-Agent
app.get(
  '/manifest.json',
  cache(cacheOptions), // Cache this route response
  async (c) => {
    const userAgent = c.req.header('User-Agent');
    if (userAgent?.startsWith('Jellyfin-Server/')) {
      console.log({ userAgent });
      const version = userAgent.split('/')[1]?.split('.').slice(0, 2).join('.');
      const versions = await getVersionDataFromKV(version, c.env);
      return c.json(versions);
    }

    // Default response for non-matching User-Agent
    return c.redirect('https://github.com/intro-skipper/intro-skipper');
  }
);

// Route to handle direct versioned manifest.json requests
app.get(
  '/:version/manifest.json',
  cache(cacheOptions), // Cache this route response
  async (c) => {
    const version = c.req.param('version').split('.').slice(0, 2).join('.');
    console.log({ version });
    const versions = await getVersionDataFromKV(version, c.env);
    return c.json(versions);
  }
);

// Export the Hono app as the default handler
export default app;
