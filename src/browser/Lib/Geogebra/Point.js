
window.Point = class Point { 

  constructor(paramObj) {
  	// Compulsary properties
    this.app = paramObj.app;
    this.letter = paramObj.letter;
    this.X = paramObj.X;
    this.Y = paramObj.Y;
    this.Z = paramObj.Z;
    this.size = paramObj.size;
    this.labelVisible = paramObj.labelVisible;

    this.color = { 
      red: paramObj.red, 
      green: paramObj.green, 
      blue: paramObj.blue,
    },

    // Accessible through methods
    this.visible = true;
    this.trace = false;
    this.style = -1; 
    this.fixed = false;

    store.dispatch({ 
    	type: "AddPoint",
    	letter: this.letter,
    	app: this.app,
    	X: this.X,
    	Y: this.Y,
      Z: this.Z,
    });

    this.status = "active";

    this.visible = false;
    
    this.changeColor(this.color.red, this.color.green, this.color.blue);
  }

  updateCoords3D(X, Y, Z) { 
    this.X = X;
    this.Y = Y;
    this.Z = Z;

     (function wait() {
      if(typeof store.getState().p[this.letter] != 'undefined') {   
        if(store.getState().p[this.letter].status == "mounted") { 
          
          store.dispatch({ 
            type: "updatePointCoords3D",  
            letter: this.letter,
            app: this.app,
            X: this.X,
            Y: this.Y,
            Z: this.Z,
          });
        
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

  changeColor(red, green, blue) {
    this.color.red = red;
    this.color.green = green;
    this.color.blue = blue; 

   (function wait() {
   	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		if(store.getState().p[this.letter].status == "mounted") { 
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
     if(typeof store.getState().p[this.letter] != 'undefined') {  
       if(store.getState().p[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
        g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  
  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  getXval() {
    let tempVal;

    (function wait() {
     if(typeof store.getState().p[this.letter] != 'undefined') {  
       if(store.getState().p[this.letter].status == "mounted") { 
        tempVal = g[this.app].applet.getAppletObject().getXcoord(this.letter);
       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

    return(tempVal);
  }

  getYval() { 
    let tempVal;

    (function wait() {
     if(typeof store.getState().p[this.letter] != 'undefined') {  
       if(store.getState().p[this.letter].status == "mounted") { 
        tempVal = g[this.app].applet.getAppletObject().getYcoord(this.letter);
       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

    return(tempVal);
  }

  labelToggle() { 
    this.labelVisible = !this.labelVisible; 

    (function wait() {
    	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  setTrace(boolVal) {
    this.trace = boolVal;

    (function wait() {
    	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setTrace(this.letter, this.trace);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  setStyle(sty) { 
    this.style = sty;
    
    (function wait() {
    	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setPointStyle(this.letter, this.style);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  setSize(siz) { 
    this.size = siz;

    (function wait() {
    	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setPointSize(this.letter, this.size);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  fixToggle() { 
    this.fixed = !this.fixed;

    (function wait() {
    	if(typeof store.getState().p[this.letter] != 'undefined') { 	
   		 if(store.getState().p[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setFixed(this.letter, this.fixed);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();  
  }

  


}

export default Point;