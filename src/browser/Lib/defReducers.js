import { createStore } from 'redux';

import reduce from './reduce.js';

import {hideSideBar} from '../../shared/Lib/sidebar.js';

import contains from './contains.js'

import course from "../../shared/course/Solow/Solow.js";


window.store = createStore(
	reduce, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)


// Set the status of store 
window.ggbOnInit = function(param) {

  store.dispatch({ 
    type: 'Mount', 
    name: param,  
  })

  setTimeout(() => {
    document.getElementById("over").style.display = 'none'
  }, 100)
  

  window[param + "Listener"] = function(obj) { 

    if(store.getState().v.hasOwnProperty(obj)) { 

      store.dispatch({ 
        type: "updateVar", 
        origin: param,
        letter: obj, 
      })
    }
  }

  eval(param).registerUpdateListener(param + "Listener");
}


document.getElementById("App").addEventListener("click", function( event ) {
  
  var element = document.querySelector("#SidebarMenu");

  if (!element.contains(event.target) && store.getState().sideBar) {
      hideSideBar()
  }

}, false);





window.click = function(element) { 
  console.log(element);


  if(contains.call(course.getLetters(), element)) { 

    store.dispatch({
      type: 'Redirect',
      page: element,
    })

  }

}




window.logger = function() {
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();


Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}



