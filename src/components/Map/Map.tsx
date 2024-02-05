import { FC, useEffect, useRef } from 'react';

import './Map.css';

import { MapProps } from '../../types/types';

const Map: FC<MapProps> = ({ className, style, center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });

      new window.google.maps.Marker({ position: center, map: map });
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;
