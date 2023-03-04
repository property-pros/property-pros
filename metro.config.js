const path = require("path");

const propertyProsSdkPath = path.resolve(__dirname + "/../property-pros-sdk");
const fontkitPath = path.resolve(__dirname + "/node_modules/fontkit");

const extraNodeModules = {
  "property-pros-sdk": propertyProsSdkPath,
  ...require("node-libs-react-native"),
  fontkit: fontkitPath,
};

const watchFolders = [propertyProsSdkPath];

module.exports = {
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

    sourceExts: ["js", "json", "ts", "tsx", "cjs", "jsx"],
  },
  watchFolders,
};
