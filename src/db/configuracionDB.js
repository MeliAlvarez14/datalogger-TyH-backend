const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const token = 'tokensecreto';
const org = 'inti_lab';
const bucket = 'corrosion_data';
const url = 'http://localhost:8086'; 

const client = new InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket);

const persistirMedicion = (datos) => {
    if (datos.temp === undefined || datos.hum === undefined) {
        console.error("Datos incompletos recibidos del ESP32:", datos);
        return;
    }

    const punto = new Point('medicion_sensor')
        .tag('device', datos.id || 'esp32_desconocido')
        .floatField('temperatura', parseFloat(datos.temp)) 
        .floatField('humedad', parseFloat(datos.hum));  

    try {
        writeApi.writePoint(punto);
    } catch (e) {
        console.error('Error al escribir punto en Influx:', e);
    }
};

module.exports = persistirMedicion;