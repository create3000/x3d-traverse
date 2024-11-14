const
   TerserPlugin = require ("terser-webpack-plugin"),
   path         = require ("path"),
   os           = require ("os");

module .exports = async () =>
{
   const entry = "traverse"; // `src/${entry}.js`;

   const targets = [ ];

   targets .push ({
      entry: {
         [`${entry}`]: `./src/${entry}.js`,
         [`${entry}.min`]: `./src/${entry}.js`,
      },
      output: {
         path: path .resolve (__dirname, "dist"),
         filename: "[name].js",
         library: {
            name: "X3D",
            export: ["default"],
            type: "umd",
         },
      },
      mode: "production",
      module: {
         rules: [ ],
      },
      optimization: {
         minimize: true,
         minimizer: [
            new TerserPlugin ({
               include: /\.min\.js$/,
               parallel: true,
               extractComments: true,
               terserOptions: {
                  compress: true,
                  mangle: true,
                  format: {
                     comments: false,
                  },
               },
            }),
         ],
      },
      node: {
         __filename: false,
      },
      resolve: {
         fallback: {
            process: false,
            path: false,
            fs: false,
         },
      },
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   });

   targets .push ({
      entry: {
         [`${entry}`]: `./src/${entry}.js`,
         [`${entry}.min`]: `./src/${entry}.js`,
      },
      output: {
         path: path .resolve (__dirname, "dist"),
         filename: "[name].mjs",
         library: {
            type: "module",
         },
      },
      experiments: {
         outputModule: true,
      },
      mode: "production",
      module: {
         parser: {
            javascript : { importMeta: false },
         },
         rules: [ ],
      },
      optimization: {
         minimize: true,
         minimizer: [
            new TerserPlugin ({
               include: /\.min\.mjs$/,
               parallel: true,
               extractComments: true,
               terserOptions: {
                  module: true,
                  compress: true,
                  mangle: true,
                  format: {
                     comments: false,
                  },
               },
            }),
         ],
      },
      node: {
         __filename: false,
      },
      resolve: {
         fallback: {
            process: false,
            path: false,
            fs: false,
         },
      },
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   });

   console .log (`Using ${os .cpus () .length} CPUs to package X_ITE.`);

   targets .parallelism = os .cpus () .length;

   return targets;
};
