const watch = require('node-watch')
const path = require('path')
const spawn = require('child_process').spawn

let serverInstance = spawn('node', [path.resolve(__dirname, 'index-dev.js')], {stdio: 'inherit'});

watch(__dirname, { recursive: true }, function() {
  //kill and restart the server
  console.log('Restarting server...')
  if (serverInstance) serverInstance.kill()
  serverInstance = spawn('node', [path.resolve(__dirname, 'index-dev.js')], {stdio: 'inherit'});
  serverInstance.on('close', function (code) {
    console.log(code);
    process.exit()
  });
});