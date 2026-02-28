import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div>Header</div>
      <Link to="Home">Home</Link>
      <Link to="Blog">Blog</Link>
      <Link to="Project">Project</Link>
    </>
  );
}

export default Header;
