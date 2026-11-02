
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getArchivedPosts, updatePost, deletePost } from '@/services/postsApi'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

function Archive() {
    const queryClient = useQueryClient()

    // Fetch all posts currently in the archive.
    const {
        data: posts,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['archivedPosts'],
        queryFn: getArchivedPosts,
    })

    // Restore a post by changing its status back to PUBLISHED.
    const restoreMutation = useMutation({
        mutationFn: (id) => updatePost(id, { status: 'PUBLISHED' }),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['archivedPosts'] }),
                queryClient.invalidateQueries({ queryKey: ['posts'] }),
            ])
        },
    })

    // Permanently delete a post after the user confirms.
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['archivedPosts'] }),
                queryClient.invalidateQueries({ queryKey: ['posts'] }),
            ])
        },
    })

    function handleDelete(id) {
        const confirmed = window.confirm(
            'Are you sure you want to permanently delete this post? This action cannot be undone.'
        )

        if (confirmed) {
            deleteMutation.mutate(id)
        }
    }

    if (isLoading) {
        return (
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
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
                    {error?.message || 'Something went wrong while loading archived posts.'}
                </p>
            </section>
        )
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Archive
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your archived stories. Restore them or permanently delete them.
                </p>
            </header>

            {posts?.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post.id} className="h-full">
                            <Link
                                to={`/posts/${post.id}`}
                                className="block rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <div className="aspect-video overflow-hidden rounded-t-xl bg-muted">
                                    {post.featuredImage?.startsWith('https://') ||
                                        post.featuredImage?.startsWith('http://') ? (
                                        <>
                                            <img
                                                src={post.featuredImage}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                onError={(event) => {
                                                    event.currentTarget.hidden = true
                                                    event.currentTarget.nextElementSibling.hidden = false
                                                }}
                                            />
                                            <div
                                                hidden
                                                className="flex h-full items-center justify-center"
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
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardDescription>
                                        {post.category || 'General'}
                                    </CardDescription>
                                    <p className="text-xs text-muted-foreground">
                                        Archived post
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="line-clamp-3 text-sm text-muted-foreground">
                                        {post.excerpt || post.content}
                                    </p>
                                </CardContent>
                            </Link>

                            <div className="flex flex-wrap gap-2 px-6 pb-6">
                                <Button
                                    size="sm"
                                    disabled={restoreMutation.isPending}
                                    onClick={() => restoreMutation.mutate(post.id)}
                                >
                                    Restore
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    disabled={deleteMutation.isPending}
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete permanently
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="py-12 text-center text-muted-foreground">
                    Your archive is empty.
                </p>
            )}

            {(restoreMutation.isError || deleteMutation.isError) && (
                <p className="mt-6 text-center text-sm text-destructive">
                    {restoreMutation.error?.message || deleteMutation.error?.message}
                </p>
            )}
        </main>
    )
}

export default Archive
