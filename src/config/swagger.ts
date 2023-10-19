import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Sample API",
    description: "A simple Express API templace created by Pedro Gardim",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
