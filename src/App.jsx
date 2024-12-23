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

import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";
import Hello from "./Pages/Hello";
import StarrySky from "./components/StarrySky";

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
        <Hello />
        <Footer />
      </div>
    </div>
  );
}

export default App;
