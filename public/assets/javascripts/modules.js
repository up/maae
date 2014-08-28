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


define('src/js/classes/editor', 
  [
    'src/js/classes/tidy'
], 
  function(tidy) {
    'use strict';

    var 
      textarea = document.getElementById('editorTextarea'),
      iframe = document.getElementById('editorIframe'),
      iframeWindow = iframe.contentWindow || iframe.contentDocument,
      body
    ;

    function runCmd() {
      var 
        cmd = this.id,
        bool = false,
        value = this.getAttribute('data-cmd') || null,
        returnValue
      ;
    
      if (value === 'promptUser') {
        value = prompt(this.getAttribute('data-prompt-text'));
      }
    
      try {
        returnValue = iframeWindow.document.execCommand(cmd, bool, value);
        updateTextarea();      
      } catch (err) {
        alert(err.name + ': "' + err.message + '"');
      }
    }

    function updateTextarea () {
      textarea.value = tidy(body.innerHTML);
    }

    function init() {
      body = iframeWindow.document.querySelector('body');
      // TODO: Add feature detection and condition
      iframeWindow.document.designMode = 'On'; // Moz, Op, Saf
      iframeWindow.document.body.contentEditable = true; // Op, IE, Saf
    }

    return {
      iframeWindow : iframeWindow,
      init : init,
      updateTextarea : updateTextarea,
      runCmd : runCmd
    };

  }
);


define('src/js/app', 
  [
    'src/js/classes/editor', 
    'src/js/classes/xhr'
  ], 
  function(editor, xhr) {
    'use strict';
  
    var module = {};
  
    module.init = function() {
    
      var form = document.querySelector('#editorForm');
      var textarea = document.querySelector('#editorTextarea');
      textarea.value = '';
    
      xhr.getJSON('data/buttons.config.json', function(buttons){
        buttons.forEach(function(button){
          var input = document.createElement('input');
          input.setAttribute('type', 'button');
          input.setAttribute('id', button.id);
          input.setAttribute('value', button.value);
          if (button.cmd) {
            input.setAttribute('data-cmd', button.cmd);
          }
          if (button.prompt) {
            input.setAttribute('data-prompt-text', button.prompt);
          }
        
          input.addEventListener('click', editor.runCmd);
        
          form.appendChild(input);
        });
      });
    
      // Events
      window.addEventListener('load', editor.init);
      editor.iframeWindow.addEventListener('keyup', editor.updateTextarea);
  
    };
  
    return module;

  }
);


define("main", [
  'src/js/app'
], function(app) {
  'use strict';
  app.init();
});

