'use client';

import Footer from '~/lib/layout/Footer';
import Navbar from '~/lib/layout/Navbar';
import About from '~/lib/pages/about';

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {/* <Project /> */}
      <About />
      <Footer />
    </>
  );
};

export default Home;
