"use client";

import CustomerHeader from "./_components/CustomerHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };
  console.log(restaurants);

  return (
    <>
      <CustomerHeader />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Food Delivery App</h1>
        <form className="w-full max-w-lg flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Enter Place"
              className="w-full p-2 border border-gray-300 text-center bg-transparent"
              value={selectedLocation}
              onClick={() => setShowLocation(true)}
            />
            {showLocation && (
              <ul className="bg-white border-2 absolute w-full p-0 mt-1 text-center cursor-pointer font-mono space-y-2 max-h-60 overflow-y-auto z-10">
                {locations.map((item) => (
                  <li
                    key={item}
                    className="p-2 hover:bg-gray-200"
                    onClick={() => handleListItem(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter Food Name or Restaurant Name"
            className="w-full p-2 border border-gray-300 bg-transparent"
            onChange={(event) =>
              loadRestaurants({ restaurant: event.target.value })
            }
          />
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10 mx-5">
        {restaurants.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
            onClick={() =>
              router.push("explore/" + item.name + "?id=" + item._id)
            }
          >
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-orange-500">
                {item.name}
              </h1>
              <h3 className="text-lg text-gray-700">Contact: {item.contact}</h3>
            </div>
            <div className="flex-1">
              <h1 className="text-lg">City: {item.city}</h1>
              <h3 className="text-lg text-gray-700">Email: {item.email}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
