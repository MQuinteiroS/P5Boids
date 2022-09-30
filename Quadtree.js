class Rectangle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    containsPoint(point){
        return (point.position.x <= this.x + this.w && 
            point.position.x >= this.x - this.w &&
            point.position.y <= this.y + this.h &&
            point.position.y >= this.y - this.h);
    }

    containsRect(rectgl){
        return !(rectgl.x - rectgl.w > this.x + this.w ||
            rectgl.x + rectgl.w < this.x - this.w ||
            rectgl.y - rectgl.h > this.y + this.h ||
            rectgl.y + rectgl.h < this.y - this.h);
    }

    fullyContainsRect(rectgl){
        return (rectgl.x - rectgl.w < this.x - this.w &&
            rectgl.x + rectgl.w > this.x + this.w &&
            rectgl.y + rectgl.h > this.y + this.h &&
            rectgl.y - rectgl.h < this.y - this.h);
    }

    show(){
        stroke(0, 200, 0);
        strokeWeight(3);
        rectMode(CENTER);
        noFill();
        rect(this.x, this.y, this.w * 2,this.h * 2);
    }
}

class Quadtree{
    constructor(boundary){
        this.boundary = boundary;
        this.capacity = 5;
        this.points = [];
        this.divided = false;
    }
    

    divide(){
        this.tr = new Quadtree(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2));
        this.tl = new Quadtree(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2));
        this.br = new Quadtree(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2));
        this.bl = new Quadtree(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2));
    }

    insert(point){
        if(this.points.length < this.capacity){
            this.points.push(point);
        }else{
            if(!this.divided){
                this.divide();
                this.divided = true;
            }
            if(this.tr.boundary.containsPoint(point)){
                this.tr.insert(point);
            }else if(this.tl.boundary.containsPoint(point)){
                this.tl.insert(point);
            }else if(this.br.boundary.containsPoint(point)){
                this.br.insert(point);
            }else if(this.bl.boundary.containsPoint(point)){
                this.bl.insert(point);
            }
        }
    }

    checkContains(rectgl, list){
        if(!this.boundary.containsRect(rectgl)){
            return;
        }else{
            if (this.boundary.fullyContainsRect(rectgl)){
                list.push(...this.points);
            }else{
                for(let point of this.points){
                    if(rectgl.containsPoint(point)){
                        list.push(point);
                    }
                }
            }
            if(this.divided){
                this.tr.checkContains(rectgl, list);
                this.tl.checkContains(rectgl, list);
                this.br.checkContains(rectgl, list);
                this.bl.checkContains(rectgl, list);
            }
            return list;
        }
    }

    show(){
        stroke(255);
        strokeWeight(2);
        rectMode(CENTER);
        noFill();
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if(this.divided){
            this.tr.show();
            this.tl.show();
            this.br.show();
            this.bl.show();
        }
    }
}