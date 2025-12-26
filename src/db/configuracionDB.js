const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const token = 'tokensecreto';
const org = 'inti_lab';
const bucket = 'laboratorios_data';
const url = 'http://localhost:8086'; 

const client = new InfluxDB({ url, token });
const writeOptions = { batchSize: 1, flushInterval: 1000 };
const writeApi = client.getWriteApi(org, bucket, "s", writeOptions);
const queryApi = client.getQueryApi(org);

const persistirMedicion = (datos) => {
    if (datos.temp === undefined || datos.hum === undefined) {
        console.error("Datos incompletos recibidos del ESP32:", datos);
        return;
    }

    const fecha = new Date(datos.time);

    const punto = new Point('medicion_sensor')
        .tag('id', datos.id || 'esp32_desconocido')
        .tag('lab', datos.lab || 'N/A')
        .floatField('temperatura', parseFloat(datos.temp)) 
        .floatField('humedad', parseFloat(datos.hum))
        .timestamp(fecha);  

    try {
        writeApi.writePoint(punto);
    } catch (e) {
        console.error('Error al escribir punto en Influx:', e);
    }
};

const obtenerHistorial = async (deviceId, rango) => {
    const timeMapping = {
        '24h': '-24h',
        '7d': '-7d',
        '30d': '-30d'
    };
    const start = timeMapping[rango] || '-7d';

    const query = `
        from(bucket: "${bucket}")
        |> range(start: ${start})
        |> filter(fn: (r) => r["_measurement"] == "medicion_sensor")
        |> filter(fn: (r) => r["id"] == "${deviceId}")
        |> aggregateWindow(every: 1m, fn: mean, createEmpty: false)
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    `;

    const results = [];
    return new Promise((resolve, reject) => {
        queryApi.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                results.push({
                    hora: o._time, 
                    temp: o.temperatura,
                    hum: o.humedad
                });
            },
            error(e) { reject(e); },
            complete() { resolve(results); },
        });
    });
};

module.exports = {persistirMedicion, obtenerHistorial};