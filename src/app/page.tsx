import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px 40px" }}>
        <HomeContent />
      </main>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
