import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/' + place._id}>
            <h3 className=" text-center mb-1 font-bold text-blue-500 ">
              {place.title}
            </h3>
            <div className="bg-gray-500 rounded-lg flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-md object-cover aspect-square fill-none"
                  src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                />
              )}
            </div>
            <h2 className="font-bold text-sm">{place.address}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price} </span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
}
