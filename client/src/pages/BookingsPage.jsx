import axios from 'axios';
import { useEffect, useState } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';

import AccountNav from '../AccountNav';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-md overflow-hidden"
              key={booking}
            >
              {/* PLACE IMG */}
              <div className="w-56">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow ">
                {/* PLACE TITLE */}
                <h2 className="text-xl font-semibold ">
                  {booking.place.title}
                </h2>
                {/* NIGHTS */}
                <BookingDates
                  booking={booking}
                  className="items-center py-2 border-t text-sm text-gray-500 border-gray-300"
                />
                {/* PRICE */}
                <div className="flex gap-1 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="">
                    Total price: $
                    {booking.place.price *
                      differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
