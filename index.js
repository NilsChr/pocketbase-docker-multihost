require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const createFile = require("./src/createFile");
const createDockerfile = require("./src/createDockerFile");
const createDockerCompose = require("./src/createDockerCompose");
const createNGINXConfig = require("./src/createNGINXConfig");
const createHTML = require("./src/createHTML");
const createScriptPocketBase = require("./src/createScriptPocketBase");

const config = require('./config');
console.log(config);

//const appnames = process.env.APPS.split(",")

function main() {
  let port = 8090;
  const apps = [];
 // appnames.forEach((name) => {
  config.apps.forEach((name) => {
    apps.push({
      title: name,
      port: port++,
    });
  });
  config.apps = apps;

  createFile("./output/index.html", createHTML(config));
  createFile("./output/startScript.sh", createScriptPocketBase(config));
  createFile("./output/Dockerfile", createDockerfile(config));
  createFile("./output/docker-compose.yml", createDockerCompose(config));
  createFile("./output/nginx.conf", createNGINXConfig(config));
}

main();
