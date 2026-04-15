"use client";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 mt-3">
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.isPaid ? "Paid ✅" : "Pending ❌"}</p>
        </div>
      ))}
    </div>
  );
}
