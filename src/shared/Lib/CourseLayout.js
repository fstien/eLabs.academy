'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { Confirm } from 'semantic-ui-react';

import NavBar from './NavBar.js';


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

        <NavBar logoPath="/" titleLink={true} returnUrl={this.props.returnUrl} returnTitle={this.props.returnTitle} leftArrow={true} routerLink={true} rightText={"Feedback"}  path={this.props.path + "/feedback"} />

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



