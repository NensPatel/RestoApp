import Link from "next/link";

const CustomerHeader = () => {
  return (
    <>
      <div className=" text-white">
        <div className="flex justify-between items-center px-5 py-4">
          <h1 className="text-2xl font-bold">Nens Patel</h1>
          <ul className="flex space-x-2">
            <li className="hover:text-[#81d3e7]">
              <Link href="/" className="px-3 py-2 rounded">
                Home
              </Link>
            </li>

            <li className="hover:text-[#81d3e7]">
              <Link href="/restaurant" className="px-3 py-2 rounded">
                Login
              </Link>
            </li>

            <li></li>
            <li className="hover:text-[#81d3e7]">
              <Link href="/" className="px-3 py-2 rounded">
                SignUp
              </Link>
            </li>

            <li className="hover:text-[#81d3e7]">
              <Link href="/" className="px-3 py-2 rounded">
                Cart[0]
              </Link>
            </li>

            <li className="hover:text-[#81d3e7]">
              <Link href="/" className="px-3 py-2 rounded">
                Add Restaurant
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomerHeader;
