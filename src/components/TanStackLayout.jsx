
import {
    Link,
    Outlet,
} from '@tanstack/react-router'

// This component provides the layout shared by the demo routes.
function TanStackLayout() {
    return (
        <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
            <header>
                <h1 className="text-2xl font-bold">
                    TanStack Router Demo
                </h1>

                <nav className="mt-4 flex gap-4">
                    <Link to="/" className="text-primary hover:underline">
                        Demo Home
                    </Link>

                    <Link to="/about" className="text-primary hover:underline">
                        About
                    </Link>
                </nav>
            </header>

            <Outlet />
        </main>
    )
}

export default TanStackLayout
