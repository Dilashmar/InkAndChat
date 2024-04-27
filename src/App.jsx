import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

//pages
import Create from './pages/createPost';
import Posts from './pages/posts';
import Update from './pages/update';
import Post from './pages/post';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <img
              src="https://i.pinimg.com/564x/e5/6f/7d/e56f7da4f847cfad3e19075f7bbda9a6.jpg"
              alt="Logo"
              className="logo-img"
            />
          </Link>
          <h1>Ink And Chat</h1>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Posts</Link>
          <Link to="/create" className="nav-link">Create</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
