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

// Fetch a single blog post using its ID.
export async function getPostById(id) {
    const response = await fetch(`${API_URL}/posts/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch the blog post.')
    }

    return response.json()
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

// Fetch posts that have been moved to the archive.
export async function getArchivedPosts() {
    const response = await fetch(`${API_URL}/posts?status=ARCHIVED`)

    if (!response.ok) {
        throw new Error('Failed to fetch archived posts.')
    }

    const data = await response.json()

    return data.data
}

// Update a post, including its publication status.
export async function updatePost(id, postData) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })

    if (!response.ok) {
        throw new Error('Failed to update the blog post.')
    }

    return response.json()
}

// Permanently delete a post.
export async function deletePost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Failed to delete the blog post.')
    }

    return response.json()
}