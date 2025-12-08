import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie");
  const refresh_token = cookie?.split("refresh_token=")[1]?.split(";")[0];

  if (!refresh_token)
    return NextResponse.json({ message: "No refresh" }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(refresh_token, secret);

    const newAccess = await new SignJWT({ id: payload.id, email: payload.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(secret);

    return NextResponse.json({ accessToken: newAccess });
  } catch {
    return NextResponse.json({ message: "Invalid refresh" }, { status: 401 });
  }
}
