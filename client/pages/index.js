"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = async (productId) => {
    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    alert("Added to cart ✅");
  };

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {products.map(product => (
        <div key={product._id} className="border p-4 rounded-xl shadow">
          <img src={product.image} className="h-40 w-full object-cover" />
          <h2 className="text-xl font-bold mt-2">{product.name}</h2>
          <p>₹{product.price}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
