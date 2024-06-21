import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !c_password ||
      !name ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    console.log(email, password, c_password, name, city, address, contact);
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full border-2">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src="/assets/dish2.jpg"
              alt="Burger"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="w-full max-w-xs mx-auto">
              <h1 className="text-2xl font-bold text-white mb-5">
                SignUp with your Restaurant now !!
              </h1>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border text-black bg-transparent"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {error && !email && (
                  <span className="text-red-600 text-sm">
                    Please Enter an Email
                  </span>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border text-black bg-transparent"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {error && !password && (
                  <span className="text-red-600 text-sm">
                    Please Enter a Password
                  </span>
                )}
                {passwordError && (
                  <span className="text-red-600 text-sm">
                    Password and Confirm Password do not match
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border text-black bg-transparent"
                  value={c_password}
                  onChange={(event) => setC_password(event.target.value)}
                />
                {error && !c_password && (
                  <span className="text-red-600 text-sm">
                    Please Enter Confirm Password
                  </span>
                )}
                {passwordError && (
                  <span className="text-red-600 text-sm">
                    Password and Confirm Password do not match
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  className="w-full p-2 border text-black bg-transparent"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                {error && !name && (
                  <span className="text-red-600 text-sm">
                    Please Enter Restaurant Name
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="City Name"
                  className="w-full p-2 border text-black bg-transparent"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                {error && !city && (
                  <span className="text-red-600 text-sm">
                    Please Enter City Name
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Address"
                  className="w-full p-2 border text-black bg-transparent"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
                {error && !address && (
                  <span className="text-red-600 text-sm">
                    Please Enter an Address
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Contact No."
                  className="w-full p-2 border text-black bg-transparent"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                />
                {error && !contact && (
                  <span className="text-red-600 text-sm">
                    Please Enter Contact No
                  </span>
                )}
              </div>
              <div className="mb-4">
                <button
                  className="w-full p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black  rounded hover:from-custom-blue hover:to-custom-green"
                  onClick={handleSignup}
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignUp;
