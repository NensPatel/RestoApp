import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      const resto_id = restaurantData._id;
      console.log(resto_id);

      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${resto_id}`
      );
      const data = await response.json();

      if (data.success) {
        setFoodItems(data.result);
      } else {
        alert("Food items ain't loading...");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
      alert("An error occurred while loading food items.");
    }
  };

  const deleteFoodItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        loadFoodItems();
      } else {
        alert("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert("An error occurred while deleting the food item.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl my-2">Food Items</h1>
        <div className="text-center flex items-center justify-center">
          <table className="border-2">
            <thead>
              <tr className="border-2">
                <th className="border-2 p-4">Sr No.</th>
                <th className="border-2 p-4">Image</th>
                <th className="border-2 p-4">Name</th>
                <th className="border-2 p-4">Price</th>
                <th className="border-2 p-4">Description</th>
                <th className="border-2 p-4">Operations</th>
              </tr>
            </thead>
            <tbody>
              {foodItems &&
                foodItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 p-4">{index + 1}.</td>
                    <td className="border-2 p-4 ">
                      <img
                        src={item.img_path}
                        alt={item.name}
                        className="w-[80px] h-[60px]"
                      />
                    </td>
                    <td className="border-2 p-4">{item.name}</td>
                    <td className="border-2 p-4">{item.price}</td>
                    <td className="border-2 p-4">{item.description}</td>

                    <td className="border-2 p-4 space-x-4 w-full]">
                      <button
                        className=" p-2 bg-green-700 text-white rounded hover:bg-green-800"
                        onClick={() =>
                          router.push(`/restaurant/dashboard/${item._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
                        onClick={() => deleteFoodItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FoodItemList;
