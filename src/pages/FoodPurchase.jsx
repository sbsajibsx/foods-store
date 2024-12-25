import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const FoodPurchase = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/food/${id}`
    );
    setFood(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputQuantity = parseFloat(form.quantity.value);

    if (inputQuantity > food.quantity) {
      toast.error("fix your quantity");
      return;
    } else if (inputQuantity <= 0) {
      toast.error("fix your quantity");
      return;
    } else if (inputQuantity > 20) {
      toast.error("you can buy max 20");
      return;
    }
    const quantity = parseFloat(food.quantity - inputQuantity);
    const purchaseCount = parseFloat(food.purchaseCount + 1);

    const formData = { quantity, purchaseCount };

    // add form data on mongodb by axios

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-food/${id}`,
        formData
      );
      form.reset();
      toast.success("Food Purchase Successfully");
      navigate("/my-orders");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Food</h1>
        <form onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Food Name
            </label>
            <input
              type="text"
              defaultValue={food.foodName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              defaultValue={food.price}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buyer Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Buyer Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Buyer Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Buyer Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
