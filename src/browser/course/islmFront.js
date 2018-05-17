import '../Lib/katex.min.js';
import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";

import '../Lib/defReducers.js';

import GGBApp from '../Lib/Geogebra/GGBApp.js';

import Var from '../Lib/Geogebra/Var.js';
import Point from '../Lib/Geogebra/Point.js';
import Intersection from '../Lib/Geogebra/Intersection.js';
import Angle from '../Lib/Geogebra/Angle.js';
import Func from '../Lib/Geogebra/Function.js';
import Segment from '../Lib/Geogebra/Segment.js';
import Text from '../Lib/Geogebra/Text.js';
import Arc from '../Lib/Geogebra/Arc.js';
import Plane from '../Lib/Geogebra/Plane.js';

import App from "../../shared/course/ISLM/ISLMApp.js";

// The global namespace object
window.g = {}; 

ReactDOM.hydrate(
	<BrowserRouter>
		<App />	
	</BrowserRouter>
  , document.getElementById("App")
);


if(screen.width > screen.height) { 
	g.padding = 35;
}
else { 	
	g.padding = 16;
}

g.params = { 
	 funcThickness: 8,

	 PEAppHeight: 6,
	 PEAppWidth: 8,

	 PELabelHorizontalShift: 0.45,
	 PELabelVerticalShift: 0.15,

	 PEBlue: { 
	 	r: 37,
	 	g: 93,
	 	b: 115,
	 },

	 slopeSegmentThickness: 2,
     distanceSegmentThickness: 6,
  
     pointSize: 3,
	 
	 dottedSegment: 2,

	 bottomTextShift: 0.06,

}


store.dispatch({ 
	type: 'setPath', 
	path: '/course/is-lm'
})


g.applet0 = new GGBApp({
	id: "applet0",
	type: "2D",
	X: g.params.PEAppWidth, 
	Y: g.params.PEAppHeight,
	XLabel: "Income, Ouput, Y",
	YLabel: "Planned Expenditure, PE",
	graphPad: 30,
});


g.I = new Var({
	letter: 'I', 
	value: 2
});	

g.MPC = new Var({
	letter: 'MPC',
	value: 0.3,
})

g.p = new Func({
	letter: "p",
	app: "applet0", 
	exp: "p(x) = MPC*x^0.99999 + I", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});


g.PEText = new Text({ 
	letter: "PEText", 
	app: 'applet0', 
	text: 'PE', 

	XInit: (g.params.PEAppWidth - g.params.PELabelHorizontalShift),
	YInit: eval( 'g.MPC.get()*' + (g.params.PEAppWidth - g.params.PELabelHorizontalShift) + ' + g.I.get() + ' + g.params.PELabelVerticalShift ),

	YEval: 'g.MPC.get()*' + (g.params.PEAppWidth - g.params.PELabelHorizontalShift) + ' + g.I.get() + ' + g.params.PELabelVerticalShift , 

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});


g.p1 = new Segment({ 
	letter: "p1",
	app: "applet0",
	origin: "(4, MPC*4^0.99999 + I)", 
	point: "(5, MPC*4^0.99999 + I)", 
	labelVisible: true,
	labelStyle: 3,
	caption: "$1",
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
	thickness: g.params.slopeSegmentThickness,
});
g.pMPC = new Segment({ 
	letter: "pMPC",
	app: "applet0",
	origin: "(5, MPC*4^0.99999 + I)", 
	point: "(5, MPC*5^0.99999 + I)", 
	labelVisible: true,
	labelStyle: 3,
	caption: "MPC",
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
	thickness: g.params.slopeSegmentThickness,
});


g.a = new Func({
	letter: "a",
	app: "applet0", 
	exp: "a(x) = x^0.99999", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 0, 
	blue: 0, 
});


g.YAngle = new Angle({ 
	app: 'applet0', 
	letter: 'YAngle', 
	pos: "((1,0), (1,1))" 
});


g.YText = new Text({ 
	letter: "YText", 
	app: 'applet0', 
	text: 'Y = PE', 

	XInit: g.params.PEAppHeight,
	YInit: g.params.PEAppHeight - 0.3,

	red: 0, 
	green: 0, 
	blue: 0, 
});


g.A = new Point({ 
	letter: "A", 
	app: "applet0",
	X: "(I/(1-MPC))",
	Y: "(I/(1-MPC))",
	labelVisible: true,
	size: g.params.pointSize,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
});


g.ABelow = new Segment({
	letter: "ABelow",
	app: "applet0",
	origin: "(I/(1-MPC), 0)", 
	point: "(I/(1-MPC), I/(1-MPC))", 
	lineStyle: 1,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
	thickness: g.params.dottedSegment,
})

g.ALeft = new Segment({
	letter: "ALeft",
	app: "applet0",
	origin: "(I/(1-MPC), I/(1-MPC))", 
	point: "(0, I/(1-MPC))", 
	lineStyle: 1,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
	thickness: g.params.dottedSegment,
})


g.yText = new Text({ 
	letter: "yText", 
	app: 'applet0', 
	text: "Y", 

	XInit: eval( (g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift ),
	YInit: 'Bottom',

	XEval: '(g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift', 

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
})

g.y2Text = new Text({ 
	letter: "y2Text", 
	app: 'applet0', 
	text: "   Y", 

	XInit: 'Left',
	YInit: eval( (g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift/2 ),

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
})


g.YP = new Var({
	letter: "YP", 
	value: 2.857142857142857,
});


g.yPrimeText = new Text({ 
	letter: "yPrimeText", 
	app: 'applet0', 
	text: "Y'", 

	XInit: eval( g.YP.get() - g.params.bottomTextShift ),
	YInit: 'Bottom',

	XEval: 'g.YP.get() - g.params.bottomTextShift', 

	red: 0, 
	green: 191, 
	blue: 255,
});
g.YPrimeBelow = new Segment({
	letter: "YPrimeBelow",
	app: "applet0",
	origin: "(YP, 0)", 
	point: "(YP, YP)", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});
g.PELeft = new Segment({
	letter: "PELeft",
	app: "applet0",
	origin: "(0, MPC*YP + I)", 
	point: "(YP, MPC*YP + I)", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});
g.YLeft = new Segment({
	letter: "YLeft",
	app: "applet0",
	origin: "(0, YP)", 
	point: "(YP, YP)", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});
g.diffInvSeg = new Segment({
	letter: "diffInvSeg",
	app: "applet0",
	origin: "(YP, YP)", 
	point: "(YP, MPC*YP + I)", 
	labelVisible: true,
	caption: " ",
	labelStyle: 3,
	lineStyle: 0,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.distanceSegmentThickness,
});
g.YPrime = new Text({ 
	letter: "YPrime", 
	app: 'applet0', 
	text: "   Y'", 

	XInit: 'Left',
	YInit: eval('g.YP.get() - g.params.bottomTextShift/2'),

	YEval: 'g.YP.get() - g.params.bottomTextShift/2', 

	red: 0, 
	green: 191, 
	blue: 255,
});
g.PEPrime = new Text({ 
	letter: "PEPrime", 
	app: 'applet0', 
	text: " PE'", 

	XInit: 'Left',
	YInit: eval('g.MPC.get()*g.YP.get() + g.I.get() - g.params.bottomTextShift/2'),

	YEval: 'g.MPC.get()*g.YP.get() + g.I.get() - g.params.bottomTextShift/2', 

	red: 0, 
	green: 191, 
	blue: 255,
});

g.DG = new Var({
	letter: 'DG', 
	value: 0
});	

g.g = new Func({
	letter: "g",
	app: "applet0", 
	exp: "g(x) = MPC*x^0.99999 + I + DG", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
});


g.B = new Point({ 
	letter: "B", 
	app: "applet0",
	X: "((I+DG)/(1-MPC))",
	Y: "((I+DG)/(1-MPC))",
	labelVisible: true,
	size: g.params.pointSize,
	red: 0, 
	green: 191, 
	blue: 255,
});

g.PEPrimeText = new Text({ 
	letter: "PEPrimeText", 
	app: 'applet0', 
	text: "PE'", 

	XInit: (g.params.PEAppWidth - g.params.PELabelHorizontalShift),
	YInit: eval( 'g.MPC.get()*(g.params.PEAppWidth - g.params.PELabelHorizontalShift) + g.I.get() + g.DG.get() + g.params.PELabelVerticalShift' ),

	YEval:  'g.MPC.get()*(g.params.PEAppWidth - g.params.PELabelHorizontalShift) + g.I.get() + g.DG.get() + g.params.PELabelVerticalShift' , 

	red: 0, 
	green: 191, 
	blue: 255,
});



g.BBelow = new Segment({
	letter: "BBelow",
	app: "applet0",
	origin: "((I+DG)/(1-MPC), 0)", 
	point: "((I+DG)/(1-MPC), (I+DG)/(1-MPC))", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});

g.BLeft = new Segment({
	letter: "BLeft",
	app: "applet0",
	origin: "((I+DG)/(1-MPC), (I+DG)/(1-MPC))", 
	point: "(0, (I+DG)/(1-MPC))", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});


g.ΔG = new Segment({
	letter: "ΔG",
	app: "applet0",
	origin: "(6, I + MPC*6)", 
	point: "(6, I + MPC*6 + DG)", 
	labelVisible: true,
	caption: "ΔG",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});

g.ΔY = new Segment({
	letter: "ΔY",
	app: "applet0",
	origin: "((I)/(1-MPC), 1)", 
	point: "((I+DG)/(1-MPC), 1)", 
	labelVisible: true,
	caption: "ΔY",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});




g.DT = new Var({
	letter: 'DT', 
	value: 0, 
});	

g.t = new Func({
	letter: "t",
	app: "applet0", 
	exp: "t(x) = MPC*x^0.99999 + I + MPC*DT", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
});


g.C = new Point({ 
	letter: "C", 
	app: "applet0",
	X: "( I/(1-MPC) + (MPC*DT)/(1-MPC) )",
	Y: "( I/(1-MPC) + (MPC*DT)/(1-MPC) )",
	labelVisible: true,
	size: g.params.pointSize,
	red: 0, 
	green: 191, 
	blue: 255,
});


g.CBelow = new Segment({
	letter: "CBelow",
	app: "applet0",
	origin: "( ( I/(1-MPC) + (MPC*DT)/(1-MPC) ), 0)", 
	point: "( ( I/(1-MPC) + (MPC*DT)/(1-MPC) ), ( I/(1-MPC) + (MPC*DT)/(1-MPC) ) )", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});

g.CLeft = new Segment({
	letter: "CLeft",
	app: "applet0",
	origin: "( ( I/(1-MPC) + (MPC*DT)/(1-MPC) ), ( I/(1-MPC) + (MPC*DT)/(1-MPC) ) )", 
	point: "(0, ( I/(1-MPC) + (MPC*DT)/(1-MPC) ) )", 
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});

g.PEPrimeTaxText = new Text({ 
	letter: "PEPrimeTaxText", 
	app: 'applet0', 
	text: "PE'", 

	XInit: (g.params.PEAppWidth - g.params.PELabelHorizontalShift),

	YInit: eval( 'g.MPC.get()*(g.params.PEAppWidth - g.params.PELabelHorizontalShift) + g.I.get() + g.MPC.get()*g.DT.get() + g.params.PELabelVerticalShift' ),

	YEval: 'g.MPC.get()*(g.params.PEAppWidth - g.params.PELabelHorizontalShift) + g.I.get() + g.MPC.get()*g.DT.get() + g.params.PELabelVerticalShift' , 

	red: 0, 
	green: 191, 
	blue: 255,
});

g.YTaxPrime = new Text({ 
	letter: "YTaxPrime", 
	app: 'applet0', 
	text: "   Y'", 

	XInit: 'Left',
	YInit: eval('( g.I.get()/(1-g.MPC.get()) + (g.MPC.get()*g.DT.get())/(1-g.MPC.get()) ) - g.params.bottomTextShift/2'),

	YEval: '( g.I.get()/(1-g.MPC.get()) + (g.MPC.get()*g.DT.get())/(1-g.MPC.get()) ) - g.params.bottomTextShift/2', 

	red: 0, 
	green: 191, 
	blue: 255,
});


g.ySecondPrimeText = new Text({ 
	letter: "ySecondPrimeText", 
	app: 'applet0', 
	text: "Y'", 

	XInit: eval( ( g.I.get()/(1-g.MPC.get()) - (g.MPC.get()*g.DT.get())/(1-g.MPC.get()) ) ),
	YInit: 'Bottom',

	XEval: '( ( g.I.get()/(1-g.MPC.get()) + (g.MPC.get()*g.DT.get())/(1-g.MPC.get()) ) - g.params.bottomTextShift )', 

	red: 0, 
	green: 191, 
	blue: 255,
});

g.ΔG2 = new Segment({
	letter: "ΔG2",
	app: "applet0",
	origin: "(5, I + MPC*5)", 
	point: "(5, I + MPC*5 + MPC*DT)", 
	labelVisible: true,
	caption: "$MPC \\times \\Delta T$",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});

g.ΔY2 = new Segment({
	letter: "ΔY2",
	app: "applet0",
	origin: "( ( I/(1-MPC) ), 1)", 
	point: "( ( I/(1-MPC) + (MPC*DT)/(1-MPC) ), 1)", 
	labelVisible: true,
	caption: "$\\Delata Y$",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});


g.applet1 = new GGBApp({
	id: "applet1",
	type: "2D",
	X: 6, 
	Y: 2,
	XLabel: "Investment, I",
	YLabel: "Interest rate, r",
	graphPad: 30,
});


g.IF = new Arc({
	letter: "IF", 
	app: "applet1", 
	centerX: 3, 
	centerY: 1,
	width: 5,
	height: 1.6,
	slope: 'down',
	alpha: 0.22, 
	thickness: g.params.funcThickness,
	red: 0,
	green: 0,
	blue: 0,
})


g.applet2 = new GGBApp({
	id: "applet2",
	type: "2D",
	X: 8, 
	Y: 2,
	XLabel: "Income, Output, Y",
	YLabel: "Interest rate, r",
	graphPad: 30,
});

g.r = new Var({
	letter: 'r', 
	value: 1,
});

g.rSegment = new Segment({
	letter: "rSegment",
	app: "applet1",
	origin: "( 0, r)", 
	point: "( 10, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});


g.rIntSegment = new Segment({
	letter: "rIntSegment",
	app: "applet1",
	origin: "( 0, r)", 
	point: "( I, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.rIntPoint = new Intersection({
	letter: "rIntPoint",
	app: "applet1",
	obj1: 'IF',
	obj2: 'rSegment',

	red: 0,
	green: 0,
	blue: 0,
});

g.iSegment = new Segment({
	letter: "iSegment",
	app: "applet1",
	origin: "( I, 0)", 
	point: "( I, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.rText = new Text({ 
	letter: "rText", 
	app: 'applet1', 
	text: "     r", 

	XInit: 'Left',
	YInit: eval( g.r.get() - g.params.bottomTextShift/3 ),
	YEval: 'g.r.get() - g.params.bottomTextShift/3',

	red: 0, 
	green: 0, 
	blue: 0,
});
g.rISText = new Text({ 
	letter: "rISText", 
	app: 'applet2', 
	text: "     r", 

	XInit: 'Left',
	YInit: eval( g.r.get() - g.params.bottomTextShift/3 ),
	YEval: 'g.r.get() - g.params.bottomTextShift/3',

	red: 0, 
	green: 0, 
	blue: 0,
});



g.yISText = new Text({ 
	letter: "yISText", 
	app: 'applet2', 
	text: "Y", 

	XInit: eval( (g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift ),
	YInit: 'Bottom',

	XEval: '(g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift', 

	red: 0, 
	green: 0, 
	blue: 0,
})


g.IText = new Text({ 
	letter: "IText", 
	app: 'applet1', 
	text: "I ", 

	YInit: 'Bottom',

	XInit: eval('g.I.get() - g.params.bottomTextShift'),
	XEval: 'g.I.get() - g.params.bottomTextShift',

	red: 0, 
	green: 0, 
	blue: 0,
})
g.IrText = new Text({ 
	letter: "IrText", 
	app: 'applet1', 
	text: "I(r)", 

	YInit: 0.24,
	XInit: 5.5,

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
})


g.ISPoint = new Point({ 
	letter: "ISPoint", 
	app: "applet2",
	X: "(I/(1-MPC))",
	Y: "( r )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0, 
	green: 191, 
	blue: 255,
})
g.ISText = new Text({ 
	letter: "ISText", 
	app: 'applet2', 
	text: "IS", 

	YInit: 0.3,
	XInit: 7.1,

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
})


g.ISrSegment = new Segment({
	letter: "ISrSegment",
	app: "applet2",
	origin: "( 0, r)", 
	point: "( I/(1-MPC), r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});



g.ISySegment = new Segment({
	letter: "ISySegment",
	app: "applet2",
	origin: "( I/(1-MPC), 0)", 
	point: "( I/(1-MPC), 2)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.IS1Point = new Point({ 
	letter: "IS1Point", 
	app: "applet2",
	X: "(I/(1-MPC))",
	Y: "( r )",
	labelVisible: false,
	size: g.params.pointSize,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b,
});

g.IS1 = new Arc({
	letter: "IS1", 
	app: "applet2", 
	centerX: 3.42, 
	centerY: 1,
	width: 3,
	height: 1.5,
	slope: 'down',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});

g.IS1Text = new Text({ 
	letter: "IS1Text", 
	app: 'applet2', 
	text: 'IS', 

	XInit: 4.8,
	YInit: 0.3,

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});

g.IS2CenterX = new Var({
	letter: "IS2CenterX", 
	value: 3.42,
})

g.IS2 = new Arc({
	letter: "IS2", 
	app: "applet2", 
	centerX: "IS2CenterX", 
	centerY: 1,
	width: 3,
	height: 1.5,
	slope: 'down',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
})


g.IS2Point = new Point({ 
	letter: "IS2Point", 
	app: "applet2",
	X: "(IS2CenterX - 0.55)",
	Y: "( r )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0, 
	green: 191, 
	blue: 255,
});

g.IS2Text = new Text({ 
	letter: "IS2Text", 
	app: 'applet2', 
	text: "IS'", 

	XInit: 4.8,
	YInit: 0.3,

	XEval: 'g.IS2CenterX.get() + 1.39',

	red: 0, 
	green: 191, 
	blue: 255,
});

g.IS2ySegment = new Segment({
	letter: "IS2ySegment",
	app: "applet2",
	origin: "( (IS2CenterX - 0.55), 0)", 
	point: "( (IS2CenterX - 0.55), 2)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});

g.IS2rSegment = new Segment({
	letter: "IS2rSegment",
	app: "applet2",
	origin: "( (I/(1-MPC)), r)", 
	point: "( (IS2CenterX - 0.55), r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 191, 
	blue: 255,
	thickness: g.params.dottedSegment,
});

g.yISText = new Text({ 
	letter: "yText", 
	app: 'applet2', 
	text: "Y", 

	XInit: eval( (g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift ),
	YInit: 'Bottom',

	XEval: '(g.I.get()/(1 - g.MPC.get())) - g.params.bottomTextShift', 

	red: 0,
	green: 0,
	blue: 0,
})

g.yISPrimeText = new Text({ 
	letter: "yISPrimeText", 
	app: 'applet2', 
	text: "Y'", 

	XInit: eval( g.YP.get() - g.params.bottomTextShift ),
	YInit: 'Bottom',

	XEval: 'g.YP.get() - g.params.bottomTextShift', 

	red: 0, 
	green: 191, 
	blue: 255,
});




g.applet3 = new GGBApp({
	id: "applet3",
	type: "2D",
	X: 8, 
	Y: 2,
	XLabel: "Real Money Balances, M/P",
	YLabel: "Interest rate, r",
	graphPad: 30,
});

g.LD = new Var({
	letter: "LD",
	value: 4,
})

g.Lr = new Arc({
	letter: "Lr", 
	app: "applet3", 
	centerX: "LD", 
	centerY: 1,
	width: 4,
	height: 1.6,
	slope: 'down',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
});

g.LPrText = new Text({ 
	letter: "LPrText", 
	app: 'applet3', 
	text: "L(r)", 

	YInit: 0.23,

	XInit: eval( g.LD.get() + 2 ),
	XEval: 'g.LD.get() + 2',

	red: 0, 
	green: 191, 
	blue: 255,
});



g.MP = new Var({
	letter: "MP",
	value: 3.5,
})

g.MPSupply = new Segment({
	letter: "MPSupply",
	app: "applet3",
	origin: "( MP, 0)", 
	point: "( MP, 2)", 
	labelVisible: false,
	lineStyle: 0,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.funcThickness,
});


g.MPTextSupply = new Segment({
	letter: "MPTextSupply",
	app: "applet3",
	origin: "( MP, 1.84)", 
	point: "( MP, 1.85)", 
	labelVisible: true,
	caption: "$\\frac{\\bar{M}}{\\bar{P}}$",
	labelStyle: 3,
	lineStyle: 0,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.funcThickness,
});

g.LPIntPoint = new Intersection({
	letter: "LPIntPoint",
	app: "applet3",
	obj1: 'Lr',
	obj2: 'MPSupply',

	red: 0,
	green: 0,
	blue: 0,
});


g.LPrSegment = new Segment({
	letter: "LPrSegment",
	app: "applet3",
	origin: "( 0, r)", 
	point: "( MP, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.rLPText = new Text({ 
	letter: "rLPText", 
	app: 'applet3', 
	text: "     r", 

	XInit: 'Left',
	YInit: eval( g.r.get() - g.params.bottomTextShift/3 ),
	YEval: 'g.r.get() - g.params.bottomTextShift/3',

	red: 0, 
	green: 0, 
	blue: 0,
});

g.LMPoint = new Point({ 
	letter: "LMPoint", 
	app: "applet2",
	X: "LD",
	Y: "( r )",
	labelVisible: false,
	size: g.params.pointSize,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
})

g.LPr2Segment = new Segment({
	letter: "LPr2Segment",
	app: "applet3",
	origin: "( MP, r)", 
	point: "( 8, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});




g.LMrSegment = new Segment({
	letter: "LMrSegment",
	app: "applet2",
	origin: "( 0, r)", 
	point: "( LD, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});



g.LMySegment = new Segment({
	letter: "LMySegment",
	app: "applet2",
	origin: "( LD, 0)", 
	point: "( LD, r)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.LM = new Arc({
	letter: "LM", 
	app: "applet2", 
	centerX: "( LD - 0.55 )", 
	centerY: "r",
	width: 3,
	height: 1.5,
	slope: 'up',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
})

g.LMYText = new Text({ 
	letter: "LMYText", 
	app: 'applet2', 
	text: "Y", 

	YInit: 'Bottom',

	XInit: eval( g.LD.get() - g.params.bottomTextShift/2 ),
	XEval: 'g.LD.get() - g.params.bottomTextShift/2',

	red: 0, 
	green: 0, 
	blue: 0,
});

g.rLMText = new Text({ 
	letter: "rLMText", 
	app: 'applet2', 
	text: "     r", 

	XInit: 'Left',
	YInit: eval( g.r.get() - g.params.bottomTextShift/3 ),
	YEval: 'g.r.get() - g.params.bottomTextShift/3',

	red: 0, 
	green: 0, 
	blue: 0,
});

g.LMText = new Text({ 
	letter: "LMText", 
	app: 'applet2', 
	text: "LM", 

	YInit: 1.8,
	XInit: 6,

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});


g.LPrYText = new Text({ 
	letter: "LPrYText", 
	app: 'applet3', 
	text: "L(r, Y)", 

	YInit: 0.23,

	XInit: eval( g.LD.get() + 2 ),
	XEval: 'g.LD.get() + 2',

	red: 0, 
	green: 191, 
	blue: 255,
});

g.LMLabelText = new Text({ 
	letter: "LMLabelText", 
	app: 'applet2', 
	text: "LM", 

	XInit: 5.3,
	
	YInit: 1.6,
	YEval: 'g.r.get() + 0.75',

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});









g.IS3 = new Arc({
	letter: "IS3", 
	app: "applet2", 
	centerX: 4.5, 
	centerY: 0.88,
	width: 4,
	height: 1.5,
	slope: 'down',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
});



g.LM2 = new Arc({
	letter: "LM2", 
	app: "applet2", 
	centerX: 3.5, 
	centerY: 0.88,
	width: 4,
	height: 1.5,
	slope: 'up',
	alpha: 0.2, 
	thickness: g.params.funcThickness,
	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});


g.LM2LabelText = new Text({ 
	letter: "LM2LabelText", 
	app: 'applet2', 
	text: "LM", 

	XInit: 6,
	
	YInit: 1.6,

	red: g.params.PEBlue.r, 
	green: g.params.PEBlue.g, 
	blue: g.params.PEBlue.b, 
});


g.ISLMInt = new Intersection({
	letter: "ISLMInt",
	app: "applet2",
	obj1: 'LM2',
	obj2: 'IS3',

	red: 0,
	green: 0,
	blue: 0,
});

g.ISLabelText = new Text({ 
	letter: "ISLabelText", 
	app: 'applet2', 
	text: "IS", 

	YInit: 0.2,
	
	XInit: 6.5,

	red: 0, 
	green: 191, 
	blue: 255,
});



g.yISLM = new Var({
	letter: 'yISLM',
	value: 4,
});

g.rISLM = new Var({
	letter: 'rISLM',
	value: 0.772908,
});


g.yISLMText = new Text({ 
	letter: "yISLMText", 
	app: 'applet2', 
	text: "Y", 

	YInit: 'Bottom',

	XInit: eval( g.yISLM.get() - g.params.bottomTextShift ),

	red: 0, 
	green: 0, 
	blue: 0,
})


g.rISLMText = new Text({ 
	letter: "rISLMText", 
	app: 'applet2', 
	text: "   r", 

	XInit: 'Left',

	YInit: eval( g.rISLM.get() - g.params.bottomTextShift/3 ),

	red: 0, 
	green: 0, 
	blue: 0,
})

g.YISMLSegment = new Segment({
	letter: "YISMLSegment",
	app: "applet2",
	origin: "( yISLM, 0)", 
	point: "( yISLM, rISLM)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.rISMLSegment = new Segment({
	letter: "rISMLSegment",
	app: "applet2",
	origin: "( 0, rISLM)", 
	point: "( yISLM, rISLM)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0, 
	green: 0, 
	blue: 0,
	thickness: g.params.dottedSegment,
});


