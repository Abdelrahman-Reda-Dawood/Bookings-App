import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// components
import AccountNav from '../AccountNav';
import Perk from '../Perks';
import PhotosUploader from '../photosUploader';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      if (id) {
        await axios.put('/places', {
          id,
          ...placeData,
        });
        setRedirect(true);
      } else {
        await axios.post('/places', placeData);
        setRedirect(true);
      }
      alert('Updated Successfully, Click ok to continue');
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place.')}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title"
        />

        {/* ADDRESS */}
        {preInput('Address', 'Address for your place.')}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
        />

        {/* PHOTOS */}
        {preInput('Photos', 'Photos for your place.')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {/* DESCRIPTION */}
        {preInput('Description', 'Description of your place.')}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Place description"
        />

        {/* PERKS */}
        {preInput('Perks', 'Select all the perks of the place.')}
        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cold-6">
          <Perk selected={perks} onChange={setPerks} />
        </div>

        {/* EXTRA INFO */}
        {preInput('Extra Info', 'Extra Info about the place.')}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          placeholder="Any additional information"
        />

        {preInput('Pricing & (Check In&Out)', 'Time to check in&out')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div className="mt-2 -mb-1">
            <h3>Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="00:00 pm"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="00:00 am"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Max num of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="1~15"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Total Price</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="$"
            />
          </div>
        </div>
        {/* SAVE BUTTON */}
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
