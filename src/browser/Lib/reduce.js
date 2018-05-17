
import {getWidth, getHeight} from './dim.js';

var timeoutWait = 10;

var initState = { 
  v: {},
  varAdded: false,
  p: {},
  i: {},
  f: {},
  s: {},
  t: {},
  a: {},
  Arc: {},
  Plane: {},
  div: {},
  appList: [],
  browser: "",
  path: "",
  page: "",
  allMounted: false,
  sideBar: false,
  redirect: false, 
  redTarget: "",

  stream: {},
  streamInit: false,
}

function reduce(state = initState, action) {
  
  //let state.appList = state.appList;

  switch (action.type) {

    case 'AddStream': 

      state.stream = {};

      state.stream.status = 'Added';
      
      state.stream.valPeriods = action.valPeriods;

      state.stream.series = action.series;

      // state.stream.ts = [];
      // state.stream.evalString = action.evalString;
      // state.stream.lastValString = action.lastValString;

      return state;


    case 'InitStream': 

      let firstValueEval = eval(state.stream.evalString);

      state.streamInit = true;
      state.stream.status = 'Init';

      for(var i = 0; i < state.stream.series.length; i++) { 

        let firstValueEval = eval(state.stream.series[i].evalString);

        state.stream.series[i].initVal = state.stream.series[i].currentVal;
        state.stream.series[i].firstVal = firstValueEval;
        state.stream.series[i].lastVal = eval(state.stream.series[i].lastValString);
        state.stream.series[i].ts = [firstValueEval];

      }

      // maxVal

      state.stream.maxVal = 0; 

      for(var i = 0; i < state.stream.series.length; i++) { 

        if(state.stream.series[i].initVal > state.stream.maxVal) { 
          state.stream.maxVal = state.stream.series[i].initVal;
        }
        
        if(state.stream.series[i].firstVal > state.stream.maxVal) { 
          state.stream.maxVal = state.stream.series[i].firstVal;
        }
        
        if(state.stream.series[i].lastVal > state.stream.maxVal) { 
          state.stream.maxVal = state.stream.series[i].lastVal;
        }

      }

      return state;


    case 'PushToStream': 

      for(var i = 0; i < state.stream.series.length; i++) { 
        state.stream.series[i].currentVal = eval(state.stream.series[i].evalString);
      }


      if(state.stream.status == 'Init') {

        for(var i = 0; i < state.stream.series.length; i++) { 

          if(state.stream.series[i].ts.length <= state.stream.valPeriods) {
            state.stream.series[i].ts.push(state.stream.series[i].currentVal);
          }

        }

      }

      return state;


    case 'clearStream':

      state.stream.status = 'Added';

      for(var i = 0; i < state.stream.series.length; i++) { 
        state.stream.series[i].ts = [];
        delete state.stream.series[i].initVal;
      }

      return state;


    case 'AddVar': 

      state.v[action.letter] = { 
        value: action.value, 
      };

      (function wait() {
        if(state.allMounted) {
          for(var i = 0; i<state.appList.length; i++) {       
            g[state.appList[i].name].applet.getAppletObject().evalCommand(action.letter + "=" + action.value);
          }
          state.varAdded = true;
          return state;
        } 
        else {
            setTimeout( wait, timeoutWait );
        }
      })();
        

    case 'SetVar': 

      state.v[action.letter].value = action.value;
      
      (function wait() {
        if ( state.varAdded) {
          for(var i = 0; i<state.appList.length; i++) {   
            
            g[state.appList[i].name].applet.getAppletObject().evalCommand(action.letter + "=" + action.value);
          }
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();
      

      return state;

    case 'updateVar': 

      let originValue = eval(action.origin).getValue(action.letter);

      // Update applets, except for origin
      for(var i in state.appList) { 
        if(state.appList[i].name != action.origin) { 
          g[state.appList[i].name].applet.getAppletObject().evalCommand(action.letter + "=" + originValue);
        }
      }


      // Update store
      state.v[action.letter].value = originValue;

      // update g 
      g[action.letter].setNoDispatch(originValue);

      return state;



    case 'AddPoint': 

      state.p[action.letter] = { 
        app: action.app, 
        status: "defined",
      };
      
      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            

            if(action.Z) { 
              g[action.app].applet.getAppletObject().evalCommand(action.letter + " = (" + action.X + "," + action.Y + "," + action.Z + ")");
            }
            else { 
              g[action.app].applet.getAppletObject().evalCommand(action.letter + " = (" + action.X + "," + action.Y + ")");
            }
            
            state.p[action.letter].status = "mounted";
            g[action.app].applet.getAppletObject().setVisible(action.letter, false);
          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();
      
      
      return state;


    case 'updatePointCoords3D': 
      
      (function wait() {
        if ( state.p[action.letter].status == "mounted" ) {
          setTimeout(function() { 
            
            g[action.app].applet.getAppletObject().evalCommand(action.letter + " = (" + action.X + "," + action.Y + "," + action.Z + ")");
            
         
          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();
      
      
      return state;





    case 'AddAngle': 

      state.a[action.letter] = { 
        app: action.app, 
        pos: action.pos,
        status: "defined",
      };
      
      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            
          g[action.app].applet.getAppletObject().evalCommand(action.letter + " = Angle" + action.pos );
            
            state.a[action.letter].status = "mounted";
            g[action.app].applet.getAppletObject().setVisible(action.letter, false);
          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();
      
      return state;


    case 'AddIntersection': 

      state.i[action.letter] = { 
        app: action.app, 
        obj1: action.obj1, 
        obj2: action.obj2,
        status: "defined",
      };
      

      (function wait() {
        if ( state.varAdded && g[action.app].applet.getAppletObject().exists(action.obj1) && g[action.app].applet.getAppletObject().exists(action.obj2)  ) {
          setTimeout(function() { 

            g[action.app].applet.getAppletObject().evalCommand(action.letter + " = Intersect(" + action.obj1 + "," + action.obj2 + ")");

            state.i[action.letter].status = "mounted";
            g[action.app].applet.getAppletObject().setVisible(action.letter, false);

          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();
      
      
      return state;


    case 'AddFunc': 
      
      state.f[action.letter] = { 
        app: action.app, 
        exp: action.exp, 
        status: "defined",
      };

      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            g[action.app].applet.getAppletObject().evalCommand(action.exp);
            state.f[action.letter].status = "mounted";

            g[action.app].applet.getAppletObject().setVisible(action.letter, false);

          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();

      return state;

    case 'AddPlane': 
      
      state.Plane[action.letter] = { 
        app: action.app, 
        symbol: action.symbol,
        exp: action.exp, 
        status: "defined",
      };

      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 

            g[action.app].applet.getAppletObject().evalCommand(action.exp);
            state.Plane[action.letter].status = "mounted";
            g[action.app].applet.getAppletObject().setVisible(action.symbol, false);

          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();

      return state;

    case 'AddSegment':

      state.s[action.letter] = { 
        app: action.app, 
        origin: action.origin,
        point: action.point, 
        status: "defined",
      };

      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            
            g[action.app].applet.getAppletObject().evalCommand(action.letter + "=" + "Segment(" + action.origin + "," + action.point + ");");
            
            state.s[action.letter].status = "mounted";

            g[action.app].applet.getAppletObject().setVisible(action.letter, false);

          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();


      return state;



    case 'AddArc':

      state.Arc[action.letter] = { 
        app: action.app, 
        centerX: action.centerX,
        centerY: action.centerY,
        width: action.width,
        height: action.height,
        slope: action.slope,
        alpha: action.alpha,
        status: "defined",
      };

      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            
            // Draw the arc


            g[action.app].applet.getAppletObject().evalCommand(action.letter + "X = (" + action.centerX + "," + action.centerY + ");");



            g[action.app].applet.getAppletObject().evalCommand(action.letter + "A = (" + (action.centerX + " - " + action.width/2) + "," + (action.centerY  + " + " + action.height/2) + ");");

            g[action.app].applet.getAppletObject().evalCommand(action.letter + "B = (" + (action.centerX + " + " + action.width/2) + "," + (action.centerY  + " + " + action.height/2) + ");");

            g[action.app].applet.getAppletObject().evalCommand(action.letter + "C = (" + (action.centerX + " - " + action.width/2) + "," + (action.centerY  + " - " + action.height/2) + ");");

            g[action.app].applet.getAppletObject().evalCommand(action.letter + "D = (" + (action.centerX + " + " + action.width/2) + "," + (action.centerY  + " - " + action.height/2) + ");");



            if(action.slope == 'down') { 

              g[action.app].applet.getAppletObject().evalCommand(action.letter + "P = " + action.alpha + "*" + action.letter + "C" + "+" + (1-action.alpha) + "*" + action.letter + "X" + ";" );

              g[action.app].applet.getAppletObject().evalCommand( action.letter + "= CircumcircularArc(" + action.letter + "A," + action.letter + "P," + action.letter + "D);" );
              
            }
          
            if(action.slope == 'up') { 

              g[action.app].applet.getAppletObject().evalCommand(action.letter + "P = " + action.alpha + "*" + action.letter + "D" + "+" + (1-action.alpha) + "*" + action.letter + "X" + ";" );

              g[action.app].applet.getAppletObject().evalCommand( action.letter + "= CircumcircularArc(" + action.letter + "C," + action.letter + "P," + action.letter + "B);" );
              
            }
            
            g[action.app].applet.getAppletObject().setVisible(action.letter + "A", false);
            g[action.app].applet.getAppletObject().setVisible(action.letter + "B", false);
            g[action.app].applet.getAppletObject().setVisible(action.letter + "C", false);
            g[action.app].applet.getAppletObject().setVisible(action.letter + "D", false);
            g[action.app].applet.getAppletObject().setVisible(action.letter + "X", false);
            g[action.app].applet.getAppletObject().setVisible(action.letter + "P", false);
            
            state.Arc[action.letter].status = "mounted";
            
            g[action.app].applet.getAppletObject().setVisible(action.letter, false);
            
          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();


      return state;





    case 'AddText': 
      
      state.t[action.letter] = { 
        app: action.app, 
        text: action.text, 
        status: "defined",
      };

      (function wait() {
        if ( state.varAdded ) {
          setTimeout(function() { 
            
            g[action.app].applet.getAppletObject().evalCommand(action.letter + "=" + '"' + action.text + '"');

            state.t[action.letter].status = "mounted";

            g[action.app].applet.getAppletObject().setVisible(action.letter, false);

          }, timeoutWait)
        } else {
            setTimeout( wait, timeoutWait );
        }
      })();

      return state;


    case 'ADDApplet': 
      state.appList.push({ 
        name: action.name,
        status: "defined",
      })

      return state;

  

    case 'Mount': 

      for(var i in state.appList) { 
        if(state.appList[i].name === action.name) { 
          state.appList[i].status = "mounted";
        }
      }

      g[action.name].applet.getAppletObject().registerClickListener('click');

      state.allMounted = true; 

      for(var i in state.appList) { 
        if(state.appList[i].status === "defined") { 
          state.allMounted = false;
        }
      }

      return state;

    case 'setBrowser': 

      if( (getWidth() > getHeight()) || getWidth() > 1000 ) {  
        state.browser = "desktop";
      }
      else { 
        state.browser = "mobile";
      }

      return state;
    
    case 'setPath': 
      state.path = action.path;
      state.page = action.path;
      return state;

    case 'setPage': 
      state.page = action.page;
      return state;


    case 'showSideBar':
      state.sideBar = true;

      return state;

    case 'hideSideBar':
      state.sideBar = false;

      return state;


    case 'Redirect': 

      if(action.page !== state.redTarget) {
        state.redTarget = action.page;
        state.redirect = true;
      }
      
      return state;


    case 'RedirectComplete': 
      state.redirect = false;
      state.redTarget = "";

      return state;


    default: 
      return state;
  }

}

export default reduce;