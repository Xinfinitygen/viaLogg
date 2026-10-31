const API_URL = 'https://api.oluwasetemi.dev'

// Fetch all blog posts from API.
export async function getPosts() {
    const response = await fetch(`${API_URL}/posts?status=PUBLISHED`)

    if (!response.ok) {
        throw new Error('Failed to fetch blog posts.')
    }

    const data = await response.json()

    return data.data
}

// Create a new blog post.
export async function createPost(postData) {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })

    if (!response.ok) {
        throw new Error('Failed to create the blog post.')
    }

    return response.json()
}