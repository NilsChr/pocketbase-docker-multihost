const fs = require("fs");

function createHTML(config) {
  let links = "";
  for (let app of config.apps) {
    links += `<div class='app'><label>${app.title}</label><a href="/${app.title}/_/"><img src='https://cdn-icons-png.flaticon.com/128/2985/2985179.png'/></a></div><br/>\n\t\t\t`;
  }

  let out = `<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <style>
            a:visited {color:#000; text-decoration: none;}
            a:link { text-decoration: none; }
  
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 40px;
            }
            .dashboard {
                font-size: 10px;
                font-weight: bold;
                text-align: end;
            }
            .column {
                display: flex;
                flex-direction: column;
            }
            .app {
                border: 1px solid #e1e1e1;
                padding: 10px;
                width: 200px;
                border-radius: 0.6em;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .app:hover {
                background-color: #fafafa;
                cursor: pointer;
            }
            img {
                height: 15px;
            }
            .pa15 {
                padding: 15px;
            }
        </style>
    </head>
    <body style="font-family: 'Source Sans Pro', sans-serif, emoji;">
    
        <div style="display: flex; flex-direction: column; align-items: center; ">
            <div class="logo"><img src='https://pocketbase.io/images/logo.svg' style='height: 40px;'/><div class='column pa15'> <div>Pocket<strong>Base</strong></div><div class='dashboard'>Dashboards</div></div></div>
      
            ${links}
        </div>
    </body>
</html>`;
  return out;
}

module.exports = createHTML;
