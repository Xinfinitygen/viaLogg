import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPosts, updatePost } from '@/services/postsApi'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Displays published posts and provides access to archive actions.
function Home() {
    const {
        data: posts,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    const queryClient = useQueryClient()

    // Move a published post into the archive.
    const archiveMutation = useMutation({
        mutationFn: (id) => updatePost(id, { status: 'ARCHIVED' }),

        // Refresh Home and Archive so the post moves between the two pages.
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['posts'] }),
                queryClient.invalidateQueries({ queryKey: ['archivedPosts'] }),
            ])
        },
    })

    if (isLoading) {
        return (
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section className="mx-auto max-w-7xl px-6 py-12">
                <p className="text-center text-destructive">
                    {error?.message || 'Something went wrong while loading posts.'}
                </p>
            </section>
        )
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Discover Stories
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Explore articles, ideas, and stories from our community.
                </p>
            </header>


            {posts?.length > 0 ? (
                <>
                    {/* Display all published posts in a responsive grid. */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Card key={post.id} className="h-full transition-shadow hover:shadow-md">
                                <Link
                                    to={`/posts/${post.id}`}
                                    className="group block rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                >
                                    <div className="aspect-video overflow-hidden rounded-t-xl bg-muted">
                                        {post.featuredImage?.startsWith('https://') ||
                                            post.featuredImage?.startsWith('http://') ? (
                                            <>
                                                <img
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                    onError={(event) => {
                                                        event.currentTarget.hidden = true
                                                        event.currentTarget.nextElementSibling.hidden = false
                                                    }}
                                                />

                                                <div
                                                    hidden
                                                    className="flex h-full items-center justify-center bg-linear-to-br from-muted via-muted/80 to-primary/10"
                                                >
                                                    <span className="text-sm font-medium text-muted-foreground">
                                                        ViaLogg
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    ViaLogg
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">
                                            {post.title}
                                        </CardTitle>

                                        <CardDescription className="mt-2 w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                            {post.category || 'General'}
                                        </CardDescription>

                                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                            <span>
                                                By {post.author?.name || 'Anonymous'}
                                            </span>

                                            {post.publishedAt && (
                                                <>
                                                    <span aria-hidden="true">•</span>
                                                    <time dateTime={post.publishedAt}>
                                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </time>
                                                </>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="line-clamp-3 min-h-18 text-sm leading-relaxed text-muted-foreground">
                                            {post.excerpt || post.content}
                                        </p>
                                    </CardContent>
                                </Link>

                                {/* Keep the archive action separate from the post link. */}
                                <div className="px-6 pb-6">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={archiveMutation.isPending}
                                        onClick={() => archiveMutation.mutate(post.id)}
                                    >
                                        Archive
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Show an error if the API cannot archive a post. */}
                    {archiveMutation.isError && (
                        <p className="mt-4 text-sm text-destructive">
                            {archiveMutation.error?.message || 'Failed to archive this post.'}
                        </p>
                    )}
                </>
            ) : (
                <p className="py-12 text-center text-muted-foreground">
                    No published posts available yet.
                </p>
            )}

        </main >
    )
}

export default Home