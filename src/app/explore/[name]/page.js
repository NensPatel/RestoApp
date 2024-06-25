"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";

const Page = (props) => {
  const name = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState("");

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    console.log(id);
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = async (item) => {
    setCartData(item);
  };

  return (
    <>
      <CustomerHeader cartData={cartData} />
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          {decodeURI(name)}
        </h1>
      </div>
      <div className="bg-orange-500 p-6 rounded-lg mb-6 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between">
        <h3 className="text-lg font-semibold mb-2">
          Contact: {restaurantDetails?.contact}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          City: {restaurantDetails?.city}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Address: {restaurantDetails?.address}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Email: {restaurantDetails?.email}
        </h3>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        {foodItems.length > 0 ? (
          foodItems?.map((item) => (
            <div
              key={item?.name}
              className="bg-white p-4 rounded-lg shadow-md flex items-center"
            >
              <div>
                <img
                  src={item.img_path}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{item?.name}</h1>
                <div className="text-xl text-gray-800 ">₹{item?.price}</div>
                <p className="text-gray-600">{item?.description}</p>
                <button
                  className="w-[130px] p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-4xl mt-10">No Food Items Available</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
