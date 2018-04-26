import React from 'react';
import { Link } from 'react-router-dom';

import images from './icons.js';


export default class Navbar extends React.Component { 

	render() { 
		return(
	        <div id="NavBar">
	        	<div className="navDiv" id="logo"> 
	        		<a href={this.props.logoPath}>
	        			<img id="logoImage" src="/media/eLabsLogo.png"/>
	        		</a>
	        	</div>

	        	<div className="navDiv" id="back"> 

	        		{this.props.titleLink ? (

		        		<a href={this.props.returnUrl} id="backLink">	
		        			<p id="backText">	        				
		        				{this.props.leftArrow &&
		        					<img id="ReturnBackImg" src={images.back} />
		        				}

		        				{this.props.returnTitle}
		        			</p>
		        		</a>

	        		) : (
	        			<p id="backText">	        				
	        				{this.props.returnTitle}
	        			</p>
	        		)}


	        	
	        	</div>

	        	<div className="navDiv" id="rightLink"> 

	        		{this.props.routerLink ? (
	        			<Link to={this.props.path}>
	        				<p id="rightText">
		        				{this.props.rightText}
	        				</p>
	        			</Link>
	        		) : (
	        			<a href={this.props.path}>	
	        				<p id="rightText">
	        					{this.props.rightText}
	        				</p>
	        			</a>
	        		)}

	        	</div>
	        </div>
		)
	}


}