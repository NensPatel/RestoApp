"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [details, setDetails] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, [pathName]);

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
    setDetails("");
  };

  return (
    <div className=" text-white mb-5 ">
      <div className="flex justify-between items-center px-5 py-4">
        <h1 className="text-2xl font-bold">Nens Patel</h1>
        <ul className="flex space-x-2">
          <li className="hover:text-[#81d3e7]">
            <Link href="/" className="px-3 py-2 rounded">
              Home
            </Link>
          </li>
          {details && details.email ? (
            <>
              <li>
                <button
                  className="px-3 bg-transparent text-white rounded hover:text-[#81d3e7]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li className="hover:text-[#81d3e7]">
                <Link href="/profile" className="px-3 py-2 rounded">
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <li className="hover:text-[#81d3e7]">
              <Link href="/restaurant" className="px-3 py-2 rounded">
                Login/SignUp
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
