const calculo_indice = (job, done) => {
    try {
        console.log(job.data);
        done(null, job.data);
    } catch (error) {
        done(error);
    }
};

module.exports = calculo_indice;