
import {GGBApplet} from './ggbLib.js';

import {paramDefaults, ggbBase64Default} from './defaults.js'

import '../resize.js' 


class GGBApp { 
  constructor(paramObj) {

    this.params = { 
       //id: "applet" + GGBApp.idCount, 
       id: paramObj.id,
       //ggbBase64 : paramObj.ggbBase64 || paramDefaults.ggbBase64,
       width : paramObj.width || paramDefaults.width,
       height : paramObj.height || paramDefaults.height,
       borderColor : paramObj.borderColor || paramDefaults.borderColor,
       enableRightClick : paramObj.enableRightClick || paramDefaults.enableRightClick,
       enableLabelDrags : paramObj.enableLabelDrags || paramDefaults.enableLabelDrags,
       enableShiftDragZoom : paramObj.enableShiftDragZoom || paramDefaults.enableShiftDragZoom,
       useBrowserForJS : paramObj.useBrowserForJS || paramDefaults.useBrowserForJS,
       showLogging : paramObj.showLogging || paramDefaults.showLogging,
       capturingThreshold : paramObj.capturingThreshold || paramDefaults.capturingThreshold,
       scale : paramObj.scale || paramDefaults.scale,
       showZoomButtons : paramObj.showZoomButtons || paramDefaults.showZoomButtons,
    }


    this.idNumber = Number(this.params.id.substring(6, 7))

    this.type = paramObj.type;
    this.params.ggbBase64 = ggbBase64Default[this.type] || ggbBase64Default["2D"];

    this.X = paramObj.X || 5;
    this.Y = paramObj.Y || 5;

    if(this.type == "3D" || this.type == "3DTesting") { 
      this.Z = paramObj.Z || 5;
    }

    this.XLabel = paramObj.XLabel || "";
    this.YLabel = paramObj.YLabel || "";
    this.ZLabel = paramObj.ZLabel || "";

    this.graphPad = paramObj.graphPad || 20;

    store.dispatch({ 
      type: 'ADDApplet', 
      name: this.params.id,
    })
    
    
    let div0 = document.createElement("div");
    document.getElementById("AppMain").appendChild(div0).setAttribute("id", this.params.id + "Container");

    document.getElementById(this.params.id + "Container").style.position = "absolute";

    this.applet = new GGBApplet(this.params, true);

    var div1 = document.createElement("div");

    document.getElementById(this.params.id + "Container").appendChild(div1).setAttribute("id", (this.params.id));
    

    // To use self hosting rather than the CDN
    this.applet.setHTML5Codebase('/GeoGebra/HTML5/5.0/web3d/');

    this.applet.inject(this.params.id);
    

    document.getElementById(this.params.id + "Container").style.visibility = "hidden";
    document.getElementById(this.params.id + "Container").style.display = "none";

    this.visible = false;
    this.pos = "";
  }
  
  hide() { 
    this.visible = false;
    document.getElementById(this.params.id + "Container").style.visibility = "hidden";
    document.getElementById(this.params.id + "Container").style.display = "none";
  }

  show(position) {

    this.pos = position;

    let mainWidth = document.getElementById('AppMain').clientWidth;
    let mainHeight = document.getElementById('AppMain').clientHeight;    

    if(store.getState().browser === "desktop") {
      document.getElementById(this.params.id + "Container").style.top = "0px";
      document.getElementById(this.params.id + "Container").style.left = "0px";
    }
    else if(store.getState().browser === "mobile") { 
      document.getElementById(this.params.id + "Container").style.top = g.padding.toString() + "px";
      document.getElementById(this.params.id + "Container").style.left = g.padding.toString() + "px";
    }

    switch(position) { 
      case 'full':
        this.width = mainWidth;
        this.height = mainHeight;
        break;

      case 'top': 
        this.width = mainWidth;
        this.height = mainHeight/2 - g.padding/2;
        break;

      case 'bottom': 
        this.width = mainWidth;
        this.height = mainHeight/2 - g.padding/2;
        
        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
      break;

      case 'left':
        this.height = mainHeight;
        this.width = mainWidth/2 - g.padding/2;
        break;

      case 'right':
        this.height = mainHeight;
        this.width = mainWidth/2 - g.padding/2;

        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }
        break;


      case 'topLeft':
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;
        break;

      case 'topRight': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;

        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }
        break;

      case 'bottomLeft': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;       
        
        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
        break;

      case 'bottomRight': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;       

        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }

        if(store.getState().browser === "desktop") {  
          document.getElementById(this.params.id + "Container").style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById(this.params.id + "Container").style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
        break;


      default:
        console.log('Applet show option not found: ' + this.params.id);
        break;
    }


    (function wait() {
      if ( store.getState().allMounted ) {
        document.getElementById(this.params.id + "Container").style.display = "block";
        this.resize(this.width, this.height);
        document.getElementById(this.params.id + "Container").style.visibility = "visible";
        this.visible = true;

        if(this.type == "2D" || this.type=="2DTesting") { 
          this.applet.getAppletObject().setAxisLabels(1, this.XLabel, this.YLabel);
        }
        else if(this.type == "3D" || this.type == "3DTesting") { 
          this.applet.getAppletObject().setAxisLabels(3, this.XLabel, this.YLabel, this.ZLabel);
        }
        else { 
          console.log("setAxisLabels error");
        }

        
        if(this.type == "3D" || this.type == "3DTesting") { 
          this.applet.getAppletObject().evalCommand("SetColor[xAxis,0,0,0]");
          this.applet.getAppletObject().evalCommand("SetColor[yAxis,0,0,0]");
          this.applet.getAppletObject().evalCommand("SetColor[zAxis,0,0,0]");
        }
        

      } else {
        setTimeout( wait.bind(this), 100 );
      }
    }.bind(this))();
 

  }


  setLabels2D(XLabel, YLabel) { 

    this.XLabel = XLabel;
    this.YLabel = YLabel;

    (function wait() {
      if ( store.getState().allMounted ) {
        this.applet.getAppletObject().setAxisLabels(1, this.XLabel, this.YLabel);
      } else {
        setTimeout( wait.bind(this), 50 );
      }
    }.bind(this))();

  }


  setLabels3D(XLabel, YLabel, ZLabel) { 

    this.XLabel = XLabel;
    this.YLabel = YLabel;
    this.ZLabel = ZLabel; 

    (function wait() {
      if ( store.getState().allMounted ) {
        this.applet.getAppletObject().setAxisLabels(3, this.XLabel, this.YLabel, this.ZLabel);
      } else {
        setTimeout( wait.bind(this), 50 );
      }
    }.bind(this))();

  }


  removeSteps() { 
    this.applet.getAppletObject().setAxisSteps(1, 100, 100);
  }

  setSteps(X, Y) { 
    this.applet.getAppletObject().setAxisSteps(1, X, Y);
  }

  setCoords2D(X, Y) { 
    this.X = X;
    this.Y = Y;
    
    let marginWdith = this.graphPad/(this.width/this.X);
    let marginHeight = this.graphPad/(this.height/this.Y);

    (function wait() {
      if ( store.getState().allMounted ) {
        this.applet.getAppletObject().setCoordSystem(-marginWdith,this.X,-marginHeight,this.Y);
      } else {
        setTimeout( wait.bind(this), 50 );
      }
    }.bind(this))();
  }
  
  
  resetCoords() { 

    if(this.type == "2D" || this.type == "2DTesting") { 
      let marginWdith = this.graphPad/(this.width/this.X);
      let marginHeight = this.graphPad/(this.height/this.Y);

      this.applet.getAppletObject().setCoordSystem(-marginWdith,this.X,-marginHeight,this.Y);
    }
    else if(this.type == "3D" || this.type == "3DTesting") {
      this.applet.getAppletObject().setCoordSystem(-this.X/5,this.X,-this.Y/5,this.Y, -this.Z/5, this.Z);
    }
    else { 
      console.log("Applet type not found: " + this.type);
    }

  }

  resize(width, height) {
    
    //console.log("resize")

    eval(this.params.id).setWidth(width);
    eval(this.params.id).setHeight(height);

    document.getElementsByClassName('applet_scaler')[this.idNumber].style.width = (width).toString() + "px";
    document.getElementsByClassName('applet_scaler')[this.idNumber].style.height = (height).toString() + "px";

    setTimeout(function() { 
      this.resetCoords(this.idNumber);
    }.bind(this), 10)

    setTimeout(function() {
        document.getElementById(this.params.id).style.width = (width).toString() + "px";
        document.getElementById(this.params.id).style.height = (height).toString() + "px";
    }.bind(this), 50);

    setTimeout(function() {
        document.getElementById(this.params.id + "Container").style.width = (width).toString() + "px";
        document.getElementById(this.params.id + "Container").style.height = (height).toString() + "px";

        document.getElementsByClassName("applet_scaler")[this.idNumber].style.transform = "scale(1,1)";
    }.bind(this), 100);
  
  }


}

store.dispatch({ 
  type: 'setBrowser', 
})

window.addEventListener('resizeend', function () {
  
  store.dispatch({ 
    type: 'setBrowser', 
  })

});


export default GGBApp;
