function createScriptNGINX() {
  let out = "#!/bin/bash\n";
  out += "echo 'rc_provide=\"loopback net\"' >> /etc/rc.conf";
  out += "bash";
  return out;
}

module.exports = createScriptNGINX;
