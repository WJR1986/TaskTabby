// spotify.js

// Function to initialize the Spotify player
function initializeSpotifyPlayer() {
    // Replace 'YOUR_SPOTIFY_PLAYLIST_URI' with the actual Spotify playlist URI
    const spotifyPlaylistUri = '6zCID88oNjNv9zx6puDHKj';
  
    // Create an iframe element
    const spotifyIframe = document.createElement('iframe');
  
    // Set the Spotify URI as the source of the iframe using the correct format
    spotifyIframe.src = `https://open.spotify.com/embed/playlist/${spotifyPlaylistUri}`;
    spotifyIframe.width = '100%'; // Set the width to 100%
    spotifyIframe.height = '352';
    spotifyIframe.frameBorder = '0';
    spotifyIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    spotifyIframe.loading = 'lazy';
  
    // Append the iframe to the Study Music container
    const studyMusicContainer = document.getElementById('studyMusicContainer');
    studyMusicContainer.appendChild(spotifyIframe);
  }
  
  // Call the function to initialize the Spotify player
  initializeSpotifyPlayer();
  