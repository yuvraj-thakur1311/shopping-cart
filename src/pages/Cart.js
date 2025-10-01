import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { toast } from "react-hot-toast";
import { clearCart } from "../redux/slice/CartSlice"; 

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cart]);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id,
            quantity: 1,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setOrderSummary(data.orderSummary);
         dispatch(clearCart());
      } else {
        toast.error(data.error || "Checkout failed");
      }
    } catch (error) {
      console.log("Checkout error:", error);
      toast.error("Failed to process checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const closePopup = () => setOrderSummary(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {cart.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
          
          <div className="w-full md:w-2/3 space-y-4">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          <div className="w-full md:w-1/3 bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Order Summary
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Total Items:</span>{" "}
                {cart.length}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Total Amount:</span>{" "}
                <span className="text-xl font-bold text-green-700">
                  ${totalAmount.toFixed(2)}
                </span>
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full py-3 mt-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md"
              }`}
            >
              {isProcessing ? "Processing..." : "Checkout Now"}
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-lg">
            Your cart is empty!
          </h1>
          <Link to={"/"}>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-all">
              Shop Now
            </button>
          </Link>
        </div>
      )}

      {orderSummary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Hurray !! Order Placed Successfully!
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Total Amount:</span> $
              {orderSummary.total.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Items:</span>{" "}
              {orderSummary.items.length}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Timestamp:</span>{" "}
              {new Date(orderSummary.timestamp).toLocaleString()}
            </p>
            <button
              onClick={closePopup}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
