import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan." },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, secret);

    // Ambil user lengkap dari DB
    const user = await userAccount.findById(payload.id)
      .select("-password") // jangan kirim password
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Token valid",
      user,
    });

  } catch (error: any) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Token tidak valid atau expired." },
      { status: 401 }
    );
  }
}
