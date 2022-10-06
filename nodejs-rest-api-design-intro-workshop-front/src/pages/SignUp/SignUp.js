import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import AuthContext from "../../context/AuthContext";

import {
  singInWithGoogle,
  singUpWithEmailAndPassword,
} from "../../firebase/firebase";

import { syncUserData } from "../../utils/auth-requests";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const currentUser = useContext(AuthContext);

  async function handleSingInWithGoogleClick(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await singInWithGoogle();
      await syncUserData();
    } catch (error) {
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await singUpWithEmailAndPassword(email, password);
      await syncUserData();
    } catch (error) {
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container p-4 mt-5">
        <div className="row flex-column align-items-center">
          <div className="col col-lg-6">
            <section className="row row-cols-1 mb-5">
              <div className="col">
                <h1 className="h2">Sign Up</h1>
                {currentUser && (
                  <p className="font-bold">Hello {currentUser.email}</p>
                )}
                <hr />
              </div>
              <div className="col">
                <h2 className="h5">Sign Up with Google</h2>
                <hr />
              </div>
              <div className="col">
                <Button onClick={handleSingInWithGoogleClick}>
                  Sign In With Google
                </Button>
              </div>
            </section>

            <section className="row row-cols-1 mb-3">
              <div className="col">
                <h2 className="h5 mb-3">Sign up with email and password</h2>
              </div>
              <div className="col">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>
                </form>
              </div>
            </section>
            {signUpError && (
              <section className="row row-cols-1 mb-3 border py-3 bg-light">
                <div className="col">
                  <h2 className="h5">Something went wrong</h2>
                  <hr />
                  <p className="mt-3">{signUpError}</p>
                </div>
              </section>
            )}
            <section className="row row-cols-1 mb-5">
              <div className="col">
                <hr />
              </div>
              <div className="col">
                <Link to="/reset-password">Forgot your password?</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUp;
