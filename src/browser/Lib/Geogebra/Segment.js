

window.Segment = class Segment {

	constructor(paramObj) {
  	// Compulsary properties
    this.letter = paramObj.letter;
    this.app = paramObj.app;
    this.origin = paramObj.origin;
    this.point = paramObj.point;
    this.thickness = paramObj.thickness;
    this.caption = paramObj.caption;
    
    this.labelVisible = paramObj.labelVisible;

    if(this.labelVisible) { 
      this.labelStyle = paramObj.labelStyle;
      this.caption = paramObj.caption;
    }
    
    if(typeof paramObj.lineStyle == 'undefined') { 
      this.lineStyle = 0;
    }
    else { 
      this.lineStyle = paramObj.lineStyle;
    }

    this.color = { 
      red: paramObj.red, 
      green: paramObj.green, 
      blue: paramObj.blue,
    };

    // Accessive through methods
    this.trace = false;
    this.style = -1; 
    this.fixed = false;
    this.ticks = false;
    
    store.dispatch({ 
      type: "AddSegment",
      letter: this.letter,
      app: this.app,
      origin: this.origin,
      point: this.point,
    });

    // default is not visible
    this.visible = false;

		this.status = "active";

		this.changeColor(this.color.red, this.color.green, this.color.blue);
    //this.setThickness(this.thickness);
	}


	changeColor(red, green, blue) {
		this.color.red = red;
		this.color.green = green;
		this.color.blue = blue; 

		(function wait() {
			if(typeof store.getState().s[this.letter] != 'undefined') { 	
				if(store.getState().s[this.letter].status == "mounted") { 
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
      if(typeof store.getState().s[this.letter] != 'undefined') {   
        if(store.getState().s[this.letter].status == "mounted") { 
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
     if(typeof store.getState().s[this.letter] != 'undefined') {  
       if(store.getState().s[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
        g[this.app].applet.getAppletObject().setLineThickness(this.letter, this.thickness);

        g[this.app].applet.getAppletObject().setLabelVisible(this.letter, this.labelVisible);

        g[this.app].applet.getAppletObject().setLabelStyle(this.letter, this.labelStyle);

        g[this.app].applet.getAppletObject().setCaption(this.letter, this.caption);

        g[this.app].applet.getAppletObject().setLineStyle(this.letter, this.lineStyle)

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }


  setCaption(caption) { 
    this.caption = caption;

    g[this.app].applet.getAppletObject().setCaption(this.letter, this.caption);
  }


  hide() { 
    this.visible = false;

    (function wait() {
   	 if(typeof store.getState().s[this.letter] != 'undefined') { 	
   		 if(store.getState().s[this.letter].status == "mounted") { 
   	 	 	g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
   	 	 } else { setTimeout( wait.bind(this), 100) }   		
    	} else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }
  
  setTicks() { 
    this.ticks = true;

    (function wait() {
     if(typeof store.getState().s[this.letter] != 'undefined') {  
       if(store.getState().s[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setLineStyle(this.letter, 2)

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }

  hideTicks() { 
    this.ticks = true;

    (function wait() {
     if(typeof store.getState().s[this.letter] != 'undefined') {  
       if(store.getState().s[this.letter].status == "mounted") { 
        g[this.app].applet.getAppletObject().setLineStyle(this.letter, 0)

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();
  }


}

export default Segment;

