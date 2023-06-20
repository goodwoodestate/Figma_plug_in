// Connecting to API
const apiUrl = "https://goodwood.thirdlight.com";
const authentication = "/rest/v1/auth/loginWithKey";
const searchPoint = "/rest/v1/search?query="
const authenticate = apiUrl + authentication;
const searchEnd = apiUrl + searchPoint;
let currentSessionId = "";
const apiKeyToken = "VIdNhL+O7UEa1UKR1mhUhSxG/rtdPH6X"
const credentials = {
  apiKey: apiKeyToken,
};


fetch(authenticate, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(credentials)
})
  .then(response => response.json())
  .then(data => {
    const sessionId = data.sessionId;
    currentSessionId = sessionId;
    // Use the session ID for subsequent API requests
    console.log("Session ID:", sessionId);
})
.catch(error => {
    console.error("Error:", error);
});

document.getElementById('submit-button').addEventListener("click", searchData);

function searchData(e) {
  e.preventDefault();
  let query = document.getElementById("query_field").value;
  console.log(query)
  
  fetch(searchEnd + new URLSearchParams(query), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Chorus-Session": currentSessionId
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Use the session ID for subsequent API requests
  })
  .catch(error => {
      console.error("Error:", error);
  });
}


// {
//   "sessionId": "TsVYymyYvhdz3wYPB-6D-6ARrtGvCG3o",
//   "userDetails": {
//     "avatarUrl": "https://d1br04p5jdm344.cloudfront.net/avatar.tlx/7lpNTm37l7CI07lLNZ7lp0FMU.png",
//     "backingFolderId": "13cc2d38-79fe-4075-85a5-6071e1532955",
//     "createdDate": {
//       "rfc3339": "2019-07-25T15:40:39+00:00",
//       "timestamp": "412012500"
//     },
//     "description": "Head of Marketing",
//     "email": "joanna.bloggs@example.com",
//     "hideHomeSpaceShortcut": true,
//     "homeSpaceId": "13cc2d38-79fe-4075-85a5-6071e1532955",
//     "id": "13cc2d38-79fe-4075-85a5-6071e1532955",
//     "modifiedDate": {
//       "rfc3339": "2019-07-25T15:40:39+00:00",
//       "timestamp": "412012500"
//     },
//     "name": "Joanna Bloggs",
//     "username": "mychorususer"
//   }
// }