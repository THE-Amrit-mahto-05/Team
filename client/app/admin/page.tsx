"use client";

import { useState, useEffect } from "react";
import { getTeam, addMember, updateMember, deleteMember, TeamMember, reorderTeam } from "@/lib/api";
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

  const fetchTeam = async () => {
    try {
      const res = await getTeam();
      setTeam(res.data);
      // Update cache so TeamPage reflects changes immediately
      localStorage.setItem("cached_team_data", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch team:", err);
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      fetchTeam();
    });
  }, []);

  const handleReorder = async (currentIndex: number, direction: "up" | "down") => {
    const newTeam = [...team];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= newTeam.length) return;

    // Swap items
    [newTeam[currentIndex], newTeam[targetIndex]] = [newTeam[targetIndex], newTeam[currentIndex]];
    
    setTeam(newTeam); // Optimistic update
    // Update cache optimistically
    localStorage.setItem("cached_team_data", JSON.stringify(newTeam));

    try {
      await reorderTeam(newTeam.map(m => m.id));
    } catch (err) {
      console.error("Failed to reorder team:", err);
      fetchTeam(); // Rollback on error and re-cache
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
    try {
      await deleteMember(id);
      fetchTeam();
    } catch (err) {
      console.error("Failed to delete member:", err);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-teal-500/20 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-teal-500 uppercase">
              System Admin
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setFormData({ name: "", role: "", bio: "", photo_url: "", linkedin: "" });
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto px-6 py-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs uppercase tracking-widest hover:bg-teal-500/20 transition-all"
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
              className="bg-zinc-900/50 border border-teal-500/20 p-4 md:p-8 rounded-xl mb-12 backdrop-blur-xl"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[10px] text-teal-500/60 uppercase mb-2">Name</label>
                    <input
                      id="name"
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-[10px] text-teal-500/60 uppercase mb-2">Role</label>
                    <input
                      id="role"
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="photo_url" className="block text-[10px] text-teal-500/60 uppercase mb-2">Photo URL</label>
                    <input
                      id="photo_url"
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.photo_url}
                      onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="linkedin" className="block text-[10px] text-teal-500/60 uppercase mb-2">LinkedIn URL</label>
                    <input
                      id="linkedin"
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-[10px] text-teal-500/60 uppercase mb-2">Bio</label>
                    <textarea
                      id="bio"
                      required
                      className="w-full bg-black border border-white/10 p-3 text-sm focus:border-teal-500/50 outline-none transition-all h-32"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
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
          {team.map((member, index) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 bg-zinc-900/30 border border-white/5 hover:border-teal-500/20 transition-all group gap-4"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-1 mr-2 invisible group-hover:visible hidden sm:flex">
                  <button 
                    onClick={() => handleReorder(index, "up")}
                    disabled={index === 0}
                    className="p-1 hover:text-teal-400 disabled:opacity-0 transition-colors"
                  >
                    ▲
                  </button>
                  <button 
                    onClick={() => handleReorder(index, "down")}
                    disabled={index === team.length - 1}
                    className="p-1 hover:text-teal-400 disabled:opacity-0 transition-colors"
                  >
                    ▼
                  </button>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-teal-500/20 flex-shrink-0">
                  <img src={member.photo_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold tracking-tight text-white uppercase truncate">{member.name}</h3>
                  <p className="text-[10px] text-teal-500/50 uppercase tracking-widest truncate">{member.role}</p>
                </div>
              </div>
              <div className="flex gap-4 sm:ml-auto">
                <div className="flex sm:hidden gap-2 mr-auto">
                  <button 
                    onClick={() => handleReorder(index, "up")}
                    disabled={index === 0}
                    className="p-2 bg-zinc-800 rounded text-xs disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button 
                    onClick={() => handleReorder(index, "down")}
                    disabled={index === team.length - 1}
                    className="p-2 bg-zinc-800 rounded text-xs disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
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
