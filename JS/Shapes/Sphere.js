//This file contains the class definition of a sphere object
//Constructors
function Sphere(a1,a2){
	this.type = "sphere";
	//Sphere from void
	if(arguments.length == 0){
		this.c = new Point3D();
		this.r = 1;
	}
	//Sphere from point and constant
	else if(arguments.length == 2){
		this.c = a1;
		this.r = a2;
	}
	//Sphere from sphere
	else if(arguments.length == 1){
		this.c = a1.c;
		this.r = a1.r;
	}
};

//-----------------------Prototypes--------------
//Object hierarchy
	Sphere.prototype = new GeometricObj;

//Clone current sphere
	Sphere.prototype.Clone = function(){
		return new Sphere(this);
	};

//Current sphere becomes sphere
	Sphere.prototype.Becomes = function(s){
		this.c = s.c;
		this.r = s.r;
		return this;
	};

//Check if current sphere is hit by ray r 
	Sphere.prototype.Hit = function(ray,tmin,sr){
		var t;
		var temp = ray.o - this.c;
		var a = ray.d*ray.d;
		var b = 2*temp*ray.d;
		var c = temp*temp - this.r - this.r;
		var disc = b*b -4*a*c;

		if(disc<0){
			return false;
		}
		else{
			var e = Math.sqrt(disc);
			var denom = 2*a;
			t = (-b-e)/denom;

			if(t>kEpsilon){
				tmin = t;
				sr.normal = (temp+t*ray.d)/this.r;
				sr.localHit = ray.o+t*ray.d;
				return true;
			}

			t = (-b+e)/denom;

			if(t>kEpsilon){
				tmin = t;
				sr.normal = (temp+t*ray.d)/this.r;
				sr.localHit = ray.o+t*ray.d;
				return true;
			}
		}
		return false;
	};

	//Set current sphere's center
	Sphere.prototype.Center = function(a1,a2,a3){
		if(arguments.length == 3){
			this.c = new Point3D(a1,a2,a3);
		}
		else if(arguments.length == 1){
			this.c = a1;
		}
	};

	//Set current sphere's color
	Sphere.prototype.Color = function(c){
		this.color = c;
	};

	//Set current sphere's radius
	Sphere.prototype.Radius = function(r){
		this.r = r;
	};