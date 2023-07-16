import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddressLink from '../AddressLink';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      {/* TITLE & ADDRESS */}
      <h1 className="text-3xl mr-36 font-semibold">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>

      {/* PHOTOS SECTION */}
      <PlaceGallery place={place} />

      {/* Description & Booking Widget */}
      <div className="items-center mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4">
            <h2 className="font-semibold text-3xl mb-2">Description:</h2>
            {place.description}
          </div>
          - Check-in: {place.checkIn}
          <br />
          - Check-in: {place.checkOut}
          <br />
         - Max number of guests: {place.maxGuests} <br />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      {/* Extra Info */}
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
