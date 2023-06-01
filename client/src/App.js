import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from "./pages/home.js";
import { Auth } from "./pages/auth.js";
import { CreateTeacher } from "./pages/create-teacher.js";
import { SavedTeacher } from "./pages/save-teacher.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/create-teacher" element={<CreateTeacher />}/>
          <Route path="/saved-teacher" element={<SavedTeacher />}/>
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
