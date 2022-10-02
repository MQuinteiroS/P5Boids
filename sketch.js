let boids = [];
let qtree;
let check;
function setup() {
    createCanvas(1200, 800);
    qtree = new Quadtree(new Rectangle(width / 2, height / 2, width / 2, height/ 2));

    for (let i = 0; i < 100; i++){
        boids.push(new Boid(random(width),random(height)));
    }

    for (let boid of boids){
        qtree.insert(boid);
    }
    
}

function draw() {
    background(51);
    let count = 0;
    for (let boid of boids){
        let boidcheck = new Rectangle(boid.position.x, boid.position.y, 50, 50);
        let boidContains = [];
        boidContains = qtree.checkContains(boidcheck, boidContains);
        count++;
        if (count == boids.length){
            boidcheck.show();
            for (let _ of boidContains){
                if (_ != boid){
                    _.show('green');
                }
            }
            boid.update(boidContains, true);
            boid.show(209);
        }else{
            boid.update(boidContains, false);
            boid.show(209);
        }
    }
    
    qtree = new Quadtree(new Rectangle(width / 2, height / 2, width / 2, height/ 2));
    for (let boid of boids){
        qtree.insert(boid);
    }
    qtree.show();
    textSize(20);
    strokeWeight(1);
    text(frameRate().toFixed(2), 30, 30, 50, 50);
    text(boids.length, 30, 50, 50, 50);
}

function mouseDragged(){
    let boid = new Boid(mouseX, mouseY);
    boids.push(boid);
    qtree.insert(boid);
}
