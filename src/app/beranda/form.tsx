import { ChangeEvent, FormEvent } from "react";

interface FormProps {
   formData: {
      email: string;
      username: string;
      password: string;
   };
   handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
   handleSubmit: (e: FormEvent) => void;
   isEditing: boolean; // Untuk mengecek apakah dalam mode edit atau tambah
}

export default function Form({ formData, handleChange, handleSubmit, isEditing }: FormProps) {
   return (
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto my-5">
         <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
               Email
            </label>
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               className="input input-bordered w-full"
               required
            />
         </div>
         <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
               Username
            </label>
            <input
               type="text"
               name="username"
               placeholder="Username"
               value={formData.username}
               onChange={handleChange}
               className="input input-bordered w-full"
               required
            />
         </div>
         <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
               Password
            </label>
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={formData.password}
               onChange={handleChange}
               className="input input-bordered w-full"
               // required={!isEditing} // Password tidak wajib saat mode edit
            />
         </div>
         <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
               {isEditing ? "Update Pengguna" : "Tambah Pengguna"} {/* Ubah teks tombol */}
            </button>
         </div>
      </form>
   );
}
