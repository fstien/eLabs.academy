import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import nav from "./NavRoutes.js";

import NavBarNav from '../Lib/NavBarNav.js';

import NavLayout from './NavLayout.js';


class NotFound extends React.Component {
	render() { 
		return(
				<div>
			        <NavBarNav logoPath="/" titleLink={true} returnUrl={"/learn/solow"} leftArrow={true} returnTitle={"Courses"} rightText={"About"}  path={"/About"} />

			        <div className="errorMessage">
						<br />
						Error: page not found. <br />
						<Link to={"/learn/solow"}>Click here</Link> to select a course. 
					</div>
				</div>
			)
	}
}



const LearnApp = () => {
  return (
        <Switch>
			<NavLayout>

				{nav.getAllRoutes().map((route, i) => <Route key={i} {...route} />)}

				<Route key={nav.getAllRoutes().lenght} path="*" component={NotFound} />

			</NavLayout>
        </Switch>
  );
};

export default LearnApp;
