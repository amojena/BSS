'use strict';

module.exports.getTravelReqs = async (event) => {
  if (event.httpMethod === "GET" && event.path === "/requests") {
    return {
      statusCode: 200,
      body: JSON.stringify({ name: 'Antonio Mojena', location: "Puerto Rico", status: "Pending" })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ method: event.httpMethod, pth: event.path })
  }


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

