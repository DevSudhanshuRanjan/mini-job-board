// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import PostJobPage from './pages/PostJobPage.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-canvas">
          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/"          element={<HomePage />} />
              <Route path="/jobs/:id"  element={<JobDetailPage />} />
              <Route path="/login"     element={<LoginPage />} />
              <Route path="/post-job"  element={
                <ProtectedRoute>
                  <PostJobPage />
                </ProtectedRoute>
              } />
              <Route path="*"          element={<NotFoundPage />} />
            </Routes>
          </div>

          <Footer />
        </div>

        {/* Toast notifications — DESIGN.MD: Notion-style light toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1a1a1a',
              border: '1px solid #e5e3df',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
              boxShadow: 'rgba(15, 15, 15, 0.08) 0px 4px 12px 0px',
            },
            success: {
              iconTheme: { primary: '#1aae39', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#e03131', secondary: '#ffffff' },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
