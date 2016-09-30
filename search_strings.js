'use strict';

import { readBang } from './database_operations';

export function searchStrings(query, cb) {
    
    function extractBang(bang) {
    //example: you search for "!g cats"
    return bang.substr(1); // string containing no exclamation point: g
    }

    function extractQuery(bang, query) {
        //it returns the string that you search for, "cats", without the "!g"
        return query.replace((bang), "").trim();
    }

    const regex = /\!\w+/.exec(query);
    const defaultBang = "!g";
    const bang = extractBang(regex ? regex[0] : defaultBang);
    const extractedQuery = extractQuery(bang, query);
    // const queries = {
    //     "g": "https://encrypted.google.com/search?hl=en&q=${extractedQuery}" + extractedQuery,
    //     "gro": "https://www.google.ro/search?site=&source=hp&q=" + extractedQuery,
    //     "gh": "https://github.com/search?q=" + extractedQuery + "&type=Everything&repo=&langOverride=&start_value=1",
    //     "amazon": "https://www.amazon.com/s/?tag=duc0c-20&url=search-alias%3Daps&field-keywords=" + extractedQuery,
    //     "yt": "https://www.youtube.com/results?search_query=" + extractedQuery
    // }
    // console.log(readBang(bang));



    readBang(bang, (response) => {
        console.log("Query is", extractedQuery);
        response = `${response}`;
        cb(response)
    });
  

}