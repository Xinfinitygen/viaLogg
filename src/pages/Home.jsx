import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/postsApi'
import { Link } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

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
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/posts/${post.id}`}
                            className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                        >
                            <Card className="h-full transition-shadow hover:shadow-md">

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

                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
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
                                    <p className="line-clamp-3 text-sm text-muted-foreground">
                                        {post.excerpt || post.content}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="py-12 text-center text-muted-foreground">
                    No published posts available yet.
                </p>
            )}
        </main>
    )
}

export default Home