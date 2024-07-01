import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import img from "../assets/img/Auth/signup.webp"
import { SignUpType } from "../definitions"
import { register } from "../features/userSlice"
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton"
import IsVendor from "../components/IsVendor"

export default function SignUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, verificationRequired } = useAppSelector(
    (state) => state.user,
  )
  const [signUpValues, setSignUpValues] = React.useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    isVendor: false,
    agreeToTerms: false, // New state for checkbox
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    const newValue = type === "checkbox" ? checked : value
    setSignUpValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !signUpValues.firstName ||
      !signUpValues.email ||
      !signUpValues.password ||
      !signUpValues.agreeToTerms // Check if terms are agreed
    )
      return alert("All fields are required and terms must be agreed")
    dispatch(register(signUpValues))
  }

  React.useEffect(() => {
    if (!loading && verificationRequired) {
      navigate("/verify")
    }
  }, [loading, verificationRequired])

  const isSignUpDisabled = !signUpValues.agreeToTerms // Disable signup button if terms are not agreed

  return (
    <div className="flex h-screen ">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <img
          src={img}
          alt=""
          className="hidden lg:block w-full h-full object-cover"
        />
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6 my-">
          <Link to="/" className="text-gray-500 text-lg">
            <span className="mr-1">&#8592;</span>
          </Link>
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Register with us!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={signUpValues.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={signUpValues.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <label
                  htmlFor="email"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={signUpValues.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNo"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Phone No.
                </label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={signUpValues.phoneNo}
                  onChange={handleChange}
                  placeholder="0123456"
                  className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={signUpValues.password}
                onChange={handleChange}
                placeholder="*********"
                className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <IsVendor handleChange={handleChange} signUpValues={signUpValues} />
            <div>
              <label className=" block text-sm text-center   text-gray-700">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={signUpValues.agreeToTerms}
                  onChange={handleChange}
                  className="mr-2 accent-blue-500"
                />
                I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  className="font-medium underline hover:text-blue-700"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium underline hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSignUpDisabled} // Disable signup button if terms are not agreed
                className="disabled:bg-gray-500 w-full bg-dark text-white p-2.5 px-4 font-medium rounded-3xl hover:bg-highlight focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>OR</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            {/* Show google login button only if the user has agreed to terms */}
            {signUpValues.agreeToTerms && <ContinueWithGoogleButton />}
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <Link to="/sign-in" className="hover:underline">
              Already have an account?{" "}
              <span className="text-black hover:underline">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
