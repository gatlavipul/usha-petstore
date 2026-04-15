"use client";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    location.reload();
  };

  const total = cart.items?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart.items?.map(item => (
        <div key={item.product._id} className="flex justify-between p-3 border">
          <span>{item.product.name}</span>
          <span>₹{item.product.price}</span>
          <button
            onClick={() => removeItem(item.product._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <h2 className="text-xl mt-5">Total: ₹{total}</h2>
      <a href="/checkout" className="bg-green-500 text-white p-2 inline-block mt-4 rounded">
        Proceed to Checkout
      </a>
    </div>
  );
}
