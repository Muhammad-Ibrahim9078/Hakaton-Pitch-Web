import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User authenticated:", currentUser.uid);
        loadPitches(currentUser.uid);
      } else {
        console.log("User not authenticated");
        setPitches([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const loadPitches = (userId) => {
    setLoading(true);
    console.log("Loading pitches for user:", userId);
    
    const q = query(collection(db, "pitches"), where("uid", "==", userId));
    
    // Real-time listener for pitches
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pitchData = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      console.log("Real-time pitches update:", pitchData);
      
      // Sort by creation date (newest first)
      pitchData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPitches(pitchData);
      setLoading(false);
    }, (error) => {
      console.error("Error loading pitches:", error);
      setLoading(false);
    });

    return unsubscribe;
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl text-gray-300 mb-2">Authentication Required</h3>
          <p className="text-gray-400">Please log in to view your pitches.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading your pitches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-purple-400 font-bold">Your Saved Pitches</h2>
        <span className="text-gray-400 text-sm">
          {pitches.length} pitch{pitches.length !== 1 ? 'es' : ''} saved
        </span>
      </div>
      
      {pitches.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl text-gray-300 mb-3 font-semibold">Welcome to IB-PitchCraft!</h3>
          <p className="text-gray-400 mb-6 text-lg">You haven't created any pitches yet.</p>
          <div className="bg-gray-700 p-6 rounded-xl max-w-md mx-auto border border-gray-600">
            <p className="text-white font-medium mb-2">Ready to create your first startup pitch?</p>
            <p className="text-gray-300 text-sm">Click the "Create Pitch" button above to get started!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {pitches.map((pitch, index) => (
            <div key={pitch.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              
              {/* Header Section */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Business Pitch #{index + 1}</h3>
                    <p className="text-gray-400 text-sm">Created on {new Date(pitch.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs">
                    AI Generated
                  </div>
                </div>
              </div>

              {/* Original Idea Section */}
              <div className="mb-6 p-4 bg-gray-700 rounded-xl border-l-4 border-purple-500">
                <h4 className="text-purple-300 font-semibold mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                  </svg>
                  Original Idea
                </h4>
                <p className="text-gray-300 text-lg italic">"{pitch.originalIdea}"</p>
              </div>

              {/* Business Name */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                  Business Name
                </h4>
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
                  <h5 className="text-white font-bold text-2xl mb-2">{pitch.option1?.name || "Business Name"}</h5>
                  <p className="text-gray-300 italic text-lg">{pitch.option1?.tagline || "Business Tagline"}</p>
                </div>
              </div>

              {/* Business Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-5 rounded-xl border border-gray-600">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Elevator Pitch
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{pitch.pitch}</p>
                </div>
                
                <div className="bg-gray-700 p-5 rounded-xl border border-gray-600">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    Target Audience
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{pitch.audience}</p>
                </div>
              </div>

              {/* Landing Page Copy */}
              <div className="mt-6 bg-gray-700 p-5 rounded-xl border border-gray-600">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Landing Page Copy
                </h4>
                <p className="text-gray-300 text-lg">{pitch.landingText}</p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Generated by AI
                  </span>
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                    </svg>
                    Saved to Dashboard
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Pitch #{index + 1}
                </div>
              </div>
        </div>
      ))}
        </div>
      )}
    </div>
  );
}
