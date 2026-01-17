import { useQuery } from "@tanstack/react-query"
import { getBlogById } from "../api/blogs"

export default function BlogDetail({ blog }: { blog: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["blog", blog.id],
    queryFn: () => getBlogById(blog.id),
  })

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <img
        src={data.coverImage}
        alt={data.title}
        className="mb-4 w-full rounded-lg"
      />
      <h2 className="mb-2 text-2xl font-bold">{data.title}</h2>
      <p className="whitespace-pre-line text-gray-700">
        {data.content}
      </p>
    </div>
  )

}
