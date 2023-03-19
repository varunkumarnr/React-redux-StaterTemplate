import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/layout/Home";
import PrivateRoute from "./utils/PrivateRoute";
import setAuthToken from "./utils/SetAuthToken";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/token" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
