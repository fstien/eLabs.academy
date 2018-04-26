

window.Text = class Text {

	constructor(paramObj) {
  	// Compulsary properties
    this.letter = paramObj.letter;
    this.app = paramObj.app;
    this.text = paramObj.text;
    

    this.XInit = paramObj.XInit;

    if(typeof this.XInit == "number") { 
      this.Xtype = "number";
    }
    else if(typeof this.XInit == "string") { 
      this.Xtype = "string";
    }
    else { 
      console.log("Xtype not found.")
    }


    this.YInit = paramObj.YInit;

    if(typeof this.YInit == "number") { 
      this.Ytype = "number";
    }
    else if(typeof this.YInit == "string") { 
      this.Ytype = "string";
    }
    else { 
      console.log("Ytype not found.")
    }


    if(typeof paramObj.XExp === 'undefined') { 
      this.Xdynamic = false;
    }
    else { 
      this.Xdynamic = true;
      this.XExp = paramObj.XExp;
    }
 
    if(typeof paramObj.YExp === 'undefined') { 
      this.Ydynamic = false;
    }
    else { 
      this.Ydynamic = true;
      this.YExp = paramObj.YExp;
    }


    if(typeof paramObj.XEval === 'undefined') { 
      this.XEvalDynamic = false;
    }
    else { 
      this.XEvalDynamic = true;
      this.XEval = paramObj.XEval;
    }
 
    if(typeof paramObj.YEval === 'undefined') { 
      this.YEvalDynamic = false;
    }
    else { 
      this.YEvalDynamic = true;
      this.YEval = paramObj.YEval;
    }

    if(typeof paramObj.whiteBackground === 'undefined') { 
      this.whiteBackground = false;
    }
    else { 
      this.whiteBackground = true;
    }


    this.color = { 
      red: paramObj.red, 
      green: paramObj.green, 
      blue: paramObj.blue,
    };
    
    store.dispatch({ 
      type: "AddText",
      letter: this.letter,
      app: this.app,
      text: this.text,
    });


    if(this.Xdynamic || this.Ydynamic || this.XEvalDynamic || this.YEvalDynamic) { 

      (function wait() {
         if(store.getState().t[this.letter].status == "mounted") { 
            store.subscribe(this.updatePosition.bind(this));          
         } 
         else { 
          setTimeout(wait.bind(this), 100) 
        }       
      }.bind(this))();

    }
    
    // default is not visible
    this.visible = false;

		this.changeColor(this.color.red, this.color.green, this.color.blue);
	}

  show() { 
    this.visible = true;
    
    (function wait() {
     if(typeof store.getState().t[this.letter] != 'undefined') {  
       if(store.getState().t[this.letter].status == "mounted") { 

        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);


        if(this.Ytype == 'number') {
          this.Y = this.YInit;
        }
        else if(this.Ytype == 'string') {               
          if(this.YInit == 'Bottom') { 
            this.Y = -24 * (g[this.app].Y/g[this.app].height);
            g[this.app].applet.getAppletObject().evalCommand('SetBackgroundColor[' + this.letter + ',255,255,255]');
          }
        }
        else { console.log("Ytype not found.") }


        if(this.Xtype == 'number') {
          this.X = this.XInit;
        }
        else if(this.Xtype == 'string') {               
          if(this.XInit == 'Left') { 
            this.X = -36 * (g[this.app].X/g[this.app].width);
            g[this.app].applet.getAppletObject().evalCommand('SetBackgroundColor[' + this.letter + ',255,255,255]');
          }
        }
        else { console.log("Xtype not found.") }


        if(this.whiteBackground) { 
          g[this.app].applet.getAppletObject().evalCommand('SetBackgroundColor[' + this.letter + ',255,255,255]');
        }

        this.setPosition(this.X, this.Y);
        this.updatePosition();

       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }

  hide() { 
    this.visible = false;

    (function wait() {
     if(typeof store.getState().t[this.letter] != 'undefined') {  
       if(store.getState().t[this.letter].status == "mounted") { 

        g[this.app].applet.getAppletObject().setVisible(this.letter, this.visible);
        
       } else { setTimeout( wait.bind(this), 100) }       
      } else { setTimeout( wait.bind(this), 100) }
    }.bind(this))();

  }


  updatePosition() { 
    


    if(this.Xdynamic || this.Ydynamic) {
      logger.disableLogger();

      try {

        if(this.Xdynamic) {
          this.X = eval(g[this.app].applet.getAppletObject().evalCommandCAS(this.XExp))
        }

        if(this.Ydynamic) {
          this.Y = eval(g[this.app].applet.getAppletObject().evalCommandCAS(this.YExp))
        }

        this.setPosition(this.X, this.Y).bind(this)
      }

      catch(err) { 
      }

      logger.enableLogger()
    }

    if(this.XEvalDynamic || this.YEvalDynamic) {
      
      if(this.XEvalDynamic) {
        this.X = eval(this.XEval);
      }

      if(this.YEvalDynamic) { 
        this.Y = eval(this.YEval);
      }
      
      this.setPosition(this.X, this.Y);
    }

  }


  setPosition(X, Y) { 
    g[this.app].applet.getAppletObject().setCoords(this.letter, X, Y);
  }

	changeColor(red, green, blue) {
		this.color.red = red;
		this.color.green = green;
		this.color.blue = blue; 

		(function wait() {
			if(typeof store.getState().t[this.letter] != 'undefined') { 	
				if(store.getState().t[this.letter].status == "mounted") { 
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




}

export default Text;

