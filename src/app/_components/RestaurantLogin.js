import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    try {
      let response = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, login: true }),
      });

      response = await response.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push("/restaurant/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed due to server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full  border-2">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src="/assets/dish1.jpg"
              alt="Burger"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <form className="w-full max-w-xs mx-auto" onSubmit={handleLogin}>
              <h1 className="text-2xl font-bold text-white mb-5">
                Login with your Restaurant now !!
              </h1>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border text-black bg-transparent"
                />
                {error && !email.trim() && (
                  <span className="text-red-600 text-sm">
                    Enter a valid Email
                  </span>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border text-black bg-transparent"
                />
                {error && !password.trim() && (
                  <span className="text-red-600 text-sm">
                    Enter a valid Password
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full p-2 font-extrabold bg-gradient-to-l from-custom-green to-custom-blue text-black rounded hover:from-custom-blue hover:to-custom-green"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
