/* global XMLHttpRequest */

define('src/js/classes/xhr', 
  [], 
  function() {
    'use strict';

    function getJSON(url, callback){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
          callback(
            JSON.parse(xmlhttp.responseText)
          );
        }
      };       
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }

    return {
      getJSON : getJSON
    };

  }
);
