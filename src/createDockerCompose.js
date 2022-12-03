const YAML = require("yaml");

function createDockerCompose(apps) {
  const localVolume = process.env.VOLUME;

  const jsonObject = {
    version: "3.7",
    services: {
      pocketbase: {
        deploy: {
          resources: {
            limits: {
              cpus: process.env.CPUS || '4.0', // '0.5'
              memory: process.env.MEMORY || '2g' // '512M'
            }
          }
        },
        build: {
          context: ".",
          dockerfile: "Dockerfile",
        },
        container_name: "pocketbase-apps",
        restart: "unless-stopped",
        ports: ["80:80", "8080:8080"],
        volumes: [],
      },
    },
  };

  for (let app of apps) {
    jsonObject.services.pocketbase.ports.push(`${app.port}:${app.port}`);
    jsonObject.services.pocketbase.volumes.push(
      `${localVolume}/${app.title}:/${app.title}/pb_data`
    );
  }
  const doc = new YAML.Document();
  doc.contents = jsonObject;
  return doc.toString();
}

module.exports = createDockerCompose;
