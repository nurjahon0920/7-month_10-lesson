import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Student from "./components/Student";
import { Provider } from "react-redux";
import store from "./app/store";
import Teachers from "./components/Teachers";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/student" element={<Student />} />
              <Route path="/teacher" element={<Teachers />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AuthProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
