"use client";
import React, { useState } from "react";

const CustomerInfo = () => {
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  const getItemStyle = (id: string) =>
    `cursor-pointer transition-colors duration-200 sm:text-lg ${
      selectedInfo === id
        ? "text-[#c27a2c] font-medium"
        : "text-white hover:text-[#c27a2c]"
    }`;
  return (
    <div className="flex-1 md:border-l md:border-[#c27a2c] md:pl-6">
      <h1 className="text-[#c27a2c] text-lg mb-3 text-bold">Customer Info</h1>

      <ul className="list-disc pl-5 marker:text-[#c27a2c] space-y-1">
        <li
          className={getItemStyle("hours")}
          onClick={() => setSelectedInfo("hours")}
        >
          Opening Hours
        </li>
        <li
          className={getItemStyle("delivery")}
          onClick={() => setSelectedInfo("delivery")}
        >
          Delivery Areas
        </li>
        <li
          className={getItemStyle("payment")}
          onClick={() => setSelectedInfo("payment")}
        >
          Payment Methods
        </li>

        <li
          className={getItemStyle("tracking")}
          onClick={() => setSelectedInfo("tracking")}
        >
          Order Tracking
        </li>
        <li
          className={getItemStyle("policy")}
          onClick={() => setSelectedInfo("policy")}
        >
          Refund Policy
        </li>
      </ul>
      <div className="mt-4 text-white text-sm h-20">
        {selectedInfo === "hours" && <p>Daily from 10:00 AM until 02:00 AM</p>}

        {selectedInfo === "delivery" && (
          <p>We deliver to Beirut, and Mount Lebanon Areas.</p>
        )}

        {selectedInfo === "payment" && (
          <p>Cash on delivery and local payment methods are accepted.</p>
        )}

        {selectedInfo === "tracking" && (
          <p>
            After ordering you can track your order using your phone number.
          </p>
        )}

        {selectedInfo === "policy" && <p>Refund is guaranteed.</p>}
      </div>
    </div>
  );
};

export default CustomerInfo;
