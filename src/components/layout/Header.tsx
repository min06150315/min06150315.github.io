import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="bg-brand">Header</div>
      <Link to="/">Home</Link>
      <Link to="/Blog">Blog</Link>
      <Link to="/Project">Project</Link>
    </header>
  );
}

export default Header;
