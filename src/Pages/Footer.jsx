import React, { useState } from "react";
import git from "/public/static/images/git.png";
import instagram from "/public/static/images/instagram.png";
import linkedin from "/public/static/images/linkedin.png";
const Footer = () => {
  return (
    // <div class="bottom-0 fixed">
    //   <footer>
    //     <div class="container mx-auto flex justify-center items-center bottom-0 space-x-1.5">
    //       <div class=" content-center text-center w-40 bg-custom_purple_washed h-10">
    //         <span class="px-4 font-cascadia text-custom-gray text-sm font-bold hover:text-white">
    //           _get_in_touch
    //         </span>
    //       </div>
    //       <div class="content-center text-center w-40 bg-custom_purple_washed h-10">
    //         <span class="px-4 font-cascadia text-custom-gray text-sm font-bold hover:text-white">
    //           mail
    //         </span>
    //       </div>
    //       <div class="content-center text-center w-40 bg-custom_purple_washed h-10">
    //         <span class="px-4 font-cascadia text-custom-gray text-sm font-bold hover:text-white">
    //           github
    //         </span>
    //       </div>
    //       <div class="content-center text-center w-40 bg-custom_purple_washed h-10">
    //         <span class="px-4 font-cascadia text-custom-gray text-sm font-bold hover:text-white">
    //           instagram
    //         </span>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <footer class="fixed bottom-0 flex flex-row flex-nowrap space-x-0.5">
      <div class=" h-10 content-center font-cascadia text-sm font-bold text-custom-gray hover:text-white flex-none bg-custom_purple_washed px-8">
        _get_in_touch
      </div>
      <div class="h-10 font-cascadia content-center text-sm font-bold text-custom-gray hover:text-white flex-none bg-custom_purple_washed px-4">
        <a href="#">
          <img src={git} class="h-7" />
        </a>
      </div>
      <div class="h-10 font-cascadia content-center text-sm font-bold text-custom-gray hover:text-white flex-none bg-custom_purple_washed px-4">
        <a href="#">
          <img src={linkedin} class="h-7" />
        </a>
      </div>
      <div class="h-10 font-cascadia content-center text-sm font-bold text-custom-gray hover:text-white flex-none bg-custom_purple_washed px-4">
        <a href="#">
          <img src={instagram} class="h-7" />
        </a>
      </div>
      <div class="h-10 bg-custom_purple_washed text-custom_purple_washed px-[50rem]">
        {" "}
      </div>
    </footer>
  );
};

export default Footer;
