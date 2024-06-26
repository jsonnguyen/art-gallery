import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/all-galleries">All Galleries</Link>
      &nbsp;&nbsp;
      <Link to="/galleries">My Galleries</Link>
      &nbsp; | &nbsp;
      <Link to="/artworks">My Artworks</Link>
      &nbsp; | &nbsp;
      <Link to="/artworks/new">New Artwork</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}