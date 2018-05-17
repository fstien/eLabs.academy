import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Layout from "../../Lib/CourseLayout";

import course from "./ISLM.js";


class NotFound extends React.Component {
	render() { 
		return(
				<div>
					<br />
					Error: page not found. <br />
					<Link to={course.courseRoutes[0].path}>Click here</Link> to start the course. 
				</div>
			)
	}
}

class ISLMApp extends React.Component { 

 render() { 

  return (
    <Switch>
      <Layout returnTitle={course.title} path={course.path} returnUrl={course.return}>
      	{course.getAllRoutes().map((route, i) => <Route key={i} {...route} />)}
	     <Route key={course.getAllRoutes().lenght} path="*" component={NotFound} />
      </Layout>
    </Switch>
  );

 }

}


export default ISLMApp;
