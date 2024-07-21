import Routing from "./routes/Routing.jsx";
import AuthContext from "./contexts/AuthContext.jsx";
import useAuth from "./hooks/useAuth.jsx";

export function App() {
  return <Routing basename={'/'} />;
}

export function Root() {
  const data = useAuth();
  return (
      <AuthContext.Provider value={data}>
        <App />
      </AuthContext.Provider>
  );
}