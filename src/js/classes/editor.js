/* jshint browser:true */

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
