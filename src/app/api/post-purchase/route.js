import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongoDB";

export async function POST(req) {
  try {
    const body = await req.json();
    const { timeStamp, number } = body;

    // Validate input
    if (typeof timeStamp !== 'string' || !timeStamp || typeof number !== 'number') {
      return NextResponse.json(
        { message: "Invalid input, expected a valid timeStamp and a number." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);
    const collection = db.collection("AnnualDB-Buy");

    // Insert data into the collection
    const result = await collection.insertOne({ timeStamp, number }); // Insert the new data structure

    return NextResponse.json(
      { message: "Data added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error adding data",
        error: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
