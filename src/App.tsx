import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "./api/blogs"
import BlogList from "./components/BlogList"
import BlogDetail from "./components/BlogDetail"
import CreateBlogForm from "./components/CreateBlogForm"
import { Blog } from "./types/blog"

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) return <p>Loading blogs...</p>
  if (error || !blogs) return <p>Error loading blogs</p>

  const selectedBlog: Blog | undefined =
    blogs.find(b => b.id === selectedId) ?? blogs[0]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CreateBlogForm onCreated={setSelectedId} />
          <BlogList blogs={blogs} onSelect={setSelectedId} />
        </div>
        <div className="lg:col-span-2">
          <BlogDetail blog={selectedBlog} />
        </div>
      </div>
    </div>
  )

}