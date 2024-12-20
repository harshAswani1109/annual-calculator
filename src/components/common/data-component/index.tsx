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

// Define the type for aggregated totals
interface AggregatedTotals {
  daily: Record<string, number>;
  monthly: Record<string, number>;
  yearly: Record<string, number>;
}

const DataComponent: React.FC = () => {
  const [purchaseData, setPurchaseData] = useState<AggregatedTotals["daily"]>({});
  const [saleData, setSaleData] = useState<AggregatedTotals["daily"]>({});
  const [purchaseTotals, setPurchaseTotals] = useState<AggregatedTotals>({
    daily: {},
    monthly: {},
    yearly: {},
  });
  const [saleTotals, setSaleTotals] = useState<AggregatedTotals>({
    daily: {},
    monthly: {},
    yearly: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchaseResponse = await axios.get<ApiResponse>("/api/get-purchase");
        const saleResponse = await axios.get<ApiResponse>("/api/get-sale");

        const purchases = calculateDailyTotals(purchaseResponse.data.results);
        const sales = calculateDailyTotals(saleResponse.data.results);

        setPurchaseData(purchases);
        setSaleData(sales);

        setPurchaseTotals(calculateAggregatedTotals(purchaseResponse.data.results));
        setSaleTotals(calculateAggregatedTotals(saleResponse.data.results));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateDailyTotals = (data: DataItem[]) => {
    const dailyTotals: Record<string, number> = {};
    data.forEach((item) => {
      const date = item.timeStamp.split("T")[0]; // Extract YYYY-MM-DD
      dailyTotals[date] = (dailyTotals[date] || 0) + item.number;
    });
    return dailyTotals;
  };

  const calculateAggregatedTotals = (data: DataItem[]): AggregatedTotals => {
    const totals: AggregatedTotals = { daily: {}, monthly: {}, yearly: {} };

    data.forEach((item) => {
      const date = item.timeStamp.split("T")[0]; // Extract YYYY-MM-DD
      const month = date.slice(0, 7); // Extract YYYY-MM
      const year = date.slice(0, 4); // Extract YYYY

      // Calculate daily totals
      totals.daily[date] = (totals.daily[date] || 0) + item.number;

      // Calculate monthly totals
      totals.monthly[month] = (totals.monthly[month] || 0) + item.number;

      // Calculate yearly totals
      totals.yearly[year] = (totals.yearly[year] || 0) + item.number;
    });

    return totals;
  };

  const renderTotals = (totals: AggregatedTotals, title: string) => (
    <div className="bg-gray-50 rounded-lg shadow-md p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="font-semibold text-blue-500">Yearly Totals</h4>
          <ul>
            {Object.entries(totals.yearly).map(([year, total]) => (
              <li key={year} className="text-sm">{`${year}: ${total.toLocaleString()}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-green-500">Monthly Totals</h4>
          <ul>
            {Object.entries(totals.monthly).map(([month, total]) => (
              <li key={month} className="text-sm">{`${month}: ${total.toLocaleString()}`}</li>
            ))}
          </ul>
        </div>
        {/* <div>
          <h4 className="font-semibold text-purple-500">Daily Totals</h4>
          <ul>
            {Object.entries(totals.daily).map(([date, total]) => (
              <li key={date} className="text-sm">{`${date}: ${total}`}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );

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
              <th className="border px-4 py-2">Total Number</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(purchaseData).map(([date, total]) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">{total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderTotals(purchaseTotals, "Purchase Totals")}
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
              <th className="border px-4 py-2">Total Number</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(saleData).map(([date, total]) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">{total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderTotals(saleTotals, "Sales Totals")}
      </div>
    </div>
  );
};

export default DataComponent;
