import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

export default function HomePage() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log('Logged out successfully!')) // logout successful
      .catch((error) => console.log(error)); // logout fail

    // Redirect to login page or another page
    // window.location.href = '/login'; // Uncomment to use redirection
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout 버튼</button>
    </div>
  );
}
