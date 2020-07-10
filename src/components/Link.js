import React from "react";

const Link = ({ className, href, children }) => {
   const onClick = (event) => {
      // Restore default Cmd/Ctrl click behaviour
      // on a browser link (Open in new window)
      if (event.metaKey || event.ctrlKey) {
         return;
      }

      event.preventDefault();
      window.history.pushState({}, "", href);

      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
   };

   return (
      <a className={className} href={href} onClick={onClick}>
         {children}
      </a>
   );
};

export default Link;
