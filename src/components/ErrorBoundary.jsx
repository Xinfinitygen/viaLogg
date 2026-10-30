import { Component } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    }

    // Switch to the fallback UI when a child component crashes.
    static getDerivedStateFromError() {
        return { hasError: true }
    }

    // Keep the actual error available in the console for debugging.
    componentDidCatch(error, info) {
        console.error('ViaLogg encountered an error:', error, info)
    }

    // Reset the fallback state so the user can try again
    handleRetry = () => {
        this.setState({ hasError: false })
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
                    <Card className="w-full max-w-md text-center">
                        <CardHeader className="items-center">
                            <div className='mb-2 rounded-full bg-destructive/10 p-3'>
                                <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
                            </div>

                            <CardTitle>Something went wrong</CardTitle>

                            <CardDescription>
                                We couldn't display this page. Please try again.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Button onClick={this.handleRetry}>
                                <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            )
        }

        return this.props.children
    }

}
export default ErrorBoundary;