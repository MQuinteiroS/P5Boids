# Flocking Simulation With Quadtree Optimization

Flocking simulation created utilizing [Craig Raynolds Model](https://www.red3d.com/cwr/boids/), with help and inspiration from the book 
[The Nature of Code by Daniel Shiffman](https://natureofcode.com/book/chapter-6-autonomous-agents/). 

Considering performance issues with checking every Boid with eachother, which had a $O(n²)$, the [Quadtree](https://en.wikipedia.org/wiki/Quadtree) optimization was applied
bringing the O down to $O(n \times log(n))$

[2022-10-02-11-19-00.webm](https://user-images.githubusercontent.com/87816562/193459099-2537de08-5fea-411f-95ee-0108d931bc1d.webm)

The green box shows what the boid can see, and every green boid is the one it interacts with.
