import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Header, Container, Segment, Image, Grid } from 'semantic-ui-react'

import {Helmet} from "react-helmet";


import NavBar from '../Lib/NavBar.js';

import Nav from './NavClass.js';

import SolowCourse from '../course/Solow/Solow.js'
import images from '../Lib/icons.js';


let nav = new Nav()



class ModelPreview extends React.Component { 


  render() {

    return(

      <div id="ModelPreview"> 

        <Helmet>
            <title>eLabs | Courses | Learn {this.props.course.title}</title>
        </Helmet>

        <NavBar logoPath="/" titleLink={false} returnTitle={"Courses"} routerLink={false} rightText={"About"}  path={"/About"} />


        <div className="wrapper">
            <div id="one">

              {nav.getLearnRoutes().map((route, i) => {

                  if(this.props.path === route.path) { 
                    return (
                      <div className="linkDiv ActiveDiv" key={i}> 
                        <Link to={route.path}>
                          <p className="learnNavLink activeText">{route.title}</p>
                        </Link>
                      </div>
                    )
                  }
                  else { 
                    return(
                      <div className="linkDiv" key={i}> 
                        <Link to={route.path}>
                          <p className="learnNavLink">{route.title}</p>
                        </Link>
                      </div>
                    )
                  }
                }
              )}

            </div>
            
            <div id="two">

              <p id="PreviewHeader">Learn {this.props.course.title}</p>
                    
              <p>{this.props.course.description}</p> 

              
              <div className="startButtonDiv">
                <a href={this.props.course.path}>
                  <Button className="startButton">
                    Start Learning
                    <img className="buttImage buttImageForward" src={images.forward}/>
                  </Button>
                </a>
              </div>
              
              {this.props.course.getCourseRoutes().map((route, i) =>  
                
                <a key={i} href={route.path}>
                  <div className="routeDiv">
                    {i+1}. {route.title}
                  </div>
                </a>

              )}
                

            </div>

        </div>


      </div>

    )
  }

}



class Solow extends React.Component { 

  componentDidMount() { 
    mixpanel.track(SolowCourse.return);
  }

 render() { 
  return(
    <ModelPreview  course={SolowCourse} path={SolowCourse.return} />
  )
 }

}

nav.addLearnRoute({
  path: SolowCourse.return,
  title: SolowCourse.title,

  component: Solow,
})



class Land extends React.Component { 

  componentDidMount() { 
    mixpanel.track("/");
  }

 render() { 
  return(

    <div id="Land">

      <Helmet>
          <title>eLabs | Interactive Economics: the best way to learn economics online</title>
      </Helmet>


      <NavBar logoPath="/" titleLink={false} returnTitle={""}  routerLink={false} rightText={"About"}  path={"/About"} />

      <div id="landingDivWrapper">

         <div id="landingSlide">

          <div id="landingDiv1">
     
            <Container id="landContainer1">

              <div id="paddingDiv">
              </div>

              <div id="shiftDiv">
                <p id="landingTitle">
                  Interactive Economics
                </p>
                <p id="landingDescription">
                  eLabs is the best way to learn economics online. Interact with models and gain a deep understanding of how economies work. 
                </p>

                <div id="butDiv"> 
                  <a href="/learn/solow">
                    <Button className="ExploreButton">
                      Explore Courses
                      <img className="buttImage buttImageForward" src={images.forward}/>
                    </Button>
                  </a>
                </div>

              </div>

              <div id="paddingDiv2">
              </div>                

              <div id="landImageContainer">  
                <a href="/course/solow/The-Golden-Rule-Level-of-Capital">
                  <img src='/GoldenRule.gif' id="landImage" />
                </a>
              </div> 

            </Container>

          </div>

          <div id="landingDiv2">
     
            <Container id="landContainer2">

              <Segment id="argumentSegment" style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                  <Grid.Row textAlign='left'>
                    <Grid.Column className="colLanding">
                      <p className="colTitle">1. Interactive</p>
                      <p className="colTitleText">
                        Bring economics to life by taking control of the economy. Find out what happens when you set the saving rate to 0.
                        </p>
                    </Grid.Column>
                    <Grid.Column className="colLanding">
                      <p className="colTitle">2. Fun</p>
                      <p className="colTitleText">
                        Be engaged in your learning through immediate feedback. Experience the sudden and unexpected joy of understanding. 
                      </p>
                    </Grid.Column>

                    <Grid.Column className="colLanding">
                      <p className="colTitle">3. Free</p>
                      <p className="colTitleText">
                        eLabs is free and open source. Why not give it a try?
                      </p>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Segment>

              <div id="div2CallToAction">
                <div id="paddingDiv3">
                </div>  

                <p id="readyText">
                  Ready to start learning? 
                </p>

                <a href="/learn/solow">
                  <Button className="ExploreButton">
                    Explore Courses
                    <img className="buttImage buttImageForward" src={images.forward}/>
                  </Button>
                </a> 
              </div>
          
            </Container>

          </div>

        </div>

      </div>

    </div>

  )
 }

}

nav.addOtherRoute({
  path: '/',
  exact: true,
  component: Land,
})




class About extends React.Component { 

  componentDidMount() { 
    mixpanel.track("/About");
  }

 render() { 
  return(
      <div id="About"> 

        <Helmet>
            <title>eLabs | About</title>
        </Helmet>

        <NavBar logoPath="/" titleLink={true} returnTitle={"Courses"} returnUrl={"/learn/solow"} leftArrow={true}  routerLink={false} rightText={""}  path={"/About"} />

        <div id="AboutText">

          <Container text>

            <p>
              Hi there, I'm Francois Stiennon. I studied economics at Warwick and Cambridge. During my time as a student, I found reading textbooks to be inefficient and sometimes a bit dull. To keep things interesting, I started building tools to visualise and interact with the models. By being able to see how things work for myself, I was able to gain a much deeper intuition for the theory, which eventually allowed me to appreciate its beauty and relevance to the outside world. Much like the love of reading, I have found that economics is an aquired taste. 

            </p>

            <p>
              I have since developed an interest in how to make the learning process more efficient through interactive software tools. This website is a way for me to experiment and explore my ideas for how to do this. I am a big believer in self-learning online. In fact, I've never received any formal training in computer science/programming. In the spirit of the internet, eLabs is an open source software project, hosted here on Github. If you would like to contribute, please get in touch. 
            </p>

            <p>
                I hope you enjoy using eLabs as much as I enjoyed building it! You can also find eLabs on <a target="_blank" href="https://www.facebook.com/eLabs.academy/">facebook</a>. You can get in touch at francois.stiennon[at]gmail.com or through my <a target="_blank" href="https://www.linkedin.com/in/francoisstiennon/">LinkedIn profile</a>. Finally, here is a picture of me punting:
             </p>
          
             <Image id="picOfMe" src='/IMG_2832.jpg' centered size='large'/>

           </Container>
        </div>


      </div>
  )
 }

}

nav.addOtherRoute({
  path: '/About',
  component: About,
})




export default nav; 

