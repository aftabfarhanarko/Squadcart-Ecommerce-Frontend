import axios from "axios";
import { NextResponse } from "next/server";
import { getApiUrl, API_CONFIG } from "@/lib/api-config";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    // Use public registration endpoint with companyId from config
    const userResponse = await axios.post(
      getApiUrl("/users/register"),
      {
        name,
        email,
        phone: phone || undefined,
        password,
        role: "customer",
        companyId: API_CONFIG.companyId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        user: userResponse.data.data,
        message: userResponse.data.message || "User registered successfully"
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    const axiosError = error as { response?: { data?: { message?: string }; status?: number }; message?: string };
    const errorMessage = axiosError.response?.data?.message || axiosError.message || "An unknown error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: axiosError.response?.status || 400 }
    );
  }
}
