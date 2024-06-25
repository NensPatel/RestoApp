import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  console.log(props);
  const cartStorage = JSON.parse(localStorage.getItem("Cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (props.cartData) {
      console.log(props);
      if (cartNumber) {
        let localCartItem = cartItem;
        localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
        setCartItem(localCartItem);
        setCartNumber(cartNumber + 1);
        localStorage.setItem("Cart", JSON.stringify(localCartItem));
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("Cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

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
                Cart[{cartNumber ? cartNumber : 0}]
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
