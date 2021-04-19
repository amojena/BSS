'use strict';

const headers = {
  'Access-Control-Allow-Origin': '*'
}

const firebaseTokenVerifier = require('firebase-token-verifier')
const projectId = "bss-ll"

module.exports.getTravelReqs = async (event) => {
  

  // check first if its an OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    // return the expected status and CORS headers
    return {
        statusCode: 200, headers
    }
}

  if (event.httpMethod === "GET" && event.path === "/requests") {

    const token = event.headers['Authorization']

    // no authorization token provided, return error code
    if (!token) {
      console.log("No token")
      return {statusCode: 401, headers}
    }

    //validate token from request
    try{
      const decoded = await firebaseTokenVerifier.validate(token,projectId)
    } catch(err) {
      // invalid token
      console.error(err)
      return {statusCode: 401, headers}
    }
    


    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ name: 'Antonio Mojena', location: "Puerto Rico", status: "Pending" })
    }

  }

};

