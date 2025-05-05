import React, { useState } from "react";
import Typewriter from "../components/Typewriter";
import { TypeAnimation } from "react-type-animation";
const Hello = () => {
  return (
    // <div>
    //   <div class="fixed top-[250px] right-[307px] text-9xl font-cascadia text-custom-green">
    //     &lt;Vaibhav
    //   </div>
    //   <div class="fixed top-[360px] right-40 text-9xl font-cascadia text-custom-green">
    //     Mandavkar&gt;
    //   </div>
    //   <div class="fixed top-[480px] right-[200px] text-5xl font-cascadia text-white">
    //     //I AM PASSIONATE ABOUT
    //   </div>
    //   <div class="fixed top-[530px] left-[200px] text-6xl font-bold font-cascadia text-custom-purple">
    //     <TypeAnimation
    //       sequence={[
    //         "Data Science",
    //         500,
    //         "Artificial Intelligence",
    //         500,
    //         "Machine Learning",
    //         500,
    //       ]}
    //       speed={{ type: "keyStrokeDelayInMs", value: 250 }}
    //       repeat={Infinity}
    //     />
    //   </div>
    // </div>
    <div className="grid grid-cols-2">
      <div class="grid grid-cols-8 pl-9 font-cascadia text-lg">
        <div class="py-[116px] pl-10 text-custom-gray ">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
        </div>
        <div class="py-[200px] text-neutral-50 col-span-7">
          <p>
            <div className="text-custom-yellow">&lt;hello&gt;</div>
            {/* <br /> */}
            Hello, my name is vaibhav() &#123;
            <br />
            I’m a tech enthusiast pursuing a master’s in
            <br />
            <span className="text-custom-purple"> AI and Data Science.</span>
            <br />
            With industry experience in{" "}
<span className="text-custom-blue">
  software
  <br /> development,
</span>
            <br />
            I’ve built projects using modern frameworks like
            <br />
            <span className="text-custom-red"> React, Flutter,</span>
            <br />
            and cutting-edge technologies in
            <span className="text-custom-purple"> AI, ML, and </span>
            <br />
            <span className="text-custom-purple">deep learning.</span>
            <br />
            Outside of tech, I find inspiration in the stars
            <br />
            and nature through
            <span className="text-custom-blue"> photography.</span>
            <br />
            &#125;
          </p>
        </div>
      </div>
      <div className="py-44 space-y-2">
        <div class="text-9xl font-cascadia text-custom-green space-y-[-15px]">
          <div class="">&lt;Vaibhav</div>
          <div class="">Mandavkar&gt;</div>
        </div>
        <div class="space-y-[-10px]">
          <div class="text-5xl font-cascadia text-white">
            //I AM PASSIONATE ABOUT  
          </div>
          <div class="text-[60px] font-bold font-cascadia text-custom-purple">
            <TypeAnimation
              sequence={[
                "Data Analysis",
                500,
                "Artificial Intelligence",
                500,
                "Machine Learning",
                500,
                "Data Visualization",
                500,
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 250 }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hello;
