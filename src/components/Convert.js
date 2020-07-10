import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
   const [translated, setTranslated] = useState("");
   const [debouncedText, setDebouncedText] = useState(text);

   useEffect(() => {
      // Timer to throttle requests to the api
      // by setting the debouncedText value
      // after the user has stopped typing
      const timerId = setTimeout(() => setDebouncedText(text), 500);

      // Cleanup the timer
      // Runs after the user has stopped typing
      return () => clearTimeout(timerId);
   }, [text]);

   // Make a request to the google translate api
   // to convert from source to target language
   useEffect(() => {
      // Helper function to perform the fetch request
      // from inside the useEffect
      const doTranslation = async () => {
         const { data } = await axios.post(
            `https://translation.googleapis.com/language/translate/v2`,
            {}, // Empty second object for empty body to be sent
            {
               // Third object must include all params
               params: {
                  q: debouncedText,
                  target: language.value,
                  key: process.env.REACT_APP_G_TRANSLATE_API_KEY,
               },
            }
         );
         setTranslated(data.data.translations[0].translatedText);
      };

      // Invoke the helper function
      doTranslation();
   }, [language, debouncedText]);

   return (
      <div>
         <h1 className="ui header">{translated}</h1>
      </div>
   );
};

export default Convert;
