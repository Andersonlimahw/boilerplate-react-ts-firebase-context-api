// Mock for Firebase
export const mockFirebase = () => {
  jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
    GoogleAuthProvider: {
      credentialFromResult: jest.fn(),
      credentialFromError: jest.fn(),
    },
    signInWithPopup: jest.fn(),
  }));
  jest.mock('firebase/firestore', () => ({
    onSnapshot: jest.fn(),
  }));
};

// Mock for fetch
export const mockFetch = () => {
  jest.mock('node-fetch', () => jest.fn());
};
