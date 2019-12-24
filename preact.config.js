/**
 * Trying to get purgecss to work with tailwind as described here
 * https://blog.agney.dev/preact-cli-with-typescript/
 *
 * It ends up stripping all the tailwind styles
 */

module.exports = (config, env, helpers) => {
  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.plugins;
    // Add tailwind css at the top.
    plugins.unshift(require("tailwindcss"));
  });
  return config;
};
