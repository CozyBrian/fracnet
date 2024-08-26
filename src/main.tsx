import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "./index.css"

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import AuthProvider, { useAuthContext } from './providers/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new router instance
const router = createRouter({ 
  routeTree, 
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
function InnerApp() {
  const auth = useAuthContext();
  return <RouterProvider router={router} context={{ auth }} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>,
  )
}
