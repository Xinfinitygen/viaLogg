import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { getPostById } from '@/services/postsApi'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function PostDetails() {
    // Get the post ID from the URL.
    const { id } = useParams()

    // Fetch the selected post.
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
    })

    if (isLoading) {
        return <p className="py-20 text-center">Loading post...</p>
    }

    if (isError) {
        return (
            <section className="mx-auto max-w-3xl px-6 py-12">
                <p className="text-center text-destructive">
                    {error.message || 'Unable to load this post.'}
                </p>
                <div className="mt-6 text-center">
                    <Button asChild variant="outline">
                        <Link to="/">Back to Home</Link>
                    </Button>

                </div>

            </section>
        )
    }
    // Some API responses wrap the post inside a data property.
    const postData = post?.data ?? post

    if (!postData?.id) {
        return <p className="py-20 text-center">Post not found.</p>
    }

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <Button asChild variant="outline" className="mb-8">
                <Link to="/">← Back to Home</Link>
            </Button>

            <Card>
                {/* Display the featured image when a valid URL is available. */}
                {postData.featuredImage?.startsWith('https://') ||
                    postData.featuredImage?.startsWith('http://') ? (
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={postData.featuredImage}
                            alt={postData.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex aspect-video items-center justify-center bg-muted">
                        <span className="text-sm font-medium text-muted-foreground">
                            ViaLogg
                        </span>
                    </div>
                )}
                <CardHeader>
                    <CardDescription>
                        {postData.category || 'General'}
                    </CardDescription>

                    <CardTitle className="text-3xl">
                        {postData.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>By {postData.author?.name || 'Anonymous'}</span>

                        {postData.publishedAt && (
                            <>
                                <span aria-hidden="true">•</span>
                                <time dateTime={postData.publishedAt}>
                                    {new Date(postData.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                        {postData.content}
                    </p>
                </CardContent>
            </Card>
        </main>
    )
}

export default PostDetails