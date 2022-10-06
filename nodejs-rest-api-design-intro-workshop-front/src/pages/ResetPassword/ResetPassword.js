import { useState } from "react";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

import { sendPasswordResetEmail } from "../../firebase/firebase";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendingError, setSendingError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await sendPasswordResetEmail(email);
    } catch (error) {
      setSendingError(error.message);
    } finally {
      setSent(true);
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
                <h1 className="h3">Reset password</h1>
                <p>Enter your email to receive a password reset link</p>
                <hr />
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
                  <Button type="submit" disabled={loading || sent}>
                    {loading
                      ? "Sending"
                      : sent
                      ? "Email Sent!"
                      : "Send password reset email"}
                  </Button>
                </form>
              </div>
            </section>
            {sendingError && (
              <section className="row row-cols-1 mb-3 border py-3 bg-light">
                <div className="col">
                  <h2 className="h5">Something went wrong</h2>
                  <hr />
                  <p className="mt-3">{sendingError}</p>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
