'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { useGeolocation } from '../../_lib/hooks/useGeolocation';
import { useUrlPosition } from '../../_lib/hooks/useUrlPosition';
import { BiSolidNavigation } from 'react-icons/bi';
import { useParks } from '@/app/_lib/contexts/ParkContext';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DetectClick from './DetectClick';
// Fix Leaflet marker issue in Next.js
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import StarDisplay from '../StarDisplay';
import Loader from './Loader';

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const router = useRouter();
  const { parks } = useParks();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([25.0457, 121.5379]);
  const [mapLat, mapLng] = useUrlPosition();
  const [hasClicked, setHasClicked] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [aiMarker, setAiMarker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState(null);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  function handleGetPosition() {
    getPosition();
    setHasClicked(true); // ✅ user clicked
  }

  useEffect(() => {
    if (hasClicked && geolocationPosition?.lat && geolocationPosition?.lng) {
      router.push(
        `/parklist/form?lat=${geolocationPosition.lat}&lng=${geolocationPosition.lng}`
      );
    }
  }, [geolocationPosition, hasClicked, router]);

  // Declare useRef to reference map.
  const mapRef = useRef(null);
  // ZoomHandler component for handling map zoom events.
  const ZoomHandler = () => {
    const map = useMap();
    const coordinates = aiMarker?.coordinates;

    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    useEffect(() => {
      if (!coordinates) return;

      const flyToMarker = (coords, zoom) => {
        if (coords && typeof coords[0] !== 'undefined') {
          map.flyTo(coords, zoom, {
            animate: true,
            duration: 1.5,
          });
        }
      };

      flyToMarker(coordinates, 16);
    }, [coordinates, map]);

    return null;
  };

  // Submit question. On submit, the input is sent via fetch() (POST request) to your API handler (route.js).
  async function handleSubmit() {
    if (!inputValue.trim()) return;

    setLoading(true);

    try {
      //Set loading state and clear the input.
      setSubmittedQuestion(inputValue);
      setInputValue('');

      const res = await fetch('/api/openai/Coordinates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: inputValue }),
      });

      const data = await res.json();

      if (
        data &&
        Array.isArray(data.coordinates) &&
        data.coordinates.length === 2
      ) {
        setAiMarker(data);
      }
    } catch (err) {
      console.error('AI location fetch error:', err);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  }

  return (
    <div className='flex-1 relative h-full w-lg rounded-[10px_10px_10px_10px]'>
      {/* shadow-[0px_5px_10px_0px_#adb5bd] */}
      {loading && <Loader />}

      <MapContainer
        center={mapPosition}
        zoom={15}
        className='h-[80vh] rounded-[10px_10px_10px_10px] z-0 mobile_map:h-[83vh] mobile_map_sm_3:h-[68vh] md:h-[83vh] shadow-lg'
        style={{ width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <DetectClick />

        {Array.isArray(parks) &&
          parks.map((park) => (
            <Marker
              key={park.id}
              position={[park.position.lat, park.position.lng]}
              icon={customIcon}
            >
              <Popup className='flex flex-col'>
                <span className='leading-7'>
                  <StarDisplay rating={park.starRating} />
                </span>
                <hr />
                <span className='leading-8 text-base'>{park.parkName}</span>
                <hr />
                <span className='leading-8 text-base'>{park.notes}</span>
                <hr />
                <span className='leading-8 text-base'>by {park.userName}</span>
              </Popup>
            </Marker>
          ))}

        {aiMarker?.coordinates?.length === 2 && (
          <Marker position={aiMarker.coordinates} icon={customIcon}>
            <Popup>{aiMarker.title}</Popup>
          </Marker>
        )}
        <ZoomHandler />
      </MapContainer>

      {/* Current position button */}
      <div className='absolute top-5 right-5 z-30'>
        <button
          type='position'
          onClick={handleGetPosition}
          className='p-2 rounded-full bg-accent-600 text-slate-50 hover:text-accent-600 hover:bg-slate-50 shadow-xl z-40 '
        >
          {isLoadingPosition ? (
            <span className='text-sm text-slate-50'>...</span>
          ) : (
            <BiSolidNavigation className='w-7 h-7 z-40' />
          )}
        </button>
      </div>

      {/* Input and AI Submit */}
      <div className='absolute top-5 left-0 w-[90%] sm:w-full z-30 px-4'>
        <div className='flex justify-center items-center'>
          {submittedQuestion && (
            <div className='absolute top-[5rem] w-full flex justify-center z-30'>
              <h1 className='text-xl font-bold text-slate-50 p-2 bg-accent-600 rounded-md shadow-xl'>
                {submittedQuestion}
              </h1>
            </div>
          )}
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            onFocus={() => {
              setSubmittedQuestion(null);
              setAiMarker(null);
            }}
            placeholder='Ask me for recommendation...'
            className='flex-grow max-w-[60%] px-2 py-2 border rounded-sm shadow-xl'
          />
          <button
            onClick={handleSubmit}
            className='px-3 py-2 ml-2 bg-accent-600 text-slate-50 rounded-sm shadow-xl hover:text-accent-600 hover:bg-slate-50'
          >
            GO
          </button>
        </div>
      </div>
    </div>
  );
}
