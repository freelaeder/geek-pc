// config-overrides.js
const { aliasWebpack } = require("react-app-alias");

module.exports = function override(config) {
    return aliasWebpack()(config);
};