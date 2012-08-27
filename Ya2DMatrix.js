var Ya2DMatrix=function(o){
	this.matrix = [1,0,0,1,0,0];
	this.translate = {x:0,y:0};
	this.scale  ={x:1,y:1};
	this.rotate = 0;
	this.skew = {x:0,y:0};
	var pn = Math.pow(10,15);
	this.angle  = {
		sin:function(x){
			return Math.round(Math.sin(x*Math.PI/180)*pn)/pn;
		},
		cos:function(x){
			return Math.round(Math.cos(x*Math.PI/180)*pn)/pn;
		},
		tan:function(x){
			return Math.round(Math.tan(x*Math.PI/180)*pn)/pn;
		}
	}
	o&&this.toMatrix(o);
};
Ya2DMatrix.prototype={
	multiply:function(){
		var s =arguments,
			len = s.length;
		if (len<2){
			return s[0];
		}
		var m = function(a,b){
			return [
				a[0]*b[0]+a[2]*b[1],
				a[1]*b[0]+a[3]*b[1],
				a[0]*b[2]+a[2]*b[3],
				a[1]*b[2]+a[3]*b[3],
				a[0]*b[4]+a[2]*b[5]+a[4],
				a[1]*b[4]+a[3]*b[5]+a[5]
			];
		}
		var temp = m(s[0],s[1]);
			
		for (var i=2;i<len;i++){
			temp = m(temp,s[i]);
		}
		return temp;
	},
	toMatrix:function(o){
		var translate = o.translate||{x:0,y:0},
			   scale = o.scale||{x:1,y:1},
			   rotate = o.rotate||0,
			   skew = o.skew||{x:0,y:0};
		var sin = this.angle.sin,
			cos = this.angle.cos,
			tan = this.angle.tan;		
		var translateM = [1,0,0,1,translate.x,translate.y],
			scaleM = [scale.x,0,0,scale.y,0,0],
			rotateM = [cos(rotate),sin(rotate),-sin(rotate),cos(rotate),0,0],
			skewxM = [1,0,tan(skew.x),1,0,0],
			skewyM = [1,tan(skew.y),0,1,0,0];
		return this.multiply(translateM,scaleM,rotateM,skewxM,skewyM);
	},
	setTranslate : function(translate){
		this.translate = translate;
		this.matrix = this.toMatrix({translate:this.translate,scale:this.scale,rotate:this.rotate,skew:this.skew});
	},
	setScale:function(scale){
		this.scale = scale;
		this.matrix = this.toMatrix({translate:this.translate,scale:this.scale,rotate:this.rotate,skew:this.skew});
	},
	setRotate:function(rotate){
		this.rotate = rotate;
		this.matrix = this.toMatrix({translate:this.translate,scale:this.scale,rotate:this.rotate,skew:this.skew});
	},
	setSkew:function(skew){
		this.skew = skew;
		this.matrix = this.toMatrix({translate:this.translate,scale:this.scale,rotate:this.rotate,skew:this.skew});
	},
	getMatrix:function(){
		return this.matrix;
	}
};