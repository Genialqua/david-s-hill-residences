import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Apartments from "@/components/Apartments";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import Gallery from "@/components/Gallery";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Apartments />
      <Amenities />
      <Location />
      <Gallery />
      <Subscribe />
      <Footer />
    </main>
  );
};

export default Index;
