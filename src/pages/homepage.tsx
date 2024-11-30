import heroImg from "../assets/Hero.png";

export const HomePage = () => {
  return (
    <>
    <div className="hero-image">
        <img rel="preload" src={heroImg}  alt="JavaZone 2025 hero image" />
    </div>
      <div className="container">
        <h1>Welcome to JavaZone 2025</h1>
        <div>
          <p>September 4th-5th 2025 in Oslo Spektrum, Norway</p>
        </div>
      </div>
    </>
  );
};
