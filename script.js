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
  const searchURL = searchEnd + new URLSearchParams(query)
  console.log(searchURL)
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

