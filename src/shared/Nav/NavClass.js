
export default class Nav { 
	constructor() { 
		this.learnRoutes = [];
		this.otherRoutes = [];

		this.routeCount = 0;
	}

	addLearnRoute(params) { 
		this.learnRoutes.push(params)
		this.routeCount++;
	}

	addOtherRoute(params) { 
		this.otherRoutes.push(params)
	}

	getLearnRoutes() { 
		return this.learnRoutes;
	}

	getAllRoutes() { 
		return( this.learnRoutes.concat(this.otherRoutes) );
	}

}



