const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    blacklistRE: blacklist([
  /duplicate-module-name-npm\/node_modules\/react-native\/Libraries\/Sample\/.*/,
  /duplicate-module-name-npm\/node_modules\/react-native\/react-native-git-upgrade\/.*/,
  /duplicate-module-name-npm\/node_modules\/react-native\/react-native-cli\/.*/,
    ])
  },
};