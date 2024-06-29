// src/components/ExternalAudio.js
import React, { useRef, useEffect } from 'react';

const ExternalAudio = ({ url }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log('Playback prevented', error));
    }
  }, []);

  return <audio ref={audioRef} src={url} loop autoPlay />;
};

export default ExternalAudio;
