import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./view/Auth";
import Dashboard from "./view/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from "./contexts/PostContext";
import TodoContextProvider from "./contexts/TodoContext";
import Statistic from "./view/Statistic";
import StatisticContextProvider from "./contexts/StatisticContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <StatisticContextProvider>
          <TodoContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route
                  path="/register"
                  element={<Auth authRoute="register" />}
                />
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/statistic" element={<ProtectedRoute />}>
                  <Route path="/statistic" element={<Statistic />} />
                </Route>
              </Routes>
            </Router>
          </TodoContextProvider>
        </StatisticContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
