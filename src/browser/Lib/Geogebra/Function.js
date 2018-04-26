

window.Func = class Func {

	constructor(paramObj) {
  	// Compulsary properties
    this.letter = paramObj.letter;
    this.app = paramObj.app;
    this.exp = paramObj.exp;
    this.type = paramObj.type;
    this.caption = paramObj.caption;

    this.thickness = paramObj.thickness;


    if(this.type == "3D" || this.type == "3DTesting") { 
      this.opacity = paramObj.opacity;
    }

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
      type: "AddFunc",
      letter: this.letter,
      app: this.app,
      exp: this.exp,
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
			if(typeof store.getState().f[this.letter] != 'undefined') { 	
				if(store.getState().f[this.letter].status == "mounted") { 
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
     if(typeof store.getState().f[this.letter] != 'undefined') {  
       if(store.getState().f[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);

        g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);

        g[this.app].applet.getAppletObject().setLabelStyle(this.letter, 3);

        g[this.app].applet.getAppletObject().setCaption(this.letter, this.caption);

        if(this.type == "3D" || this.type == "3DTesting") { 
          g[this.app].applet.getAppletObject().setLineStyle(this.letter, 2);
          g[this.app].applet.getAppletObject().setFilling(this.letter, this.opacity);
        }

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  setOpacity3D(opacity) { 
    this.opacity = opacity;

    (function wait() {
     if(typeof store.getState().f[this.letter] != 'undefined') {  
       if(store.getState().f[this.letter].status == "mounted") { 
         
         g[this.app].applet.getAppletObject().setFilling(this.letter, this.opacity);

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();    
  }

  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().f[this.letter] != 'undefined') { 	
   		 if(store.getState().f[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  

  labelToggle() { 
    this.labelVisible = !this.labelVisible; 

    (function wait() {
    	if(typeof store.getState().f[this.letter] != 'undefined') { 	
   		 if(store.getState().f[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  traceToggle() {
    this.trace = !this.trace;

    (function wait() {
    	if(typeof store.getState().f[this.letter] != 'undefined') { 	
   		 if(store.getState().f[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setTrace(this.letter, this.trace);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }


  setThickness(thick) { 
    this.thickness = thick;

    (function wait() {
    	if(typeof store.getState().f[this.letter] != 'undefined') { 	
   		 if(store.getState().f[this.letter].status == "mounted") { 
    		g[this.app].applet.getAppletObject().setLineThickness(this.letter, this.thickness);
   		} else { setTimeout( wait.bind(this), 100) }   		
   	 } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }


}

export default Func;