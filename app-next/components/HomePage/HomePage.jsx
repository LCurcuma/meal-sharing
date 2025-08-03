
import "./HomePage.css";
import Link from "next/link";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
  <Link href="http://localhost:3000/all-meals"><button>Meals</button></Link>
  <Link href="http://localhost:3000/reservations"><button>Reservations</button></Link>
  <Link href="http://localhost:3000/review"><button>Review</button></Link>
    </>
  );
}

export default HomePage;
