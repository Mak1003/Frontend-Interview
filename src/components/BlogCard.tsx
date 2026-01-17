import { Blog } from "../types/blog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Props {
  blog: Blog
  onSelect: (id: string) => void
}

export default function BlogCard({ blog, onSelect }: Props) {
  

  return (
    <Card
      onClick={() => onSelect(blog.id)}
      className="cursor-pointer hover:bg-gray-50"
    >
      <CardContent className="space-y-2 p-4">
        <div className="flex flex-wrap gap-2">
          {blog.category.map(cat => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-600">{blog.description}</p>
      </CardContent>
    </Card>
)

}
