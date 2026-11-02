
import { RouterProvider } from '@tanstack/react-router'
import { tanStackRouter } from '@/tanstack/router'

function TanStackDemo() {
    return <RouterProvider router={tanStackRouter} />
}

export default TanStackDemo
