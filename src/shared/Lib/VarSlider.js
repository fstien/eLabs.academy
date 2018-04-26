

import React from 'react'
import { InlineMath } from 'react-katex';

import Slider from 'rc-slider';

import watch from 'redux-watch'



class VarSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.init,
    };
  }

  componentDidMount() { 

   document.getElementById("label" + this.props.letter).style.marginLeft = "calc(" + Math.round((this.props.init/(this.props.max - this.props.min) - this.props.min/(this.props.max - this.props.min))*100) + "% - 16px)";
    
    let w = watch(store.getState, 'v.' + this.props.letter + '.value')
    
    this.unsubscribe = store.subscribe(w((newVal, oldVal) => {

      this.setState({ 
        value: newVal,
      })

     document.getElementById("label" + this.props.letter).style.marginLeft = "calc(" + Math.round((newVal/(this.props.max - this.props.min) - this.props.min/(this.props.max - this.props.min))*100) + "% - 16px)";

    }))

  }

  componentWillUnmount() { 
    this.unsubscribe();
  }


  slideMove(value) {
    
    document.getElementById("label" + this.props.letter).style.marginLeft = "calc(" + Math.round((value/(this.props.max - this.props.min) - this.props.min/(this.props.max - this.props.min))*100) + "% - 16px)";

    this.setState({
      value,
    });

    g[this.props.letter].set(value);
  }

  render() {

    return (

      <div className="sliderContainer">
        
        <div className="symbolContainer"> 
          <p className="sliderSymbol">
            <InlineMath>{this.props.symbol}</InlineMath>
          </p>
        </div>


        <div className="dragContainer">
          
          <div className="label"> 
            <div id={"label" + this.props.letter} className="labelDiv">
              <span className="spanLabel">{" " + (Math.round(this.state.value * 100) / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="drag">
            <Slider min={this.props.min} max={this.props.max} marks={this.props.marks} value={this.state.value} onChange={this.slideMove.bind(this)} step={this.props.step} />
          </div>

        </div>
      
      </div>

    );
  }
}


  
export default VarSlider;

