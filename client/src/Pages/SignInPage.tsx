import * as React from "react"
import img from "../assets/img/Auth/signup.webp"
import { useAppDispatch, useAppSelector } from "../hooks"
import { login } from "../features/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { LoginType } from "../definitions"
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton"

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAppSelector((state) => state.user)
  const [loginValues, setLoginValues] = React.useState<LoginType>({
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login(loginValues))
  }
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/events")
    }
  }, [loading, isAuthenticated])
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <img
          src={img}
          alt=""
          className="hidden lg:block w-full object-cover h-full"
        />
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex pt-20 md:pt-0 `md:items-center justify-center">
        <div className="max-w-md w-full p-6 scale-105 my-auto">
          <Link to="/" className="text-gray-500 text-lg">
            <span className="mr-1">&#8592;</span>
          </Link>
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Welcome Back!
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            We missed you at Planme CLub
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className=" gap-3 mt-4">
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
                value={loginValues.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
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
                value={loginValues.password}
                onChange={handleChange}
                placeholder="*********"
                className="mt-1 p-2.5 px-4 w-full border rounded-3xl focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <div className="my-4 ml-2 text-sm text-gray-600">
                <Link
                  to="/forgot-password"
                  className="hover:underline cursor-pointer"
                >
                  <span className="text-black hover:underline">
                    Forgot password?
                  </span>
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-dark text-white p-2.5 px-4 font-medium rounded-3xl hover:bg-highlight  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>OR</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <ContinueWithGoogleButton />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <Link to="/sign-up" className="hover:underline cursor-pointer">
              Don't have an account?
              <span className="text-black hover:underline"> SignUp here</span>
            </Link>
          </div>
          {/* {loading && <Loader />} */}
        </div>
      </div>
    </div>
  )
}
