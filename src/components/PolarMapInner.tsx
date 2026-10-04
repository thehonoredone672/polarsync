'use client';
import { useEffect, useRef } from 'react';
import { PolarLocation } from '@/lib/data';

// Fix Leaflet default icon issue in Next.js
function fixLeafletIcons() {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require('leaflet');
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const categoryColors: Record<string, string> = {
  station: '#EF4444',
  expedition: '#10B981',
  dataset: '#3B82F6',
  media: '#8B5CF6',
  event: '#F59E0B',
};

interface PolarMapInnerProps {
  locations: PolarLocation[];
  selectedLocation: PolarLocation | null;
  onLocationSelect: (loc: PolarLocation) => void;
}

export default function PolarMapInner({ locations, selectedLocation, onLocationSelect }: PolarMapInnerProps) {
  const mapRef = useRef<ReturnType<typeof import('leaflet').map> | null>(null);
  const containerId = 'polar-leaflet-map';
  const markersRef = useRef<unknown[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    fixLeafletIcons();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerId, {
      center: [-30, 30],
      zoom: 2,
      zoomControl: false,
    });

    // Dark styled tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    // Zoom control in bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet');
    const map = mapRef.current;

    // Remove old markers
    markersRef.current.forEach((m: unknown) => (m as ReturnType<typeof L.marker>).remove());
    markersRef.current = [];

    locations.forEach((loc) => {
      const color = categoryColors[loc.category] || '#00B4D8';

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            width: 28px; height: 28px;
            background: ${color}22;
            border: 2.5px solid ${color};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 12px ${color}66;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <div style="
              width: 8px; height: 8px;
              background: ${color};
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .on('click', () => onLocationSelect(loc));

      markersRef.current.push(marker);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  // Pan to selected
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 5, { duration: 1 });
    }
  }, [selectedLocation]);

  return (
    <div
      id={containerId}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
      className="rounded-2xl"
    />
  );
}
