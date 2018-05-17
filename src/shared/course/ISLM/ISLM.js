import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import { Redirect } from 'react-router'

import VarSlider from '../../Lib/VarSlider.js'

import ButtonBar from '../../Lib/ButtonBar.js'

import { InlineMath, BlockMath } from 'react-katex';

import { Sidebar, Segment, Menu, Image, Icon, Header, Popup, Form, Message, Table} from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

import PanelContainer from '../../Lib/PanelContainer.js'

import {showSideBar, hideSideBar} from '../../Lib/sidebar.js';

import axios from 'axios';

import Course from '../../Lib/courseClass.js' 


let course = new Course({ 
  title: "The IS-LM Model",
  description: "Keynes proposed that low aggregate demand is responsible for the low income and high unemployment that characterize economic downturns. Indeed, in the short run, prices are sticky, so changes in aggregate demand influence income. Keynes’s ideas about short-run fluctuations have been prominent since he pro- posed them in the 1930s, but they have commanded renewed attention in recent years. The model of aggregate demand developed in this course, called the IS–LM model, is the leading interpretation of Keynes’s theory. The goal of the model is to show what determines national income for a given price level.", 
  path: "/course/is-lm",
  return: "/learn/is-lm"
})


function hide() { 
    for(var object in g) { 
      if(typeof g[object].hide === 'function') { 
        g[object].hide();
      }
    }

    g.I.set(2);
    g.MPC.set(0.3);
    g.DG.set(0.00001);
    g.applet0.setCoords2D(g.params.PEAppWidth, g.params.PEAppHeight);
}




class View0 extends React.Component { 

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={0}>

        <p>
          Keynes famously proposed that in the short run, an economy's income is determined by the spending plans of households, businesses and the government. The more people want to spend, the more goods and services firms can sell. Thhe more firms can sell, the more they will choose to produce and the more workers they will hire. Keynes believed that the problem during recessions is insufficient spending, which leads firms to reduce their output.
        </p>

        <p>
          To model this insight, we begin by drawing a distinction between actual and planned expenditure. Actual expenditure is the amount households, firms and the government spend on goods and services, and equals the economy's GDP. Planned expenditure is the amount households, firms and the government <b>would like to spend</b> on goods and services. 
        </p>

        <p>
          Why would actual expenditure ever differ from planned expenditure? If firms sell less of their product than they planned, their stock of inventories rises. Conversely, if firms sell more than planned, their stock of inventories falls. In both cases, firms engage in unplanned inventory investment because their sales do not meet their expectations. Because unplanned inventory investment conts as investment spending by firms, it is counted in actual expenditure (GDP) but not in planned expenditure. Hence, actual expenditure can be above or below planned expenditure. 
        </p>      

        <p>
          We now consider what determines planned expenditure. Assuming that the economy is closed (net exports are zero), we write planned expenditure <InlineMath>{"PE"}</InlineMath> as the sum of consumption <InlineMath>{"C"}</InlineMath>, planned investment <InlineMath>{"I"}</InlineMath> and government purchases <InlineMath>{"G"}</InlineMath>:
        </p>

        <BlockMath>{"PE = C + I + G"}</BlockMath>

        <p>
          We add the consumption function: 
        </p>

        <BlockMath>{"C = C(Y - T)"}</BlockMath>

        <p>
          This equation states that consumption depends on disposable income, which is total income <InlineMath>{"Y"}</InlineMath> minus taxes <InlineMath>{"T"}</InlineMath>. For now, we take planned investment, the level of government purchases and taxes as exogenously fixed:
        </p>

        <BlockMath>{"I = \\overline{I}"}</BlockMath>
        <BlockMath>{"G = \\overline{G}"}</BlockMath>
        <BlockMath>{"T = \\overline{T}"}</BlockMath>

        <p>
          By combining these five equations, we obtain:
        </p>

        <BlockMath>{"PE = C(Y - \\overline{T}) + \\overline{I} + \\overline{G}"}</BlockMath>

        <p>
          Planned expenditure is a function of income <InlineMath>{"Y"}</InlineMath>, as well as planned investment <InlineMath>{"\\overline{I}"}</InlineMath> and the fiscal policy variables <InlineMath>{"\\overline{G}"}</InlineMath> and <InlineMath>{"\\overline{T}"}</InlineMath>
        </p>

        <p>
          The slope of the planned expenditure function is the marginal propensity to consume, <InlineMath>{"MPC"}</InlineMath>. It shows how much planned expenditure increases when income rises by $1. We can explore how the Keynesian cross changes as a result of a change in the  <InlineMath>{"MPC"}</InlineMath>:
        </p>

        <VarSlider letter="MPC" symbol="MPC" init={0.3} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    g.applet0.show('full');
    g.applet0.setLabels2D('Income, Output, Y', 'Planned Expenditure, PE')

    g.p.show();
    g.PEText.show();

    g.p1.show();
    g.pMPC.show();

    g.MPC.set(0.3);

  }
  componentDidMount() {
    mixpanel.track(course.path + "/");
    
    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/",
  component: View0,
  exact: true,
  title: "Planned Expenditure"
})





class View1 extends React.Component { 

  constructor(props) {
    super(props);

    this.YP = 2.857142857142857;

    this.YPInit = this.YP;

    this.state = { 
      YP: this.YP,
    }
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={1}>
        <p>
          The economy is in equilibrium when actual expenditure equals planned expenditure. This is based on the idea that when people's plans have been realized, they have no reason to change what they are doing. Since actual expenditure is also total income <InlineMath>{"Y"}</InlineMath>, we can write this equilibrium condition as: 
        </p>
       
        <BlockMath>{"Y = PE"}</BlockMath>

        <p>
          The 45° line plots the points where the condition holds. The equilibrium is point A, where the planned expenditure function crosses the 45° line. 
        </p>

        <p>
          Inventories play an important role in the adjustment process toward the equilibrium. Whenever the economy is not in equilibrium, firms experience unplanned changes in inventories which induces them to change production levels. Changes in production move the economy toward equilibrium income.
        </p>

        <p>
          We can explore how the adjustment works by selecting a level of income <InlineMath>{"Y'"}</InlineMath> which is not the equilibrium:
        </p>

        <VarSlider letter="YP" symbol="Y'" init={this.YP} min={1} max={5} marks={{1:'1', 5:'5'}} step={0.01} />

        <p>
          If income <InlineMath>{"Y'"}</InlineMath> is below the equilibrium level <InlineMath>{"Y"}</InlineMath>, then planned expenditure falls short of production and so firms are selling less than they are producing. Firms add the unsold goods to their stock of inventories. This unplanned increase in inventories leads firms to reduce production, which decreases income. This process of unplanned inventory investment and falling income continues until income <InlineMath>{"Y'"}</InlineMath> falls to the equilibrium level <InlineMath>{"Y"}</InlineMath>.
        </p>

        <p>
          Similarly, if income <InlineMath>{"Y'"}</InlineMath> is lower than the equilibrium level <InlineMath>{"Y"}</InlineMath>, then planned expenditure is greater than production and so firms are selling more than they are producing. Firms meet the high level of sales by using up their inventories. This unplanned decrease in inventories leads firms to increase production, which increases income. This process of increasing income continues until income <InlineMath>{"Y'"}</InlineMath> reaches the equilibrium level <InlineMath>{"Y"}</InlineMath>. Hence in both cases, the firms' decisions drive the economy toward equilibrium.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');
    g.applet0.setLabels2D('Income, Output, Y', 'Expenditure (Planned, PE and Actual, Y)')
 
    g.p.show();
    g.PEText.show();

    g.a.show();

    g.YAngle.show();
    g.YText.show();

    g.A.show();

    g.ABelow.show();
    g.ALeft.show();

    g.yText.show();
    g.y2Text.show()

    g.yPrimeText.show();

    g.YPrimeBelow.show();
    g.PELeft.show();
    g.YLeft.show();

    g.YPrime.show();
    g.PEPrime.show();

    g.MPC.set(0.3);
    g.YP.set(this.YPInit);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.YP != g.YP.get()) { 

      this.YP = g.YP.get();
      this.setState({
        YP: this.YP,
      })  

      if(this.YP > (this.YPInit + 0.1)) { 
        g.diffInvSeg.show();
        g.diffInvSeg.setCaption("Unplanned Inventory Accumulation");
      }
      else if(this.YP < (this.YPInit - 0.1)) { 
        g.diffInvSeg.show();
        g.diffInvSeg.setCaption("Unplanned Drop in Inventory");
      }
      else { 
        g.diffInvSeg.hide();
      }

    }

  }

  componentDidMount() {
    mixpanel.track(course.path + "/The-Keynesian-Cross-Equilibrium");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/The-Keynesian-Cross-Equilibrium",
  component: View1,
  title: "The Keynesian Cross Equilibrium"
})





class View2 extends React.Component { 

  constructor(props) {
    super(props);

    this.MPC = 0.3;
    this.DG = 0;
    this.DY = 0;

    this.state = { 
      MPC: this.MPC,
      DG: this.DG,
      DY: this.DY,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={2}>
        <p>
          We consider how changes in government purchases affect the economy. Since government purchases are one component of expenditure, hgiher government purchases result in higher planned expenditure for any given level of income. If government purchases rises by <InlineMath>{"\\Delta G"}</InlineMath>, then planned-expenditure schedule <InlineMath>{"PE"}</InlineMath> shifts upward by <InlineMath>{"\\Delta G"}</InlineMath>:
        </p>

        <VarSlider letter="DG" symbol="\Delta G" init={0} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

        <p>
          We can see that the equilibrium moves from point A to point B. The increase in government purchases of <span className="varSpan3">{(Math.round(this.state.DG * 100) / 100).toFixed(2)}</span> leads to an increase in income of <span className="varSpan3">{(Math.round(this.state.DY * 100) / 100).toFixed(2)}</span>. That is, <InlineMath>{"\\Delta Y"}</InlineMath> is greater than <InlineMath>{"\\Delta G"}</InlineMath>. The ratio <InlineMath>{"\\frac{\\Delta Y}{\\Delta G}"}</InlineMath> which is here equal to <span className="varSpan3">{(Math.round( (this.state.DY/this.state.DG) * 100) / 100).toFixed(2)}</span> is called the <b>government-purchases multiplier</b>: it tells up how much income increases in response to a $1 increase in government purchases. The Keynesian cross implies that this multiplier is larger than 1. 
        </p>

        <p>
          Why does fiscal policy have a multiplied effect on income? According to the consumption function <InlineMath>{"C = C(Y - T)"}</InlineMath>, consumption is a function of income, so higher income leads to higher consumption. When an increase in government purchases raises income, it also raises consumption, which further raises income, which further raises consumption and so on. Therefore, in this model, an increase in government purchases leads to an even greater increase in income.
        </p>

        <p>
          To determine the size of the multiplier, we need to trace through each step of the change in income. The process begins when expenditure rises by <InlineMath>{"\\Delta G"}</InlineMath>, which implies than income rises by <InlineMath>{"\\Delta G"}</InlineMath> as well. This increase in income in turn raises consumption by <InlineMath>{"MPC \\times \\Delta G"}</InlineMath>. This increase in consumption raises expenditure and income once again. This second increase in income of <InlineMath>{"MPC \\times \\Delta G"}</InlineMath> again raises consumption, this time by <InlineMath>{"MPC \\times (MPC \\times \\Delta G)"}</InlineMath>, which again raises expenditure and income, and so on. This feedback between consumption and income continues indefinately. We can write the total effect on income as:
        </p>

        <BlockMath>{"\\Delta Y = \\Delta G + (MPC \\times \\Delta G)"}</BlockMath>
        <BlockMath>{"+ (MPC^2 \\times \\Delta G) + ..."}</BlockMath>

        <p>
           We can re-arrange this expression to express the multiplier as an <i>infinate geometric series</i>:
        </p>
        
        <BlockMath>{"\\frac{\\Delta Y}{\\Delta G} = 1 + MPC + MPC^2 + ..."}</BlockMath>

        <p>
          A result from algebra allows us to write the multiplier as: 
        </p>

        <BlockMath>{"\\frac{\\Delta Y}{\\Delta G} = \\frac{1}{1 - MPC}"}</BlockMath>

        <p>
          In this example, the marginal propensity to consume is <span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span> and hence the multiplier is 1/(1 - <span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span>) = <span className="varSpan3">{(Math.round( (1/(1-this.state.MPC)) * 100) / 100).toFixed(2)}</span>. We can explore how the multiplier is affected by changes in the <InlineMath>{"MPC"}</InlineMath>:
        </p>

        <VarSlider letter="MPC" symbol="MPC" init={this.MPC} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');
    g.applet0.setLabels2D('Income, Output, Y', 'Expenditure')
 
    g.p.show();
    g.PEText.show();

    g.a.show();

    g.YAngle.show();
    g.YText.show();

    g.A.show();

    g.ABelow.show();
    g.ALeft.show();

    g.yText.show();
    g.y2Text.show();

    g.g.show();

    g.B.show();

    g.PEPrimeText.show();
    g.YPrime.show();
    g.yPrimeText.show();

    g.BBelow.show();
    g.BLeft.show();

    g.ΔG.show();
    g.ΔY.show();

    g.YP.set(2.857142857142857);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 

    if(this.DG != g.DG.get()) { 

      this.DG = g.DG.get();
      this.setState({
        DG: this.DG,
      });

      this.DY = (g.DG.get()/(1-g.MPC.get()));
      this.setState({
        DY: this.DY,
      })

      g.YP.set((g.I.get()+g.DG.get())/(1-g.MPC.get()));

      if(this.DG > 0.01) { 
        g.ΔG.show();
        g.ΔG.setCaption('ΔG=' + this.DG.toFixed(2));

        g.ΔY.show();
        g.ΔY.setCaption('ΔY=' + this.DY.toFixed(2));
      }
      else { 
        g.ΔG.hide();
        g.ΔY.hide();
      }

    }

    if(this.MPC != g.MPC.get()) { 

      this.MPC = g.MPC.get();
      this.setState({
        MPC: this.MPC,
      });

      this.DY = (g.DG.get()/(1-this.MPC));
      this.setState({
        DY: this.DY,
      })

      g.YP.set((g.I.get()+g.DG.get())/(1-this.MPC));

      g.ΔY.setCaption('ΔY=' + this.DY.toFixed(2));

    }

  }

  componentDidMount() {
    mixpanel.track(course.path + "/An-Increase-in-Govenment-Spending");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/An-Increase-in-Govenment-Spending",
  component: View2,
  title: "An Increase in Govenment Spending"
})




class View3 extends React.Component { 

  constructor(props) {
    super(props);

    this.DT = 0.001;
    this.DTInit = this.DT;

    this.MPC = 0.3;
    this.MPCInit = this.MPC;

    this.state = { 
      DT: this.DT,
      MPC: this.MPC,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={3}>

        <p>
          We now consider how changes in taxes affect equilibrium income. A decrease in taxes <InlineMath>{"\\Delta T"}</InlineMath> immediately raises disposable income <InlineMath>{"Y - T"}</InlineMath> by <InlineMath>{"\\Delta T"}</InlineMath> and, therefore, increases consumption by <InlineMath>{"MPC \\times \\Delta T"}</InlineMath>. For any level of income <InlineMath>{"Y"}</InlineMath>, planned expenditure is now higher and hence the planned expenditure schedule shift upward by <InlineMath>{"MPC \\times \\Delta T"}</InlineMath>:
        </p>

        <VarSlider letter="DT" symbol="\Delta T" init={this.DTInit} min={0} max={2} marks={{0:'0', 1:'1', 2:'2'}} step={0.01} />

        <p>
          Since the current <InlineMath>{"MPC"}</InlineMath> is <span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span>, a tax cut of <span className="varSpan3">{(Math.round(this.state.DT * 100) / 100).toFixed(2)}</span> shifts the planned expenditure schedule by <span className="varSpan3">{(Math.round( (this.state.MPC*this.state.DT) * 100) / 100).toFixed(2)}</span>. The equilibrium of the economy moves from point A to point B, and income rises from <InlineMath>{"Y"}</InlineMath> to <InlineMath>{"Y'"}</InlineMath>. 
        </p>

        <p>
          Just as an increase in government purchases has a multiplied effect on income, so does the decrease in taxes. As before, the initial change in expenditure, now <InlineMath>{"MPC \\times \\Delta T"}</InlineMath>, is multiplied by <InlineMath>{"\\frac{1}{1 - MPC}"}</InlineMath>. The overall effect on income of the tax change is:
        </p>

        <BlockMath>{"\\frac{\\Delta Y}{\\Delta T} = \\frac{-MPC}{1 - MPC}"}</BlockMath>

        <p>
          This expression is the <b>tax multiplier</b>, the amount income changes in response to a $1 change in taxes. (The negative sign indicates that income moves in the opposite direction from taxes). In this example, the <InlineMath>{"MPC"}</InlineMath> is <span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span> and hence the tax multiplier is -<span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span>/(1 - <span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span>) = -<span className="varSpan3">{(Math.round(this.state.MPC * 100) / 100).toFixed(2)}</span>/<span className="varSpan3">{(Math.round( (1 - this.state.MPC) * 100) / 100).toFixed(2)}</span> = <span className="varSpan3">{(Math.round( (-this.state.MPC/(1-this.state.MPC)) * 100) / 100).toFixed(2)}</span> . A $1 cut in taxes raises equilibrium income by $<span className="varSpan3">{(Math.round( (this.state.MPC/(1-this.state.MPC)) * 100) / 100).toFixed(2)}</span> . We can explore how this multiplier is affected by a change in the <InlineMath>{"MPC"}</InlineMath>:
        </p>

        <VarSlider letter="MPC" symbol="MPC" init={this.MPCInit} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />


      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');
    g.applet0.setLabels2D('Income, Output, Y', 'Expenditure')
 
    g.p.show();
    g.PEText.show();

    g.a.show();

    g.YAngle.show();
    g.YText.show();

    g.A.show();

    g.ABelow.show();
    g.ALeft.show();

    g.yText.show();
    g.y2Text.show();

    g.t.show();
    g.PEPrimeTaxText.show();
    g.YTaxPrime.show();

    g.C.show();
    g.CBelow.show();
    g.CLeft.show();

    g.ySecondPrimeText.show();

    g.DT.set(this.DTInit);
    g.MPC.set(this.MPCInit);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    if(this.DT != g.DT.get()) { 

      this.DT = g.DT.get();
      this.setState({
        DT: this.DT,
      });

      if(Math.abs(this.DT) > 0.01) { 
        g.ΔG2.show();
        g.ΔG2.setCaption("MPC ΔT = " + (g.MPC.get()*this.DT).toFixed(2));
      
        g.ΔY2.show();
        g.ΔY2.setCaption("ΔY = " + ( (this.DT*g.MPC.get())/(1-g.MPC.get()) ).toFixed(2));    
      }
      else { 
        g.ΔG2.show();
        g.ΔY2.hide();
      }
    };

    if(this.MPC != g.MPC.get()) { 
     
      this.MPC = g.MPC.get();
      this.setState({
        MPC: this.MPC,
      });

    }

  }

  componentDidMount() {
    mixpanel.track(course.path + "/An-Increase-in-Govenment-Spending");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/Fiscal-Policy-and-the-Tax-Multiplier",
  component: View3,
  title: "Fiscal Policy and the Tax Multiplier"
});






class View4 extends React.Component { 

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={4}>

        <p>
          The Keynesian cross is a stepping-stone on our path to the IS-LM model. It is useful because it shows how the spending plans of households, firms and the government determine the economy's income. Yet, we have assumed that the level of planned investment <InlineMath>{"I"}</InlineMath> is fixed. We now relax this assumption in our model by introducing a relationship between the interest rate and planned investment:
        </p>

        <BlockMath>{"I = I(r)"}</BlockMath>

        <p>
          Because the interest rate is the cost of borrowing to finance investment projects, an increase in the interest rate reduces planned investment. As a result, the investment function slopes downward.
        </p>

        <VarSlider letter="r" symbol="r" init={1} min={0.25} max={1.75} marks={{0.25:'0.25', 1:'1', 1.75:'1.75'}} step={0.01} />

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');

    g.IF.show();

    g.rIntPoint.show();

    g.iSegment.show();
    g.rIntSegment.show();

    g.rText.show();
    g.IText.show();

    g.IrText.show();

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() {
    if(this.r != g.r.get()) { 
      this.r = g.r.get();

      this.setState({ 
        r: this.r,
      })

      g.I.set(g.rIntPoint.getXCoord());

    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/The Investment Function");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/The-Investment-Function",
  component: View4,
  title: "The Investment Function"
})



class View5 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 1;
    this.state = { 
      r: this.r,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={5}>

        <p>
          To determine how income changes when the interest rate changes, we can combine the investment function with the Keynesian cross diagram. Let's consider the effect of an increase of the interest rate <InlineMath>{"r"}</InlineMath>:
        </p>

        <VarSlider letter="r" symbol="r" init={1} min={0.25} max={1.75} marks={{0.25:'0.25', 1:'1', 1.75:'1.75'}} step={0.01} />

        <p>
          As investment is inversely related to the interest rate, the increase in the interest rate reduces the quantity of investment <InlineMath>{"I"}</InlineMath>. The reduction in planned investment, in turn, shifts the planned-expenditure function downward in the Keynesian cross. The shift in the planned expenditure function causes the level of equilibrium income to fall. Hence, an increase in the interest rate lowers income. By varying the interest rate <InlineMath>{"r"}</InlineMath>, we obtain the relationship between the interest rate and the level of income, which we will call the IS curve.  
        </p>

        <p>
          In essence, the IS curve combines the interaction between <InlineMath>{"r"}</InlineMath> and <InlineMath>{"I"}</InlineMath> expressed by the investment function and the interaction between <InlineMath>{"I"}</InlineMath> and <InlineMath>{"Y"}</InlineMath> demonstrated by the Keynesian cross. Each point on the IS curve represents equilibrium in the goods market, and the curve illustrates how the equilibrium level of income depends on the interest rate. Because an increase in the interest rate causes planned investment to fall, which in turn causes equilibrium income to fall, the IS curve slopes downward.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    g.applet0.show('topRight');
    g.applet0.setLabels2D('Income, Output, Y', 'Expenditure')
    g.applet0.setCoords2D(8, 8);
    g.A.show();
    g.ABelow.show();

    g.a.show();
    g.p.show();
    g.yText.show();

    g.applet1.show('bottomLeft');
    g.IF.show();

    g.rSegment.show();
    g.rIntPoint.show();

    g.r.set(this.r);
    g.I.set(2.008863152893447);
    g.iSegment.show();

    g.rText.show();
    g.IText.show();

    g.IrText.show();

    g.applet2.show('bottomRight');
    
    g.ISPoint.show();
    g.ISPoint.setTrace(true);

    g.ISrSegment.show();
    g.ISySegment.show();
    g.rISText.show();
    g.yISText.show();
    g.ISText.show();

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() {
    if(this.r != g.r.get()) { 
      this.r = g.r.get();

      this.setState({ 
        r: this.r,
      })

      g.I.set(g.rIntPoint.getXCoord());

    }
  }
  


  componentDidMount() {
    mixpanel.track(course.path + "/Deriving-the-IS-Curve");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/Deriving-the-IS-Curve",
  component: View5,
  title: "Deriving the IS Curve"
})




class View6 extends React.Component { 

  constructor(props) {
    super(props);

    this.DG = 1;
    this.state = { 
      DG: this.DG,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={6}>

        <p>
          The IS curve shows us, for any given interest rate, the level of income that brings the goods market into equilibrium. As we learned from the Keynesian cross, the equilibrium level of income also depends on government spending <InlineMath>{"G"}</InlineMath> and taxes <InlineMath>{"T"}</InlineMath>. The IS curve is drawn for a given fiscal policy; that is, when we construct the IS curve, we hold <InlineMath>{"G"}</InlineMath> and <InlineMath>{"T"}</InlineMath> fixed. When fiscal policy changes, the IS curve shifts:
        </p>

        <VarSlider letter="DG" symbol="\Delta G" init={0} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

        <p>
          For any given interest rate, the upward shift in planned expenditure of <InlineMath>{"\\Delta G"}</InlineMath> leads to an increase in income <InlineMath>{"Y"}</InlineMath> of <InlineMath>{"\\frac{\\Delta G}{1 - MPC}"}</InlineMath>. Therefore, the IS curve shifts to the right by this amount.
        </p>

        <p>
          We can use the Keynesian cross to see how other changes in fiscal policy shift the IS curve. Because a decrease in taxes also expands expenditure and income, it, too, shifts the IS curve outward. A decrease in government purchases or an increase in taxes reduces income; therefore, such a change in fiscal policy shifts the IS curve inward.
        </p>

        <p>
          In summary, the IS curve shows the combinations of the interest rate and the level of income that are consistent with equilibrium in the market for goods and services. The IS curve is drawn for a given fiscal policy. Changes in fiscal policy that raise the demand for goods and services shift the IS curve to the right. Changes in fiscal policy that reduce the demand for goods and services shift the IS curve to the left.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    g.applet0.show('top');
    g.applet0.setLabels2D('Income, Output, Y', 'Expenditure')
 
    g.p.show();
    g.PEText.show();

    g.a.show();

    g.YAngle.show();
    g.YText.show();

    g.A.show();

    g.ABelow.show();
    g.ALeft.show();

    g.yText.show();
    g.y2Text.show();
    g.YPrime.show();

    g.g.show();

    g.B.show();

    g.PEPrimeText.show();

    g.yPrimeText.show();

    g.BBelow.show();
    g.BLeft.show();

    g.ΔG.show();
    g.ΔY.show();


    g.applet2.show('bottom');
    g.IS1Point.show();
    g.IS1Point.setTrace(false);
    g.ISrSegment.show();
    g.ISySegment.show();

    g.rISText.show();

    g.IS1.show();
    g.IS2.show();

    g.IS2Point.show();
    g.IS2rSegment.show();

    g.yISText.show();
    g.yISPrimeText.show();

    g.IS1Text.show();
    g.IS2Text.show();

    g.r.set(1);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.DG != g.DG.get()) { 

      this.DG = g.DG.get();
      this.setState({
        DG: this.DG,
      })  

      g.IS2CenterX.set(3.42 + (this.DG/(1-g.MPC.get())));
    
      g.YP.set((g.I.get()+g.DG.get())/(1-g.MPC.get()));

      if(this.DG > 0.01) { 
        g.ΔG.show();
        g.ΔG.setCaption('ΔG=' + this.DG.toFixed(2));

        g.ΔY.show();
        g.ΔY.setCaption('ΔY=' + (this.DG/(1-g.MPC.get())).toFixed(2));

        g.IS2ySegment.show();
      }
      else { 
        g.ΔG.hide();
        g.ΔY.hide();

        g.IS2ySegment.hide();
      }

    }

  }
  
  componentDidMount() {
    mixpanel.track(course.path + "/How-Fiscal-Policy-Shifts-the-IS-Curve");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/How-Fiscal-Policy-Shifts-the-IS-Curve",
  component: View6,
  title: "How Fiscal Policy Shifts the IS Curve"
})





class View7 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 0.885567160542126;
    this.MP = 3.5;
    this.LD = 4;

    this.state = { 
      r: this.r,
      MP: this.MP,
      LD: this.LD,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={7}>

        <p>
          In his classic work <i>The General Theory</i>, Keynes offered his view of how the interest rate is determined in the short run. His explanation is called the theory of liquidity preference because it posits that the interest rate adjusts to balance the supply and demand for the economy’s most liquid asset—money. Just as the Keynesian cross is a building block for the IS curve, the theory of liquidity pref- erence is a building block for the LM curve.
        </p>

        <p>
          To develop this theory, we begin with the supply of real money balances. If <InlineMath>{"M"}</InlineMath> stands for the supply of money and <InlineMath>{"P"}</InlineMath> stands for the price level, then <InlineMath>{"\\frac{M}{P}"}</InlineMath> is the supply of real money balances. The theory of liquidity preference assumes there is a fixed supply of real money balances. That is,
        </p>


        <BlockMath>{"(M/P)^s = \\frac{\\bar{M}}{\\bar{P}}"}</BlockMath>

        <p>
          The money supply <InlineMath>{"M"}</InlineMath> is an exogenous policy variable chosen by a central bank, such as the Federal Reserve. The price level <InlineMath>{"P"}</InlineMath> is also an exogenous variable in this model. (We take the price level as given because the IS–LM model—our ultimate goal in this chapter—explains the short run when the price level is fixed.) These assumptions imply that the supply of real money balances is fixed and, in particular, does not depend on the interest rate. Thus, when we plot the supply of real money balances against the interest rate, we obtain a vertical supply curve.
        </p>

        <p>
          Next, consider the demand for real money balances. The theory of liquidity preference posits that the interest rate is one determinant of how much money people choose to hold. The underlying reason is that the interest rate is the opportunity cost of holding money: it is what you forgo by holding some of your assets as money, which does not bear interest, instead of as interest-bearing bank deposits or bonds. When the interest rate rises, people want to hold less of their wealth in the form of money. We can write the demand for real money balances as:
        </p>

        <BlockMath>{"(M/P)^d = L(r)"}</BlockMath>

        <p>
          where the function <InlineMath>{"L(r)"}</InlineMath> shows that the quantity of money demanded depends on the interest rate. The demand curve slopes downward because higher interest rates reduce the quantity of real money balances demanded.
        </p>

        <p>
          According to the theory of liquidity preference, the supply and demand for real money balances determine what interest rate prevails in the economy. That is, the interest rate adjusts to equilibrate the money market. At the equilibrium interest rate, the quantity of real money balances demanded equals the quantity supplied.
        </p>

        <p>
          How does the interest rate get to this equilibrium of money supply and money demand? The adjustment occurs because whenever the money market is not in equilibrium, people try to adjust their portfolios of assets and, in the process, alter the interest rate. For instance, if the interest rate is above the equilibrium level, the quantity of real money balances supplied exceeds the quantity demanded. Individuals holding the excess supply of money try to convert some of their non-interest-bearing money into interest-bearing bank deposits or bonds. Banks and bond issuers, which prefer to pay lower interest rates, respond to this excess supply of money by lowering the interest rates they offer. Conversely, if the interest rate is below the equilibrium level, so that the quantity of money demanded exceeds the quantity supplied, individuals try to obtain money by selling bonds or making bank withdrawals. To attract now-scarcer funds, banks and bond issuers respond by increasing the interest rates they offer. Eventually, the interest rate reaches the equilibrium level, at which people are content with their portfolios of monetary and nonmonetary assets.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    g.applet3.show('full');

    g.Lr.show();
    
    g.MPSupply.show();
    g.MPTextSupply.show();

    g.LPIntPoint.show();

    g.LPrSegment.show();
    g.rLPText.show();
    g.LPrText.show();

    g.r.set(this.r);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.MP != g.MP.get()) { 
      
      this.MP = g.MP.get();
      this.setState({
        MP: this.MP,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }

    if(this.LD != g.LD.get()) { 
      
      this.LD = g.LD.get();
      this.setState({
        LD: this.LD,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/The-Theory-of-Liquidity-Preferences");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/The-Theory-of-Liquidity-Preferences",
  component: View7,
  title: "The Theory of Liquidity Preferences"
})





class View8 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 0.885567160542126;
    this.rInit = this.r;

    this.MP = 3.5;

    this.LD = 4;
    this.LDInit = this.LD;

    this.state = { 
      r: this.r,
      MP: this.MP,
      LD: this.LD,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={8}>

        <p>
          Now that we have seen how the interest rate is determined, we can use the theory of liquidity preference to show how the interest rate responds to changes in the supply of money. Suppose, for instance, that the Fed suddenly decreases the money supply:
        </p>

        <VarSlider letter="MP" symbol="M" init={this.MP} min={2.5} max={5.5} marks={{2.5:'2.5', 5.5:'5.5'}} step={0.01} />

        <p>
          A fall in <InlineMath>{"M"}</InlineMath> reduces <InlineMath>{"\\frac{M}{P}"}</InlineMath> because <InlineMath>{"P"}</InlineMath> is fixed in the model. The supply of real money balances shifts to the left. The equilibrium interest rate rises and the higher interest rate makes people satisfied to hold the smaller quantity of real money balances. The opposite would occur if the Fed had suddenly increased the money supply. Thus, according to the theory of liquidity preference, a decrease in the money supply raises the interest rate, and an increase in the money supply lowers the interest rate.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    g.applet3.show('full');

    g.Lr.show();
    
    g.MPSupply.show();
    g.MPTextSupply.show();

    g.LPIntPoint.show();

    g.LPrSegment.show();
    g.rLPText.show();
    g.LPrText.show();

    g.r.set(this.rInit);
    g.LD.set(this.LDInit);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.MP != g.MP.get()) { 
      
      this.MP = g.MP.get();
      this.setState({
        MP: this.MP,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }

    if(this.LD != g.LD.get()) { 
      
      this.LD = g.LD.get();
      this.setState({
        LD: this.LD,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/The-Theory-of-Liquidity-Preferences");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/A-Reduction-in-the-Money-Supply",
  component: View8,
  title: "A Reduction in the Money Supply"
})

    



class View9 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 0.885567160542126;
    this.rInit = this.r;

    this.MP = 3.5;
    this.LD = 4;

    this.state = { 
      r: this.r,
      MP: this.MP,
      LD: this.LD,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={9}>

        <p>
          Having developed the theory of liquidity preference as an explanation for how the interest rate is determined, we can now use the theory to derive the LM curve. We begin by considering the following question: how does a change in the economy’s level of income <InlineMath>{"Y"}</InlineMath> affect the market for real money balances? The answer is that the level of income affects the demand for money. When income is high, expenditure is high, so people engage in more transactions that require the use of money. Thus, greater income implies greater money demand. We can express these ideas by writing the money demand function as
        </p>

        <BlockMath>{"(M/P)^d = L(r, Y)"}</BlockMath>

        <p>
          The quantity of real money balances demanded is negatively related to the interest rate and positively related to income. Using the theory of liquidity preference, we can figure out what happens to the equilibrium interest rate when the level of income changes:
        </p>

        <VarSlider letter="LD" symbol="Y" init={this.LD} min={2} max={5.5} marks={{2:'2', 5.5:'5.5'}} step={0.01} />

        <p>
           When income increases, income shifts the money demand curve to the right. With the supply of real money balances unchanged, the interest rate must rise to equilibrate the money market. Therefore, according to the theory of liquidity preference, higher income leads to a higher interest rate.
        </p>

        <p>
          The LM curve summarizes this relationship between the level of income and the interest rate. Each point on the LM curve represents equilibrium in the money market, and the curve illustrates how the equilibrium interest rate depends on the level of income. The higher the level of income, the higher the demand for real money balances, and the higher the equilibrium interest rate. For this reason, the LM curve slopes upward.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    
    g.applet3.show('left');

    g.Lr.show();
    g.MPSupply.show()
    g.LPIntPoint.show();

    g.LPrSegment.show();
    g.LPr2Segment.show();

    g.LPrYText.show();
    g.rLPText.show();
    g.MPTextSupply.show();


    g.applet2.show('right');

    g.LMPoint.show();
    g.LMPoint.setTrace(true);

    g.LMrSegment.show();
    g.LMySegment.show();

    g.LMYText.show();
    g.LMText.show();
    g.rLMText.show()

    g.r.set(this.rInit);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.MP != g.MP.get()) { 
      
      this.MP = g.MP.get();
      this.setState({
        MP: this.MP,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }

    if(this.LD != g.LD.get()) { 
      
      this.LD = g.LD.get();
      this.setState({
        LD: this.LD,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/Deriving-the-LM-Curve");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/Deriving-the-LM-Curve",
  component: View9,
  title: "Deriving the LM Curve"
})

    





class View10 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 0.885567160542126;
    this.rInit = this.r;

    this.MP = 3.5;
    this.MPInit = this.MP;

    this.LD = 4;

    this.state = { 
      r: this.r,
      MP: this.MP,
      LD: this.LD,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={10}>

        <p>
          The LM curve tells us the interest rate that equilibrates the money market at any level of income. Yet, as we saw earlier, the equilibrium interest rate also depends on the supply of real money balances <InlineMath>{"\\frac{M}{P}"}</InlineMath>. This means that the LM curve is drawn for a given supply of real money balances. If real money balances change— for example, if the Fed alters the money supply—the LM curve shifts.
        </p>

        <p>
          We can use the theory of liquidity preference to understand how monetary policy shifts the LM curve. Suppose that the Fed decreases the money supply:
        </p>

        <VarSlider letter="MP" symbol="M" init={this.MP} min={2} max={5.5} marks={{2:'2', 5.5:'5.5'}} step={0.01} />

        <p>
          This causes the supply of real money balances to fall. Holding constant the amount of income and thus the demand curve for real money balances, we see that a reduction in the supply of real money balances raises the interest rate that equilibrates the money market. Hence, a decrease in the money supply shifts the LM curve upward.
        </p>

        <p>
          In summary, the LM curve shows the combinations of the interest rate and the level of income that are consistent with equilibrium in the market for real money balances. The LM curve is drawn for a given supply of real money balances. Decreases in the supply of real money balances shift the LM curve upward. Increases in the supply of real money balances shift the LM curve downward.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();

    
    g.applet3.show('left');

    g.Lr.show();
    g.MPSupply.show()
    g.LPIntPoint.show();

    g.LPrSegment.show();
    g.LPr2Segment.show();
    
    g.LPrYText.show();
    g.rLPText.show();
    g.MPTextSupply.show();

    g.applet2.show('right');

    g.LMPoint.show();
    g.LMPoint.setTrace(false);

    g.LMrSegment.show();
    g.LMySegment.show();

    g.LM.show();
    g.rLMText.show();
    g.LMYText.show();
    g.LMLabelText.show();

    g.r.set(this.rInit);
    g.LD.set(this.LD);
    g.MP.set(this.MPInit);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.MP != g.MP.get()) { 
      
      this.MP = g.MP.get();
      this.setState({
        MP: this.MP,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }

    if(this.LD != g.LD.get()) { 
      
      this.LD = g.LD.get();
      this.setState({
        LD: this.LD,
      });

      this.r = g.LPIntPoint.getYCoord();
      this.setState({
        r: this.r,
      })

      g.r.set(this.r);

    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/How-Monetary-Policy-Shifts-the-LM-Curve");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/How-Monetary-Policy-Shifts-the-LM-Curve",
  component: View10,
  title: "How Monetary Policy Shifts the LM Curve"
})

    


class View11 extends React.Component { 

  constructor(props) {
    super(props);

    this.r = 0.885567160542126;
    this.rInit = this.r;

    this.MP = 3.5;
    this.MPInit = this.MP;

    this.LD = 4;

    this.Y = 3.89654964759644;
    this.r = 0.8189907626213029;

    this.state = { 
      r: this.r,
      MP: this.MP,
      LD: this.LD,

      Y: this.Y,
      r: this.r,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={11}>
        <p>
          We now have all the pieces of the IS–LM model. The model takes fiscal policy <InlineMath>{"G"}</InlineMath> and <InlineMath>{"T"}</InlineMath>, monetary policy <InlineMath>{"M"}</InlineMath>, and the price level <InlineMath>{"P"}</InlineMath> as exogenous. Given these exogenous variables, the IS curve provides the combinations of <InlineMath>{"r"}</InlineMath> and <InlineMath>{"Y"}</InlineMath> that satisfy the equation representing the goods market, and the LM curve provides the combinations of <InlineMath>{"r"}</InlineMath> and <InlineMath>{"Y"}</InlineMath> that satisfy the equation representing the money market. 
        </p>

        <p>
          The equilibrium of the economy is the point at which the IS curve and the LM curve cross. This point gives the interest rate <InlineMath>{"r"}</InlineMath> and the level of income <InlineMath>{"Y"}</InlineMath> that satisfy conditions for equilibrium in both the goods market and the money market. In other words, at this intersection, actual expenditure equals planned expenditure, and the demand for real money balances equals the supply.
        </p>

      </PanelContainer>
    ) 
  }


  updateApplet() { 
    hide();
    
    g.applet2.show('full');

    g.LM2.show();
    g.LM2LabelText.show();

    g.r.set(this.rInit);
    g.LD.set(this.LD);
    g.MP.set(this.MPInit);

    g.IS3.show();

    g.ISLMInt.show();

    g.ISLabelText.show();

    g.yISLMText.show();
    g.rISLMText.show();

    g.YISMLSegment.show();
    g.rISMLSegment.show();

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 



  }

  componentDidMount() {
    mixpanel.track(course.path + "/Conclusion");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/Conclusion",
  component: View11,
  title: "Conclusion"
});






class FeedbackReport extends React.Component { 
  constructor () {
    super();
    this.state = {
      fireRedirect: false
    }
  }
  
  componentDidMount() { 
    store.dispatch({type: "setPage", page: window.location.pathname});
  }

  submitForm = (e) => {

    axios.post('/bug-submit/', {
        type: document.getElementById("dropFeedback").children[0].textContent,
        description: document.getElementById("formDescription").value,
        email: document.getElementById("formEmail").value, 
        state: store.getState().path
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });

    e.preventDefault();
    this.setState({ fireRedirect: true });
  }

  render() {
    const { fireRedirect } = this.state
    
    const dropOptions = [ 
      {
        text: "There's a problem with the interface.",
        value: "There's a problem with the interface."
      },
      {
        text: "I don't understand the explanation.",
        value: "I don't understand the explanation."
      },
      {
        text: "There is a mistake in the explanation.",
        value: "Think there is a mistake in the explanation."
      },
      { 
        text: "I would like to suggest a new feature.",
        value: "I would like to suggest a new feature."
      }, 
      { 
        text: "Other", 
        value: "Other"
      }

    ]

    return(
      <PanelContainer courseObj={course} title="Submit Feedback">
  
        <Form onSubmit={this.submitForm}>

          <Form.Field id='SelectLabel' label='Please select one*' name="Please select one"  />

          <Dropdown id="dropFeedback" placeholder='Select type of feedback' fluid selection options={dropOptions} />


          <Form.Field>
            <Form.Field id='formDescription' label='Description*' control='textarea' rows='4' name="Description" placeholder="Description" />
                Please be as descriptive as possible. The more detail you provide the better I can solve the issue.
          </Form.Field>

          <Form.Field>
            <label>Email (optional)</label>
            <input name="email" placeholder="Email" id='formEmail' />
            In case you don't mind being contacted.<br />
          </Form.Field>

          <Button type='submit'>Submit</Button>

        </Form>

        {fireRedirect && (
          <Redirect to={course.path + '/FeedbackThankYou'}/>
        )}

      </PanelContainer>
    ) 
  }

}
course.addInfoRoute({ 
  path: course.path + "/feedback",
  component: FeedbackReport
})


class FeedbackThankYou extends React.Component { 

  componentDidMount() { 
    store.dispatch({type: "setPage", page: window.location.pathname});
  }

  render() {
    return(
      <PanelContainer courseObj={course} title="Submit Feedback">
        Thank you for letting me know! I will review your report soon.  
      </PanelContainer>
    ) 
  }

}
course.addInfoRoute({ 
  path: course.path + "/FeedbackThankYou",
  component: FeedbackThankYou
})



export default course;
