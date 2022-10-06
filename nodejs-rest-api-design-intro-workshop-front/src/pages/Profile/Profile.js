import Header from "../../components/Header/Header";

function Profile() {
  return (
    <>
      <Header />
      <main className="container p-4">
        <section className="row row-cols-1">
          <div>
            <h1>Protected Profile Page</h1>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
