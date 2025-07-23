const axios = require("axios");
const fs = require("fs");
const config = require("../config");

const numberOfRequests = config.numberOfRequests;
const numberOfParallelRequests = config.numberOfParallelRequests;
const limit = config.limit;

const resetTmp = () => {
  fs.rmSync("./tmp", { recursive: true, force: true });
  fs.mkdirSync("./tmp");
};

resetTmp();

const stress = async () => {
  const chunkSize = Math.ceil(numberOfRequests / numberOfParallelRequests);
  for (let i = 0; i < chunkSize; i++) {
    const requests = [];
    for (let j = 0; j < numberOfParallelRequests; j++) {
      requests.push(
        axios.get(`${config.hostApp}/api/v1/export/users/csv?limit=${limit}`)
      );
    }

    const responses = await Promise.all(requests);
    responses.forEach((response) => {
      const filename = response.headers["content-disposition"].split("filename=")[1];
      fs.writeFileSync(`./tmp/${filename}`, response.data);
    });
  }
};

stress();
