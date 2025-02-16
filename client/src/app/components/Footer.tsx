import Link from "next/link"



function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-12  border-t-2">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
            <p className="mb-4">
            Shortrix - The fastest way to shorten and share 
            links with analytics and security.
            </p>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
            <a
                href="https://github.com/harshjha987"
                className="hover:text-white transition-colors duration-300"
              >
                Github
              </a>
              <a
                href="https://x.com/thattallboy987"
                className="hover:text-white transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/_.that_tall_boy._/"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Contact Us</h2>
            
            <p>Email: jha.harsh837@gmail.com</p>


            
            
          </div>
          </div>
          <p className="text-center text-xs pt-8">© 2025 Shortrix. All rights reserved.</p>
          <p className="text-center text-xs ">Built with ❤️ by Harsh.</p>
      </footer>
    )
  }
  
  export default Footer
  