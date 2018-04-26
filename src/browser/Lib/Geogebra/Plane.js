

window.Plane = class Plane {

	constructor(paramObj) {
  	// Compulsary properties
    this.letter = paramObj.letter;
    this.symbol = paramObj.symbol;
    this.app = paramObj.app;
    this.exp = paramObj.exp;
    this.opacity = paramObj.opacity;

    this.color = { 
      red: paramObj.red, 
      green: paramObj.green, 
      blue: paramObj.blue,
    };

    // Accessive through methods
    this.labelVisible = false;
    this.trace = false;
    this.style = -1; 
    this.fixed = false;
    
    store.dispatch({ 
      type: "AddPlane",
      letter: this.letter,
      symbol: this.symbol,
      app: this.app,
      exp: this.exp,
    });

    // default is not visible
    this.visible = false;

		this.status = "active";

		this.changeColor(this.color.red, this.color.green, this.color.blue);
	}


	changeColor(red, green, blue) {
		this.color.red = red;
		this.color.green = green;
		this.color.blue = blue; 

		(function wait() {
			if(typeof store.getState().Plane[this.letter] != 'undefined') { 	
				if(store.getState().Plane[this.letter].status == "mounted") { 
					g[this.app].applet.getAppletObject().setColor(this.symbol, red, green, blue);
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
     if(typeof store.getState().Plane[this.letter] != 'undefined') {  
       if(store.getState().Plane[this.letter].status == "mounted") { 

        g[this.app].applet.getAppletObject().setVisible(this.symbol, this.visible);
        g[this.app].applet.getAppletObject().setFilling(this.symbol, this.opacity);

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().Plane[this.letter] != 'undefined') { 	
   		 if(store.getState().Plane[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.symbol, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  

}

export default Plane;