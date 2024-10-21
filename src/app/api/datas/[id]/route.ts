import { NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import User from "../../../../../lib/modals/user";

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connect();
    const { id } = params;
    const { email, username, password } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, username, password }, // Mengupdate data
      { new: true } // Mengembalikan data pengguna setelah diupdate
    );

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (err: any) {
    return new NextResponse("Error in updating user: " + err.message, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
   const { id } = params;
   try {
      await connect();
      const user = await User.findByIdAndDelete(id);

      if (!user) {
         return new NextResponse("User not found", { status: 404 });
      }

      return new NextResponse("User deleted successfully", { status: 200 });
   } catch (err: any) {
      return new NextResponse("Error deleting user: " + err.message, { status: 500 });
   }
};