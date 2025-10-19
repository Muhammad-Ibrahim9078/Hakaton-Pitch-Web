import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm sm:w-80"
      >
        <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-4">
          {isSignup ? "Create Account" : "Login"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-500 disabled:cursor-not-allowed w-full py-2 sm:py-3 rounded flex items-center justify-center text-sm sm:text-base"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              <span className="text-xs sm:text-sm">{isSignup ? "Creating Account..." : "Logging in..."}</span>
            </>
          ) : (
            isSignup ? "Sign Up" : "Login"
          )}
        </button>
        
        {/* Divider */}
        <div className="flex items-center my-3 sm:my-4">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-3 text-gray-400 text-xs sm:text-sm">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        
        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-gray-600 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
              <span className="text-xs sm:text-sm">Authenticating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xs sm:text-sm">Continue with Google</span>
            </>
          )}
        </button>
        
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-xs sm:text-sm text-gray-400 mt-3 cursor-pointer text-center"
        >
          {isSignup ? "Already have an account?" : "Create new account"}
        </p>
      </form>
    </div>
  );
}
