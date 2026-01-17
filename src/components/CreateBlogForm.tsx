import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "../api/blogs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function CreateBlogForm({
  onCreated,
}: {
  onCreated: (id: string) => void
}) {
  const qc = useQueryClient()

  const [form, setForm] = useState({
    title: "",
    description: "",
    coverImage: "",
    content: "",
  })

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      qc.invalidateQueries({ queryKey: ["blogs"] })
      onCreated(newBlog.id!)
      setForm({
        title: "",
        description: "",
        coverImage: "",
        content: "",
      })
    },
  })

  const submit = () => {
    if (!form.title || !form.content) return

    mutation.mutate({
      ...form,
      category: ["GENERAL"],
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">Create Blog</h3>

      <Input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="mb-2"
      />

      <Input
        placeholder="Cover Image URL"
        value={form.coverImage}
        onChange={e =>
          setForm({ ...form, coverImage: e.target.value })
        }
        className="mb-2"
      />

      <Input
        placeholder="Short Description"
        value={form.description}
        onChange={e =>
          setForm({ ...form, description: e.target.value })
        }
        className="mb-2"
      />

      <Textarea
        placeholder="Content"
        value={form.content}
        onChange={e =>
          setForm({ ...form, content: e.target.value })
        }
        className="mb-3"
      />

      <Button
        onClick={submit}
        disabled={mutation.isPending}
        className="w-full"
      >
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>
    </div>
  )


}
