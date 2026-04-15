"use client";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">All Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 mt-3">
          <p>User: {order.user.email}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.isPaid ? "Paid" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
