
window.Angle = class Angle { 

  constructor(paramObj) {
  	// Compulsary properties
    this.app = paramObj.app;
    this.letter = paramObj.letter;
    this.pos = paramObj.pos;

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
    this.fixed = false;

    store.dispatch({ 
    	type: "AddAngle",
    	letter: this.letter,
    	app: this.app,
    	pos: this.pos,
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
   	if(typeof store.getState().a[this.letter] != 'undefined') { 	
   		if(store.getState().a[this.letter].status == "mounted") { 
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
     if(typeof store.getState().a[this.letter] != 'undefined') {  
       if(store.getState().a[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
       
       g[this.app].applet.getAppletObject().setLabelStyle(this.letter, 2)

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  
  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().a[this.letter] != 'undefined') { 	
   		 if(store.getState().a[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  

  labelToggle() { 
    this.labelVisible = !this.labelVisible; 

    (function wait() {
    	if(typeof store.getState().a[this.letter] != 'undefined') { 	
   		 if(store.getState().a[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }


}

export default Angle;

