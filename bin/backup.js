const { exec } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../", ".env.local") });

const throwMissingVarError = (variableName) => {
  throw new Error(`Please add ${variableName} to .env.local`);
};

// prettier-ignore
const DB = process.env.MONGODB_DB           || (() => {throwMissingVarError("MONGODB_DB")})();
// prettier-ignore
const AUTH_DB = process.env.MONGODB_AUTH_DB || (() => {throwMissingVarError("MONGODB_AUTH_DB")})();
// prettier-ignore
const USER = process.env.MONGODB_USER       || (() => {throwMissingVarError("MONGODB_USER")})();
// prettier-ignore
const PASSWORD = process.env.MONGODB_PASS   || (() => {throwMissingVarError("MONGODB_PASS")})();

const dumpProcess = exec(
  `mongodump -d ${DB} -u ${USER} -p ${PASSWORD} --authenticationDatabase ${AUTH_DB} -o ${path.resolve(
    __dirname,
    "../",
    `data_backups/${Date.now()}/`
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
