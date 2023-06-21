// Connecting to API
const apiKeyToken = "VIdNhL+O7UEa1UKR1mhUhSxG/rtdPH6X"
const credentials = {
  apiKey: apiKeyToken,
};


// Current API Links
const apiUrl = "https://goodwood.thirdlight.com";
const authentication = "/rest/v1/auth/loginWithKey";
const searchPoint = "/rest/v1/search?query="
const multiSearch = "/rest/v1/content/multi"
const authenticate = apiUrl + authentication;
const searchEnd = apiUrl + searchPoint;
const multiSearchEnd = apiUrl + multiSearch

// Current Session GLOBAL variables
let currentSessionId = "";
let currentSearchIdFields = "";
let returnedSearchID = [];

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
  
  // Encode the URL to % 20 instead of +
  const encodedQuery = encodeURIComponent(query)
  const searchURL = searchEnd + encodedQuery;
  console.log(searchURL)
  fetch(searchURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Chorus-Session": currentSessionId
    },
  })
    .then(response => response.json())
    .then(data => {
      // Passing data to response if the length is not greater than 1 it throws a error and a user message
      if (data.response.length >= 1) {
        currentSearchIdFields = data.response;
        iterateFirstTwentyElements();
      } else {
        window.alert("I am awfully sorry there is not any results to match try something else!!")
        throw new Error("That didnt return any results Ooooops!")
      }
      // Use the session ID for subsequent API requests
  })
  .catch(error => {
      console.error("Error:", error);
  });
}


function iterateFirstTwentyElements() {

  for (var i = 0; i < currentSearchIdFields.length && i < 20; i++) {
    returnedSearchID.push(currentSearchIdFields[i]);
  }
  // assignmentOfId();
}


function assignmentOfId() {
  let items = ""
  let searchedId = {
    itemIds: [
      items
    ]
  }
  fetch(multiSearchEnd, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Chorus-Session": currentSessionId
    },
    body: JSON.stringify(searchedId)
  })
    .then(response => response.json())
    .then(data => {

  })
  .catch(error => {
      console.error("Error:", error);
  });

}


