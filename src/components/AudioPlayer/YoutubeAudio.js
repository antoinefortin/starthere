// src/components/YouTubeAudio.js
import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

const YouTubeAudio = ({ url }) => {
  const videoRef = useRef(null);
  const videoId = url.split('v=')[1]; // Extract the video ID from the URL

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1, // Autoplay is turned on
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: videoId,
    },
  };

  const onReady = (event) => {
    videoRef.current = event.target;
    event.target.setVolume(50); // Adjust the volume here
    event.target.playVideo();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playVideo();
    }
  }, []);

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YouTubeAudio;
