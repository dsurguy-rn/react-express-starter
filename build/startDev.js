const watch = require('node-watch')
const path = require('path')
const spawn = require('child_process').spawn

let serverInstance = spawn('node', [path.resolve(__dirname, '../server/index.js')], {stdio: 'inherit'});

watch(path.resolve(__dirname, '../server'), { recursive: true }, function(evt, name) {
  //kill and restart the server
  if (serverInstance) serverInstance.kill()
  serverInstance = spawn('node', [path.resolve(__dirname, '../server/index.js')], {stdio: 'inherit'})
  serverInstance.on('close', function (code) {
    console.log(code);
  });
});