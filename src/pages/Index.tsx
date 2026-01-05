import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import About from "@/components/home/About";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <UpcomingEvents />
      <About />
    </Layout>
  );
};

export default Index;
