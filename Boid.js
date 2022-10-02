class Boid{
    constructor(constwidth, constheight){
        this.position = createVector(constwidth, constheight);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.maxForce = 0.1;
        this.maxSpeed = 4;
    }

    update(boids, test){
        this.acceleration = createVector();
        if (boids.length > 0){
            let forces = this.separate(boids, test);
            // let sep = this.separate(boids);
            // let ali = this.align(boids);
            // let coh = this.cohesion(boids);
            let sep = forces[0];
            let ali = forces[1];
            let coh = forces[2];
            sep.mult(1.07);
            ali.mult(1.25);
            coh.mult(0.95);
        
            this.acceleration.add(sep);
            this.acceleration.add(ali);
            this.acceleration.add(coh);
        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    show(color){
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
        let direction = p5.Vector.normalize(this.velocity);
        let cornerLeft = p5.Vector.rotate(direction, PI * 3/ 2);
        let cornerRight = p5.Vector.rotate(direction, - PI * 3/ 2);
        direction.mult(6);
        direction.add(this.position);
        cornerRight.mult(2);
        cornerRight.add(this.position);
        cornerLeft.mult(2);
        cornerLeft.add(this.position);
        
        strokeWeight(3);
        stroke(color);
        fill(195, 195, 195, 63);
        triangle(cornerLeft.x, cornerLeft.y, cornerRight.x, cornerRight.y, direction.x, direction.y);
    }

    separate(flock, test){
        let vision = 60;
        let separate = createVector();
        let align = createVector();
        let cohesion = createVector();
        let quantitysep = 0;
        if (test){
            // console.log(flock.length);
        }
        for (let other of flock){
            if(other != this){
                let distance = dist(
                    this.position.x,
                    this.position.y,
                    other.position.x,
                    other.position.y
                );
                // if (distance < vision){
                    cohesion.add(other.position);
                    align.add(other.velocity);
                    let diff = p5.Vector.sub(this.position, other.position);
                    diff.normalize();
                    distance = (distance == 0) ? 0.00001  : distance;
                    diff.div(distance * 5);
                    separate.add(diff);
                    quantitysep++;
                // }
            }
        }
        if (quantitysep > 0){
            separate.div(quantitysep);
            separate.normalize();
            separate.mult(this.maxSpeed);
            separate.sub(this.velocity);
            separate.limit(this.maxForce);
            align.div(quantitysep);
            align.normalize();
            align.mult(this.maxSpeed);
            align.sub(this.velocity);
            align.limit(this.maxForce);
            cohesion.div(quantitysep);
            cohesion.sub(this.position);
            cohesion.normalize();
            cohesion.mult(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);
        }
        return [separate, align, cohesion];
    }

    align(flock){
        let align = createVector();
        let quantityalg = 0;
        for (let other of flock){
            if(other != this){
                align.add(other.velocity);
                quantityalg++;
            }
        }
        if (quantityalg > 0){
            align.div(quantityalg);
            align.normalize();
            align.mult(this.maxSpeed);
            align.sub(this.velocity);
            align.limit(this.maxForce);
        }
        return align;
    }

    cohesion(flock){
        let cohesion = createVector();
        let quantitych = 0;
        for (let other of flock){
            if(other != this){
                cohesion.add(other.position);
                quantitych++;
            }
        }
        if (quantitych > 0){
            cohesion.div(quantitych);
            cohesion.sub(this.position);
            cohesion.normalize();
            cohesion.mult(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);
        }
        return cohesion;
    }
}