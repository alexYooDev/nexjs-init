import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  return (
    <nav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <style jsx>{`
        nav {
          background-color: green;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
}
