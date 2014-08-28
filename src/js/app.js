/* jshint browser:true */

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