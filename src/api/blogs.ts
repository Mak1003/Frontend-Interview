import axios from "axios"
import { Blog } from "../types/blog"

const api = axios.create({
  baseURL: "http://localhost:3001",
})

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await api.get("/blogs")
  return res.data
}

export const getBlogById = async (id: string): Promise<Blog> => {
  const res = await api.get(`/blogs/${id}`)
  return res.data
}

export const createBlog = async (
  blog: Omit<Blog, "id">
): Promise<Blog> => {
  const res = await api.post("/blogs", blog)
  return res.data
}
