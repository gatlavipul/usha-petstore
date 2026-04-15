"use client";
import { useState } from "react";

export default function Checkout() {
  const [amount, setAmount] = useState(500); // Replace with dynamic cart total

  const handlePayment = async () => {
    const res = await fetch("http://localhost:5000/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "YOUR_KEY", // Set in .env.local
      amount: data.amount,
      currency: "INR",
      order_id: data.id,
      handler: async function (response) {
        // Call backend to verify payment
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response)
        });
        if (verifyRes.ok) {
          alert("Payment Verified ✅");
        } else {
          alert("Payment verification failed ❌");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        className="border px-3 py-2 rounded mb-4"
        min={1}
      />
      <button onClick={handlePayment} className="bg-green-500 text-white p-3 rounded">
        Pay Now
      </button>
    </div>
  );
}
