'use strict';

const firebaseTokenVerifier = require('firebase-token-verifier')
const projectId = "bss-ll"

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
 


const headers = {
  'Access-Control-Allow-Origin': '*'
}


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

  if (event.path === '/requests' && event.httpMethod === 'POST') {
    // check if the user is authenticated
	let user;
    try {
      user = await checkUser(event)
    } catch (err) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({message: err.message})
      }
    }

    // check that the request contains a body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({message: 'Missing body'})
      }
    }

    // parse the request body as JSON
    const requestBody = JSON.parse(event.body);

    // TODO write that data to your dynamodb table
		
	  // send back a successful response
    return {
      statusCode: 201,
        headers
      } 
    }

};


const checkUser = async (event) => {
  const token = event.headers['Authorization']
    if (!token) {
      throw new Error('Missing token')
    }
    const decodedUser = await firebaseTokenVerifier.validate(token, projectId)
    return decodedUser
}

const getTrips = (nam) => {
  console.log("querying")
  return docClient.query(
    {
      TableName: "LL-tripReqs",
      KeyConditionExpression: "name = :name",
      ExpressionAttributeValues: { "name": nam},
    }
  ).promise().then((response) => response.Items);
}

const addTrip = (loc, nam) => {
  console.log("Adding")
  return docClient.put(
    {
      TableName: "LL-tripReqs",
      Item: {
        location: loc,
        name: nam,
      },
    }
  ).promise();
};

const deleteTrip = (loc, nam) => {
  return docClient.delete(
    {
      TableName: "LL-tripReqs",
      Key: {
        location: loc,
        name: nam,
      },
    }
  ).promise();
};

