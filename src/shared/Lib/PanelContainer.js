import React from 'react';

import { Redirect } from 'react-router'

import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react'

import { Sidebar, Segment, Menu, Image, Icon, Header } from 'semantic-ui-react'

import {showSideBar, hideSideBar} from './sidebar.js';

import images from './icons.js';

import watch from 'redux-watch';
import {Helmet} from "react-helmet";


class PanelContainer extends React.Component { 

  constructor () {
    super();

    this.state = {
      visible: false,
      fireRedirect: false,
      navVisible: false,
    }
  }


  
  componentDidMount() { 

    let w = watch(store.getState, 'sideBar')
    
    store.subscribe(w((newVal, oldVal) => {
      this.setState({ 
        visible: newVal,
      })
    }))


    let w2 = watch(store.getState, 'redirect')
    
    store.subscribe(w2((newVal, oldVal) => {
      this.setState({ 
        fireRedirect: newVal,
      })
    }))

    
    let w3 = watch(store.getState, 'allMounted')
    
    store.subscribe(w3((newVal, oldVal) => {

      this.setState({ 
        navVisible: newVal,
      })
    }))
  
    if(typeof store != 'undefined') { 
      this.setState({ 
        navVisible: store.getState().allMounted,
      });
    }
  

  }


  render() { 

    const visible = this.state.visible;
    const fireRedirect = this.state.fireRedirect;
    
    let backInfoRoute; 

    if(typeof window === 'undefined') { 
      backInfoRoute = this.props.courseObj.path;
    }
    else { 
      backInfoRoute = store.getState().path;
    } 

    
    return(
      <div id="PanelContainer">

        {typeof this.props.pageNo === "number" &&
         <Helmet>
              <title>eLabs | {this.props.courseObj.title} | {this.props.courseObj.getCourseRoutes()[this.props.pageNo].title}</title>
          </Helmet>
        }

        {typeof this.props.pageNo === "undefined" &&
         <Helmet>
              <title>eLabs | {this.props.courseObj.title} | {this.props.title}</title>
          </Helmet>
        }

          <Sidebar
            id="SidebarMenu"
            as={Menu}
            animation='overlay'
            width='wide'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            inverted
          >

            <p id="sideBarDescription">{this.props.courseObj.description}</p>

            {this.props.courseObj.getCourseRoutes().map((route, i) => {
                
                if(i === this.props.pageNo) {
                  return (
                   <Menu.Item key={i} id="activeLink">
                    <Link onClick={hideSideBar} to={route.path}>
                      <p id="activeh3">{i+1}. {route.title}</p>
                    </Link>
                   </Menu.Item>
                  )        
                }
                else { 
                  return (
                   <Menu.Item key={i}>
                    <Link to={route.path}>
                      <p className="SideBarMenuItem">{i+1}. {route.title}</p>
                    </Link>
                   </Menu.Item>  
                  )
                }

              }

            )}

          </Sidebar>

          {typeof this.props.pageNo === "number" &&

           <div id="PanelView" className="box">

             <div id="header" className="row header">

               <p id="headerWords"> 
                  {this.props.courseObj.courseRoutes[this.props.pageNo].title} 
               </p>

               {this.state.navVisible &&
                <img id="pusherIcon" onClick={showSideBar} src={images.pusher} />
               }
               
             </div>

              <div id="ContentView" className="row content">
                 {this.props.children}
              </div>



              {this.state.navVisible &&              
                <div id="fadeoutBottom">
                </div>
              }


              {this.state.navVisible &&          

                <div id="navDiv" className="row footer">
                  <Sidebar.Pusher>

                    <div className="navElement navLeft">
                      
                      {this.props.pageNo > 0 &&
                        <Link to={this.props.courseObj.courseRoutes[this.props.pageNo -1].path}>
                          <Button className="navButton" id="backButton" >
                            <img className="buttImage buttImageBack" src={images.back}/>
                            Back
                          </Button>
                        </Link>
                      }

                    </div>
                    
                    <div className="navElement counter">
                      <p>{this.props.pageNo + 1}/{this.props.courseObj.routeCount}</p>
                    </div>

                    <div className="navElement navRight">
                      
                      {this.props.pageNo < (this.props.courseObj.routeCount -1) &&
                        <Link to={this.props.courseObj.courseRoutes[this.props.pageNo +1].path}>
                          <Button className="navButton" id="nextButton">
                            Next
                            <img className="buttImage buttImageForward" src={images.forward}/>
                          </Button>
                        </Link> 
                      }

                    </div>
                    
                  </Sidebar.Pusher>
                </div>

              }
              

            </div>
          }


          {typeof this.props.pageNo === "undefined" &&

           <div id="PanelView" className="box">

             <div id="header" className="row header">

               <p id="headerWords"> 
                {this.props.title}
               </p>


                <img id="pusherIcon" onClick={showSideBar} src={images.pusher} />
                    
             </div>


              <div id="ContentView" className="row content">
              
                 {this.props.children}
              </div>

              <div id="fadeoutBottom">
              </div>

              <div id="navDiv" className="row footer">
                <Sidebar.Pusher>

                  <div className="navElement navLeft">
                    
                    <Link className="navLeft" to={backInfoRoute}>

                      <Button className="navButton" id="backButton" >
                          <img className="buttImage buttImageBack" src={images.back}/>
                        Back
                      </Button>
                    </Link>
                  </div>
                  

                  <div className="navElement counter">
                  </div>
                  
                  <div className="navElement">

                  </div>
                  

                </Sidebar.Pusher>
              </div>
            


            </div>
          }


          {this.state.fireRedirect && (

            <Redirect to={this.props.courseObj.path + "/" + store.getState().redTarget}/>
          )}


      </div>
    )
  }
}


export default PanelContainer