import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
   const [open, setOpen] = useState(false);
   const ref = useRef();

   // To close the dropdown when user clicks
   // outside of the dropdown, setup an event
   // listener that bubbles up to the body
   useEffect(() => {
      const onBodyClick = (event) => {
         // Check if the space clicked on was inside
         // the Dropdown component. If so, just return and do nothing
         if (ref.current.contains(event.target)) {
            return;
         }

         // If not, user must have clicked outside of the
         // Dropdown, so we want to close the dropdown menu
         // after user selection
         setOpen(false);
      };

      document.body.addEventListener("click", onBodyClick);

      // Cleanup: When the Dropdown component is removed
      // from the DOM, cleanup the event listener as well
      // so the app doesn't throw an error
      return () => {
         document.body.removeEventListener("click", onBodyClick);
      };
   }, []);

   const renderedOptions = options.map((option) => {
      // Hide the currently selected item from the dropdown
      if (option.value === selected.value) {
         return null;
      }

      // Render items in the option
      return (
         <div
            key={option.value}
            className="item"
            onClick={() => onSelectedChange(option)}
         >
            {option.label}
         </div>
      );
   });

   return (
      <div className="ui form" ref={ref}>
         <div className="field">
            <label className="label">{label}</label>
            <div
               // conditionally apply css classes to show/hide dropdown
               className={`ui selection dropdown ${
                  open ? "visible active" : ""
               }`}
               onClick={() => setOpen(!open)}
            >
               <i className="dropdown icon"></i>
               <div className="text">{selected.label}</div>
               <div
                  // conditionally apply css classes to show/hide dropdown
                  className={`menu ${open ? "visible transition" : ""}`}
               >
                  {renderedOptions}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dropdown;
