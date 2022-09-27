class Boid{
    constructor(){
        this.position = createVector(random(0, width), random(0, height));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.maxForce = 0.1;
        this.maxSpeed = 5;
    }

    update(boids){
        this.acceleration = createVector();
        let sep = this.separate(boids);
        let ali = this.align(boids);
        let coh = this.cohesion(boids);
        sep.mult(1.0);
        ali.mult(1.0);
        coh.mult(1.0);
    
        this.acceleration.add(sep);
        this.acceleration.add(ali);
        this.acceleration.add(coh);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    show(){
        if(this.position.x > width){
            this.position.x = 0;
        }
        else if(this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.y > height){
            this.position.y = 0;
        }
        else if(this.position.y < 0){
            this.position.y = height;
        }
        let cornerSides = createVector(5, 5);
        let frontSide = createVector(10, 10);
        // strokeWeight(10);
        let corner1 = p5.Vector.add(this.position, cornerSides);
        let corner2 = p5.Vector.sub(this.position, cornerSides);
        let front = p5.Vector.add(this.position, frontSide);
        stroke(255);
        triangle(corner1.x, corner1.y, corner2.x, corner2.y, front.x, front.y)
        // point(this.position.x, this.position.y);
    }

    separate(flock){
        let visibility = 50;
        let separate = createVector();
        let quantity = 0;
        for (let other of flock){
            if(other != this){
                let distance = dist(
                    this.position.x,
                    this.position.y,
                    other.position.x,
                    other.position.y
                )
                if (distance <= visibility){
                    let diff = p5.Vector.sub(this.position, other.position);
                    diff.normalize();
                    diff.div(distance);
                    separate.add(diff)
                    quantity++;
                }
            }
        }
        if (quantity > 0){
            separate.div(quantity);
            separate.normalize();
            separate.mult(this.maxSpeed);
            separate.sub(this.velocity);
            separate.limit(this.maxForce);
        }
        return separate;
    }

    align(flock){
        let visibility = 100;
        let align = createVector();
        let quantity = 0;
        for (let other of flock){
            if(other != this){
                let distance = dist(
                    this.position.x,
                    this.position.y,
                    other.position.x,
                    other.position.y
                )
                if (distance <= visibility){
                    align.add(other.velocity)
                    quantity++;
                }
            }
        }
        if (quantity > 0){
            align.div(quantity);
            align.normalize();
            align.mult(this.maxSpeed);
            align.sub(this.velocity);
            align.limit(this.maxForce);
        }
        return align;
    }

    cohesion(flock){
        let visibility = 60;
        let cohesion = createVector();
        let quantity = 0;
        for (let other of flock){
            if(other != this){
                let distance = dist(
                    this.position.x,
                    this.position.y,
                    other.position.x,
                    other.position.y
                )
                if (distance <= visibility){
                    cohesion.add(other.position)
                    quantity++;
                }
            }
        }
        if (quantity > 0){
            cohesion.div(quantity);
            cohesion.sub(this.position);
            cohesion.normalize();
            cohesion.mult(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);
        }
        return cohesion;
    }
}