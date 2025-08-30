// scripts/inject-env.js
const fs = require('fs');
const path = require('path');

const env = {
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  HOST: process.env.HOST || '',
};

const content = `window.env = ${JSON.stringify(env)};`;

fs.writeFileSync(path.join(__dirname, './env.js'), content);
console.log('✅ Runtime environment injected to ./env.js');
