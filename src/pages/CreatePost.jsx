
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createPost } from '@/services/postsApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function CreatePost() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // Keep track of what the user enters in the form.
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
    })

    // Send the new post to the API when the form is submitted.
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] })
            navigate('/')
        },
    })

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        mutation.mutate({
            ...formData,
            status: 'PUBLISHED',
        })
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create a New Post
                    </CardTitle>
                    <CardDescription>
                        Share your thoughts and stories with the community.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Post Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter your post title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="excerpt" className="text-sm font-medium">
                                Short Description
                            </label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                placeholder="Write a short introduction..."
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">
                                Post Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your post here..."
                                value={formData.content}
                                onChange={handleChange}
                                rows={10}
                                required
                            />
                        </div>

                        {mutation.isError && (
                            <p className="text-sm text-destructive" role="alert">
                                {mutation.error.message || 'Failed to create post.'}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? 'Publishing...' : 'Publish Post'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default CreatePost
