"use client";
import { useState } from "react";

import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import Header from "../_components/RestaurantHeader";
import Footer from "../_components/RestaurantFooter";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <Header />
      <div className="text-center">
        <div>
          {/* <h1 className="text-3xl text-white">Restaurant Login/SignUp Page</h1> */}
        </div>
        <div>{login ? <RestaurantLogin /> : <RestaurantSignup />}</div>
        <div>
          <button
            onClick={() => setLogin(!login)}
            className="text-white underline underline-offset-4 hover:text-[#81d3e7]"
          >
            {login
              ? "Do not have an Acc? SignUp"
              : "Already have an Acc? Login"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Restaurant;
