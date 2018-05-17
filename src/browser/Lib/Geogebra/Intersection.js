
window.Intersection = class Intersection { 

  constructor(paramObj) {
  	// Compulsary properties
    this.app = paramObj.app;
    this.letter = paramObj.letter;
    
    this.obj1 = paramObj.obj1;
    this.obj2 = paramObj.obj2;
    
    this.color = { 
      red: paramObj.red, 
      green: paramObj.green, 
      blue: paramObj.blue,
    },

    // Accessible through methods
    this.visible = true;
    this.labelVisible = true;
    this.trace = false;
    this.style = -1; 
    this.size = 5;

    store.dispatch({ 
    	type: "AddIntersection",
    	letter: this.letter,
    	app: this.app,
    	obj1: this.obj1,
    	obj2: this.obj2,
    });

    this.status = "active";

    this.visible = false;
    
    this.changeColor(this.color.red, this.color.green, this.color.blue);
  }

  changeColor(red, green, blue) {
    this.color.red = red;
    this.color.green = green;
    this.color.blue = blue; 

   (function wait() {
   	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		if(store.getState().i[this.letter].status == "mounted") { 
   			g[this.app].applet.getAppletObject().setColor(this.letter, red, green, blue);
   		}
   		else { 
   			setTimeout( wait.bind(this), 100) 
   		}   		
   	}
    else { 
    	setTimeout( wait.bind(this), 100) 
    }
   }.bind(this))();

  }

  show() { 
    this.visible = true;

    (function wait() {
     if(typeof store.getState().i[this.letter] != 'undefined') {  
       if(store.getState().i[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  
  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  

  getXCoord() { 
    let returnValue;

    (function wait() {
     if(typeof store.getState().i[this.letter] != 'undefined') {  
       if(store.getState().i[this.letter].status == "mounted") { 
        
        returnValue = g[this.app].applet.getAppletObject().getXcoord(this.letter);

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

    return(returnValue);
  }

  getYCoord() { 
    let returnValue;

    (function wait() {
     if(typeof store.getState().i[this.letter] != 'undefined') {  
       if(store.getState().i[this.letter].status == "mounted") { 
        
        returnValue = g[this.app].applet.getAppletObject().getYcoord(this.letter);

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

    return(returnValue);
  }


  labelToggle() { 
    this.labelVisible = !this.labelVisible; 

    (function wait() {
    	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  traceToggle() {
    this.trace = !this.trace;

    (function wait() {
    	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setTrace(this.letter, this.trace);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  setStyle(sty) { 
    this.style = sty;
    
    (function wait() {
    	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setPointStyle(this.letter, this.style);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  setSize(siz) { 
    this.size = siz;

    (function wait() {
    	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setPointSize(this.letter, this.size);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  fixToggle() { 
    this.fixed = !this.fixed;

    (function wait() {
    	if(typeof store.getState().i[this.letter] != 'undefined') { 	
   		 if(store.getState().i[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setFixed(this.letter, this.fixed);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();  
  }


}

export default Intersection;

