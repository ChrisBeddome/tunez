const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({path: path.join(__dirname, "../", ".env.local")});

const PORT = parseInt(process.env.NEXT_PORT);
const HOSTNAME = process.env.NEXT_HOSTNAME;

if (!PORT) {
  throw new Error('Please add PORT to .env.local');
}
if (!HOSTNAME) {
  throw new Error('Please add HOSTNAME to .env.local');
}

const serverProcess = exec(path.resolve(__dirname, "../", `node_modules/next/dist/bin/next dev -p ${PORT} -H ${HOSTNAME}`))

serverProcess.stdout.on('data', data => {
  console.log(data); 
});