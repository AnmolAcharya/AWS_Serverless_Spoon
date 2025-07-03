import { useAuth } from "react-oidc-context";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ItemDetails from "./ItemDetails";
import ChatBot from "./ChatBot";


function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    // const logoutUri = "http://localhost:5173"
    // const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Encountering error... {auth.error.message}</div>;

  if (auth.isAuthenticated) {
    return (
      <div>
        <Home />
        {/* <ChatBot /> */}
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
  // return <Home />;
}

export default App;


// import { useAuth } from "react-oidc-context";
// import { Routes, Route } from "react-router-dom";
// import Home from "./Home";
// // import ChatBot from "./ChatBot";

// function App() {
//   // Local dev version — no auth
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// // ✅ This line is required
// export default App;