# Node.js-Scaling-Cloning


Scaling a Node.js application using the method of cloning. This means making a copies of the main process into many instances.  The amount of instances that can be created will equal to the number of cores within your processor. Load balancing is the distribution of computational power between the cores. Each core will be used a child process: fork. The cluster module provides properties and functions to implement this. Once the main process creates the forks (workers), they will take over. 
Scaling is very important in load balancing HTTP server. The more requests made to the server will require more computational power. We need the workers to deal with these requests.
