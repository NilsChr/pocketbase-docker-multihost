function createNGINXConfig(config) {
  let redirects = "";
  for (let app of config.apps) {
    redirects += `
        location /${app.title} {
            rewrite ^/${app.title}/(.*) /$1  break;
            proxy_pass http://0.0.0.0:${app.port}/;
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
