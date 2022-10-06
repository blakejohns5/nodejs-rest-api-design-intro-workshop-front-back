import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import AuthContext from "../../context/AuthContext";
import { getCurrentUserToken } from "../../firebase/firebase";

async function fetchUserToken(setUserToken, setLoading, setError) {
  setLoading(true);

  try {
    const token = await getCurrentUserToken();
    setUserToken(token);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}

function Home() {
  const [userToken, setUserToken] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    if (userToken && !currentUser) {
      setUserToken(null);
      setUsers(null);
    }
  }, [userToken, currentUser]);

  useEffect(() => {
    if (!userToken) {
      fetchUserToken(setUserToken, setLoading, setError);
    }
  }, [userToken]);

  useEffect(() => {
    async function getUsers(userToken, setUsers, setLoading, setError) {
      setLoading(true);

      try {
        const res = await axios.get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUsers(res.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (userToken && !users) {
      getUsers(userToken, setUsers, setLoading, setError);
    }
  }, [users, userToken]);

  return (
    <>
      <Header />
      <main className="container p-4">
        <section className="row row-cols-1">
          <header className="col">
            <h1>Home Page</h1>
            <hr />
          </header>
          {!users && !loading && !error && (
            <div className="col">
              <h2 className="h4">Nothing here</h2>
            </div>
          )}
          {loading && (
            <div className="col">
              <h2 className="h4">Loading users...</h2>
            </div>
          )}
          {!loading && error && (
            <div className="col">
              <h2 className="h4">Something went wrong</h2>
              <code>{error.message}</code>
            </div>
          )}
          {users && users.length > 0 && (
            <>
              <div className="col">
                <h2 className="h5">Users</h2>
                <hr />
              </div>
              {users.map((user) => (
                <div className="col" key={user._id}>
                  <div className="col px-2 py-3 border" key={user._id}>
                    <p className="h5 m-0">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
