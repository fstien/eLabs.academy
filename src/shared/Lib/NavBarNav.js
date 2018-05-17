import React from 'react';
import { Link } from 'react-router-dom';

import images from './icons.js';


export default class Navbar extends React.Component { 

	render() { 
		return(
	        <div id="NavBar">
	        	<div className="navDiv" id="logo"> 
	        		<Link to="/">
	        			<img id="logoImage" src="/media/eLabsLogo.png"/>
	        		</Link>
	        	</div>

	        	<div className="navDiv" id="back"> 

	        		{this.props.titleLink ? (

		        		<Link to={this.props.returnUrl} id="backLink">	
		        			<p id="backTextLink">	        				
		        				{this.props.leftArrow &&
		        					<img id="ReturnBackImg" src={images.back} />
		        				}

		        				{this.props.returnTitle}
		        			</p>
		        		</Link>

	        		) : (
	        			<p id="backText">	        				
	        				{this.props.returnTitle}
	        			</p>
	        		)}
	        	
	        	</div>

	        	<div className="navDiv" id="rightLink"> 

	    			<Link to={this.props.path}>	
	    				<p id="rightText">
	    					{this.props.rightText}
	    				</p>
	    			</Link>

	        	</div>
	        </div>
		)
	}


}