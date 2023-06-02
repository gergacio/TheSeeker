import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from "./pages/home.js";
import { Auth } from "./pages/auth.js";
import { CreatePlace } from "./pages/create-place.js";
import { SavedPlace } from "./pages/save-place.js";
import { Navbar } from "./components/navbar.js";
import { Search } from "./pages/search.js";
import { Footer } from "./pages/footer.js"


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/create-place" element={<CreatePlace />}/>
          <Route path="/saved-place" element={<SavedPlace />}/>
        </Routes>
        <Footer />
      </Router>
    
    </div>
  );
}

export default App;
