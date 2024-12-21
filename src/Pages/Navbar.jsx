import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  return (
    <div>
      {/* Top bar with circles and title */}
      <nav className="bg-custom_purple_washed flex h-10 items-center space-x-4 fixed w-full z-20 top-0 start-0  ">
        {/* Circles */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-3 h-3 rounded-full bg-custom-red"></div>
          <div className="w-3 h-3 rounded-full bg-custom-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-custom-green"></div>
        </div>
        <span className=" font-cascadia text-custom-gray text-sm font-semibold">
          Vaibhav_Mandavkar
        </span>
      </nav>

      {/* Bottom bar with navigation links */}
      {/* <nav>
        <div class="bg-custom_purple_washed content-center fixed top-11 text-sm w-full text-center">
          <ul class="h-7 font-cascadia text-white flex flex-wrap -mb-px">
            <li class="me-2 border-r-4 border-custom-background">
              <a
                href="#"
                class="inline-block px-4 border-t-4  active text-custom-yellow border-custom-red"
              >
                _hello
              </a>
            </li>
            <li class="me-2 border-r-4 border-custom-background">
              <a
                href="#"
                class="inline-block px-4 border-t-4 border-transparent hover:text-custom-yellow hover:border-custom-red"
                aria-current="page"
              >
                _about_me
              </a>
            </li>
            <li class="me-2 border-r-4 border-custom-background ">
              <a
                href="#"
                class="inline-block px-4 border-t-4 border-transparent hover:text-custom-yellow hover:border-custom-red "
              >
                _skills
              </a>
            </li>
            <li class="me-2 border-r-4 border-custom-background">
              <a
                href="#"
                class="inline-block px-4 border-t-4 border-transparent hover:text-custom-yellow hover:border-custom-red "
              >
                _projects
              </a>
            </li>
            <li class="me-2 border-r-4 border-custom-background">
              <a class="inline-block px-4 border-t-4 border-transparent hover:text-custom-yellow hover:border-custom-red ">
                _contact_me
              </a>
            </li>
          </ul>
        </div>
      </nav> */}

      <nav class="fixed top-[42px] flex flex-row space-x-0.5">
        <div class=" h-8 content-center font-cascadia text-xs font-bold text-white hover:text-custom-yellow flex-none bg-custom_purple_washed px-20">
          _hello
        </div>
        <div class="h-8 font-cascadia content-center text-xs font-bold text-white hover:text-custom-yellow flex-none bg-custom_purple_washed px-20">
          _about_me
        </div>
        <div class="h-8 font-cascadia content-center text-xs font-bold text-white hover:text-custom-yellow flex-none bg-custom_purple_washed px-20">
          _skills
        </div>
        <div class="h-8 font-cascadia content-center text-xs font-bold text-white hover:text-custom-yellow flex-none bg-custom_purple_washed px-20">
          _projects
        </div>
        <div class="h-8 bg-custom_purple_washed text-custom_purple_washed px-[50rem]">
          {" "}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
