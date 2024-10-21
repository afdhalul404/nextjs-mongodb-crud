import { NextResponse } from "next/server"
import connect from "../../../../lib/db";
import User from "../../../../lib/modals/user";

export const GET = async () => {
   try {
      await connect();
      const users = await User.find();
      return new NextResponse(JSON.stringify(users), {status: 200});
   }
   catch (err: any){
      return new NextResponse("Error in fetching users" + err.message, {
         status: 500,
      })
   }

}

export const POST = async (req: Request) => {
   try {
      await connect();
      const body = await req.json();
      const { email, username, password } = body;

      // Validation (optional)
      if (!email || !username || !password) {
         return new NextResponse("Missing fields", { status: 400 });
      }
      // Create new user
      const newUser = new User({
         email,
         username,
         password,
      });

      await newUser.save();
      return new NextResponse(JSON.stringify(newUser), { status: 201 });
   } catch (err: any) {
      return new NextResponse("Error creating user: " + err.message, {
         status: 500,
      });
   }
};