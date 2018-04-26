
export default class Course { 
	constructor(params) { 
		this.title = params.title; 
		this.description = params.description; 
		this.path = params.path; 
		this.return = params.return;

		this.courseRoutes = [];
		this.infoRoutes = [];

		this.routeCount = 0;

		this.letters = [];
	}

	addCourseRoute(params) { 
		this.courseRoutes.push(params)
		this.routeCount++;
	}

	addInfoRoute(params) { 
		this.infoRoutes.push(params)

		if(typeof params.letter != 'undefined') {
			this.letters.push(params.letter);
		}
	}

	getCourseRoutes() { 
		return this.courseRoutes;
	}

	getAllRoutes() { 
		return( this.courseRoutes.concat(this.infoRoutes) );
	}

	getLetters() { 
		return( this.letters );
	}

}



