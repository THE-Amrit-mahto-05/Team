import axios from "axios"

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
}

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

export const getTeam = () => API.get<TeamMember[]>("/team")