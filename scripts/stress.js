const axios = require("axios");
const { faker } = require('@faker-js/faker');
const { v7: uuidv7 } = require("uuid");
const config = require("../config");

const numberOfRequests = config.numberOfRequests;
const numberOfParallelRequests = config.numberOfParallelRequests;

const getRandomUser = () => {
  return {
    id: uuidv7(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
};

const stress = async () => {
  const chunkSize = Math.ceil(numberOfRequests / numberOfParallelRequests);
  for (let i = 0; i < chunkSize; i++) {
    const requests = [];
    for (let j = 0; j < numberOfParallelRequests; j++) {
      requests.push(
        axios.post(`${config.hostApp}/api/v1/users`, getRandomUser())
      );
    }
    console.log(`Sending ${numberOfParallelRequests} requests ${i + 1} of ${chunkSize}`);
    await Promise.all(requests);
    console.log(`Sent ${numberOfParallelRequests} requests ${i + 1} of ${chunkSize}`);
  }
};

stress();
