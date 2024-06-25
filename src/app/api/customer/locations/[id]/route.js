import { NextResponse } from "next/server";

export async function GET(request, content) {
  console.log(content.params.id);
  return NextResponse.json({ success: true });
}
