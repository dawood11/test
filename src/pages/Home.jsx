import "../styles/pages/Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div
        className="home-content"
        style={{ textAlign: "center", padding: "20px" }}>
        <img
          src="/src/assets/javazone300.png"
          alt="Home Page Image"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            marginBottom: "20px",
          }}
        />
        <div style={{ maxWidth: "600px" }}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            maxime aperiam esse dolor sed ipsam, molestias unde, deleniti eius
            veritatis inventore laboriosam ipsum repellat perspiciatis quasi
            voluptatibus accusamus illo. Asperiores!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
