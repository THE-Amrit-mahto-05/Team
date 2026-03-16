import axios from "axios"

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

const API = axios.create({
  baseURL: API_BASE_URL
})

export const getTeam = () => API.get<TeamMember[]>("/team")
export const addMember = (member: Omit<TeamMember, 'id'>) => API.post<TeamMember>("/team", member)
export const updateMember = (id: string, member: TeamMember) => API.put<TeamMember>(`/team/${id}`, member)
export const deleteMember = (id: string) => API.delete<{message: string}>(`/team/${id}`)
export const reorderTeam = (ids: string[]) => API.post<TeamMember[]>("/team/reorder", ids)