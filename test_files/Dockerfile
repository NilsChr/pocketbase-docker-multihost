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

EXPOSE 8091
EXPOSE 8090

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase1
COPY --from=downloader /pocketbase /usr/local/bin/pocketbase2

COPY wrapper1.sh /usr/local/bin/wrapper1.sh

RUN apk update && apk add bash

RUN ["chmod", "+x", "/usr/local/bin/wrapper1.sh"]

CMD /usr/local/bin/wrapper1.sh
