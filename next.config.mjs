import { withSentryConfig } from "@sentry/nextjs";

const legacyPagesManifest = {
  "/_document": "pages/_document.js",
  "/_app": "pages/_app.js",
  "/_error": "pages/_error.js",
};

const stableBuildId = (
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_BUILD_ID ??
  "local-dev-build"
).replace(/[^a-zA-Z0-9_-]/g, "-");

class StablePagesManifestPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("StablePagesManifestPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "StablePagesManifestPlugin",
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        () => {
          const source = new compiler.webpack.sources.RawSource(
            `${JSON.stringify(legacyPagesManifest, null, 2)}\n`,
          );

          if (compilation.getAsset("pages-manifest.json")) {
            compilation.updateAsset("pages-manifest.json", source);
          } else {
            compilation.emitAsset("pages-manifest.json", source);
          }
        },
      );
    });
  }
}

class StaticBuildDirectoryPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("StaticBuildDirectoryPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "StaticBuildDirectoryPlugin",
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          if (!compilation.getAsset(`${stableBuildId}/.keep`)) {
            compilation.emitAsset(
              `${stableBuildId}/.keep`,
              new compiler.webpack.sources.RawSource(""),
            );
          }
        },
      );
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => stableBuildId,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    instrumentationHook: true,
  },
  webpack(config, { isServer, nextRuntime }) {
    if (isServer && !nextRuntime) {
      config.plugins.push(new StablePagesManifestPlugin());
    }
    if (!isServer) {
      config.plugins.push(new StaticBuildDirectoryPlugin());
    }
    return config;
  },
};

const hasSentryDsn = Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);

export default hasSentryDsn ? withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
}) : nextConfig;
