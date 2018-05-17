import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Header, Container, Segment, Image, Grid } from 'semantic-ui-react'

import {Helmet} from "react-helmet";


import NavBarBar from '../Lib/NavBarNav.js';

import Nav from './NavClass.js';

import SolowCourse from '../course/Solow/Solow.js'
import ISLMCourse from '../course/ISLM/ISLM.js'


import images from '../Lib/icons.js';


let nav = new Nav()



class ModelPreview extends React.Component { 


  render() {

    return(

      <div id="ModelPreview"> 

        <Helmet>
            <title>eLabs | Courses | Learn {this.props.course.title}</title>
        </Helmet>

        <NavBarBar titleLink={false} returnTitle={"Courses"} rightText={"About"}  path={"/About"} />


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

              <div className="linkDiv moreDiv"> 
                <p className="learnNavLink">More content coming soon!</p>
              </div>

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



class ISLM extends React.Component { 

  componentDidMount() { 
    mixpanel.track(ISLMCourse.return);
  }

 render() { 
  return(
    <ModelPreview  course={ISLMCourse} path={ISLMCourse.return} />
  )
 }

}

nav.addLearnRoute({
  path: ISLMCourse.return,
  title: ISLMCourse.title,
  component: ISLM,
})





class Land extends React.Component { 

  componentDidMount() { 
    mixpanel.track("/");
  }

 render() { 
  return(

    <div id="Land">

      <Helmet>
          <title>eLabs | Interactive Economics: the smart way to learn economics online</title>
      </Helmet>

      <NavBarBar titleLink={false} returnTitle={""} rightText={"About"}  path={"/About"} />

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
                  eLabs is the smart way to learn economics online. Interact with models and gain a deep understanding of how economies work. 
                </p>

                <div id="butDiv"> 
                  <Link to="/learn/solow">
                    <Button className="ExploreButton">
                      Explore Courses
                      <img className="buttImage buttImageForward" src={images.forward}/>
                    </Button>
                  </Link>
                </div>

              </div>

              <div id="paddingDiv2">
              </div>                

              <div id="landImageContainer">  
                <a href="/course/solow/The-Golden-Rule-Level-of-Capital">
                  <img src='/media/GoldenRule.gif' id="landImage" />
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
                        eLabs is free and open source. No sign-up, no spammy emails, no ads. So why not give it a try?
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

                <Link to="/learn/solow">
                  <Button className="ExploreButton">
                    Explore Courses
                    <img className="buttImage buttImageForward" src={images.forward}/>
                  </Button>
                </Link> 
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

        <NavBarBar titleLink={true} returnTitle={"Courses"} returnUrl={"/learn/solow"} leftArrow={true}  rightText={""}  path={"/About"} />

        <div id="AboutText">

          <Container text>
          
            <p>
              Hi there, I'm Francois Stiennon. I studied economics at Warwick and Cambridge. During my time as a student, I found reading textbooks to be inefficient and sometimes a bit dull. To keep things interesting, I started building tools to visualise and interact with the models. By being able to see how things work for myself, I was able to gain a much deeper intuition for the theory, which eventually allowed me to appreciate its beauty and relevance to the outside world. 
              
            </p>
            
            <p>
              I have since developed an interest in how to make the learning process more efficient through interactive software tools. This website is a way for me to experiment and explore my ideas for how to do this. I am a big believer in learning things online. I haven't received any formal training in computer science/programming. Besides economics, my interests include statistics and  machine learning. 
            </p>

            <p>
              Economics is often criticized as detached from the real world and too reliant on mathematical models and unreasonable assumptions. It is important to keep in mind that these models are not intended to be realistic descriptions of how the economy works. Instead, they can be seen as stories which contain ideas and intuitions which can be applied to analysing the economy. Hence the models themselves are not always very insightful, but it is worth the effort to undersand them as a first step. I’ve spent a lot of time trying to build up intuition for these models and I want to pass on that intuition to you. 
            </p>

            <p>
             eLabs is an open source software project, <a target="_blank" href="https://github.com/fstien/eLabs.academy">hosted here</a> on GitHub. If you would like to contribute, please get in touch. I hope you enjoy using eLabs as much as I enjoy building it! You can find eLabs on <a target="_blank" href="https://www.facebook.com/eLabs.academy/">facebook</a>. If you are looking for the old version of eLabs, <a target="_blank" href="/V1">click here</a>. You can email me at francois.stiennon[at]gmail.com. I am also on <a target="_blank" href="https://www.linkedin.com/in/francoisstiennon/">LinkedIn</a> and <a target="_blank" href="https://github.com/fstien">GitHub</a>. Finally, here is a picture of me punting:
            </p>
            
            <Image id="picOfMe" src='/media/IMG_2832.jpg' centered size='large'/>

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

