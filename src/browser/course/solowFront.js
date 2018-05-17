import '../Lib/katex.min.js';
import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom";

import '../Lib/defReducers.js';

import GGBApp from '../Lib/Geogebra/GGBApp.js';

import Var from '../Lib/Geogebra/Var.js';
import Point from '../Lib/Geogebra/Point.js';
import Func from '../Lib/Geogebra/Function.js';
import Segment from '../Lib/Geogebra/Segment.js';
import Text from '../Lib/Geogebra/Text.js';
import Plane from '../Lib/Geogebra/Plane.js';


import SolowSwipe from '../Lib/D3/SolowSwipe.js';

import App from "../../shared/course/Solow/SolowApp.js";


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
	  app1Width: 3.5,
	  app1Height: 1.4,

	  funcLabelXShift: 0.25,
	  funcLabelYShift: 0.25,

	  funcTextShift: 0.03,

	  bottomTextShift: 0.03,

	  funcThickness: 8,
	  slopeSegmentThickness: 2,

	  distanceSegmentThickness: 6,

	  dottedSegment: 2,

	  pointSize: 3,
}


store.dispatch({ 
	type: 'setPath', 
	path: '/course/solow'
})


g.applet0 = new GGBApp({
	id: "applet0",
	type: "3D",
	X: 12, 
	Y: 12,
	Z: 12,
	XLabel: "K",
	YLabel: "L",
	ZLabel: "Y",
	enableShiftDragZoom: true,
	graphPad: 30,
});

g.applet1 = new GGBApp({
	id: "applet1",
	type: "2D",
	X: 12, 
	Y: 12,
	XLabel: "Capital per worker, k",
	YLabel: "Output per worker, y",
	enableShiftDragZoom: false,
	graphPad: 35,
})



g.a = new Var({
	letter: 'a', 
	value: 0.3,
	min: 0, 
	max: 1,
});	

g.f = new Func({
	letter: "f",
	app: "applet0", 
	exp: "f(x,y) = x^a * y^(1-a)", 
	type: "3D",
	caption: "",
	thickness: 1,
	opacity: 0.6,
	red: 211, 
	green: 255, 
	blue: 252,
})


g.p = new Func({
	letter: "p",
	app: "applet1", 
	exp: "p(x) = x^a", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 37, 
	green: 93, 
	blue: 115,
})

g.pT = new Text({ 
	letter: "pT", 
	app: 'applet1', 
	text: 'f(k)', 

	XInit: 11, 
	YInit: 2.25,

	YEval: '11.3**g.a.get() + 0.4', 

	red: 37,
	green: 93,
	blue: 115,	
})



g.Z = new Var({
	letter: 'Z', 
	value: 1,
	min: 0, 
	max: 3,
});	

g.A = new Point({ 
	letter: "A", 
	app: "applet0",
	X: "Z*4",
	Y: "Z*2",
	Z: " ((Z*4)^a) * ((Z*2)^(1-a)) ",
	labelVisible: true,
	size: g.params.pointSize,
	red: 255,
	green: 0,
	blue: 0,
});


g.LSeg = new Segment({
	letter: "LSeg",
	app: "applet0",
	origin: "(0,Z*2,0)", 
	point: "(Z*4,Z*2,0)", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.KSeg = new Segment({
	letter: "KSeg",
	app: "applet0",
	origin: "(Z*4,0,0)", 
	point: "(Z*4,Z*2,0)", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.ISeg = new Segment({
	letter: "ISeg",
	app: "applet0",
	label: "",
	origin: "(Z*4,Z*2,0)", 
	point: "(Z*4,Z*2, ((Z*4)^a) * ((Z*2)^(1-a)) )", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.YSeg = new Segment({
	letter: "YSeg",
	app: "applet0",
	label: "",
	origin: "(0,0, ((Z*4)^a) * ((Z*2)^(1-a)) )", 
	point: "(Z*4,Z*2, ((Z*4)^a) * ((Z*2)^(1-a)) )", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})

g.y = new Plane({ 
	letter: 'y',
	symbol: 'l',
	app: 'applet0',
	exp: 'l:y=1',
	opacity: 0.40,
	red: 255, 
	green: 0, 
	blue: 0,
})


g.KL = new Var({
	letter: 'KL', 
	value: 2,
	min: 0, 
	max: 12,
});	



g.LSeg2 = new Segment({
	letter: "LSeg2",
	app: "applet0",
	origin: "(0,1,0)", 
	point: "(KL,1,0)", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.KSeg2 = new Segment({
	letter: "KSeg2",
	app: "applet0",
	origin: "(KL,0,0)", 
	point: "(KL,1,0)", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.ISeg2 = new Segment({
	letter: "ISeg2",
	app: "applet0",
	origin: "(KL,1,0)", 
	point: "(KL, 1,  ((KL)^a) * ((1)^(1-a))  )", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})
g.YSeg2 = new Segment({
	letter: "YSeg2",
	app: "applet0",
	origin: "(KL, 1,  ((KL)^a) * ((1)^(1-a))  )", 
	point: "(0, 0, ((KL)^a) * ((1)^(1-a)) )", 
	red: 255,
	green: 0,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
})

g.k = new Var({
	letter: 'k', 
	value: 2,
	min: 0, 
	max: 7,
});	

g.MPOne = new Segment({
	letter: "MPOne",
	app: "applet1",
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	origin: "(k,k^a)", 
	point: "((k + 1),k^a)", 
	red: 37,
	green: 93,
	blue: 115,
	thickness: g.params.slopeSegmentThickness,
})

g.MPK = new Segment({
	letter: "MPK",
	app: "applet1",
	labelVisible: true,
	labelStyle: 1,
	origin: "((k+1),k^a)", 
	point: "((k+1),(k+1)^a)", 
	red: 37,
	green: 93,
	blue: 115,
	thickness: g.params.slopeSegmentThickness,
})


g.MPS = new Segment({
	letter: "MPS",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,k^a)", 
	lineStyle: 1,
	red: 37,
	green: 93,
	blue: 115,
	thickness: g.params.dottedSegment,
})

g.MPL = new Segment({
	letter: "MPL",
	app: "applet1",
	origin: "(0,k^a)", 
	point: "(k,k^a)", 
	lineStyle: 1,
	red: 37,
	green: 93,
	blue: 115,
	thickness: g.params.dottedSegment,
})



g.dOne = new Segment({
	letter: "dOne",
	app: "applet1",
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	origin: "(k,D*k)", 
	point: "((k + 0.5),D*k)", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
})

g.δ = new Segment({
	letter: "δ",
	app: "applet1",
	origin: "((k+0.5),D*k)", 
	point: "((k+0.5), D*(k+0.5) )", 
	labelVisible: true,
	caption: "δ=0.22",
	labelStyle: 3,
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
})


g.dX = new Segment({
	letter: "dX",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,D*k)", 
	lineStyle: 1,
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.dottedSegment,
})

g.dY = new Segment({
	letter: "dY",
	app: "applet1",
	origin: "(0,D*k)", 
	point: "(k,D*k)", 
	lineStyle: 1,
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.dottedSegment,
})

g.δPoint = new Point({
	letter: "δPoint", 
	app: "applet1",
	X: "k",
	Y: "k*D",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 191,
	blue: 255,
});

g.kSText = new Text({ 
	letter: "kSText", 
	app: 'applet1', 
	text: 'k*', 

	XInit: 4.80-g.params.bottomTextShift, 
	YInit: 'Bottom',

	XEval: '(g.s.get()/g.D.get())**(1/(1-g.a.get())) - ' + g.params.bottomTextShift, 

	red: 0,
	green: 0,
	blue: 0,	
})

g.kText = new Text({ 
	letter: "kText", 
	app: 'applet1', 
	text: 'k', 

	XInit: 2- g.params.bottomTextShift, 
	YInit: 'Bottom',

	XEval: 'g.k.get() - ' + g.params.bottomTextShift, 

	red: 37,
	green: 93,
	blue: 115,	
})


g.fkText = new Text({ 
	letter: "fkText", 
	app: 'applet1', 
	text: 'f(k)', 

	XInit: 'Left',

	YInit: 1.2,

	YEval: 'g.k.get()**g.a.get() - 0.01',

	red: 37,
	green: 93,
	blue: 115,	
})


g.dText = new Text({ 
	letter: "dText", 
	app: 'applet1', 
	text: 'δk', 

	XInit: 'Left',

	YInit: 0.4,

	YEval: 'g.D.get()*g.k.get() - 0.01',

	red: 0,
	green: 191,
	blue: 255,	
})


g.p2T = new Text({ 
	letter: "p2T", 
	app: 'applet1', 
	text: 'f(k)', 

	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift),

	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift, 

	red: 37,
	green: 93,
	blue: 115,	
})


g.s = new Var({
	letter: 's', 
	value: 0.3,
	min: 0, 
	max: 1,
});	


g.i = new Func({
	letter: "i",
	app: "applet1", 
	exp: "i(x) = s*x^a", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 255, 
	green: 99, 
	blue: 71,
})

g.sT = new Text({ 
	letter: "sT", 
	app: 'applet1', 
	text: 'sf(k)', 

	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval('g.s.get()*' + (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift),

	YEval: 'g.s.get()*' + (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() +' + g.params.funcTextShift, 

	red: 255,
	green: 99,
	blue: 71,	
})



g.IPW = new Segment({
	letter: "IPW",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,s*k^a)", 
	labelVisible: true,
	caption: "Investment per worker, i",
	labelStyle: 3,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.CPW = new Segment({
	letter: "CPW",
	app: "applet1",
	origin: "(k,s*k^a)", 
	point: "(k, k^a)", 
	labelVisible: true,
	caption: "Consumption per worker, c",
	labelStyle: 3,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.FX = new Segment({
	letter: "FX",
	app: "applet1",
	origin: "(0,k^a)", 
	point: "(k, k^a)", 
	labelVisible: false,
	labelStyle: 3,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});


g.IP = new Point({ 
	letter: "IP", 
	app: "applet1",
	X: "k",
	Y: "s*k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 255,
	green: 99,
	blue: 71,
});


g.IF = new Point({ 
	letter: "IF", 
	app: "applet1",
	X: "k",
	Y: "k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 37,
	green: 93,
	blue: 115,
});


g.D = new Var({
	letter: 'D', 
	value: 0.2,
	min: 0, 
	max: 1,
});	


g.d = new Func({
	letter: "d",
	app: "applet1", 
	exp: "d(x) = D*x^0.99999999", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
})


g.YP = new Segment({
	letter: "YP",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k, k^a)", 
	labelVisible: false,
	labelStyle: 3,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});


g.LText = new Text({ 
	letter: "LText", 
	app: 'applet1', 
	text: 'δk', 
	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '*g.D.get() + ' + (g.params.funcTextShift + 0.02)),
	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '*g.D.get() + ' + (g.params.funcTextShift + 0.02), 
	red: 0,
	green: 191,
	blue: 255,	
})


g.ID = new Point({ 
	letter: "ID", 
	app: "applet1",
	X: "k",
	Y: "D*k",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 191,
	blue: 255,
});

g.Δk = new Segment({
	letter: "Δk",
	app: "applet1",
	origin: "(k, D*k)", 
	point: "(k, s*k^a)", 
	labelVisible: true,
	caption: "Δk=0.34",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});



g.X1 = new Var({
	letter: 'X1', 
	value: 2,
});	
g.Y1 = new Var({
	letter: 'Y1', 
	value: 0.2*2,
});	

g.X2 = new Var({
	letter: 'X2', 
	value: 2,
});	
g.Y2 = new Var({
	letter: 'Y2', 
	value: 0.6*2**0.3,
});	


g.DiffAnim = new Segment({
	letter: "DiffAnim",
	app: "applet1",
	origin: "(X2, Y2)", 
	point: "(X1, Y1)", 
	labelVisible: true,
	caption: "0.34",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});


g.SSInt = new Point({ 
	letter: "SSInt", 
	app: "applet1",
	X: "(s/D)**(1/(1-a))",
	Y: "D*( (s/D)**(1/(1-a)) )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});


g.SSSeg = new Segment({
	letter: "SSSeg",
	app: "applet1",
	origin: "( (s/D)**(1/(1-a)), 0 )", 
	point: "( (s/D)**(1/(1-a)), D*( (s/D)**(1/(1-a)) ) )", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});


g.kSKText = new Text({ 
	letter: "kSKText", 
	app: 'applet1', 
	text: 'k*', 

	XInit: 1.78- g.params.bottomTextShift, 
	YInit: 'Bottom',

	XEval: 'g.k.get() - ' + g.params.bottomTextShift, 

	red: 0,
	green: 0,
	blue: 0,	
})

g.fkSText = new Text({ 
	letter: "fkSText", 
	app: 'applet1', 
	text: 'f(k*)', 

	XInit: 'Left',

	YInit: 1.2,

	YEval: 'g.k.get()**g.a.get() - 0.01',

	red: 37,
	green: 93,
	blue: 115,	
})

g.pKS = new Text({ 
	letter: "pKS", 
	app: 'applet1', 
	text: 'f(k*)', 

	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift),

	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift, 


	red: 37,
	green: 93,
	blue: 115,	
})


g.dKS = new Text({ 
	letter: "dKS", 
	app: 'applet1', 
	text: 'δk*', 

	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '*g.D.get() + ' + (g.params.funcTextShift + 0.02)),
	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '*g.D.get() + ' + (g.params.funcTextShift + 0.02), 

	red: 0, 
	green: 191, 
	blue: 255,
})

g.sKS = new Text({ 
	letter: "sKS", 
	app: 'applet1', 
	text: 'sf(k*)', 

	XInit: (g.params.app1Width - g.params.funcLabelXShift), 
	YInit: eval('g.s.get()*' + (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() + ' + g.params.funcTextShift),

	YEval: 'g.s.get()*' + (g.params.app1Width - g.params.funcLabelYShift) + '**g.a.get() +' + g.params.funcTextShift, 

	red: 255, 
	green: 99, 
	blue: 71,
})

g.SDSS = new Segment({
	letter: "SDSS",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,s*k^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});


g.cStar = new Segment({
	letter: "cStar",
	app: "applet1",
	origin: "(k,s*k^a)", 
	point: "(k,k^a)", 
	labelVisible: true,
	caption: "c*",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});





g.SSLP = new Point({ 
	letter: "SSLP", 
	app: "applet1",
	X: "(s/D)**(1/(1-a))",
	Y: "D*( (s/D)**(1/(1-a)) )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 140,
	blue: 0,
});

g.SSHP = new Point({ 
	letter: "SSHP", 
	app: "applet1",
	X: "k",
	Y: "k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 140,
	blue: 0,
});

g.kGold = new Var({
	letter: 'kGold', 
	value: 1.432759,
});

g.kSKGText = new Text({ 
	letter: "kSKGText", 
	app: 'applet1', 
	text: 'k*_{gold}', 

	XInit: 1.432759- g.params.bottomTextShift, 
	YInit: 'Bottom',

	red: 218,
	green: 165,
	blue: 32,	
});

g.SGSS = new Segment({
	letter: "SGSS",
	app: "applet1",
	origin: "(kGold,0)", 
	point: "(kGold, 0.2001*kGold^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.dottedSegment,
});

g.cSGold = new Segment({
	letter: "cSGold",
	app: "applet1",
	origin: "(kGold, 0.2001*kGold^a)", 
	point: "(kGold, kGold^a)", 
	labelVisible: true,
	caption: "c*_{gold}",
	labelStyle: 3,
	lineStyle: 0,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.distanceSegmentThickness,
});

g.GoldLP = new Point({ 
	letter: "GoldLP", 
	app: "applet1",
	X: "kGold",
	Y: "0.2001*kGold^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 218,
	green: 165,
	blue: 32,
});

g.GoldHP = new Point({ 
	letter: "GoldHP", 
	app: "applet1",
	X: "kGold",
	Y: "kGold^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 218,
	green: 165,
	blue: 32,
});

g.fTangeant = new Segment({ 
	letter: "fTangeant",
	app: "applet1",
	origin: "(kGold - 0.5, kGold^a - 0.5*a*kGold**(a-1))", 
	point: "(kGold + 0.5, kGold^a + 0.5*a*kGold**(a-1))", 
	labelVisible: false,
	lineStyle: 0,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.distanceSegmentThickness,
})


g.kTangeant = new Segment({ 
	letter: "kTangeant",
	app: "applet1",
	origin: "(k - 0.5, k^a - 0.5*a*k**(a-1))", 
	point: "(k + 0.5, k^a + 0.5*a*k**(a-1))", 
	labelVisible: false,
	lineStyle: 0,
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});


g.dS1 = new Segment({
	letter: "dS1",
	app: "applet1",
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	origin: "(2.5,D*2.5)", 
	point: "((2.5 + 0.5),D*2.5)", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});

g.dS2 = new Segment({
	letter: "dS2",
	app: "applet1",
	labelVisible: true,
	caption: "δ=0.15",
	labelStyle: 3,
	origin: "((2.5+0.5),D*2.5)", 
	point: "((2.5+0.5), D*(2.5+0.5) )", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});


g.f1 = new Segment({ 
	letter: "f1",
	app: "applet1",
	origin: "(k, k^a)", 
	point: "(k + 0.5, k^a)", 
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
});
g.fMPK = new Segment({ 
	letter: "fMPK",
	app: "applet1",
	origin: "(k + 0.5, k^a)", 
	point: "(k + 0.5, k^a + 0.5*a*k**(a-1))", 
	labelVisible: true,
	labelStyle: 3,
	caption: "MPK=0.2",
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.slopeSegmentThickness,
});


g.iStar = new Segment({
	letter: "iStar",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,s*k^a)", 
	labelVisible: true,
	caption: "i",
	labelStyle: 3,
	lineStyle: 0,
	red: 159,
	green: 126,
	blue: 189,
	thickness: g.params.distanceSegmentThickness,
});


g.c2Star = new Segment({
	letter: "c2Star",
	app: "applet1",
	origin: "(k,s*k^a)", 
	point: "(k,k^a)", 
	labelVisible: true,
	caption: "c",
	labelStyle: 3,
	lineStyle: 0,
	red: 0,
	green: 140,
	blue: 0,
	thickness: g.params.distanceSegmentThickness,
});


g.dottedKgold = new Segment({
	letter: "dottedKgold",
	app: "applet1",
	origin: "(kGold,0)", 
	point: "(kGold, kGold^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: 3,
});

g.IStar = new Point({ 
	letter: "IStar", 
	app: "applet1",
	X: "k",
	Y: "s*k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});



g.SolowConsumption = new SolowSwipe({
	variable: 'graph',
	initPeriods: 3,
	valPeriods: 14,
	
	series: [
		{
			name: 'Investment',
			evalString: 'g.s.get()*g.k.get()**g.a.get()',
			lastValString: 'g.D.get()*(g.s.get()/g.D.get())**(1/(1-g.a.get()))',
		},
		{
			name: 'Consumption', 
			evalString: '(1-g.s.get())*g.k.get()**g.a.get()',
			lastValString: '(1-g.D.get())*(((1-g.D.get())*(g.s.get()/g.D.get())**(1/(1-g.a.get())))**g.a.get())',
		},
		{
			name: 'Output', 
			evalString: 'g.k.get()**g.a.get()',
			lastValString: '(((1-g.D.get())*(g.s.get()/g.D.get())**(1/(1-g.a.get())))**g.a.get())',
		}
	],

});


g.SwipeKgold = new Text({ 
	letter: "SwipeKgold", 
	app: 'applet1', 
	text: 'k*_{gold}', 

	XInit: 1- g.params.bottomTextShift, 
	YInit: 'Bottom',

	red: 218,
	green: 165,
	blue: 32,	
});


g.SwipeKGoldDots = new Segment({
	letter: "SwipeKGoldDots",
	app: "applet1",
	origin: "(1,0)", 
	point: "(1, 1^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.dottedSegment,
});


g.N = new Var({
	letter: 'N', 
	value: 0.01,
	min: 0, 
	max: 0.5,	
});


g.KStarFull = new Segment({
	letter: "KStarFull",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,k^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.DPText = new Text({ 
	letter: "DPText", 
	app: 'applet1', 
	text: '(δ + n)k', 
	XInit: (g.params.app1Width - g.params.funcLabelXShift - 0.15), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '*(g.D.get()+g.N.get()) + ' + (g.params.funcTextShift + 0.02)),
	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '*(g.D.get()+g.N.get()) + ' + (g.params.funcTextShift + 0.02), 
	red: 0,
	green: 191,
	blue: 255,	
})

g.n = new Func({
	letter: "n",
	app: "applet1", 
	exp: "n(x) = (N+D)*x^0.99999999", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
})


g.DPPoint1 = new Point({ 
	letter: "DPPoint1", 
	app: "applet1",
	X: "(s/ (D+N) )**(1/(1-a))",
	Y: "(D+N)*( (s/ (D+N) )**(1/(1-a)) )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});

g.DPPoint2 = new Point({ 
	letter: "DPPoint2", 
	app: "applet1",
	X: "k",
	Y: "k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});


g.dn1 = new Segment({
	letter: "dn1",
	app: "applet1",
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	origin: "(2.3, (D+N)*2.3)", 
	point: "((2.3 + 0.5), (D+N)*2.3)", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});

g.dn2 = new Segment({
	letter: "dn2",
	app: "applet1",
	labelVisible: true,
	caption: "δ+n=0.16",
	labelStyle: 3,
	origin: "((2.3+0.5),(D+N)*2.3)", 
	point: "((2.3+0.5), (D+N)*(2.3+0.5) )", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});


g.kNGold = new Var({
	letter: 'kNGold', 
	value: 1.432759,
});

g.gNGoldText = new Text({ 
	letter: "gNGoldText", 
	app: 'applet1', 
	text: 'k*_{gold}', 

	XInit: 1.432759- g.params.bottomTextShift, 
	YInit: 'Bottom',

	XEval: 'g.kNGold.get() - ' + g.params.bottomTextShift, 

	red: 218,
	green: 165,
	blue: 32,	
});

g.gNGoldSeg = new Segment({
	letter: "gNGoldSeg",
	app: "applet1",
	origin: "(kNGold,0)", 
	point: "(kNGold, kNGold^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.dottedSegment,
});

g.fNTangeant = new Segment({ 
	letter: "fNTangeant",
	app: "applet1",
	origin: "(kNGold - 0.5, kNGold^a - 0.5*a*kNGold**(a-1))", 
	point: "(kNGold + 0.5, kNGold^a + 0.5*a*kNGold**(a-1))", 
	labelVisible: false,
	lineStyle: 0,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.distanceSegmentThickness,
});

g.fN1 = new Segment({ 
	letter: "fN1",
	app: "applet1",
	origin: "(kNGold, kNGold^a)", 
	point: "(kNGold + 0.5, kNGold^a)", 
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.slopeSegmentThickness,
});
g.fNMPK = new Segment({ 
	letter: "fNMPK",
	app: "applet1",
	origin: "(kNGold + 0.5, kNGold^a)", 
	point: "(kNGold + 0.5, kNGold^a + 0.5*a*kNGold**(a-1))", 
	labelVisible: true,
	labelStyle: 3,
	caption: "MPK=0.16",
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.slopeSegmentThickness,
});






// Technology 

g.G = new Var({
	letter: 'G', 
	value: 0.02,
	min: 0, 
	max: 0.5,	
});


g.KGStarFull = new Segment({
	letter: "KGStarFull",
	app: "applet1",
	origin: "(k,0)", 
	point: "(k,k^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 0,
	green: 0,
	blue: 0,
	thickness: g.params.dottedSegment,
});

g.DPGText = new Text({ 
	letter: "DPGText", 
	app: 'applet1', 
	text: '(δ + n + g)k', 
	XInit: (g.params.app1Width - g.params.funcLabelXShift - 0.4), 
	YInit: eval((g.params.app1Width - g.params.funcLabelYShift) + '*(g.D.get()+g.N.get()+g.G.get()) + ' + (g.params.funcTextShift + 0.02)),
	YEval: (g.params.app1Width - g.params.funcLabelYShift) + '*(g.D.get()+g.N.get()+g.G.get()) + ' + (g.params.funcTextShift + 0.02), 
	red: 0,
	green: 191,
	blue: 255,	
})

g.g = new Func({
	letter: "g",
	app: "applet1", 
	exp: "g(x) = (N+D+G)*x^0.99999999", 
	type: "2D",
	caption: "",
	thickness: g.params.funcThickness,
	red: 0, 
	green: 191, 
	blue: 255,
})


g.DPGPoint1 = new Point({ 
	letter: "DPGPoint1", 
	app: "applet1",
	X: "(s/ (D+N+G) )**(1/(1-a))",
	Y: "(D+N+G)*( (s/ (D+N+G) )**(1/(1-a)) )",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});

g.DPGPoint2 = new Point({ 
	letter: "DPGPoint2", 
	app: "applet1",
	X: "k",
	Y: "k^a",
	labelVisible: false,
	size: g.params.pointSize,
	red: 0,
	green: 0,
	blue: 0,
});


g.dng1 = new Segment({
	letter: "dng1",
	app: "applet1",
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	origin: "(2.2, (D+N+G)*2.2)", 
	point: "((2.2 + 0.5), (D+N+G)*2.2)", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});

g.dng2 = new Segment({
	letter: "dng2",
	app: "applet1",
	labelVisible: true,
	caption: "δ+n+g=0.16",
	labelStyle: 3,
	origin: "((2.2+0.5),(D+N+G)*2.2)", 
	point: "((2.2+0.5), (D+N+G)*(2.2+0.5) )", 
	red: 0,
	green: 191,
	blue: 255,
	thickness: g.params.slopeSegmentThickness,
});


g.kNGGold = new Var({
	letter: 'kNGGold', 
	value: 1.432759,
});

g.gNGGoldText = new Text({ 
	letter: "gNGGoldText", 
	app: 'applet1', 
	text: 'k*_{gold}', 

	XInit: 1.432759- g.params.bottomTextShift, 
	YInit: 'Bottom',

	XEval: 'g.kNGGold.get() - ' + g.params.bottomTextShift, 

	red: 218,
	green: 165,
	blue: 32,	
});

g.gNGGoldSeg = new Segment({
	letter: "gNGGoldSeg",
	app: "applet1",
	origin: "(kNGGold,0)", 
	point: "(kNGGold, kNGGold^a)", 
	labelVisible: false,
	lineStyle: 1,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.dottedSegment,
});

g.fNGTangeant = new Segment({ 
	letter: "fNGTangeant",
	app: "applet1",
	origin: "(kNGGold - 0.5, kNGGold^a - 0.5*a*kNGGold**(a-1))", 
	point: "(kNGGold + 0.5, kNGGold^a + 0.5*a*kNGGold**(a-1))", 
	labelVisible: false,
	lineStyle: 0,
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.distanceSegmentThickness,
});

g.fNG1 = new Segment({ 
	letter: "fNG1",
	app: "applet1",
	origin: "(kNGGold, kNGGold^a)", 
	point: "(kNGGold + 0.5, kNGGold^a)", 
	labelVisible: true,
	labelStyle: 3,
	caption: "1",
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.slopeSegmentThickness,
});
g.fNPGMPK = new Segment({ 
	letter: "fNPGMPK",
	app: "applet1",
	origin: "(kNGGold + 0.5, kNGGold^a)", 
	point: "(kNGGold + 0.5, kNGGold^a + 0.5*a*kNGGold**(a-1))", 
	labelVisible: true,
	labelStyle: 3,
	caption: "MPK=0.16",
	red: 218,
	green: 165,
	blue: 32,
	thickness: g.params.slopeSegmentThickness,
});











