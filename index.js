require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const createFile = require("./src/createFile");
const createDockerfile = require("./src/createDockerFile");
const createDockerCompose = require("./src/createDockerCompose");
const createNGINXConfig = require("./src/createNGINXConfig");
const createHTML = require("./src/createHTML");
const createScriptPocketBase = require("./src/createScriptPocketBase");

const appnames = process.env.APPS.split(",")//["app1"]//["app1", "app2", "app3", "fightnight"];

function main() {
  let port = 8090;
  const apps = [];
  appnames.forEach((name) => {
    apps.push({
      title: name,
      port: port++,
    });
  });

  createFile("./output/index.html", createHTML(apps));
  createFile("./output/startScript.sh", createScriptPocketBase(apps));
  createFile("./output/Dockerfile", createDockerfile(apps));
  createFile("./output/docker-compose.yml", createDockerCompose(apps));
  createFile("./output/nginx.conf", createNGINXConfig(apps));
}

main();
