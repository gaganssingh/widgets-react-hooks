import React, { useState } from "react";

import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";

const accordionItems = [
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

const dropdownOptions = [
   { label: "The Color Red", value: "red" },
   { label: "The Color Green", value: "green" },
   { label: "The Shade of Blue", value: "blue" },
];

export default () => {
   const [selected, setSelected] = useState(dropdownOptions[0]);

   return (
      <div>
         <Header />
         <Route path="/">
            <Accordion items={accordionItems} />
         </Route>
         <Route path="/list">
            <Search />
         </Route>
         <Route path="/dropdown">
            <Dropdown
               label="Select A Color"
               options={dropdownOptions}
               selected={selected}
               onSelectedChange={setSelected}
            />
         </Route>
         <Route path="/translate">
            <Translate />
         </Route>
      </div>
   );
};
