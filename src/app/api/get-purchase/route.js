import { NextResponse } from 'next/server';
import clientPromise from "@/app/lib/mongoDB";

export async function GET(req) {
    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);
      const collection = db.collection("AnnualDB");
  
      // Retrieve data from the collection
      const results = await collection.find({}).toArray(); // Fetch all documents
  
      return NextResponse.json(
        { message: "Data retrieved successfully", results },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Error retrieving data",
          error: error.message || "Unknown error occurred",
        },
        { status: 500 }
      );
    }
  }