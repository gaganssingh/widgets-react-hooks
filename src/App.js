import React, { useState } from "react";

import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";

const items = [
   { title: "What is React?", content: "A front end JS framework" },
   {
      title: "Why use React?",
      content: "It is a favourite JS library among engineers",
   },
   {
      title: "How do you use React?",
      content: "You use React by creating components",
   },
];

const options = [
   { label: "The Color Red", value: "red" },
   { label: "The Color Green", value: "green" },
   { label: "The Shade of Blue", value: "blue" },
];

export default () => {
   return (
      <div>
         {/* <Accordion items={items} /> */}
         {/* <Search /> */}

         {/* <Dropdown
            options={options}
            selected={selected}
            onSelectedChange={setSelected}
         /> */}
         <Translate />
      </div>
   );
};
