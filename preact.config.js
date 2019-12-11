// const preactCliPostCSS = require("preact-cli-postcss");

const tailwind = require("preact-cli-tailwind");
const tailwindPlugin = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  return config;
};

export default function(config, env, helpers) {
  // Use postcss.config.js instead of default postCSS config
  // preactCliPostCSS(config, helpers);
  tailwindPlugin(config, env, helpers);

  // Run styles through purgeCSS for production only
  // if (env.production) {
  //   // config.plugins.push(purgeCssPlugin);
  // }
}
