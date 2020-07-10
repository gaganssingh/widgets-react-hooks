import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
   const [term, setTerm] = useState("programming");

   const [debouncedTerm, setDebouncedTerm] = useState(term);
   const [results, setResults] = useState([]);

   // Use setDebouncedTerm to set the value of debouncedTerm
   // equal to that of the user entered search term
   useEffect(() => {
      const timerId = setTimeout(() => {
         setDebouncedTerm(term);
      }, 1000);

      return () => {
         clearTimeout(timerId);
      };
   }, [term]);

   // Use the debouncedTerm to perform the search
   // on the wiki api
   useEffect(() => {
      // fetch request using axios using a helper function
      // as useEffect dowsn't allow using async await directly
      const search = async () => {
         const { data } = await axios.get(
            "https://en.wikipedia.org/w/api.php",
            {
               params: {
                  action: "query",
                  list: "search",
                  origin: "*",
                  format: "json",
                  srsearch: debouncedTerm,
               },
            }
         );
         // Assign the results in the response to the results
         setResults(data.query.search);
      };

      // Automatically perform the search using the default
      //  search term, right when the user visits the page
      search();
   }, [debouncedTerm]);

   // useEffect(() => {

   //    if (term && !results.length) {
   //       search();
   //    } else {
   //       // When user starts to type in search field,
   //       // delay fetching data from wikipedia until
   //       // after the user has stopped typing the search term
   //       const timeoutId = setTimeout(() => {
   //          // inoke the function to perform search
   //          if (term) {
   //             search();
   //          }
   //       }, 500);

   //       return () => {
   //          clearTimeout(timeoutId);
   //       };
   //    }
   // }, [term, results.length]);

   const renderedResults = results.map((result) => {
      return (
         <div className="item" key={result.pageid}>
            <div className="right floated content">
               <a
                  href={`https://en.wikipedia.org?curid=${result.pageid}`}
                  className="ui button"
               >
                  Go
               </a>
            </div>
            <div className="content">
               <div className="header">{result.title}</div>
               <span
                  // preventing XSS - NOT SAFE TO USE IN PRODUCTION
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
               ></span>
            </div>
         </div>
      );
   });

   return (
      <div>
         <div className="ui form">
            <div className="field">
               <label htmlFor="">Enter Search Term</label>
               <input
                  type="text"
                  className="input"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
               />
            </div>
         </div>
         <div className="ui celled list">{renderedResults}</div>
      </div>
   );
};

export default Search;
