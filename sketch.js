let boids = []

function setup() {
    createCanvas(800, 500);
    for (let i = 0; i < 150; i++){
        boids.push(new Boid());
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
