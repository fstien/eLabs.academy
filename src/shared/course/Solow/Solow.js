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
  title: "Growth Theory: The Solow Model",
  description: "We explain the causes of long-run differences in income over time and between countries through a theory of economic growth called the Solow model. We will see that an economy's level of savings, population growth and technological progress determine an economy's output and growth rate. We first examine how the level of savings and depreciation determine the accumulation of capital, holding the labor force and technology fixed. We then relax these assumptions and show the role of technological progress and population growth in the determination of per-capita income.", 
  path: "/course/solow",
  return: "/learn/solow"
})


function hide() { 

    for(var object in g) { 
      if(typeof g[object].hide === 'function') { 
        g[object].hide();
      }
    }

    g.applet1.setLabels2D('Capital per worker, k', 'Output per worker, y');
}




class View0 extends React.Component { 

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={0}>

        <p>
          Ouput is based on the production function, which relates output <InlineMath>{"Y"}</InlineMath> to the size of the capital stock  and of the labor force <InlineMath>{"L"}</InlineMath>: 
        </p>

        <BlockMath>{"Y = F(K, L)"}</BlockMath>

        <p>
          where <InlineMath>{"K"}</InlineMath> is the total value of all physical capital in the economy, such as machines, tractors and office buildings, <InlineMath>{"L"}</InlineMath> is the total number of workers in the economy and <InlineMath>{"Y"}</InlineMath> is real output. 
        </p>

        <p>
          The model assumes constant returns to scale, meaning that the prodction function satisfies the following property:
        </p>

        <BlockMath>{"zY = F(zK, zL)"}</BlockMath>

        <p>
          If we scale both the amount of capital and labor by some constant <InlineMath>{"z"}</InlineMath>, output will increase by that same constant. This assumption is considered realistic and will simplify our analysis. 
        </p>

        <p> 
          A famous function which has this property is the Cobb-Douglas production function, which is formulated as follows: 
        </p>

        <BlockMath>{"Y = K^\\alpha L^{(1- \\alpha)}"}</BlockMath>

        <p>
          where <InlineMath>{"\\alpha"}</InlineMath> determines the relative importance of capital and labour. To understand  <InlineMath>{"\\alpha"}</InlineMath> intuitively, change it's value using the slider below.
        </p>

        <VarSlider letter="a" symbol="\alpha" init={0.3} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

        <p>
          As you can see, decreasing <InlineMath>{"\\alpha"}</InlineMath> increases the relative importance of labour <InlineMath>{"L"}</InlineMath>, and increasing <InlineMath>{"\\alpha"}</InlineMath> increases the relative importance of capital <InlineMath>{"K"}</InlineMath>. 

        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');

    // Func
    g.f.show();   

    g.a.set(0.3);

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
  title: "The Production Function"
})





class View1 extends React.Component { 

  constructor(props) {
    super(props);

    this.Y = 2.46;

    this.state = {
      Y: this.Y,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={1}>
        <p>
          We will use the assumption of constant returns to scale to analyze all quantatites in per-worker terms. First, let's build up some intuition for the idea of constant returns to scale. 
        </p>

        <p>
          We consider that the economy has  <InlineMath>{"K=4"}</InlineMath>  units of capital and  <InlineMath>{"L=2"}</InlineMath>  units of labour. Hence output <InlineMath>{"Y"}</InlineMath> equals: 
        </p>

        <BlockMath>{"Y = F(4, 2) = 4^{0.3} 2^{0.7} = 2.46"}</BlockMath>

        <p>
          This economy is represented by point A on the graph. Constant returns to scale predicts that if we increase both <InlineMath>{"K"}</InlineMath> and <InlineMath>{"L"}</InlineMath> by some constant <InlineMath>{"z"}</InlineMath>, we will also increase <InlineMath>{"Y"}</InlineMath> by that same constant: 
        </p>
        
        <BlockMath>{"2.46 z = F(4 z, 2 z)"}</BlockMath>

        <p>
          We can verify that this equality holds by varying <InlineMath>{"z"}</InlineMath>: 
        </p>

        <VarSlider letter="Z" symbol="z" min={0} max={3} init={1} marks={{0:'0', 1: '1', 2: '2', 3:'3'}} step={0.01} />

        <p>
        We can see graphically that for the given <InlineMath>{"z"}</InlineMath>, output equals <span className="varSpan3">{(Math.round(this.state.Y * 100) / 100).toFixed(2)}</span>, or <InlineMath>{"2.46 z"}</InlineMath>. Hence we have shown that scaling the inputs by some constant  <InlineMath>{"z"}</InlineMath>  has the effect of scaling <InlineMath>{"Y"}</InlineMath>  by the same constant.
        </p>

        <p>
          Geometrically, the economy moves along a straight line that goes through the origin as we scale it's inputs. This is equivalent to saying that the production function is homogenous of degree 1. 
        </p>

      </PanelContainer>
    ) 
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.value != (2.46*g.Z.get())) { 

      this.value = 2.46*g.Z.get()

      this.setState({ 
        Y: 2.46*g.Z.get()
      })
    }

  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');
     // Func
    g.f.show();
    // Point
    g.A.show();
    g.A.setTrace(true);
    g.A.updateCoords3D("Z*4", "Z*2", " ((Z*4)^a) * ((Z*2)^(1-a)) ");

    // Segment
    g.LSeg.show();
    g.KSeg.show();
    g.ISeg.show();
    g.YSeg.show();

    // Set var
    g.a.set(0.3);
    g.Z.set(1);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this))
  }
  componentDidMount() {
    mixpanel.track(course.path + "/constant-returns-to-scale");

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
  path: course.path + "/constant-returns-to-scale",
  component: View1,
  title: "Constant Returns To Scale"
})






class View2 extends React.Component { 


  render() {
    return(
      <PanelContainer courseObj={course} pageNo={2}>

        <p>
          Constant returns to scale allow us to analyze the economy relative to the size of the labour force (or in other words, at the per-worker level). We set <InlineMath>{"z = 1/L"}</InlineMath> in the production function as follows: 
        </p>

        <BlockMath>{"Y/L = F(K/L, L/L) = F(K/L, 1)"}</BlockMath>

        <p> 
          Hence, the amount of output per worker <InlineMath>{"Y/L"}</InlineMath> depends only on the amount of capital per worker  <InlineMath>{"K/L"}</InlineMath> and is independant of the size of the economy. This is a consequence of constant returns to scale; the number of workers in the economy does not affect the relationship between capital per worker and output per worker.
        </p>

        <p>
          In our example economy with four units of capital and two workers, we have  <InlineMath>{"K/L = 2"}</InlineMath>. The vertical axis now represents output per worker <InlineMath>{"Y/L"}</InlineMath>. Let's see what happens when change capital per worker:
        </p>
        
        <VarSlider letter="KL" symbol="K/L" min={0} max={12} init={2}  marks={{0:'0', 12:'12'}} step={0.01} />

        <p>
          We have obtained the per-worker production function: the relationship between <InlineMath>{"K/L"}</InlineMath> and <InlineMath>{"Y/L"}</InlineMath>. 
        </p>


      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('full');

    // Func
    g.f.show();
    g.f.setOpacity3D(0.6);
 
    // Point
    g.A.show();
    g.A.setTrace(true);
    g.A.updateCoords3D("KL", "1", " ((KL)^a) * ((1)^(1-a)) ");

    g.LSeg2.show();
    g.KSeg2.show();
    g.ISeg2.show();
    g.YSeg2.show();

    // Set Vars
    g.KL.set(2);
    g.a.set(0.3);
    g.Z.set(0.5);

  }

 
  componentDidMount() {
    mixpanel.track(course.path + "/Switching-to-Per-Worker-Quantities");

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
  path: course.path + "/Switching-to-Per-Worker-Quantities",
  component: View2,
  title: "Switching to Per-Worker Quantities"
})





class View3 extends React.Component { 


  render() {
    return(
      <PanelContainer courseObj={course} pageNo={3}>

        <p> 
          We have shown that the per-worker production function is a single-variable function for <InlineMath>{"Y/L"}</InlineMath>, which we can obtain from the intersection of the original production function and the <InlineMath>{"L=1"}</InlineMath> plane, plotted in red.
        </p>

        <p>
          Because the number of workers does not matter to the relationship between <InlineMath>{"K/L"}</InlineMath> and <InlineMath>{"Y/L"}</InlineMath>, we denote all quantities in per-worker terms. We refer to these in lowercase letters, so <InlineMath>{"k = K/L"}</InlineMath> and <InlineMath>{"l = Y/L"}</InlineMath> designate output and capital per worker respectively.
        </p>

        <p>
          We can now re-write the per-worker production function as: 
        </p>
        
        <BlockMath>{"y = F(K/L, L/L) = F(k, 1) = f(k)"}</BlockMath>

        <p>
          We recall that for a Cobb-Douglas production function, <InlineMath>{"Y = K^\\alpha L^{(1- \\alpha)}"}</InlineMath> and hence:
        </p>

        <BlockMath>{"y = Y/L = \\frac{K^\\alpha L^{(1- \\alpha)}}{L}"}</BlockMath>

        <BlockMath>{" = K^\\alpha L^{(- \\alpha)} = (\\frac{K}{L})^{\\alpha} = k^{\\alpha}"}</BlockMath>

        <p>
          Hence, we have derived the per-worker production function as  <InlineMath>{"y = f(k) = k^{\\alpha}"}</InlineMath>. Let's see how this function changes shape as we vary <InlineMath>{"\\alpha"}</InlineMath>.
        </p>

        <VarSlider letter="a" symbol="\alpha" min={0} max={1} init={0.3} marks={{0:'0', 1:'1'}} step={0.01} />


      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet0.show('top');
    g.applet1.show('bottom');
    g.applet1.setCoords2D(12,12)

    // Func
    g.f.show();
    g.f.setOpacity3D(0.6);
    g.p.show();
  
    // Text
    g.pT.show();
    
    // Plane
    g.y.show();

    // Set Vars
    g.a.set(0.3);

  }

 
  componentDidMount() {
    mixpanel.track(course.path + "/The-Per-Worker-Production-Function");
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
  path: course.path + "/The-Per-Worker-Production-Function",
  component: View3,
  title: "The Per-Worker Production Function"
})





class View4 extends React.Component { 


  render() {
    return(
      <PanelContainer courseObj={course} pageNo={4}>
        <p>
          The slope of the production function is the marginal product of capital <InlineMath>{"MPK"}</InlineMath>. It represents how much extra output a worker produces when given an extra unit of capital: 
        </p>
        
        <BlockMath>{"MPK = f(k+1) - f(k)"}</BlockMath>

        <p>
          We can examine how <InlineMath>{"MPK"}</InlineMath> changes with <InlineMath>{"k"}</InlineMath>:
        </p>

        <VarSlider letter="k" symbol="k" min={0} max={3} init={1} marks={{0:'0', 1:'1', 2:'2', 3:'3'}} step={0.01} />

        <p>
          As each worker gets its hands on more capital, the production function becomes flatter, indicating a diminishing marginal product of capital. This is because with a small amount of capital, an extra unit of capital for the average worker is very useful and produces a lot of additional output. With a lot of capital, workers given additional units of capital can only increase output slightly.  
        </p>

        <p>
          We now examine the effect of <InlineMath>{"\\alpha"}</InlineMath> on the production function:
        </p>

        <VarSlider letter="a" symbol="\alpha" min={0} max={1} init={0.3} marks={{0:'0', 1:'1'}} step={0.01} />

        <p>
          For a small <InlineMath>{"\\alpha"}</InlineMath>, aggregate output depends mostly on the number of workers. Hence marginal increases in capital do not lead to large increases in output both in aggregate and at the per-worker level. In the extreme case of <InlineMath>{"\\alpha = 0"}</InlineMath>, output is independant of the amount of capital. 
        </p>
        <p>
         For a large <InlineMath>{"\\alpha"}</InlineMath>, aggregate output depends mostly on the amount of capital. Hence marginal increases in capital lead to large increases in output both in aggregate and at the per-worker level. In the extreme case of <InlineMath>{"\\alpha = 1"}</InlineMath>, output is a linear function of the amount of capital. 
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width,g.params.app1Width);

    // Func
    g.p.show();

    // Text
    g.kText.show();
    g.fkText.show();
    g.p2T.show();

    g.kText.changeColor(37, 93, 115);
    g.fkText.changeColor(37, 93, 115);

    // Point
    g.IF.show();
 
    // Segment
    g.MPOne.show();
    g.MPK.show();
    g.MPS.show();
    g.MPL.show();

    g.k.set(1);    
    g.a.set(0.3);    
  }

 
  componentDidMount() {
    mixpanel.track(course.path + "/Marginal-Product-of-Capital");
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
  path: course.path + "/Marginal-Product-of-Capital",
  component: View4,
  title: "Marginal Product of Capital"
})





class View5 extends React.Component { 
  
  constructor(props) {
    super(props);

    this.a = 0.2;

    this.k = 1;
    this.s = 0.3;

    this.state = {
      k: this.k,
      s: this.s,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={5}>
        <p>
          Output per worker <InlineMath>{"y"}</InlineMath> is divided between consumption per worker <InlineMath>{"c"}</InlineMath> and investment per worker <InlineMath>{"i"}</InlineMath>:
        </p>

        <BlockMath>{"y = c + i"}</BlockMath>

        <p>
          We ignore government purchases and net exports (as we assume a closed economy). Every year, people save a fraction <InlineMath>{"s"}</InlineMath> of their income <InlineMath>{"y"}</InlineMath> and consume a fraction <InlineMath>{"1 - s"}</InlineMath>. We hence have the following per worker consumption function:
        </p>

        <BlockMath>{"c = (1-s)f(k)"}</BlockMath>

        <p>
          where <InlineMath>{"s"}</InlineMath>, the saving rate, is between zero and one. Similarly, we have the per worker investment function: 
        </p>

        <BlockMath>{"i = sf(k)"}</BlockMath>

        <p>
         This equation states that investment equals saving and thus, the rate of saving <InlineMath>{"s"}</InlineMath> is also the fraction of output devoted to investment to form new captial. For any given <InlineMath>{"k"}</InlineMath>, the production function <InlineMath>{"y = f(k)"}</InlineMath> determines output per worker, and the savings rate <InlineMath>{"s"}</InlineMath> determines the allocation of that output between consumption and investment: 
        </p>

        <VarSlider letter="s" symbol="s" min={0} max={1} init={this.s} marks={{0:'0', 1:'1'}} step={0.01} />
        <VarSlider letter="k" symbol="k" min={0} max={3} init={this.k} marks={{0:'0', 1:'1', 2:'2', 3:'3'}} step={0.01} />

        <p>
          At the current level of capital and savings rate, ouptut per worker is <span className="varSpan3">{(Math.round(this.state.k**this.a * 100) / 100).toFixed(2)}</span>, of which <span className="varSpan3">{(Math.round( (1-this.state.s)*this.state.k**this.a * 100) / 100).toFixed(2)}</span> units are consumed and the remained <span className="varSpan3">{(Math.round( this.state.s*this.state.k**this.a * 100) / 100).toFixed(2)}</span> are saved and invested into the capital stock. 

        </p>


      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);

    // Func
    g.p.show();
    g.i.show();

    // Text
    g.kText.show();
    g.fkText.show();
    g.p2T.show();
    g.sT.show();
    
    g.kText.changeColor(0, 0, 0);
    g.fkText.changeColor(0, 0, 0);

    // Point
    g.IP.show();
    g.IF.show();
    
    // Segment
    g.IPW.show();
    g.CPW.show();
    g.FX.show();

    // Set var
    g.a.set(this.a);

    g.k.set(this.k);    
    g.s.set(this.s);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 

    if(this.k != g.k.get()) { 

      this.k = g.k.get();


      this.setState({ 
        k: g.k.get()
      })
    }

    if(this.s != g.s.get()) { 

      this.s = g.s.get();

      this.setState({ 
        s: g.s.get()
      })
    }

  }
 
  componentDidMount() {
    mixpanel.track(course.path + "/Consumption-and-Investment");
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
  path: course.path + "/Consumption-and-Investment",
  component: View5,
  title: "Consumption and Investment"
})




class View6 extends React.Component { 

  constructor(props) {
    super(props);

    this.D = 0.22;
    this.k = 2;

    this.state = {
      D: this.D,
      k: this.k,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={6}>
        
        <p>
          We have seen how investment <InlineMath>{"i"}</InlineMath> causes the capital stock to rise. Let's consider how capital depreciation causes the capital stock to fall. 
        </p>

        <p>
          We assume that every year, a certain fraction <InlineMath>{"\\delta"}</InlineMath> of the capital stock wears out. For example, if the capital stock consists in farm trucks which last on average 10 years, we can expect 10% of trucks to break down every year. The depreciation rate <InlineMath>{"\\delta"}</InlineMath> would be equal to 0.1. The amount of capital that depreciates every year is a constant fraction <InlineMath>{"\\delta k"}</InlineMath> of the capital stock.  
        </p>

        <VarSlider letter="D" symbol="\delta" min={0} max={1} init={this.D} marks={{0:'0', 1:'1'}} step={0.001} />
        <VarSlider letter="k" symbol="k" min={0} max={3} init={this.k} marks={{0:'0', 1:'1', 2:'2', 3:'3'}} step={0.01} />

        <p>
           At the current depreciation rate and capital per worker, <span className="varSpan3">{(Math.round(this.state.D*this.state.k * 100) / 100).toFixed(2)}</span> units of capital depreciate every year. We can see that the more capital there is in the economy, the more we lose capital through depreciation. 
        </p>

        <p>
           We now understand how capital increases through savings/investment and decreases through depreciation.
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width,g.params.app1Height);

    // Func
    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kText.show();
    g.p2T.show();
    g.sT.show();
    g.LText.show();

    g.kText.changeColor(0, 191, 255);
    g.dText.show();

    // Segment
    g.dOne.show();
    g.δ.show();
    g.dX.show();
    g.dY.show();
    g.δPoint.show();

    // set Vars 
    g.a.set(0.2);
    g.s.set(0.3);

    g.D.set(this.D);
    g.k.set(this.k);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.D != g.D.get()) { 

      this.D = g.D.get();

      this.setState({ 
        D: g.D.get()
      })

      g.δ.setCaption('Δk=' + (Math.round(this.D * 100) / 100).toFixed(2));
    }

    if(this.k != g.k.get()) { 

      this.k = g.k.get();

      this.setState({ 
        k: g.k.get()
      })
    }


  }

  componentDidMount() {
    mixpanel.track(course.path + "/Capital-Depreciation");
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
  path: course.path + "/Capital-Depreciation",
  component: View6,
  title: "Capital Depreciation"
})







class View7 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.25;

    this.k = 1;
    this.s = 0.55;
    this.diff = 0.22;

    this.state = {
      k: this.k,
      s: this.s,
      diff: this.diff,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={7}>
        <p> 
          Investment <InlineMath>{"s f(k)"}</InlineMath> causes the capital stock to rise, whilst depreciation <InlineMath>{"\\delta k"}</InlineMath> causes the capital stock to fall. Hence we can express the aggregate impact of theses two forces on the capital stock as the difference between investment and depreciation: 
        </p>
     
        <BlockMath>{"\\Delta k = s f(k) - \\delta k"}</BlockMath>

        <p> 
          At the current depreciation and saving rate, we are adding <span className="varSpan3">{(Math.round(this.state.s*this.state.k**this.a * 100) / 100).toFixed(2)}</span> units of capital through investment, whilst <span className="varSpan3">{(Math.round(this.D*this.state.k * 100) / 100).toFixed(2)}</span> units vanish through depreciation. Hence, there is an overall change in the capital stock of <span className="varSpan3">{(Math.round( this.state.diff * 100) / 100).toFixed(2)}</span>. We can explore how the saving rate affects the change in the capital stock:
        </p>

        <VarSlider letter="s" symbol="s" min={0} max={1} init={this.s} marks={{0:'0', 1:'1'}} step={0.01} />

        <p> 
          For a sufficiently high savings rate, more capital is added through investment than what is lost through depreciation, leading to an increase in the capital stock.  
        </p>

        <p> 
          For a sufficiently low savings rate, the level of investment is not sufficient to cover capital depreciation, leading to a fall in the capital stock.  
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);

    // Func
    g.f.show();
    g.f.setOpacity3D(0.9);

    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kText.show();
    g.fkText.show();
    g.p2T.show();
    g.sT.show();
    g.LText.show();

    g.kText.changeColor(0, 0, 0);

    // Point
    g.IP.show();
    g.IF.show();
    g.ID.show();

    g.ID.changeColor(0,140,0);
    g.IP.changeColor(0,140,0); 

    // Segment
    g.FX.show();
    g.YP.show();

    g.Δk.show();

    // set Vars 
    g.a.set(0.2);
    g.D.set(0.25);

    g.k.set(this.k);    
    g.s.set(this.s);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));

  }
  
  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    if(this.k != g.k.get()) { 

      this.k = g.k.get();

      this.setState({ 
        k: g.k.get()
      })
    }

    if(this.s != g.s.get()) { 

      this.s = g.s.get();

      this.setState({ 
        s: g.s.get()
      })
    }

    let diffT = ( this.s*this.k**this.a - this.D*this.k );

    if(this.diff != diffT ) { 
      this.diff = diffT;

      this.setState({
        diff: diffT
      });

      g.Δk.setCaption('Δk=' + (Math.round(this.diff * 100) / 100).toFixed(2));

    }



  }

  componentDidMount() {
    mixpanel.track(course.path + "/Change-in-the-Capital-Stock");
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
  path: course.path + "/Change-in-the-Capital-Stock",
  component: View7,
  title: "Change in the Capital Stock"
})




class View8 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.25;

    this.k = 1;
    this.s = 0.55;
    this.diff = 0.34;

    this.kS = 4.8;

    this.state = {
      k: this.k,
      s: this.s,
      diff: this.diff,

      kS: this.kS,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={8}>

        <p>
          We examine how the capital stock changes over time. In the current time period, the <span className="varSpan3">{(Math.round(this.state.k * 100) / 100).toFixed(2)}</span> units of capital per worker <InlineMath>{"k"}</InlineMath> produce <span className="varSpan3">{(Math.round(this.state.k**this.a * 100) / 100).toFixed(2)}</span> units of output per worker <InlineMath>{"f(k)"}</InlineMath>. 
        </p>

        <p>
          Because <span className="varSpan2">{(Math.round(this.state.s * 100))}</span> percent of output is saved and invested and <span className="varSpan2">{(100 - Math.round(this.state.s * 100))}</span> percent is consumed, investment per worker <InlineMath>{"i"}</InlineMath> is <span className="varSpan3">{(Math.round(this.state.s*this.state.k**this.a * 100) / 100).toFixed(2)}</span> and consumption per worker <InlineMath>{"c"}</InlineMath> is <span className="varSpan3">{(Math.round((1-this.state.s)*this.state.k**this.a * 100) / 100).toFixed(2)}</span>.
        </p>

        <p>
          Because <span className="varSpan2">{(Math.round(this.D * 100))}</span> percent of the capital stock depreciates, <InlineMath>{"\\delta k"}</InlineMath> is <span className="varSpan4">{(Math.round(this.D*this.state.k * 1000) / 1000).toFixed(3)}</span>. With investment of <span className="varSpan4">{(Math.round(this.state.s*this.state.k**this.a * 1000) / 1000).toFixed(3)}</span> and depreciation of <span className="varSpan4">{(Math.round(this.D*this.state.k * 1000) / 1000).toFixed(3)}</span>, the change in the capital stock <InlineMath>{"\\Delta k"}</InlineMath> is <span className="varSpan4">{(Math.round( (this.state.s*this.state.k**this.a - this.D*this.state.k) * 1000) / 1000).toFixed(3)}</span>.
        </p>

        <p>
          Thus, capital per worker <InlineMath>{"k"}</InlineMath> will be <span className="varSpan3">{(Math.round( (this.state.k + this.state.s*this.state.k**this.a - this.D*this.state.k) * 100) / 100).toFixed(2)}</span> in the next period. <span> </span>

        
              { (this.state.s*this.state.k**this.a - this.D*this.state.k) > 0 ? (

                <span>
                  Because investment exceeds depreciation, new capital is added and output grows. 
                </span>

              ) : (
                <span>
                  Because depreciation exceeds investment, the capital stock shrinks and output falls. 
                </span>
              )}

        </p>

        <p>
          Over many periods, the economy converges to a steady state <InlineMath>{"k^*"}</InlineMath> with <span className="varSpan3">{(Math.round(this.state.kS * 100) / 100).toFixed(2)}</span> units of capital per worker. In this steady state, investment of <span className="varSpan3">{(Math.round(this.state.s*this.state.kS**this.a * 100) / 100).toFixed(2)}</span> exactly offsets depreciation of <span className="varSpan3">{(Math.round(this.D*this.state.kS * 100) / 100).toFixed(2)}</span>, so <InlineMath>{"\\Delta k = 0"}</InlineMath> (i.e. the capital stock and hence output are constant). 
        </p>

        <p>
          Changing the savings rate will lead the economy to converge to a different steady state:
        </p>
          
        <VarSlider letter="s" symbol="s" min={0} max={1} init={this.s} marks={{0:'0', 1:'1'}} step={0.01} />

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);

    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kText.show();
    g.fkText.show();
    g.p2T.show();
    g.sT.show();
    g.LText.show();
    g.kSText.show();

    g.kText.changeColor(0, 0, 0);

    // Point
    g.IP.show();
    g.IF.show();
    g.ID.show();

    g.ID.changeColor(0,140,0);
    g.IP.changeColor(0,140,0); 

    // Segment
    g.FX.show();
    g.YP.show();

    g.Δk.show();
    g.DiffAnim.show();
    g.SSSeg.show();
    g.SSInt.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.k.set(this.k);
    g.s.set(this.s);

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  changeVal() { 
    if(this.k != g.k.get()) { 

      this.k = g.k.get();

      this.setState({ 
        k: g.k.get()
      })
    }

    if(this.s != g.s.get()) { 

      this.s = g.s.get();

      this.setState({ 
        s: g.s.get()
      })
    }

    let diffT = ( this.s*this.k**this.a - this.D*this.k );

    if(this.diff != diffT ) { 
      this.diff = diffT;

      this.setState({
        diff: diffT
      });

      g.Δk.setCaption('Δk=' + (Math.round(this.diff * 100) / 100).toFixed(2));

    }

    let kST = ( this.state.s/this.D )**(1/(1-this.a)) ;

    if(this.kS != kST) { 
      this.kS = kST;

      this.setState({
        kS: kST,
      });
    }


  }

  componentWillUnmount() { 
   g.View8Mounted = false;

   clearInterval(this.interval);
   clearTimeout(this.timeout);

   this.stateSubscribe();

  }
  
  convergenceLoop() {

      if(g.View8Mounted) { 

        let diff = ( g.s.get()*g.k.get()**g.a.get() - g.D.get()*g.k.get() );

        if(Math.abs(diff) > .001) {

          g.X1.set(g.k.get());
          g.Y1.set(g.D.get()*g.k.get());

          g.X2.set(g.k.get());
          g.Y2.set(g.s.get()*g.k.get()**g.a.get());

          g.Δk.setCaption('Δk=' + (Math.round(diff * 100) / 100).toFixed(2));

          g.DiffAnim.setCaption((Math.round(diff * 100) / 100).toFixed(2));

          g.X1.easeTo((g.k.get()), 2000, 'easeInOutQuad'); 
          g.Y1.easeTo(0, 2000, 'easeInOutQuad');
          
          g.X2.easeTo((g.k.get() + diff), 2000, 'easeInOutQuad'); 
          g.Y2.easeTo(0, 2000, 'easeInOutQuad');
          
          this.timeout = setTimeout(() => { 

            if(g.View8Mounted) {             
              g.k.add(diff);

              let diff2 = ( g.s.get()*g.k.get()**g.a.get() - g.D.get()*g.k.get() );
              g.Δk.setCaption('Δk=' + (Math.round(diff2 * 100) / 100).toFixed(2));

            }

          }, 4000)  

        }
        else { 
          g.DiffAnim.setCaption(".");
        }

      }
  }


  componentDidMount() {
    mixpanel.track(course.path + "/Convergence-Towards-the-Steady-State");

    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});


    g.View8Mounted = true;

    (function wait() {
      if(store.getState().allMounted) {
        this.convergenceLoop();

        setTimeout(() => { 
          this.interval = setInterval(this.convergenceLoop, 6100);
        }, 1000)

      } 
      else {
        setTimeout( wait.bind(this), 3000 );
      }
    }.bind(this))();

  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/Convergence-Towards-the-Steady-State",
  component: View8,
  title: "Convergence Towards the Steady State"
})






class View9 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.25;

    this.k = 1;
    this.s = 0.25;

    this.diff = 0;

    this.state = {
      k: this.k,
      s: this.s,

      diff: this.diff,
    };
  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={9}>

        <p>
          We consider what happens to the capital stock when the savings rate increases:
        </p>

          <ButtonBar buttonList={[{
              letter: 's',
              id: 'sGrowth',
              top: 'add(0.2)', 
              bottom: 'add(-0.2)',
              min: 0.1,
              max: 0.9,
             }
          ]} />

        <p>
          The economy begins in a steady state with savings rate <InlineMath>{"s"}</InlineMath> of 0.18 and a capital stock <InlineMath>{"k"}</InlineMath> of 1. When the savings rate increases, the <InlineMath>{"s f(k)"}</InlineMath> curve shifts upward. At the initial savings rate, the amount of investment <InlineMath>{"s f(k)"}</InlineMath> just offsets the amount of depreciation <InlineMath>{"\\delta k"}</InlineMath>. Immediately after the savings rate increase, investment is higher but the capital stock and investment are unchanged. Therefore, investment exceeds depreciation:
        </p>

        <BlockMath>{"s f(k) - \\delta k = \\Delta k > 0"}</BlockMath>

        <p>
          The capital stock gradually rises until it reaches a new steady state, with a higher capital stock and higher level of output than the previous steady state.
        </p>

        <p>
          The saving rate <InlineMath>{"s"}</InlineMath> is therefore a key determinant of the steady-state capital stock. If the saving rate is high, so will be the capital stock <InlineMath>{"k"}</InlineMath> and output in the steady state. If the saving rate is low, in the steady state the economy will have a small capital stock and a low level of output.
        </p>

        <p> 
          What about the relationship between saving and economic growth? As the savings rate increases, so does output growth but only temporarily. As the economy converges towards the new steady state, output growth falls to zero. Hence, if the saving rate is high, the capital stock will also be high, but it will not maintain a high rate of output growth forever. 
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);

    // Func
    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kText.show();
    g.fkText.show();
    g.p2T.show();
    g.sT.show();
    g.LText.show();
    g.kSText.show();

    g.kText.changeColor(0, 0, 0);

    // Point
    g.IP.show();
    g.IF.show();
    g.ID.show();

    g.ID.changeColor(0,140,0);
    g.IP.changeColor(0,140,0); 

    // Segment
    g.FX.show();
    g.YP.show();

    g.Δk.show();
    g.SSSeg.show();
    g.SSInt.show();

    setTimeout(() => { 
      g.X1.set(1);
      g.X2.set(1);
      g.Y1.set(0.2);
      g.Y2.set(0.2);

      g.DiffAnim.show();
    }, 2000);

    g.Δk.setCaption('Δk=0');

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.k.set(this.k);
    g.s.set(this.s);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  changeVal() { 
    if(this.k != g.k.get()) { 

      this.k = g.k.get();

      this.setState({ 
        k: g.k.get()
      })
    }

    if(this.s != g.s.get()) { 

      this.s = g.s.get();

      this.setState({ 
        s: g.s.get()
      })
    }

    let diffT = ( this.s*(this.k**this.a) - this.D*this.k );

    if(this.diff != diffT ) { 
      this.diff = diffT;

      this.setState({
        diff: diffT
      });

      g.Δk.setCaption('Δk=' + (Math.round(this.diff * 100) / 100).toFixed(2));

    }

  }

  componentWillUnmount() { 
   g.View9Mounted = false;

   clearInterval(this.interval);
   clearTimeout(this.timeout);

   this.stateSubscribe();

  }
  
  convergenceLoop() {

      if(g.View9Mounted) { 

        let diff = ( g.s.get()*g.k.get()**g.a.get() - g.D.get()*g.k.get() );

        if(Math.abs(diff) > .001) {

          g.Y1.set(g.D.get()*g.k.get());
          g.Y2.set(g.s.get()*g.k.get()**g.a.get());
          g.X1.set(g.k.get());

          g.Δk.setCaption('Δk=' + (Math.round(diff * 100) / 100).toFixed(2));

          g.DiffAnim.setCaption((Math.round(diff * 100) / 100).toFixed(2));

          g.Y1.easeTo(0, 2000, 'easeInOutQuad');
          g.Y2.easeTo(0, 2000, 'easeInOutQuad');
          
          g.X2.easeTo((g.k.get() + diff), 2000, 'easeInOutQuad'); 

          this.timeout = setTimeout(() => { 

            if(g.View9Mounted) { 
              g.k.add(diff);

              let diff2 = ( g.s.get()*g.k.get()**g.a.get() - g.D.get()*g.k.get() );
              g.Δk.setCaption('Δk=' + (Math.round(diff2 * 100) / 100).toFixed(2));
            }
          }, 4000)

        }
        else { 
          g.DiffAnim.setCaption(".");
        }

      }
  }


  componentDidMount() {
    mixpanel.track(course.path + "/How-the-Savings-Rate-Affects-Growth");
    
    hideSideBar();
    if(store.getState().allMounted) { 
      this.updateApplet()
    } else { 
      this.unsubscribe = store.subscribe(this.checkMounted.bind(this))
    }
    window.addEventListener("resize", this.updateApplet.bind(this))
    store.dispatch({type: "setPath", path: window.location.pathname});
  

    g.View9Mounted = true;

    (function wait() {
      if(store.getState().allMounted) {
        this.convergenceLoop();

        setTimeout(() => { 
          //console.log("setInterval");
          this.interval = setInterval(this.convergenceLoop, 6100);
        }, 500)

      } 
      else {
        setTimeout( wait.bind(this), 1000 );
      }
    }.bind(this))();

  }
  checkMounted() { 
    if(store.getState().allMounted) { 
      this.unsubscribe();
      this.updateApplet();
    }
  }
}
course.addCourseRoute({ 
  path: course.path + "/How-the-Savings-Rate-Affects-Growth",
  component: View9,
  title: "How the Savings Rate Affects Growth"
})








class View10 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.15;

    this.k = 1;

    this.s = 0.3;
    this.c = 0.8;

    this.state = {
      s: this.s,
      c: this.c
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={10}>

        <p>
          Let's assume that a policymaker can choose the economy's saving rate. By doing so, the policymaker determines the steady state level of capital and output. Hence, we must ask which steady state the policymaker must choose to maximise the well-being of people in the economy. 
        </p>

        <p>
          People only care about the amount of goods and services they consume and are indifferent about the amount of capital or output in the economy. Thus, the policymaker would want to choose the steady state <InlineMath>{"k^*"}</InlineMath> that maximises the steady state level of consumption  <InlineMath>{"c^*"}</InlineMath>. We obtain an expression for <InlineMath>{"c^*"}</InlineMath> by writing consumption as output minus investment:
        </p>
        
        <BlockMath>{"c = y - i"}</BlockMath>

        <p>
          Because we want to find steady-state consumption, we substitute steady-state values for output and investment. In the steady state, output is <InlineMath>{"f(k^{*})"}</InlineMath> and since the capital stock is fixed, investment equals depreciation <InlineMath>{"δ k^*"}</InlineMath>. Plugging in these values, we can express steady state consumption as: 
        </p>

        <BlockMath>{"c^* = f(k^{*}) - δ k^*"}</BlockMath>

        <p>
          Steady state consumption is what is left of output after paying for depreciation, and can be seen graphically as the gap between output and depreciation. As a benevolent policymaker would, we can select <InlineMath>{"k^*"}</InlineMath> to maximise <InlineMath>{"c^*"}</InlineMath>:
        </p>

        <VarSlider letter="k" symbol="k^*" min={0} max={3} init={this.k} marks={{0:'0', 3:'3'}} step={0.01} />

        <p>
          At the current steady state level of capital, consumption per worker is <span className="varSpan4">{(Math.round(this.state.c * 1000) / 1000).toFixed(3)}</span>. We can maximise <InlineMath>{"c^*"}</InlineMath> by setting <InlineMath>{"k^*"}</InlineMath> to 1.43, in which case steady state consumption is equal to 0.860. 
        </p>

        <p>
          Thus, a higher steady state level of capital and output is not always a good thing. There is an optimal level of capital accumulation and production from the standpoint of economic well-being.
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Steady state capital per worker, k*', 'Steady state output per worker, y*');

    // Func
    g.p.show();
    g.d.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();
    g.pKS.show();
    g.dKS.show();
    //g.sKS.show();

    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.SSLP.show();
    g.SSHP.show();

    g.ID.changeColor(0,140,0);
    g.IP.changeColor(0,140,0); 

    // Segment
    g.FX.show();
    g.SDSS.show();
    g.cStar.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let sTarget = g.k.get()**(1-this.a)*this.D;

    
    if(this.s != sTarget) { 

      this.s = sTarget;

      this.setState({ 
        s: sTarget
      })
      
      g.s.set( sTarget );


      this.c = g.k.get()**this.a - this.D*g.k.get();

      this.setState({
        c: this.c,
      })

      g.cStar.setCaption('c*=' + (Math.round(this.c * 1000) / 1000).toFixed(3));

    }

  }   

  componentDidMount() {
    mixpanel.track(course.path + "/Comparing-Steady-States");

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
  path: course.path + "/Comparing-Steady-States",
  component: View10,
  title: "Comparing Steady States"
})



class View11 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.15;

    this.s = 0.25;
    this.c = 0.8;
    this.k = 0.7;

    this.state = {
      s: this.s,
      c: this.s,
      k: this.k
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={11}>
        <p>
          The steady state level of capital per worker that maximizes steady state consumption <InlineMath>{"c^*"}</InlineMath> is called the Golden Rule level of capital and is denoted <InlineMath>{"k^{*}_{gold}"}</InlineMath> . We have seen previously that consumption is maximised for a capital stock of 1.43 in our economy, which is hence the Golden Rule level.
          </p>

          <p>
            When comparing steady states, we must keep in mind that more capital has two opposing effects on steady state consumption. Whilst more capital means more output, it also means more output must be used to replace capital which depreciates. 
          </p>

          <p>
            If the capital stock is below the Golden Rule level, the production function is steeper than the <InlineMath>{"δ k^*"}</InlineMath> line, so consumption (which is the gap between the two curves) grows with <InlineMath>{"k^*"}</InlineMath>. In other words, an increase in the capital stock raises output more than depreciation, so consumption rises. 
          </p>

          <p>
            In contrast, if the capital stock is above the Golden Rule level, the production function is flatter than the <InlineMath>{"δ k^*"}</InlineMath> line, so consumption shrinks as <InlineMath>{"k^*"}</InlineMath> rises. An increase in the capital stock will reduce consumption as the increase in output will be smaller than the increase in depreciation. 
          </p>
        
          <p>
            At the Golden Rule level of capital <InlineMath>{"k^{*}_{gold}"}</InlineMath>, the slope of the production function (or <InlineMath>{"MPK"}</InlineMath>) is equal to the slope of the depreciation function (which is <InlineMath>{"δ"}</InlineMath>). Hence, the Golden Rule is described by:
          </p>

          <BlockMath>{"MPK = δ"}</BlockMath>

          <p>
            We can verify this graphically by varying the steady state level of capital:
          </p>

          <VarSlider letter="k" symbol="k^*" min={0.5} max={3} init={this.k} marks={{1:'1', 2:'2', 3:'3'}} step={0.01} />

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Steady state capital per worker, k*', 'Steady state output per worker, y*');

    // Func
    g.p.show();
    g.d.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();
    g.pKS.show();
    g.dKS.show();
    //g.sKS.show();
    g.kSKGText.show();

    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.SSLP.show();
    g.SSHP.show();

    g.GoldLP.show();
    g.GoldHP.show();

    // Segment
    g.FX.show();
    g.SDSS.show();
    g.cStar.show();
    g.SGSS.show();
    g.cSGold.show();

    g.dS1.show();
    g.dS2.show();

    g.fTangeant.show();
    g.kTangeant.show();

    g.fMPK.show();
    g.f1.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let sTarget = g.k.get()**(1-this.a)*this.D;

    
    if(this.s != sTarget) { 

      this.s = sTarget;

      this.setState({ 
        s: this.s
      })
      
      g.s.set( sTarget );


      this.c = g.k.get()**this.a - this.D*g.k.get();

      this.setState({
        c: this.c,
      })

      this.k = g.k.get();
      this.setState({ 
        k: this.k,
      })

      g.cStar.setCaption('c*=' + (Math.round(this.c * 1000) / 1000).toFixed(3));

      g.fMPK.setCaption('MPK=' + (Math.round(this.a*(this.k**(this.a-1)) * 1000) / 1000).toFixed(3));
    }

  }   

  componentDidMount() {
    mixpanel.track(course.path + "/The-Golden-Rule-Level-of-Capital");

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
  path: course.path + "/The-Golden-Rule-Level-of-Capital",
  component: View11,
  title: "The Golden Rule Level of Capital"
})






class View12 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.15;

    this.s = 0.1;
    this.c = 0.8;
    this.k = 0.6;

    this.state = {
      s: this.s,
      c: this.c,
      k: this.k
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={12}>
        <p> 
          Keep in mind that the economy does not automatically converge toward the Golden Rule steady state. To reach any particular steady state, including the Golden Rule, we need a particular saving rate. Assuming that the policymaker can control the saving rate, he/she can select a saving rate to support the Golden Rule level of capital:   
        </p>

        <VarSlider letter="s" symbol="s" min={0} max={1} init={this.s} marks={{0:'0', 1:'1'}} step={0.01} />

        <p> 
          Setting <InlineMath>{"s"}</InlineMath> to 0.20 produces the Golden Rule level of capital. Hence, we call it the Golden Rule saving rate, which we denote <InlineMath>{"s_{gold}"}</InlineMath> . 
        </p>

        <p>
          If the saving rate is higher than 0.20, the steady state capital stock will be too large. If the saving rate is lower, the steady state capital stock will be too low. In either case, steady state consumption will be lower than for the Golden rule level of 0.20. 
        </p>

        <p>
          In practice, policymakers don't directly control the saving rate but can implement policies to influence it. 
        </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Steady state capital per worker, k*', 'Steady state output per worker, y*');

    // Func
    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();
    g.pKS.show();
    g.dKS.show();
    //g.sKS.show();
    g.kSKGText.show();

    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.GoldLP.show();
    g.GoldHP.show();

    g.sKS.show();

    g.SSLP.show();
    g.SSHP.show();

    // Segment
    g.FX.show();
    g.SDSS.show();
    g.cStar.show();
    g.SGSS.show();
    g.cSGold.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.s.set(this.s);
    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let kTarget = (g.s.get()/this.D)**(1/(1-this.a));
    
    if(this.k != kTarget) { 

      this.k = kTarget;
      this.setState({ 
        k: this.k,
      })      
      g.k.set(kTarget);


      this.s = g.s.get();
      this.setState({ 
        s: this.s
      })
      
      this.c = g.k.get()**this.a - this.s*this.k;
      this.setState({
        c: this.c,
      })

      g.cStar.setCaption('c*=' + (Math.round(this.c * 1000) / 1000).toFixed(3));

    }

  }   

  componentDidMount() {
    mixpanel.track(course.path + "/The-Saving-Rate-and-the-Golden-Rule");

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
  path: course.path + "/The-Saving-Rate-and-the-Golden-Rule",
  component: View12,
  title: "The Saving Rate and the Golden Rule"
})





class View13 extends React.Component { 


  render() {
    return(
      <PanelContainer courseObj={course} pageNo={13}>

        <p>
          So far we have assumed that we can choose the economy's steady state and jump there immediately. In this case, the policymaker would choose the Golden Rule steady state to maximise consumption. 
        </p>

        <p>
          We now suppose that the economy is in a steady state other than the Golden Rule. We will examine what happens to consumption, investment and capital when then economy transitions to another steady state.
        </p>

        <p> 
          The economy currently has less capital than in the Golden Rule steady state, which we can reach by increasing the saving rate: 
        </p>

          <ButtonBar buttonList={[{
              letter: 's',
              id: 'sTrans1',
              top: 'add(0.1)', 
              bottom: 'add(-0.1)',
              streamInit: true,
              min: 0.099, 
              max: 0.499,
             }
          ]} />

        <p>
          The increase in the saving rate at <InlineMath>{"t=0"}</InlineMath> causes an immediate fall in consumption and rise in investment (before the capital stock starts to increase). As investment has increased whilst depreciation is constant, the capital stock is no longer in a steady state. As the capital stock increases, so does output, consumption and investment. After around 5 periods, consumption exceeds the initial steady state level. Since the initial saving rate was below the Golden Rule, the increase in saving eventually leads to a higher level of consumption. 
        </p>

        <p>
          Since the new steady state level of consumption is higher than the initial level, the increase in saving raises economic welfare. However, achieving the new Golden Rule steady state requires an initial period of reduced consumption. 
        </p>

        <p> 
          We now consider the case in which the economy begins in a steady state with more capital than in the Golden Rule steady state (<span className="infoLink" onClick={this.setMoreCapital.bind(this)}>click here</span> to set the economy to this state). In this case, the policymaker should reduce the saving rate to diminish the steady state capital stock: 
        </p>

        <ButtonBar buttonList={[{
            letter: 's',
            id: 'sTrans2',
            top: 'add(0.1)', 
            bottom: 'add(-0.1)',
            streamInit: true,
            min: 0.099, 
            max: 0.499,
           }
        ]} />

        <p>
          The reduction in the saving rate at <InlineMath>{"t=0"}</InlineMath> causes an immediate increase in consumption and an equal decrease in investment. Because investment and depreciation were equal in the initial steady state, investment will now be less than depreciation. Hence, the capial stock falls, leading to a reduction in output, consumption and investment. The economy reaches the Golden Rule steady state, in which consumption is higher than it was before the change in the saving rate, even though output and investment are lower. 
        </p>

        <p>
          Unlike when we started with too little capital, consumption is higher not only in the new steady state but also along the entire path to it. 
        </p>



      </PanelContainer>
    ) 
  }

  setMoreCapital() { 
    g.s.set(0.299);
    g.k.set(1.6531);

  }


  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('top');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);

    // Func
    g.p.show();
    g.i.show();
    g.d.show();

    // Text
    g.kText.show();
    g.pKS.show();
    g.dKS.show();
    g.fkText.show();

    g.SwipeKgold.show();

    g.kText.changeColor(0, 0, 0);
    g.fkText.changeColor(0, 0, 0);

    // Point
    g.IF.show();
    g.sKS.show();
    g.IStar.show()

    // Segment
    g.FX.show();
    g.c2Star.show();
    g.iStar.show();
    g.SwipeKGoldDots.show();

    // Set Var
    g.a.set(0.2);
    g.D.set(0.2);
    g.s.set(0.099);
    g.k.set(0.415199);      


    g.SolowConsumption.show('bottom');

  }

  componentWillUnmount() { 
    g.View13Mounted = false;

    clearInterval(this.interval);
    clearTimeout(this.timeout);

    store.dispatch({
      type: 'clearStream',
    })
  }

  convergenceLoop() { 

    if(g.View13Mounted) { 

      g.k.add( (g.s.get()*g.k.get()**g.a.get() - g.k.get()*g.D.get()) )

      
      store.dispatch({ 
        type: 'PushToStream',
      })

      g.cStar.setCaption('c*=' + (Math.round( ((1-g.s.get())*g.k.get()**g.a.get()) * 1000) / 1000).toFixed(3));
    }
  }

  componentDidMount() {
    mixpanel.track(course.path + "/The-Transition-to-the-Golden-Rule-Steady-State");

    g.View13Mounted = true;

    (function wait() {
      if(store.getState().allMounted) {
        
        this.interval = setInterval(this.convergenceLoop, 1000);

      } 
      else {
        setTimeout( wait.bind(this), 100 );
      }
    }.bind(this))();

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
  path: course.path + "/The-Transition-to-the-Golden-Rule-Steady-State",
  component: View13,
  title: "The Transition to the Golden Rule Steady State"
})





class View14 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.2;

    this.s = 0.35;
    this.n = 0.01;
    this.k = 1.89369;

    this.state = {
      s: this.s,
      k: this.k
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={14}>
        
        <p>
          So far our model cannot explain sustained economic growth: a higher saving rate leads to higher growth temporarily, but the economy eventually approaches a steady state in which ouptut is constant. To explain the sustained economic growth that we observe in many countries, we must incorporate  population growth and technological progress. We start with population growth. 
        </p>

        <p>
          Instead of assuming that the labour force <InlineMath>{"L"}</InlineMath> is fixed as we did previously, we suppose that it grows at a constant rate <InlineMath>{"n"}</InlineMath>. For example, the US population grows at around 1 percent per year, so <InlineMath>{"n=0.01"}</InlineMath>.
        </p>

        <p>
          To understand how population growth affects the steady state, we must discuss how population growth (along with investment and depreciation) influences the accumulation of capital per worker. As we have seen, investment adds to the capital stock whilst depreciation reduces it. Now there is a third force which influences the amount of capital per worker: growth in the number of workers causes the amount of capital per worker to decrease. 
        </p>

        <p>
          The change in the capital stock per worker is now:
        </p>

        <BlockMath>{"\\Delta k = s f(k) - (\\delta + n) k"}</BlockMath>

        <p> 
          The change in the capital stock in any period is the difference between the amount invested <InlineMath>{"sf(k)"}</InlineMath> and <i> break even investment </i> <InlineMath>{"(\\delta + n) k"}</InlineMath>: the amount of investment necessary to keep the capital stock per worker constant.
        </p>  

        <p>
          Break-even investment includes the amount of investment needed to replace depreciated capital <InlineMath>{"\\delta k"}</InlineMath>,  as well as the amount of investment necessary to ensure that new workers have as much capital as existing workers. Because there are <InlineMath>{"n"}</InlineMath> new workers for each existing worker and because <InlineMath>{"k"}</InlineMath> is the amount of capital for each worker, the amount of investment necessary to achieve this purpose is <InlineMath>{"n k"}</InlineMath>
        </p>

        <p>
          Population growth influences the per-worker capital stock much the way depreciation does. Depreciation reduces <InlineMath>{"k"}</InlineMath> by diminishing the capital stock, whereas population growth reduces <InlineMath>{"k"}</InlineMath> by spreading it more thinly amoung more workers.
        </p>

        <p>
          If <InlineMath>{"k"}</InlineMath> is less than the steady state <InlineMath>{"k^*"}</InlineMath>, investment is greater than break-even investment so the capital stock rises (and vice versa). In the steady state, capital per worker <InlineMath>{"k"}</InlineMath> is constant despite growth in the number of workers. This is because investment both replaces depreciated capital <InlineMath>{"\\delta k"}</InlineMath> and provides new workers with <InlineMath>{"n k"}</InlineMath>, to ensure that they work with the steady state amount of capital. 
        </p>


      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
   
    // Func
    g.p.show();
    g.i.show();
    g.n.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();

    g.DPText.show();
    g.sT.show();
    g.p2T.show();

    g.kSKText.changeColor(0, 0, 0);
    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.DPPoint1.show();
    g.DPPoint2.show();

    // Segment
    g.FX.show();
    g.KStarFull.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.s.set(this.s);
    g.N.set(this.n);
    g.k.set(this.k);     

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let kTarget = (g.s.get()/(this.D+g.N.get()))**(1/(1-this.a));
    
    if(this.k != kTarget) { 

      this.k = kTarget;
      this.setState({ 
        k: this.k,
      })      
      g.k.set(kTarget);


      this.s = g.s.get();
      this.setState({ 
        s: this.s
      })

    }

  }   

  componentDidMount() {
    mixpanel.track(course.path + "/Population-Growth");
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
  path: course.path + "/Population-Growth",
  component: View14,
  title: "Population Growth"
})






class View15 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.2;

    this.n = 0.01;

    this.s = 0.35;
    this.k = 1.89369;
    this.c = 0.8;

    this.kGold = 1.5;

    this.state = {
      k: this.k,
      c: this.c,
      kGold: this.kGold,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={15}>

        <p>
          We consider the effect of an increase in the population growth rate:
        </p>

        <VarSlider letter="N" symbol="n" min={0} max={0.2} init={0.01} marks={{0:'0', 0.2:'0.2'}} step={0.005} />

        <p>
          The line representing population growth and depreciation shifts upward. The new steady state has a lower level of capital per worker than the initial steady state. Thus, the model predicts that economies with higher levels of population growth will have lower levels of capital per worker and therefore lower incomes. 
        </p>

        <p>
          Population growth also affects the Golden Rule level of capital. Because steady state investment is <InlineMath>{"(\\delta + n) k^*"}</InlineMath>, we can express steady state consumption as: 
        </p>

        <BlockMath>{"c^* = f(k^*) - (\\delta + n) k^*"}</BlockMath>

        <p>
          Using an argument largely the same as before, the Golden Rule steady state is one at which the following condition is satisfied:
        </p>

        <BlockMath>{"MPK = \\delta + n"}</BlockMath>

        

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
   
    // Func
    g.p.show();
    g.i.show();
    g.n.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();

    g.DPText.show();
    g.sT.show();
    g.p2T.show();
    g.gNGoldText.show();

    g.kSKText.changeColor(0, 0, 0);
    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.DPPoint1.show();
    g.DPPoint2.show();

    // Segment
    g.FX.show();
    g.KStarFull.show();

    g.dn1.show();
    g.dn2.show();

    g.gNGoldSeg.show();
    g.fNTangeant.show();

    g.fN1.show();
    g.fNMPK.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);

    g.s.set(this.s);
    g.N.set(this.n);
    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let kTarget = (this.s/(this.D+g.N.get()))**(1/(1-this.a));
    
    if(this.k != kTarget) { 

      this.k = kTarget;
      this.setState({ 
        k: this.k,
      })      
      g.k.set(kTarget);


      this.n = g.N.get();
      this.setState({ 
        n: this.n
      })

      this.kGoldNew = ((this.D+this.n)/this.a)**(1/(this.a -1))
      this.setState({ 
        kGold: this.kGoldNew
      })
      g.kNGold.set(this.kGoldNew);

      g.dn2.setCaption( "δ+n=" + (Math.round( (this.D+this.n) * 100) / 100).toFixed(2));
      g.fNMPK.setCaption( "MPK=" + (Math.round( (this.D+this.n) * 100) / 100).toFixed(2));

    }

  }   

  componentDidMount() {
    mixpanel.track(course.path + "/A-Change-in-the-Population-Growth-Rate");
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
  path: course.path + "/A-Change-in-the-Population-Growth-Rate",
  component: View15,
  title: "A Change in the Population Growth Rate"
})






class View16 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.2;
    this.n = 0.01;

    this.s = 0.35;
    this.G = 0.02;
    this.k = 1.6901;

    this.c = 0.8;
    this.kGold = 1.5;

    this.state = {
      s: this.s,
      G: this.G,
      k: this.k,
      c: this.c,
      kGold: this.kGold,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={16}>

      <p>
        So far we have assumed that technology is fixed: i.e. that there is an unchanging relationship between the inputs of capital and labour and output. We now include technological progress, which increases production for any given level of inputs. 
      </p>

      <p>
        To incorporate technological progress, modify the production function. So far we have used the following production function to relate total capital <InlineMath>{"K"}</InlineMath>:
      </p>

      <BlockMath>{"Y = F(K, L)"}</BlockMath>

      <p>
        We now write the production function as: 
      </p> 

      <BlockMath>{"Y = F(K, L \\times E)"}</BlockMath>

      <p>
        where <InlineMath>{"E"}</InlineMath> is a new variable called the <b>efficiency of labour</b>. The efficiency of labour reflects worker's knowledge about how to produce goods and services: as technologies improve, workers become more efficient and each hour of work contributes more output. For example, the efficiency of labour rose when assembly line production transformed manufacturing in the early twentieth century. The efficiency of labour also rises with improvements in the education or skills of workers. 
      </p>

      <p>
        The term <InlineMath>{"L \\times E"}</InlineMath> measures the <i>effective number of workers</i>. It takes into account the number of workers and how efficient each worker is. In this new production function, total output depends on both the inputs of capital and on a measure of both the number of workers and their skills (or technical know-how) with which they come equipped. 
      </p>

      <p>
        This approach to modeling technological progress is that increases in the efficiency of labour <InlineMath>{"E"}</InlineMath> have a similar effect to increases in the labour force <InlineMath>{"L"}</InlineMath>. For example, suppose that over time an advance in production methods makes a single worker as productive  as two workers. As the efficiency of labour <InlineMath>{"E"}</InlineMath> doubles, so does the effective number of workers <InlineMath>{"L \\times E"}</InlineMath>, which leads to an increase in output.
      </p>

      <p>
        We assume that technological progress causes the efficiency of labour <InlineMath>{"E"}</InlineMath> to grow at some constant rate <InlineMath>{"g"}</InlineMath>. For example, if <InlineMath>{"g = 0.02"}</InlineMath> then each unit of labour becomes 2 percent more efficient every year.  The effect on total output is identical to that of a 2 percent marginal increase in the number of workers. Hence, we call this approach to technological progress <i>labour augmenting</i>, and <InlineMath>{"g"}</InlineMath> is called the rate of <b>labor-augmenting technological progress</b>. 
      </p>

      <p>
        Because the labour force <InlineMath>{"L"}</InlineMath> is growing at rate <InlineMath>{"n"}</InlineMath> and the efficiency of each unit of labour <InlineMath>{"E"}</InlineMath> is growing at rate <InlineMath>{"g"}</InlineMath>, the effective number of workers is growing at rate <InlineMath>{"n + g"}</InlineMath>.
      </p>

      <p>
        Because technological progress is modeled as labour augmenting, it fits into the model in much the same way as population growth. Technological progress does not cause the actual number of workers to increase, but because each worker in effect comes with more units of labor over time, technological progress causes the effective number of workers to increase. Thus, we can easily adapt the model with population growth to a model with labor-augmenting technological progress.
      </p>

      <p> 
        Previously, when there was no technological progress, we analyzed the economy in terms of quantities per worker. We now generalize that approach by analyzing the economy in terms of quantities per effective worker. We now have <InlineMath>{"k = K/(L \\times E)"}</InlineMath> on the X axis stand for capital per effective worker, and <InlineMath>{"y = Y/(L \\times E)"}</InlineMath> on the Y axis stand for output per effective worker. With these definitions, we can again write <InlineMath>{"y = f(k)"}</InlineMath>. 
      </p>  

      <p>
        We agument our model just as we did when we introduced population growth. The equation for the evolution of <InlineMath>{"k"}</InlineMath> over time becomes: 
      </p>

      <BlockMath>{"\\Delta k = s f(k) - (\\delta + n + g) k"}</BlockMath>

      <p>
        The change in the capital stock per effective worker equals investment per effective worker minus break even investment per effective worker.  Now, break even investment includes three terms: to keep <InlineMath>{"k"}</InlineMath> constant, we must replace depreciating capital through <InlineMath>{"\\delta k"}</InlineMath>, provide capital for new workers through <InlineMath>{"n k"}</InlineMath>  and <InlineMath>{"g k"}</InlineMath> is needed to provide capital to the new 'effective workers' created by technological progress. 
      </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Capital per effective worker, k', 'Output per effective worker, y');

    // Func
    g.p.show();
    g.i.show();
    g.g.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();

    g.DPGText.show();
    g.sT.show();
    g.p2T.show();

    g.kSKText.changeColor(0, 0, 0);
    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.DPGPoint1.show();
    g.DPGPoint2.show();

    // Segment
    g.FX.show();
    g.KGStarFull.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);
    g.N.set(this.n);

    g.s.set(this.s);
    g.G.set(this.G)
    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let kTarget = (g.s.get()/(this.D+g.N.get()+g.G.get()))**(1/(1-this.a));
    
    if(this.k != kTarget) { 

      this.k = kTarget;
      this.setState({ 
        k: this.k,
      })      
      g.k.set(kTarget);


      this.s = g.s.get();
      this.setState({ 
        s: this.s
      })

      this.n = g.N.get();
      this.setState({ 
        n: this.n
      })

      this.G = g.G.get();
      this.setState({ 
        G: this.G
      })

      this.kGoldNew = ((this.D+this.n+this.G)/this.a)**(1/(this.a -1))
      this.setState({ 
        kGold: this.kGoldNew
      })
      g.kNGGold.set(this.kGoldNew);

      g.dng2.setCaption( "δ+n+g=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));
      g.fNPGMPK.setCaption( "MPK=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));

    }

  }   
 

  componentDidMount() {
    mixpanel.track(course.path + "/Technological-Progress-and-the-Efficiency-of-Labour");
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
  path: course.path + "/Technological-Progress-and-the-Efficiency-of-Labour",
  component: View16,
  title: "Technological Progress and the Efficiency of Labour"
})




class View17 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.D = 0.2;
    this.n = 0.01;

    this.s = 0.35;
    this.G = 0.02;
    this.k = 1.6901;

    this.c = 0.8;
    this.kGold = 1.5;

    this.state = {
      s: this.s,
      G: this.G,
      k: this.k,
      c: this.c,
      kGold: this.kGold,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={17}>
      <p>
        Now that <InlineMath>{"k"}</InlineMath> is defined as the amount of capital per effective worker, increases in the effective number of workers because of technological progress decrease <InlineMath>{"k"}</InlineMath>:
      </p>

      <VarSlider letter="G" symbol="g" min={0} max={0.15} init={0.02} marks={{0:'0', 0.15:'0.15'}} step={0.005} />
      
      <p>
        The introduction of technological progress also modifies the criterion for the Golden Rule, which is now defined as the steady state that maximises consumption per effective worker. Following the same argument as before, steady state consumption per effective worker is maximised if:
      </p>      

      <BlockMath>{"MPK = \\delta + n + g"}</BlockMath>

      <p>
        Because in practice economies experience both population growth and technological progress, we must use this criterion to determine if the economy is in the Golden Rule steady state. 
      </p>

      <p>
        We will now explore how key variables behave in the steady state with technological progress. As we have seen, capital per effective worker <InlineMath>{"k"}</InlineMath> is constant in the steady state. Because <InlineMath>{"y = f(k)"}</InlineMath> output per effective worker is also constant in the steady state. 
      </p>

      <p>
        We can now infer what is happening with the other variables that are not expressed at the per effective worker level. We consider output per actual worker <InlineMath>{"Y/L = y \\times E"}</InlineMath>. In the steady state, <InlineMath>{"y"}</InlineMath> is constant, whilst <InlineMath>{"E"}</InlineMath> grows at rate <InlineMath>{"g"}</InlineMath>, hence <InlineMath>{"Y/L"}</InlineMath> is also growing at rate <InlineMath>{"g"}</InlineMath> in the steady state. 
      </p>

      <p>
        Similarly, we consider how total output <InlineMath>{"Y = y \\times (E \\times L)"}</InlineMath> evolves in the steady state. We know that <InlineMath>{"y"}</InlineMath> is constant in the steady state, whilst <InlineMath>{"E"}</InlineMath> grows at rate <InlineMath>{"g"}</InlineMath> and <InlineMath>{"L"}</InlineMath> grows at rate <InlineMath>{"n"}</InlineMath>. Hence total output <InlineMath>{"Y"}</InlineMath> grows at rate <InlineMath>{"n + g"}</InlineMath> in the steady state. 
      </p>

      <p>
        We can summarise the growth rates of key variables in the steady state as follows:
      </p>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>Variable</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Symbol</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Steady-State Growth Rate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          <Table.Row>
            <Table.Cell textAlign='center'>Capital per effective worker</Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"k = K/(E \\times L)"}</InlineMath></Table.Cell>
            <Table.Cell textAlign='center'>0</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell textAlign='center'>Output per effective worker</Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"y = Y/(E \\times L)"}</InlineMath></Table.Cell>
            <Table.Cell textAlign='center'>0</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell textAlign='center'>Output per worker</Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"Y/L = y \\times E"}</InlineMath></Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"g"}</InlineMath></Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell textAlign='center'>Total Output</Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"Y = y \\times (E \\times L)"}</InlineMath></Table.Cell>
            <Table.Cell textAlign='center'><InlineMath>{"g + n"}</InlineMath></Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>


      <p>
        With the introduction of technological progress, we can finally explain the long run increases in per capita income that we observe. We have shown that technological progress leads to a steady state with growth in output per worker. Once the economy is in the steady state, the rate of growth in output per worker is the rate of technological progress. We can conclude that according to the Solow model, <i>only technological progress can lead to sustained growth in income per capita and hence to persistantly rising living standards</i>.
      </p>

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Capital per effective worker, k', 'Output per effective worker, y');

    // Func
    g.p.show();
    g.i.show();
    g.g.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();

    g.DPGText.show();
    g.sT.show();
    g.p2T.show();
    g.gNGGoldText.show();

    g.kSKText.changeColor(0, 0, 0);
    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.DPGPoint1.show();
    g.DPGPoint2.show();

    // Segment
    g.FX.show();
    g.KGStarFull.show();

    g.dng1.show();
    g.dng2.show();

    g.gNGGoldSeg.show();
    g.fNGTangeant.show();

    g.fNG1.show();
    g.fNPGMPK.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);
    g.N.set(this.n);

    g.s.set(this.s);
    g.G.set(this.G)
    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 
    
    let kTarget = (g.s.get()/(this.D+g.N.get()+g.G.get()))**(1/(1-this.a));
    
    if(this.k != kTarget) { 

      this.k = kTarget;
      this.setState({ 
        k: this.k,
      })      
      g.k.set(kTarget);


      this.s = g.s.get();
      this.setState({ 
        s: this.s
      })

      this.n = g.N.get();
      this.setState({ 
        n: this.n
      })

      this.G = g.G.get();
      this.setState({ 
        G: this.G
      })

      this.kGoldNew = ((this.D+this.n+this.G)/this.a)**(1/(this.a -1))
      this.setState({ 
        kGold: this.kGoldNew
      })
      g.kNGGold.set(this.kGoldNew);

      g.dng2.setCaption( "δ+n+g=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));
      g.fNPGMPK.setCaption( "MPK=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));

    }

  }   
 

  componentDidMount() {
    mixpanel.track(course.path + "/Technology-and-Growth");
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
  path: course.path + "/Technology-and-Growth",
  component: View17,
  title: "Technology and Growth"
})




class View18 extends React.Component { 

  constructor(props) {
    super(props);

    this.a = 0.2;
    this.n = 0.01;
    this.D = 0.2;
    this.s = 0.35;
    this.G = 0.02;
    this.k = 1.6901;

    this.c = 0.8;
    this.kGold = 1.5;

    this.state = {
      a: this.a,
      n: this.n,
      s: this.s,
      D: this.D,
      G: this.G,
      k: this.k,
      c: this.c,
      kGold: this.kGold,
    }

  }

  render() {
    return(
      <PanelContainer courseObj={course} pageNo={18}>
        <p>
          The Solow model shows how saving and population growth determine an economy's steady-state capital stock and its steady state level of income per person. It shows how in the long run, countries that save a high fraction of their output are richer and why countries with high levels of population growth are poorer. We have also seen how the rate of technological progress determines the rate of growth in living standards. 
        </p>

        <VarSlider letter="a" symbol="\alpha" init={this.a} min={0} max={1} marks={{0:'0', 1:'1'}} step={0.01} />

        <VarSlider letter="D" symbol="δ" min={0} max={0.3} init={this.D} marks={{0:'0', 0.3:'0.3'}} step={0.005} />

        <VarSlider letter="N" symbol="n" min={0} max={0.2} init={this.n} marks={{0:'0', 0.2:'0.2'}} step={0.005} />

        <VarSlider letter="G" symbol="g" min={0} max={0.2} init={this.G} marks={{0:'0', 0.2:'0.2'}} step={0.005} />

        <VarSlider letter="s" symbol="s" min={0} max={1} init={this.s} marks={{0:'0', 1:'1'}} step={0.01} />

        <VarSlider letter="k" symbol="k" min={0} max={3} init={this.k} marks={{0:'0', 3:'3'}} step={0.01} />

      </PanelContainer>
    ) 
  }

  updateApplet() { 
    hide();

    // GGBApp
    g.applet1.show('full');
    g.applet1.setCoords2D(g.params.app1Width, g.params.app1Height);
    g.applet1.setLabels2D('Capital per effective worker, k', 'Output per effective worker, y');

    // Func
    g.p.show();
    g.i.show();
    g.g.show();

    // Text
    g.kSKText.show();
    g.fkSText.show();

    g.DPGText.show();
    g.sT.show();
    g.p2T.show();
    g.gNGGoldText.show();

    g.kSKText.changeColor(0, 0, 0);
    g.fkSText.changeColor(0, 0, 0);

    // Point
    g.DPGPoint1.show();
    g.DPGPoint2.show();

    // Segment
    g.FX.show();
    g.c2Star.show();
    g.iStar.show();

    g.dng1.show();
    g.dng2.show();

    g.gNGGoldSeg.show();
    g.fNGTangeant.show();

    g.fNG1.show();
    g.fNPGMPK.show();

    // Set Var
    g.a.set(this.a);
    g.D.set(this.D);
    g.N.set(this.n);

    g.s.set(this.s);
    g.G.set(this.G)
    g.k.set(this.k);    

    this.stateSubscribe = store.subscribe(this.changeVal.bind(this));
  }

  componentWillUnmount() { 
    this.stateSubscribe();
  }

  changeVal() { 

    
    if(g.a.get() != this.a || g.D.get() != this.D || g.N.get() != this.n || g.G.get() != this.G) { 

      this.a = g.a.get();
      this.setState({ 
        a: this.a
      })

      this.D = g.D.get();
      this.setState({ 
        D: this.D
      })

      this.n = g.N.get();
      this.setState({ 
        n: this.n
      })

      this.G = g.G.get();
      this.setState({ 
        G: this.G
      })

      let kTarget = (g.s.get()/(this.D+this.n+this.G))**(1/(1-this.a));

      if(this.k != kTarget) { 

        this.k = kTarget;
        this.setState({ 
          k: this.k,
        })      
        g.k.set(kTarget);

        this.kGoldNew = ((this.D+this.n+this.G)/this.a)**(1/(this.a -1))
        this.setState({ 
          kGold: this.kGoldNew
        })
        g.kNGGold.set(this.kGoldNew);

        g.dng2.setCaption( "δ+n+g=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));
        g.fNPGMPK.setCaption( "MPK=" + (Math.round( (this.D+this.n+this.G) * 100) / 100).toFixed(2));

      }

    }

    if(g.s.get() != this.s) { 
      this.s = g.s.get();

      this.setState({ 
        s: this.s
      })
      
      g.s.set( this.s ); 

      let kTarget = (this.s/(this.D+this.n+this.G))**(1/(1-this.a));

      if(this.k != kTarget) { 
        this.k = kTarget;
        this.setState({ 
          k: this.k,
        })      
        g.k.set(kTarget);
      }

    }

    if(g.k.get() != this.k) { 

      this.k = g.k.get();
      this.setState({ 
        k: this.k,
      })  

      let sTarget = (this.D + this.n + this.G)*this.k**(1-this.a);

      if(this.s != sTarget) {
        this.s = sTarget;

        this.setState({ 
          s: sTarget
        })

        g.s.set(sTarget);
      }

    }


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
  component: View18,
  title: "Conclusion"
})





class APoint extends React.Component { 

  componentDidMount() { 
    store.dispatch({
      type: "setPage", 
      page: window.location.pathname
    });
  }

  componentWillUnmount() { 
    store.dispatch({ 
      type: 'RedirectComplete'
    })
    
  }

  render() {
    return(
      <PanelContainer courseObj={course} title="Point A">

        Here is a description of the function you just clicked on. 

      </PanelContainer>
    ) 
  }

}
course.addInfoRoute({ 
  path: course.path + "/A",
  component: APoint,
  letter: 'A',
})







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
