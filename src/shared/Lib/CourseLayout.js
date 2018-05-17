'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Confirm } from 'semantic-ui-react';

import images from './icons.js';


export default class Layout extends React.Component {

  state = { open: false }

  componentDidMount() { 

    if(store.getState().browser === 'mobile') { 
      
      this.setState({ 
        open: true 
      })
    
      setTimeout(() => { 
       document.getElementById('mobileConfirm').children[2].children[0].style.display = 'none';
      }, 10)

    }

  }

  handleConfirm = () => this.setState({ open: false })

  render() { 

    return (
      <div id="ReactWrapper">

        <Confirm
          id="mobileConfirm"
          open={this.state.open}
          header='eLabs is best experienced with a mouse and keyboard.'
          content='Learning economics is best done on a desktop computer. Feel free to look around! When you are ready to dive in, consider visiting us on a desktop for the best learning experience.'
          confirmButton='Got it'
          onConfirm={this.handleConfirm}
          onCancel={this.handleConfirm}
        />



        <div id="NavBar">
          <div className="navDiv" id="logo"> 
            <a href="/">
              <img id="logoImage" src="/media/eLabsLogo.png"/>
            </a>
          </div>

          <div className="navDiv" id="back"> 

            <a href={this.props.returnUrl} id="backLink"> 
              <p id="backTextLink">                 
                <img id="ReturnBackImg" src={images.back} />
                {this.props.returnTitle}
              </p>
            </a>
          
          </div>

          <div className="navDiv" id="rightLink"> 

            <Link to={this.props.path + '/feedback'}>
              <p id="rightText">
                Feedback
              </p>
            </Link>
         

          </div>
        </div>



        <div id="Model">

        <Sidebar.Pushable as={Segment}>

          <div id="Applet">

            <div id="AppMain"> 
            </div>

            <div id="over">
              <img height="42" width="42" src="/media/rolling.gif" />
            </div>

          </div>

          <div id="Panel">
            {this.props.children}
          </div>

        </Sidebar.Pushable>

        </div>

      </div>
    )
  }

}



