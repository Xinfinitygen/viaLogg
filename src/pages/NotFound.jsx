
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
            <Card className="w-full max-w-lg text-center">
                <CardContent className="space-y-5 py-12">
                    <h1 className="text-7xl font-bold tracking-tight">
                        404
                    </h1>

                    <h2 className="text-2xl font-semibold">
                        Page Not Found
                    </h2>

                    <p className="text-muted-foreground">
                        Sorry, the page you're looking for doesn't exist
                        or may have been moved.
                    </p>

                    <Button asChild>
                        <Link to="/">Back to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}

export default NotFound
