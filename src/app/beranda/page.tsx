"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Form from "./form";
import Navbar from "./navbar";

interface User {
   _id: string;
   email: string;
   username: string;
   password: string;
}


export default function Page() {
   const [users, setUsers] = useState<User[]>([]); // State untuk menyimpan daftar pengguna
   const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: "",
   }); // State untuk menyimpan data form
   const [isEditing, setIsEditing] = useState(false); // State untuk mengatur mode edit
   const [editUserId, setEditUserId] = useState<string | null>(null); // Menyimpan ID pengguna yang sedang diedit

   // Fungsi untuk mengambil data pengguna dari API saat halaman dimuat
   useEffect(() => {
      const fetchUsers = async () => {
         const res = await fetch("/api/datas");
         const data = await res.json();
         setUsers(data); // Menyimpan data pengguna ke state
      };

      fetchUsers();
   }, []);

   // Mengatur perubahan di input form
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value, // Update nilai input form
      });
   };

   // Fungsi untuk menangani pengiriman form
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (isEditing && editUserId) {
         // Jika sedang mengedit, lakukan update
         const res = await fetch(`/api/datas/${editUserId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         if (res.ok) {
            const updatedUser = await res.json();
            setUsers((prevUsers) =>
               prevUsers.map((user) =>
                  user._id === editUserId ? updatedUser : user
               )
            ); // Update daftar pengguna
            setIsEditing(false); // Kembali ke mode tambah
            setEditUserId(null); // Hapus ID pengguna yang sedang diedit
            setFormData({ email: "", username: "", password: "" }); // Reset form
         }
      } else {
         // Jika tidak dalam mode edit, lakukan tambah pengguna baru
         const res = await fetch("/api/datas", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         if (res.ok) {
            const newUser = await res.json();
            setUsers((prev) => [...prev, newUser]); // Tambahkan pengguna baru ke daftar pengguna
            setFormData({ email: "", username: "", password: "" }); // Reset form
         }
      }
   };

   // Fungsi untuk menangani klik tombol edit
   const handleEdit = (user: User) => {
      setIsEditing(true);
      setEditUserId(user._id);
      setFormData({
         email: user.email,
         username: user.username,
         password: '', // Kosongkan password saat edit
      });
   };

   // Fungsi untuk menangani penghapusan pengguna
   const handleDelete = async (id: string) => {
      const res = await fetch(`/api/datas/${id}`, {
         method: "DELETE",
      });

      if (res.ok) {
         setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Hapus pengguna dari state
      }
   };

   return (
      <div>
         <Navbar />
         <div className="px-16">
            <Form
               formData={formData}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               isEditing={isEditing} // Menyampaikan apakah sedang dalam mode edit atau tambah
            />
            <h1 className="text-xl font-bold text-center mt-5">Daftar Pengguna</h1>
            <div className="overflow-x-auto">
               <table className="table table-zebra">
                  <thead>
                     <tr className="text-center bg-bl">
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user, index) => (
                        <tr key={user._id}>
                           <td>{index + 1}</td>
                           <td>{user.username}</td>
                           <td>{user.email}</td>
                           <td>
                              <button
                                 onClick={() => handleEdit(user)}
                                 className="btn btn-warning mr-2"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDelete(user._id)}
                                 className="btn btn-error"
                              >
                                 Hapus
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
