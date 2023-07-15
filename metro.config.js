const path = require("path");
const { getDefaultConfig } = require("@expo/metro-config");
const propertyProsSdkPath = path.resolve(__dirname + "/../property-pros-sdk");
const fontkitPath = path.resolve(__dirname + "/node_modules/fontkit");

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const extraNodeModules = {
  // "property-pros-sdk": propertyProsSdkPath,
  ...require("node-libs-react-native"),
  fontkit: fontkitPath,
};

const watchFolders = [
  // propertyProsSdkPath
];

module.exports = (async () => {

  return {
    ...defaultConfig,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      extraNodeModules: new Proxy(extraNodeModules, {
        get: (target, name) => {
          //redirects dependencies referenced from common/ to local node_modules
          return name in target
            ? target[name]
            : path.join(process.cwd(), `node_modules/${name}`);
        },
      }),

      sourceExts: [...sourceExts, "cjs"],
      assetExts: assetExts,
    },
    watchFolders,
  };
})();