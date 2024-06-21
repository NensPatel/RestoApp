import { useState } from "react";

const AddFoodItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFoodItem = async (e) => {
    e.preventDefault();

    if (!name.trim() || !path.trim() || !price.trim() || !description.trim()) {
      setError(true);
      return;
    }

    setError(false);

    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restaurantData ? restaurantData._id : null;

    if (!resto_id) {
      alert("Restaurant ID not found");
      return;
    }

    try {
      let response = await fetch("http://localhost:3000/api/restaurant/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          img_path: path,
          description,
          resto_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Food item not added");
      }

      response = await response.json();
      if (response.success) {
        alert("Food item added");
        props.setAddItems(false);
      } else {
        throw new Error("Food item not added");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Food item not added");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-5 text-2xl">Add Food Items</h1>
      <form className="w-full max-w-xs" onSubmit={handleAddFoodItem}>
        <div>
          <input
            type="text"
            placeholder="Enter Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded"
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
            className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded"
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
            className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded"
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
            className="w-full p-2 mb-4 bg-transparent border border-gray-300 rounded"
          />
          {error && !description.trim() && (
            <span className="text-red-600 text-lg">
              Enter a Food Description
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
          >
            Add Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodItems;
