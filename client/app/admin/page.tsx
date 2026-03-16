"use client";

import { useState, useEffect } from "react";
import { getTeam, addMember, updateMember, deleteMember, TeamMember } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await getTeam();
      setTeam(res.data);
    } catch (err) {
      console.error("Failed to fetch team:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await updateMember(editingMember.id, { ...formData, id: editingMember.id } as TeamMember);
      } else {
        await addMember(formData as TeamMember);
      }
      setIsFormOpen(false);
      setEditingMember(null);
      setFormData({ name: "", role: "", bio: "", photo_url: "", linkedin: "" });
      fetchTeam();
    } catch (err) {
      console.error("Failed to save member:", err);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo_url: member.photo_url,
      linkedin: member.linkedin || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        await deleteMember(id);
        fetchTeam();
      } catch (err) {
        console.error("Failed to delete member:", err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-teal-500/20 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-teal-500 uppercase">
              System Admin
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setFormData({ name: "", role: "", bio: "", photo_url: "", linkedin: "" });
              setIsFormOpen(true);
            }}
            className="px-6 py-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs uppercase tracking-widest hover:bg-teal-500/20 transition-all"
          >
            [+] Add Node
          </button>
        </header>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-zinc-900/50 border border-teal-500/20 p-8 rounded-xl mb-12 backdrop-blur-xl"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-teal-500/60 uppercase mb-2">Name</label>
                    <input
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-teal-500/60 uppercase mb-2">Role</label>
                    <input
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-teal-500/60 uppercase mb-2">Photo URL</label>
                    <input
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.photo_url}
                      onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-teal-500/60 uppercase mb-2">LinkedIn URL</label>
                    <input
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-teal-500/60 uppercase mb-2">Bio</label>
                    <textarea
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all h-32"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-teal-500 text-black text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    {editingMember ? "Update Record" : "Upload Data"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-8 py-3 bg-zinc-800 text-zinc-400 text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-6 bg-zinc-900/30 border border-white/5 hover:border-teal-500/20 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-teal-500/20">
                  <img src={member.photo_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white uppercase">{member.name}</h3>
                  <p className="text-[10px] text-teal-500/50 uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-[10px] text-teal-500/60 uppercase tracking-widest hover:text-teal-400 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-[10px] text-red-500/60 uppercase tracking-widest hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
