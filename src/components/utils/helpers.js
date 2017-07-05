// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";
var eventbriteAPIToken = 'ZOVDW3APCGKQD5SCX75S';

// Helper functions for making API Calls
var helper = {
  addContact: function(userID,contactID) {
    return axios.post('/api/newContact/' + userID + "/" + contactID);
  },
  getContacts: function(userID) {
    return axios.get('/api/contacts/' + userID);
  },
  submitNewUser: function(data) {
      console.log(data);
      let queryURL = "/users/register";
      return axios.post(queryURL, data).then(function(result) {
        console.log("in helper function");
        console.log(result);
        return result;

      });
  },

  logInUser: function(data) {

    console.log(data);
    let queryURL = "/users/login";
    return axios.post(queryURL, data).then(function(result) {
        console.log("in helper login function");
        console.log(result);
        return result;
      });
  },

  updateUser: function(data) {

    console.log(data);
    let queryURL = "/users/update";
    return axios.put(queryURL, data).then(function(result) {
        console.log("updating user");
        console.log(result);
        return result;
    })
  },

  getUsers: function() {
    return axios.get("/api/musicians");
  },
  getUserByUsername: function(query) {
    return axios.get("/api/user/" + query);
  },
  getUserById: function(id) {
    return axios.get("/api/userContacts/" + id);
  },
  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location, newUser) {
    
    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    var returnObj = {}
    returnObj.user = newUser;

    return axios.get(queryURL).then(function(response) {
      
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        returnObj.lat = response.data.results[0].geometry.lat;
        returnObj.lng = response.data.results[0].geometry.lng;
        return returnObj;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },
  // postQueryEvents: function(eventsData) {
    
  //   return axios.post("/api/events", eventsData).then(function(err,data) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("axios post: " + data)
  //       }
  //   });

  // },
  runQueryEvents: function(query,lat,lng,startDate,endDate,radius) {

    var newQ = query.replace(/\s/g, '+');
    //encode params for URL
    
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?' + 
    'q=' + newQ +
    '&location.within=' + radius + 
    '&location.latitude=' + lat.toString() +
    '&location.longitude=' + lng.toString() +
    '&start_date.range_start=' + startDate + 'T01:00:00'+ 
    '&start_date.range_end=' + endDate + 'T23:00:00'+
     '&token=ZOVDW3APCGKQD5SCX75S';
    
    return axios.get(queryURL, function(err,data) {

      if (err) {
        console.log(err);
      }
      console.log(data)
      
    });

  },
  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },
  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
