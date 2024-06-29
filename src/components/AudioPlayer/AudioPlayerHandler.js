// src/components/AudioPlayHandler.js
import React from 'react';

import YouTubeAudio from './YoutubeAudio';
import LocalAudio from './LocalAudio';
import ExternalAudio from './ExternalAudio';

const AudioPlayHandler = ({ sourceType, source, altitude }) => {
  switch (sourceType) {
    case 'youtube':
      return <YouTubeAudio url={source} />;
    case 'local':
      return <LocalAudio src={source} altitude={altitude} />;
    case 'external':
      return <ExternalAudio url={source} />;
    default:
      return null;
  }
};

export default AudioPlayHandler;
