const xhttp = new XMLHttpRequest();
const setHeader = (req={}) => {
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(req);
}
const sendGetRequest = (url, req) => {
    xhttp.open("GET", url, true);
    setHeader(req)
}
const sendPostRequest = (url, req) => {
    xhttp.open("POST", url, true);
    setHeader(req)
}
const sendPutRequest = (url, req) => {
    xhttp.open("PUT", url, true);
    setHeader(req)
}
const sendDeleteRequest = (url, req) => {
    xhttp.open("DELETE", url, true);
    setHeader(req)
}


// ============= FETCH API ======================

async function fetchRequest(url = '', method='GET', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

async function getRequest(url = '', data = {}) {
    return fetchRequest(url, 'GET', data)
}

async function postRequest(url = '', data = {}) {
    return fetchRequest(url, 'POST', data)
}

async function putRequest(url = '', data = {}) {
    return fetchRequest(url, 'PUT', data)
}

async function deleteRequest(url = '', data = {}) {
    return fetchRequest(url, 'DELETE', data)
}