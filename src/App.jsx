// import Navbar from "./Pages/Navbar";
// import Footer from "./Pages/Footer";
// import Hello from "./Pages/Hello";
// import StarrySky from "./components/StarrySky";
// function App() {
//   return (
//     <div className="App">
//       <Navbar></Navbar>
//       <Hello></Hello>
//       <StarrySky />
//       <Footer></Footer>
//     </div>
//   );
// }

// export default App;

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Skills from "./Pages/Skills";
import About_me from "./Pages/About_me";
import Projects from "./Pages/Projects";
import Hello from "./Pages/Hello";
import StarrySky from "./components/StarrySky";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="">
      {/* StarrySky as Background */}
      <div className="absolute inset-0 z-0">
        <StarrySky />
      </div>
      {/* Foreground Content */}
      <div className="z-10 ">
        <Navbar />
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about_me" element={<About_me />} />
      </Routes>
    </div>
  );
}

export default App;
