let boids = []

function setup() {
    createCanvas(800, 500);
    for (let i = 0; i < 50; i++){
        boids.push(new Boid(width/2,height/2));
    }
}

function draw() {
    background(51);
    oldBoids = [...boids]
    for (let boid of boids){
        boid.update(oldBoids);
        boid.show();
    }
}

function mouseDragged(){
    boids.push(new Boid(mouseX, mouseY));
}
