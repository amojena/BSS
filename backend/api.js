'use strict';


module.exports.getTravelReqs = async (event) => {
  
  const firebaseTokenVerifier = require('../node_modules/firebase-token-verifier')
  const projectId = "bss-ll"

  if (event.httpMethod === "GET" && event.path === "/requests") {

    const token = event.headers['Authorization']

    // no authorization token provided, return error code
    if (!token) {
      console.log("No token")
      return {statusCode: 401}
    }

    //validate token from request
    try{
      const decoded = await firebaseTokenVerifier.validate(token,projectId)
    } catch(err) {
      // invalid token
      console.error(err)
      return {statusCode: 401}
    }
    


    return {
      statusCode: 200,
      body: JSON.stringify({ name: 'Antonio Mojena', location: "Puerto Rico", status: "Pending" })
    }

  }

};

