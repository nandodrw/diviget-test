const path = require("path");

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@views", path.resolve(__dirname, "src/views"))
      .set("@services", path.resolve(__dirname, "src/services"))
      .set("@comp", path.resolve(__dirname, "src/components"));
  }
};
