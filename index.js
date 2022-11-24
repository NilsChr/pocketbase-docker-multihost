require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const fs = require("fs");
const createDockerfile = require("./src/createDockerFile");
const createDockerCompose = require("./src/createDockerCompose");
const createNGINXConfig = require("./src/createNGINXConfig");
const createHTML = require("./src/createHTML");
const createScriptNGINX = require("./src/createScriptNGINX");
const createScriptPocketBase = require("./src/createScriptPocketBase");

const appnames = ["app1", "app2", "app3", "fightnight"];

function main() {
  let port = 8090;
  const apps = [];
  appnames.forEach((name) => {
    apps.push({
      title: name,
      port: port++,
    });
  });
  
  fs.writeFileSync("./output/index.html", createHTML(apps), {
    encoding: "utf8",
    flag: "w",
  });
  
  fs.writeFileSync("./output/startScript.sh", createScriptPocketBase(apps), {
    encoding: "utf8",
    flag: "w",
  });
  /*
  fs.writeFileSync("./output/script.bash", createScriptNGINX(apps), {
    encoding: "utf8",
    flag: "w",
  });
  */
  fs.writeFileSync("./output/Dockerfile", createDockerfile(apps), {
    encoding: "utf8",
    flag: "w",
  });
  fs.writeFileSync("./output/docker-compose.yml", createDockerCompose(apps), {
    encoding: "utf8",
    flag: "w",
  });
  fs.writeFileSync("./output/nginx.conf", createNGINXConfig(apps), {
    encoding: "utf8",
    flag: "w",
  });
}

main();
