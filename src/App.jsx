import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const PostDetails = lazy(() => import('./pages/PostDetails'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
import Navigation from './components/Navigation'
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<p className="py-20 text-center">Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
