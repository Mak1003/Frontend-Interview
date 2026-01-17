import { Blog } from "../types/blog"
import BlogCard from "./BlogCard"

interface Props {
  blogs: Blog[]
  onSelect: (id: string) => void
}

export default function BlogList({ blogs, onSelect }: Props) {
  return (
    <div>
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} onSelect={onSelect} />
      ))}
    </div>
  )
}
