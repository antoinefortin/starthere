// src/components/LocalAudio.js
import React, { useRef, useEffect } from 'react';

const LocalAudio = ({ src, altitude }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const tryPlayAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.log('Playback prevented', error));
      }
    };


    tryPlayAudio();

    const handleUserInteraction = () => {
      tryPlayAudio();
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      // Adjust the volume based on the altitude
      const maxVolumeAltitude = 2; // Adjust this value as needed
      const minVolumeAltitude = 0.005; // Adjust this value as needed

      let volume;
      if (altitude > maxVolumeAltitude) {
        volume = 1;
      } else if (altitude < minVolumeAltitude) {
        volume = 0;
      } else {
        volume = (altitude - minVolumeAltitude) / (maxVolumeAltitude - minVolumeAltitude);
      }

      audioRef.current.volume = volume;
    }
  }, [altitude]);

  return <audio ref={audioRef} src={src} loop />;
};

export default LocalAudio;
