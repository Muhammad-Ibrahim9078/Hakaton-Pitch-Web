import { useAuthState } from "./hooks/useAuth";
import { auth } from "./services/firebase";
import { signOut } from "firebase/auth";
import Login from "./components/Login";
import PitchForm from "./components/PitchForm";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Swal from "sweetalert2";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [view, setView] = useState("dashboard"); // Default to dashboard
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to logout. Please try again.',
          icon: 'error'
        });
      }
    }
  };

  const handleViewChange = (newView) => {
    if (!user) {
      Swal.fire({
        title: 'First Login Required!',
        text: 'Please login first to access this feature',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowLoginPrompt(true);
        }
      });
      return;
    }
    setView(newView);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading IB-PitchCraft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 lg:py-0 lg:h-16 space-y-4 lg:space-y-0">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl text-purple-400 font-bold">IB-PitchCraft</h1>
              <span className="ml-2 lg:ml-3 text-xs sm:text-sm text-gray-400 hidden sm:block">AI Startup Partner</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <nav className="flex space-x-2">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className={`px-3 py-2 sm:px-4 text-sm rounded-lg font-medium transition-colors ${
                    view === "dashboard"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">📊</span>
                </button>
                <button
                  onClick={() => handleViewChange("create")}
                  className={`px-3 py-2 sm:px-4 text-sm rounded-lg font-medium transition-colors flex items-center space-x-1 sm:space-x-2 ${
                    view === "create"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">Create Pitch</span>
                  <span className="sm:hidden">+</span>
                </button>
              </nav>
              
              {user ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:border-l sm:border-gray-700 sm:pl-4">
                  <span className="text-xs sm:text-sm text-gray-300 truncate max-w-32 sm:max-w-none">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:border-l sm:border-gray-700 sm:pl-4">
                  <button
                    onClick={() => setShowLoginPrompt(true)}
                    className="px-3 py-2 sm:px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowLoginPrompt(true)}
                    className="px-3 py-2 sm:px-4 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {view === "create" ? <PitchForm /> : <Dashboard />}
      </main>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
              <p className="text-gray-400">Please login to access this feature</p>
            </div>
            <Login onLogin={() => {
              setShowLoginPrompt(false);
              window.location.reload();
            }} />
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              <p>© 2025 IB-PitchCraft. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-gray-400 text-xs sm:text-sm">Developed by</span>
              <a 
                href="https://github.com/Muhammad-Ibrahim9078" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 sm:space-x-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-xs sm:text-sm">Muhammad Ibrahim</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
