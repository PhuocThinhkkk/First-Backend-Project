import process from 'process';


process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});
  
process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});