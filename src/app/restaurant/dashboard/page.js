"use client";
import AddFoodItems from "@/app/_components/AddFoodItems";
import FoodItemList from "@/app/_components/FoodItemList";
import Footer from "@/app/_components/RestaurantFooter";
import Header from "@/app/_components/RestaurantHeader";
import { useState } from "react";

const Dashboard = () => {
  const [addItems, setAddItems] = useState(false);
  return (
    <>
      <Header />
      <div className="space-x-4 flex m-0 justify-center mb-5">
        <div>
          <button
            type="submit"
            className="p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
            onClick={() => setAddItems(true)}
          >
            Add Food
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
            onClick={() => setAddItems(false)}
          >
            Dashboard
          </button>
        </div>
      </div>
      {addItems ? <AddFoodItems setAddItems={setAddItems} /> : <FoodItemList />}
    </>
  );
};
export default Dashboard;
