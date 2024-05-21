import "./App.css";
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes/Routes";

function App() {

  
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App;
