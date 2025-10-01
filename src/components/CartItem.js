import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../redux/slice/CartSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item removed");
  };

  const changeQuantity = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: value }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex p-4 mb-4 transition hover:shadow-lg">
      <div className="w-28 h-28 flex-shrink-0">
        <img
          className="w-full h-full object-contain rounded-md"
          src={item.image}
          alt={item.title}
        />
      </div>

      <div className="flex flex-col ml-4 flex-grow">
        <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>

        <p className="text-sm text-gray-600 mt-1">
          {expanded ? item.description : item.description.slice(0, 80) + "..."}
          {item.description.length > 80 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-sm ml-2 hover:underline"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </p>

        <div className="flex items-center justify-between mt-3">

          <p className="text-lg font-bold text-green-600">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={changeQuantity}
            className="w-16 border rounded text-center py-1"
          />

          <button
            onClick={removeFromCart}
            className="bg-red-100 hover:bg-red-300 text-red-600 rounded-full p-2 transition"
          >
            <AiFillDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
