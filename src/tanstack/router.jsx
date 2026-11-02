import TanStackLayout from '@/components/TanStackLayout'
import {
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router'
import { createMemoryHistory } from '@tanstack/react-router'

// This is the parent route for the demo.
const rootRoute = createRootRoute({
    component: TanStackLayout,
})

// First child route.
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <h2>Welcome to the TanStack Router demonstration.</h2>,
})

// Second child route.
const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <h2>This page uses TanStack Router navigation.</h2>,
})

// Connect the routes into a route tree.
const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
])

// Keep this router's navigation separate from the main application.
const memoryHistory = createMemoryHistory({
    initialEntries: ['/'],
})

export const tanStackRouter = createRouter({
    routeTree,
    history: memoryHistory,
})
