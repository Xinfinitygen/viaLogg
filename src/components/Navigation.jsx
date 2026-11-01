
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Navigation() {
    return (
        <nav className="border-b">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link to="/" className="text-xl font-bold tracking-tight">
                    ViaLogg
                </Link>

                <div className="flex items-center gap-4">
                    <NavLink
                        to="/"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Home
                    </NavLink>

                    <Button asChild>
                        <Link to="/create">Create Post</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
