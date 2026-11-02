
# ViaLogg — Blog Application

A modern, responsive blog application built with React, featuring post creation, content management, and dynamic data fetching.

**Live Demo:** [View ViaLogg](https://via-logg.vercel.app/)

## Overview

ViaLogg is a blog application developed to explore modern React development practices and client-side application management. It allows users to browse published articles, view individual posts, create new content, and manage archived posts through a clean and responsive interface.

The project also demonstrates the integration of multiple routing solutions, server-state management, reusable components, and asynchronous data handling.

## Features

- **Browse Posts:** View published blog posts in an organized card layout.
- **Post Details:** Navigate to individual posts to read their full content.
- **Create Posts:** Publish new articles with titles, excerpts, categories, content, and featured image URLs.
- **Archive Posts:** Move published posts into the archive.
- **Restore Posts:** Return archived posts to the published list.
- **Delete Posts:** Remove archived posts.
- **Routing:** Navigate between pages using React Router, with a separate TanStack Router demonstration.
- **Lazy Loading:** Load page components when needed using React lazy loading and Suspense.
- **Error Handling:** Handle application-level errors with an Error Boundary and manage API errors through TanStack Query.
- **Responsive Design:** Adapt the interface to different screen sizes.

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| JavaScript | Application logic |
| Vite | Development environment and build tool |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Reusable UI components |
| Lucide React | Icons |
| React Router DOM | Application routing |
| TanStack Router | Additional routing implementation |
| TanStack Query | Server-state management and data fetching |

## API Integration

ViaLogg uses the [Oluwasetemi API](https://api.oluwasetemi.dev/) to manage blog content.

The application interacts with the API to:

- Retrieve published posts.
- Retrieve archived posts.
- Fetch individual posts by ID.
- Create new posts.
- Update post status and content.
- Delete posts.

TanStack Query handles asynchronous requests, loading states, error states, caching, and query invalidation.

## Project Structure

```text
src/
├── components/
│   ├── ui/
│   ├── ErrorBoundary.jsx
│   └── Navigation.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── PostDetails.jsx
│   ├── CreatePost.jsx
│   ├── Archive.jsx
│   └── NotFound.jsx
│
├── services/
│   └── postsApi.js
│
├── tanstack/
│   └── router.js
│
├── App.jsx
├── main.jsx
└── index.css
```

*Note: This is a simplified overview of the main application structure.*

## Getting Started

To run ViaLogg locally, follow these steps.

### Prerequisites

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Xinfinitygen/viaLogg.git
```

**2. Navigate to the project directory**

```bash
cd viaLogg
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Build for production**

```bash
npm run build
```

## Challenges & Learning Experience

Building ViaLogg provided an opportunity to work through several practical frontend development challenges.

- **Working with Multiple Routing Libraries:** Implementing React Router and TanStack Router helped me understand their different approaches to client-side navigation and route management.
- **Managing Server State:** Integrating TanStack Query required understanding query keys, caching, mutations, and invalidating queries to keep the interface synchronized with API changes.
- **Handling Asynchronous Operations:** Implementing loading indicators, error states, Suspense, and Error Boundaries improved how the application handles different request and rendering states.
- **Managing Post Operations:** Implementing post creation, archiving, restoration, and deletion required coordinating API mutations with the application's cached data.
- **Handling API Limitations:** I encountered an issue where the API reported successful deletion of certain default archived posts but continued returning them. I implemented a browser-side localStorage workaround to keep those posts hidden in the current browser.
- **Responsive UI Development:** Building a consistent interface across different screen sizes required careful use of Tailwind CSS and reusable UI components.

## What I Learned

Through this project, I strengthened my understanding of:

- React component architecture and reusable components.
- Client-side routing and navigation.
- Server-state management with TanStack Query.
- Working with REST APIs and asynchronous JavaScript.
- Mutations, caching, and query invalidation.
- Error handling and lazy loading.
- Building responsive interfaces with Tailwind CSS.
- Managing and deploying a React application.
## Project Status

🚧 **In Development**

ViaLogg is an ongoing project. The current version includes its core blogging and content management features, with additional improvements and features planned for future releases.

Development is still in progress, and the application will continue to evolve as new features and enhancements are implemented.

## Future Improvements...

- Additional content management features.
- Improved user experience and interface enhancements.
- More advanced blog discovery and navigation.
- Further performance and accessibility improvements.

## Deployment

ViaLogg is deployed using [Vercel](https://via-logg.vercel.app/)

## Author

**Okechukwu**

- GitHub: [@Xinfinitygen](https://github.com/Xinfinitygen)