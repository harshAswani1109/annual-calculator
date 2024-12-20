"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for each data item
interface DataItem {
  _id: string;
  timeStamp: string;
  number: number;
}

// Define the type for the API response
interface ApiResponse {
  message: string;
  results: DataItem[];
}

// Define the type for monthly totals
interface MonthlyTotals {
  purchases: Record<string, number>;
  sales: Record<string, number>;
}

const DataComponent: React.FC = () => {
  const [purchaseData, setPurchaseData] = useState<DataItem[]>([]);
  const [saleData, setSaleData] = useState<DataItem[]>([]);
  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotals>({
    purchases: {},
    sales: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchaseResponse = await axios.get<ApiResponse>("/api/get-purchase");
        const saleResponse = await axios.get<ApiResponse>("/api/get-sale");

        setPurchaseData(purchaseResponse.data.results);
        setSaleData(saleResponse.data.results);

        calculateMonthlyTotals(
          purchaseResponse.data.results,
          saleResponse.data.results
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateMonthlyTotals = (purchases: DataItem[], sales: DataItem[]) => {
    const totals: MonthlyTotals = { purchases: {}, sales: {} };

    const addToTotals = (data: DataItem[], key: keyof MonthlyTotals) => {
      data.forEach((item) => {
        const month = item.timeStamp.slice(0, 7); // Extract YYYY-MM format
        totals[key][month] = (totals[key][month] || 0) + item.number;
      });
    };

    addToTotals(purchases, "purchases");
    addToTotals(sales, "sales");

    setMonthlyTotals(totals);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen mt-12">
      {/* Purchases Table */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-lg font-bold text-center bg-blue-500 text-white py-4">
          Purchases
        </h2>
        <table className="w-full border-collapse text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Number</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.timeStamp}</td>
                <td className="border px-4 py-2">{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Table */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-lg font-bold text-center bg-green-500 text-white py-4">
          Sales
        </h2>
        <table className="w-full border-collapse text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Number</th>
            </tr>
          </thead>
          <tbody>
            {saleData.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.timeStamp}</td>
                <td className="border px-4 py-2">{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataComponent;
