

window.Arc = class Arc {

	constructor(paramObj) {
  	// Compulsary properties
    this.letter = paramObj.letter;
    this.app = paramObj.app;
    

    this.centerX = paramObj.centerX;
    this.centerY = paramObj.centerY;

    this.width = paramObj.width;
    this.height = paramObj.height;

    this.slope = paramObj.slope;

    this.alpha = paramObj.alpha;

    this.thickness = paramObj.thickness;
    
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
    this.ticks = false;
    
    store.dispatch({ 
      type: "AddArc",
      letter: this.letter,
      app: this.app,
      centerX: this.centerX,
      centerY: this.centerY,
      width: this.width,
      height: this.height,
      slope: this.slope,
      alpha: this.alpha,
    });

    // default is not visible
    this.visible = false;

		this.status = "active";

		this.changeColor(this.color.red, this.color.green, this.color.blue);
    this.setThickness(this.thickness);
	}
  
  
	changeColor(red, green, blue) {
		this.color.red = red;
		this.color.green = green;
		this.color.blue = blue; 

		(function wait() {
			if(typeof store.getState().Arc[this.letter] != 'undefined') { 	
				if(store.getState().Arc[this.letter].status == "mounted") { 
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
  
  setThickness(thick) { 
    this.thickness = thick;

    (function wait() {
      if(typeof store.getState().Arc[this.letter] != 'undefined') {   
        if(store.getState().Arc[this.letter].status == "mounted") { 
          g[this.app].applet.getAppletObject().setLineThickness(this.letter, this.thickness);
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
     if(typeof store.getState().Arc[this.letter] != 'undefined') {  
       if(store.getState().Arc[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);

        g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);

        g[this.app].applet.getAppletObject().setLabelStyle(this.letter, 3);


        //g[this.app].applet.getAppletObject().setLineStyle(this.letter, 0)

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().Arc[this.letter] != 'undefined') { 	
   		 if(store.getState().Arc[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  



}

export default Arc;

