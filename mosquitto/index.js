/*
influxdb:
    image: influxdb:latest
    container_name: influx_db_datalogger
    ports:
      - "8086:8086" # Puerto para la API y la interfaz web
    env_file:
      - .env # Aquí guardaremos las contraseñas
    volumes:
      - ./influxdb/data:/var/lib/influxdb2
    restart: always
*/