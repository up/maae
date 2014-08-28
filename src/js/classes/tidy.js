define('src/js/classes/tidy', 
  [], 
  function() {
    'use strict';

    return function (html){
      html = html.replace(/<br><\/p>/g, '</p>');
      html = html.replace(/<\/p>/g, '</p>\n');
      html = html.replace(/<\/h1>/g, '</h1>\n');
      return html;
    };

  }
);
