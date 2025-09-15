import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hello = () => {
  return (
    <div className="min-h-screen bg-custom-background">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Mobile Content - No separate header since navbar handles it */}
        <div
          className="px-4 pt-2 pb-4
         space-y-8"
        >
          {/* Hero Section - Image and Name side by side */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {/* Profile Image */}
              <div className="w-28 h-30 rounded-3xl overflow-hidden flex-shrink-0">
                <img
                  src="/static/images/profile_pic.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Passion Section */}
              <div className="flex-1 space-y-0.5 pt-2 min-w-0">
                <div className="text-custom-green font-cascadia text-4xl leading-8 font-normal">
                  &lt;Vaibhav
                  <br />
                  Mandavkar&gt;
                </div>

                {/* Passion Text */}
                <div className="">
                  <div className="text-custom-text font-cascadia text-sm">
                    //I AM PASSIONATE ABOUT
                  </div>
                  <div className="text-custom-purple font-cascadia font-bold text-xl break-all">
                    <TypeAnimation
                      sequence={[
                        "DATA ANALYSIS",
                        500,
                        "AI",
                        500,
                        "MACHINE LEARNING",
                        500,
                        "DATA VISUALIZATION",
                        500,
                        "GENERATIVE AI",
                        500,
                      ]}
                      speed={{ type: "keyStrokeDelayInMs", value: 250 }}
                      repeat={Infinity}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Section */}
          <div className="bg-custom-purple-washed rounded-lg p-3 relative">
            <div className="flex space-x-2 font-cascadia text-xs">
              {/* Line Numbers */}
              <div className="text-custom-gray text-center">
                {[...Array(15).keys()].map((i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code content */}
              <div className="text-custom-text">
                <div className="text-custom-yellow">&lt;hello&gt;</div>
                <div>
                  Hello, my name is{" "}
                  <span className="text-custom-text">vaibhav()</span> &#123;
                </div>
                <div>I'm a tech enthusiast pursuing a master's in</div>
                <div>
                  <span className="text-custom-purple">
                    AI and Data Science
                  </span>
                  .
                </div>
                <div>
                  With industry experience in{" "}
                  <span className="text-custom-blue">software</span>
                </div>
                <div>
                  <span className="text-custom-blue">development</span>,
                </div>
                <div>I've built projects using modern frameworks like</div>
                <div>
                  <span className="text-custom-red">React</span>,{" "}
                  <span className="text-custom-red">Streamlit</span>,
                </div>
                <div>
                  and cutting-edge technologies in{" "}
                  <span className="text-custom-purple">AI, ML, and</span>
                </div>
                <div>
                  <span className="text-custom-purple">deep learning</span>.
                </div>
                <div>Outside of tech, I find inspiration in the stars</div>
                <div>
                  and nature through{" "}
                  <span className="text-custom-blue">photography</span>.
                </div>
                <div>&#125;</div>
              </div>
            </div>

            {/* Overlay mask effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-custom-purple-washed opacity-30 rounded-lg pointer-events-none"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              to="/projects"
              className="flex-1 text-center border border-custom-yellow text-custom-yellow font-cascadia text-xs py-2 px-4 rounded hover:bg-custom-yellow hover:text-custom-background transition-colors"
            >
              view my projects
            </Link>
            <a
              href="https://github.com/vrobbin3247"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border border-custom-gray text-custom-text font-cascadia text-xs py-2 px-4 rounded hover:bg-custom-gray hover:text-custom-background transition-colors"
            >
              visit github
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden md:grid md:grid-cols-2">
        <div className="grid grid-cols-8 pl-9 font-cascadia text-lg">
          <div className="py-[116px] pl-10 text-custom-gray">
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
          <div className="py-[200px] text-custom-text col-span-7">
            <p>
              <div className="text-custom-yellow">&lt;hello&gt;</div>
              Hello, my name is vaibhav() &#123;
              <br />
              I'm a tech enthusiast pursuing a master's in
              <br />
              <span className="text-custom-purple"> AI and Data Science.</span>
              <br />
              With industry experience in{" "}
              <span className="text-custom-blue">
                software
                <br /> development,
              </span>
              <br />
              I've built projects using modern frameworks like
              <br />
              <span className="text-custom-red"> React, Streamlit</span>
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
          <div className="text-9xl font-cascadia text-custom-green space-y-[-15px]">
            <div>&lt;Vaibhav</div>
            <div>Mandavkar&gt;</div>
          </div>
          <div className="space-y-[-10px]">
            <div className="text-5xl font-cascadia text-custom-text">
              //I AM PASSIONATE ABOUT
            </div>
            <div className="text-[60px] font-bold font-cascadia text-custom-purple">
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
                  "Generative AI",
                  500,
                ]}
                speed={{ type: "keyStrokeDelayInMs", value: 250 }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hello;
