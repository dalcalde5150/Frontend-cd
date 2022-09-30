const calculo_indice = (job, done) => {
    try {
        const { id, lat, lon, eventos } = job.data;
        let dist_lvl = Object.entries(eventos).map(evento => { 
            let dist = getDist(lat, lon, evento[1]['lat'], evento[1]['lon']);
            if (dist <= 3) {
                return dist*evento[1]['level'];
            } else {
                return 0;
            }
        });
        let suma = dist_lvl.reduce((x, y) => x + y, 0);
        done(null, suma/100);
    } catch (error) {
        done(error);
    }
};


/* código extraído de 
https://reviblog.net/2016/01/08/javascript-obtener-la-distancia-distancia-en-kilometros-entre-dos-puntos-dadas-por-su-latitud-y-longitud/ */
getDist = (lat1, lon1, lat2, lon2) => {
    rad = (x) => x * Math.PI / 180;
    let R = 6378.137; //Radio de la tierra en km
    let dLat = rad(lat2 - lat1);
    let dLong = rad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d * 1000;
}

module.exports = calculo_indice;