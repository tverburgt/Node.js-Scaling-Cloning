const cluster = require('cluster');
const os = require('os');

// **** Mock DB Call
//Here we demonstrate each fork does not need to open a new connection
//to the DB. The main process can open the connection and communication with
//the workers.
const numberOfUsersInDB = function() {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
}
// ****

if (cluster.isMaster) { //Once the main process is forked the isMaster = false.
  const cpus = os.cpus().length;  //Returns the number of cores.

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i<cpus; i++) cluster.fork(); //Forks are created.

  const updateWorkers = () => {   //Part of the mock DB Call
    const usersCount = numberOfUsersInDB();
    //list of worker objects.
    Object.values(cluster.workers).forEach(worker => {  //We simply used Object.values to get an array of all workers
      worker.send({ usersCount });
      //worker.send(`Hello from Worker ${worker.id}`);
    });
  };

  updateWorkers();
  setInterval(updateWorkers, 10000);

}
//The program runs in worker mode. the isMaster is set false once
//all the forks have been created.
else {
  require('./server');
}
