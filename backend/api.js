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
    

    const trips = await getTrips("Puerto Rico")
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(trips)
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
    const data = await addTrip(requestBody.location, requestBody.name)
		
	  // send back a successful response
    return {
        statusCode: 201,
        headers,
        body: requestBody
      } 
  }


  if (event.httpMethod === "GET" && event.path === "/requests/all") {

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
    

    const trips = await getAllTrips()
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(trips)
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

function getAllTrips(){
  return docClient.scan(
    {
      TableName: "LL-tripReqs"
    }
  ).promise();
}

function getTrips (loc) {
  console.log("querying")
  return docClient.query(
    {
      TableName: "LL-tripReqs",
      KeyConditionExpression: "location_name = :loc_name",
      ExpressionAttributeValues: {":loc_name": loc},
    }
  ).promise().then((response) => response.Items);
}

function addTrip(loc, nam) {
  console.log("Adding")
  return docClient.put(
    {
      TableName: "LL-tripReqs",
      Item: {
        location_name: loc,
        user_name: nam,
        local_status: "Pending"
      },
    }
  ).promise();
};

const deleteTrip = (loc, nam) => {
  return docClient.delete(
    {
      TableName: "LL-tripReqs",
      Key: {
        location_name: loc,
        user_name: nam,
        local_status: "Pending"
      },
    }
  ).promise();
};

