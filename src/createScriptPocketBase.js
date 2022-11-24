function createScriptPocketBase(apps) {
    let out = "#!/bin/bash\n";
  
    for (let app of apps) {
      out += `./apps/${app.title} serve --http=0.0.0.0:${app.port} --dir=/${app.title}/pb_data &\n`;
    }
  
    out += "wait -n\n";
    out += "exit $?";
    return out;
  }

  module.exports = createScriptPocketBase;