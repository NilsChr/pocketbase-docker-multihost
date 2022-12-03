function createNGINXConfig(apps) {
  let redirects = "";
  for (let app of apps) {
    redirects += `
        location /${app.title} {
            return 301 $scheme://$host:${app.port}/_/;
        }`;
  }
  let out = `events {
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
}`;
    return out;
}

module.exports = createNGINXConfig;
