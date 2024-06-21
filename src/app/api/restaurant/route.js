import { uri } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Connect to Database
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

//GET API Method
export async function GET() {
  try {
    await connectToDatabase();
    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

//POST API Method
export async function POST(request) {
  try {
    const payload = await request.json();
    await connectToDatabase();
    let result;
    let success = false;

    if (payload.login) {
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      success = result ? true : false;
    } else {
      const existingUser = await restaurantSchema.findOne({
        email: payload.email,
      });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      success = result ? true : false;
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
