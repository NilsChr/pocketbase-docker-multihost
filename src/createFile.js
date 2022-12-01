const fs = require("fs");

function createFile(path, content) {
  fs.writeFileSync(path, content, {
    encoding: "utf8",
    flag: "w",
  });
}

module.exports = createFile;
