require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const fs = require("fs");
const YAML = require("yaml");

const localVolume = process.env.VOLUME; //|| "/Users/nils/VolumesDocker"
const apps = [
  {
    title: "app1",
    port: 8090,
  },
  {
    title: "app2",
    port: 8091,
  },
  {
    title: "app3",
    port: 8092,
  },
  {
    title: "fightnight",
    port: 8093,
  },
];

function createScriptPocketBase() {
  let out = "#!/bin/bash\n";

  for (let app of apps) {
    out += `./apps/${app.title} serve --http=0.0.0.0:${app.port} --dir=/${app.title}/pb_data &\n`;
  }

  out += "wait -n\n";
  out += "exit $?";
  return out;
}

function createScriptNGINX() {
  let out = "#!/bin/bash\n";
  out += "echo 'rc_provide=\"loopback net\"' >> /etc/rc.conf";
  out += "bash";
  return out;
}

function createHTML() {
  let out = `
    <!DOCTYPE html>
    <html>
    <body>
    
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
    
    </body>
    </html>
    `;
  return out;
}

function createDockerfile() {
  let out = "FROM alpine:3 as downloader\n";
  out += "\n";
  out += "ARG TARGETOS\n";
  out += "ARG TARGETARCH\n";
  out += "ARG TARGETVARIANT\n";
  out += "ARG VERSION\n";
  out += "\n";
  out +=
    'ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}${TARGETVARIANT}"\n';
  out += "\n";
  out +=
    "RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.8.0/pocketbase_0.8.0_linux_amd64.zip \\\n";
  out += "&& unzip pocketbase_0.8.0_linux_amd64.zip \\\n";
  out += "&& chmod +x /pocketbase\n";
  out += "\n";
  out += "FROM alpine:3\n";
  out +=
    "RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*\n";
 // out += "RUN apk update && apk add nginx && apk add nginx openrc\n";
  out += "RUN apk update && apk add nginx\n";
  out += "RUN apk update && apk add bash\n";
  out += "\n";
  out += "COPY script.bash .\n";
  out += "COPY ./nginx.conf /etc/nginx/nginx.conf\n";

  /*
  out += "RUN nginx -t\n";
  //out += "RUN mkdir /run/nginx/\n"
  out += "RUN chown -R nginx:nginx /run/nginx/\n";
  out += "RUN chmod 775 /run/nginx/\n";
  out += "RUN nginx -t\n";
  out += "RUN openrc\n";
  out += "RUN touch /run/openrc/softlevel\n";
  */

  out += "COPY ./index.html /var/www/\n";
  for (let app of apps) {
    out += `COPY --from=downloader /pocketbase /apps/${app.title} \n`;
  }
  out += "COPY startScript.sh /apps/startScript.sh\n";

  out += "\n";
  out += "EXPOSE 80\n";
  out += "EXPOSE 8080\n";

  for (let app of apps) {
    out += `EXPOSE ${app.port}\n`;
  }
  out += "\n";
  out += 'RUN ["chmod", "+x", "/apps/startScript.sh"]\n';
  out += 'RUN ["chmod", "+x", "/script.bash"]\n';
  out += "\n";
  out += 'CMD ["/bin/bash", "-c", "./script.bash; nginx;/apps/startScript.sh"]\n';

  return out;
}

function createDockerCompose() {
  const jsonObject = {
    version: "3.7",
    services: {
      pocketbase: {
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

function createNGINXConfig() {
  let redirects = "";
  for (let app of apps) {
    redirects += `
        location /${app.title} {
            return 301 $scheme://$host:${app.port}/_/;
        }
        `;
  }
  let out = `
    events {
        worker_connections  4096;  ## Default: 1024
    }
    http {
        server {
            listen 80;
            listen [::]:80;
            server_name localhost;
            client_max_body_size 10M;
      
            location / {
                root /var/www/;
                index index.html;
            }
      
            ${redirects}
        }
        }
    `;
  return out;
}

fs.writeFileSync("./output/index.html", createHTML(), {
  encoding: "utf8",
  flag: "w",
});
fs.writeFileSync("./output/startScript.sh", createScriptPocketBase(), {
  encoding: "utf8",
  flag: "w",
});
fs.writeFileSync("./output/script.bash", createScriptNGINX(), {
  encoding: "utf8",
  flag: "w",
});
fs.writeFileSync("./output/Dockerfile", createDockerfile(), {
  encoding: "utf8",
  flag: "w",
});
fs.writeFileSync("./output/docker-compose.yml", createDockerCompose(), {
  encoding: "utf8",
  flag: "w",
});
fs.writeFileSync("./output/nginx.conf", createNGINXConfig(), {
    encoding: "utf8",
    flag: "w",
  });