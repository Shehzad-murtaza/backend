import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 p-4 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          <Link href="/" className="hover:text-gray-400 transition duration-200">MyApp</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/dashboard" className="hover:text-gray-400 transition duration-200">Dashboard</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-400 transition duration-200">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-gray-400 transition duration-200">Signup</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
