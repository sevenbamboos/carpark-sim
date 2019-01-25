'use strict';
const net = require('net');
const client = net.connect({port: 9999});

require('fs').createReadStream(process.argv[2])
  .on('data', data => client.write(data))
  .on('error', error => process.stderr.write(`ERROR: ${error.message}\n`));

client.on('data', data => {
  console.log(data.toString());
});