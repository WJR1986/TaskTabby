// youtube.js

    // Replace 'YOUR_VIDEO_ID' with the actual YouTube video ID
    var videoId = 'jfKfPfyJRdk';

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '360', // Set the height of the player
            width: '640',  // Set the width of the player
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // You can do something when the player is ready
    }

    function onPlayerStateChange(event) {
        // You can handle player state changes (e.g., play, pause, end) here
    }

    window.addEventListener('resize', function() {
      // Get the current width of the container
      var containerWidth = document.querySelector('.youtube-video').offsetWidth;
  
      // Set the height of the player based on the width and 16:9 aspect ratio
      var playerHeight = containerWidth * 0.5625; // 0.5625 is the decimal equivalent of 9/16 (16:9 aspect ratio)
      
      // Set the height of the player
      document.getElementById('player').style.height = playerHeight + 'px';
  });