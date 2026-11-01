import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
