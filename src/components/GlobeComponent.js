// src/components/GlobeComponent.js
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import cities from '../datas/cities.json';
import { getDistance } from '../utils/geoUtils';

const GlobeComponent = ({ onPointOfViewChange }) => {
  const globeEl = useRef();
  const [pins, setPins] = useState([]);
  const [pointOfView, setPointOfView] = useState({ lat: 0, lng: 0, altitude: 2 });

  useEffect(() => {
    // Set initial point of view
    globeEl.current.pointOfView(pointOfView);
  }, [pointOfView]);

  useEffect(() => {
    // Log visible cities based on the current point of view
    logVisibleCities();
    // Notify parent component about point of view change
    if (onPointOfViewChange) {
      const nearestCity = getNearestCity(pointOfView);
      onPointOfViewChange(pointOfView, nearestCity);
    }
  }, [pointOfView, onPointOfViewChange]);

  const cityPoints = cities.map(city => ({
    lat: city.lat,
    lng: city.lng,
    size: 0.1, // Small size for the pin
    color: 'red',
    name: city.city
  }));

  const handleGlobeClick = ({ lat, lng }) => {
    setPins([...pins, { lat, lng, size: 0.1, color: 'blue', name: `Pin at (${lat.toFixed(2)}, ${lng.toFixed(2)})` }]);
  };

  const logVisibleCities = () => {
    console.log(pointOfView.altitude);
    const maxDistance = 1000 / pointOfView.altitude; // Maximum distance in kilometers to show cities, adjusted by zoom level
    const visibleCities = cities.filter(city => {
      const distance = getDistance(pointOfView.lat, pointOfView.lng, city.lat, city.lng);
      return distance <= maxDistance;
    });
    // console.log('Visible cities:', visibleCities);
  };

  const getNearestCity = (pov) => {
    const maxDistance = 100; // Define a range to consider "nearby"
    const nearestCity = cities.reduce((nearest, city) => {
      const distance = getDistance(pov.lat, pov.lng, city.lat, city.lng);
      if (distance < maxDistance && (!nearest || distance < nearest.distance)) {
        return { ...city, distance };
      }
      return nearest;
    }, null);
    return nearestCity ? nearestCity.city : '';
  };

  const handleZoomOrRotate = pov => {
    setPointOfView(pov);
  };

  return (
    <Globe
      ref={globeEl}
      backgroundColor="#000011"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      showAtmosphere={true}
      atmosphereColor="lightskyblue"
      atmosphereAltitude={0.25}
      pointsData={[...cityPoints, ...pins]} // Combine city points and pins
      pointLat="lat"
      pointLng="lng"
      pointAltitude={d => d.size}
      pointColor="color"
      pointRadius={0.2}
      pointLabel={d => `<div style="color: white; background: black; padding: 2px;">${d.name}</div>`}
      onGlobeClick={handleGlobeClick}
      onZoom={handleZoomOrRotate}
      onRotate={handleZoomOrRotate} // Handle rotation as well
    />
  );
};

export default GlobeComponent;
