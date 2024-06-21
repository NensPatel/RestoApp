"use client";
import Header from "@/app/_components/RestaurantHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadAddFoodItem();
  }, []);

  const handleLoadAddFoodItem = async () => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`
    );
    response = await response.json();
    if (response.success) {
      setName(response.result.name);
      setPrice(response.result.price);
      setPath(response.result.img_path);
      setDescription(response.result.description);
    } else {
      console.error("Error fetching food item:", response.error);
    }
  };

  const handleAddFoodItem = async (e) => {
    e.preventDefault();

    if (!name.trim() || !path.trim() || !price.trim() || !description.trim()) {
      setError(true);
      return;
    }
    setError(false);

    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, img_path: path, description }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Item Updated successfully");
      router.push("../dashboard");
    } else {
      alert("Error updating food item");
      console.error("Error updating food item:", response.error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="mb-5 text-2xl">Edit Food Items</h1>

        <form className="w-full max-w-xs" onSubmit={handleAddFoodItem}>
          <div>
            <input
              type="text"
              placeholder="Enter Food Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            {error && !name.trim() && (
              <span className="text-red-600 text-lg">Enter a Food name</span>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            {error && !price.trim() && (
              <span className="text-red-600 text-lg">Enter a Price</span>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Image Path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            {error && !path.trim() && (
              <span className="text-red-600 text-lg">Enter an Image Path</span>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            {error && !description.trim() && (
              <span className="text-red-600 text-lg">
                Enter a Food Description
              </span>
            )}
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
            >
              Update Food Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFoodItems;
