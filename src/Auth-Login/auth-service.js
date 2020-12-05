const CLIENT_ID = require('../config')
const REDIRECT = require('../config')

// GET https://accounts.spotify.com/authorize
// get request sent to authorize endpoint

// parameters: client_id, response_type, redirect_uri, state
// optional: scope, show_dialog (default = false)
// scopes we might need: playlist-modify-public (to add items to a playlist), playlist-modify-private, user-modify-playback-state, user-read-currently-playing, user-library-modify, playlist-read-private, user-read-email, user-read-private, user-library-read, playlist-read-collaborative, streaming

// Example request: GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
// https://accounts.spotify.com/authorize?client_id=6bfe0805878648ae8ac4b625ed859ba7&response_type=code&redirect_uri=https%3A%2F%2Fgroovity.herokuapp.com%2Fcallback&scope=user-read-private%20user-read-email

const reqURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT}&scope=user-read-private%20user-read-email&state=34fFs29kd09`