import { Link } from "react-router-dom";
import { Button } from "../App";

export default function Navbar() {
  return (
    <div>
      <div>
        <Button>
          <Link to="/" className="home-button">
            🏠
          </Link>
        </Button>
      </div>
    </div>
  );
}
