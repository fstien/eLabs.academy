
import ButtonShift from './ButtonShift.js'

import React from 'react'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);

    this.buttonCount = this.props.buttonList.length;

    this.W = 55;

  }

    			
  componentDidMount() { 
  	

  	switch(this.buttonCount) { 

  		case 1: 
			document.getElementById(this.props.buttonList[0].id + 'Button').style.marginLeft ='calc(50% - ' + this.W/2 + 'px)';

  			break;

  		case 2:
			document.getElementById(this.props.buttonList[0].id + 'Button').style.marginLeft ='calc(33% - ' + this.W/2 + 'px)';
			document.getElementById(this.props.buttonList[1].id + 'Button').style.marginLeft ='calc(33% - ' + this.W + 'px)';

			document.getElementById(this.props.buttonList[0].id + 'Button').style.cssFloat = "left";

  			break;

  		case 3:
			document.getElementById(this.props.buttonList[0].id + 'Button').style.marginLeft ='calc(25% - ' + this.W/2 + 'px)';
			document.getElementById(this.props.buttonList[1].id + 'Button').style.marginLeft ='calc(25% - ' + this.W + 'px)';
			document.getElementById(this.props.buttonList[2].id + 'Button').style.marginLeft ='calc(25% - ' + this.W + 'px)';
  			break;

  		case 4:
			document.getElementById(this.props.buttonList[0].id + 'Button').style.marginLeft ='calc(20% - ' + this.W/2 + 'px)';
			document.getElementById(this.props.buttonList[1].id + 'Button').style.marginLeft ='calc(20% - ' + this.W + 'px)';
			document.getElementById(this.props.buttonList[2].id + 'Button').style.marginLeft ='calc(20% - ' + this.W + 'px)';
			document.getElementById(this.props.buttonList[3].id + 'Button').style.marginLeft ='calc(20% - ' + this.W + 'px)';
  			break;


  		default:

  	}

  }


  render() { 



  	switch(this.buttonCount) { 

  		case 1: 
		  	return(
		  		<div className="ButtonBar">
			        <ButtonShift letter={this.props.buttonList[0].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[0].top} bottom={this.props.buttonList[0].bottom} streamInit={this.props.buttonList[0].streamInit} min={this.props.buttonList[0].min} max={this.props.buttonList[0].max} />
		  		</div>
		  	)
  			break;

  		case 2:
		  	return(
		  		<div className="ButtonBar">
			        <ButtonShift letter={this.props.buttonList[0].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[0].top} bottom={this.props.buttonList[0].bottom} streamInit={this.props.buttonList[0].streamInit}  />
			        <ButtonShift id={this.props.buttonList[0].id} letter={this.props.buttonList[1].letter} top={this.props.buttonList[1].top} bottom={this.props.buttonList[1].bottom} streamInit={this.props.buttonList[1].streamInit}  />
		  		</div>
		  	)
  			break;

  		case 3: 
		  	return(
		  		<div className="ButtonBar">
			        <ButtonShift letter={this.props.buttonList[0].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[0].top} bottom={this.props.buttonList[0].bottom} streamInit={this.props.buttonList[0].streamInit}  />
			        <ButtonShift letter={this.props.buttonList[1].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[1].top} bottom={this.props.buttonList[1].bottom} streamInit={this.props.buttonList[1].streamInit}  />
			        <ButtonShift letter={this.props.buttonList[2].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[2].top} bottom={this.props.buttonList[2].bottom} streamInit={this.props.buttonList[2].streamInit}  />
		  		</div>
		  	)
  			break;

  		case 4: 
		  	return(
		  		<div className="ButtonBar">
			        <ButtonShift letter={this.props.buttonList[0].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[0].top} bottom={this.props.buttonList[0].bottom} streamInit={this.props.buttonList[0].streamInit}  />
			        <ButtonShift letter={this.props.buttonList[1].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[1].top} bottom={this.props.buttonList[1].bottom} streamInit={this.props.buttonList[1].streamInit}  />
			        <ButtonShift letter={this.props.buttonList[2].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[2].top} bottom={this.props.buttonList[2].bottom} streamInit={this.props.buttonList[2].streamInit}  />
			        <ButtonShift  letter={this.props.buttonList[3].letter} id={this.props.buttonList[0].id} top={this.props.buttonList[3].top} bottom={this.props.buttonList[3].bottom} streamInit={this.props.buttonList[3].streamInit}  />

		  		</div>
		  	)
  			break;

  		default:
	}
 
  }
}


export default ButtonBar;
