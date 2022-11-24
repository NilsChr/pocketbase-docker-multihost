FROM alpine:3 as downloader

ARG TARGETOS
ARG TARGETARCH
ARG TARGETVARIANT
ARG VERSION

ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}${TARGETVARIANT}"

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.8.0/pocketbase_0.8.0_linux_amd64.zip \
&& unzip pocketbase_0.8.0_linux_amd64.zip \
&& chmod +x /pocketbase

FROM alpine:3
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
RUN apk update && apk add nginx
RUN apk update && apk add bash

COPY script.bash .
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./index.html /var/www/
COPY --from=downloader /pocketbase /apps/app1 
COPY --from=downloader /pocketbase /apps/app2 
COPY --from=downloader /pocketbase /apps/app3 
COPY --from=downloader /pocketbase /apps/fightnight 
COPY startScript.sh /apps/startScript.sh

EXPOSE 80
EXPOSE 8080
EXPOSE 8090
EXPOSE 8091
EXPOSE 8092
EXPOSE 8093

RUN ["chmod", "+x", "/apps/startScript.sh"]
RUN ["chmod", "+x", "/script.bash"]

CMD ["/bin/bash", "-c", "./script.bash; nginx;/apps/startScript.sh"]
