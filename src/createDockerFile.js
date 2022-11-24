function createDockerfile(apps) {
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
  out += "RUN apk update && apk add nginx\n";
  out += "RUN apk update && apk add bash\n";
  out += "\n";
  // out += "COPY script.bash .\n";
  out += "COPY ./nginx.conf /etc/nginx/nginx.conf\n";

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
  // out += 'RUN ["chmod", "+x", "/script.bash"]\n';
  out += "\n";
  //out += 'CMD ["/bin/bash", "-c", "./script.bash; nginx;/apps/startScript.sh"]\n';
  out += 'CMD ["/bin/bash", "-c", "nginx;/apps/startScript.sh"]\n';

  return out;
}

module.exports = createDockerfile;
