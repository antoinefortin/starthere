// src/App.js
import React, { useState } from 'react';
import './App.css';
import GlobeComponent from './components/GlobeComponent';
import AudioPlayHandler from './components/AudioPlayer/AudioPlayerHandler';
import backgroundAudioSrc from './datas/backgroundsound.mp3'; // Adjust the path as necessary
import londonAudioSrc from './datas/london.mp3';


const App = () => {
  const [altitude, setAltitude] = useState(2);
  const [cityName, setCityName] = useState('');

  const handlePointOfViewChange = (pov, nearestCity) => {
    setAltitude(pov.altitude);
    setCityName(nearestCity);
  };

  let audioSource = backgroundAudioSrc;
  console.log(cityName)
  if (cityName === 'London') {
    audioSource = londonAudioSrc;
    console.log(audioSource)
  }

  return (
    <div className="App">
      <main>
        <GlobeComponent onPointOfViewChange={handlePointOfViewChange} />
        <AudioPlayHandler sourceType="local" source={audioSource} altitude={altitude} />
      </main>
    </div>
  );
};

export default App;
