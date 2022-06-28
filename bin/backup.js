const { exec } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../", ".env.local") });

const DB = process.env.MONGODB_DB;
const AUTH_DB = process.env.MONGODB_AUTH_DB;
const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASS;

if (!DB) {
  throw new Error("Please add MONGODB_DB to .env.local");
}
if (!AUTH_DB) {
  throw new Error("Please add MONGODB_AUTH_DB to .env.local");
}
if (!USER) {
  throw new Error("Please add MONGODB_USER to .env.local");
}
if (!PASSWORD) {
  throw new Error("Please add MONGODB_PASS to .env.local");
}

let ts = Date.now();

let dateObj = new Date(ts);
let seconds = dateObj.getSeconds();
let minutes = dateObj.getMinutes();
let hours = dateObj.getHours();
let date = dateObj.getDate();
let month = dateObj.getMonth() + 1;
let year = dateObj.getFullYear();

const dateString = `${year}-${month}-${date}`
const timeString = `${hours}-${minutes}-${seconds}`

const dumpProcess = exec(
  `mongodump -d ${DB} -u ${USER} -p ${PASSWORD} --authenticationDatabase ${AUTH_DB} -o ${path.resolve(
    __dirname,
    "../",
    `data_backups/${dateString}/${timeString}/`
  )}`
);

dumpProcess.stdout.on("data", (data) => {
  process.stdout.write(data);
});

dumpProcess.stderr.on("data", (data) => {
  process.stdout.write(data);
});

dumpProcess.on("close", (code) => {
  process.stdout.write(`child process close all stdio with code ${code}`);
});

dumpProcess.on("exit", (code) => {
  process.stdout.write(`child process exited with code ${code}`);
});
