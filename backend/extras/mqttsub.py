# Código extraído de https://pypi.org/project/paho-mqtt/

import paho.mqtt.client as mqtt
import json
import psycopg2
import datetime

conexion_db = psycopg2.connect(host='db', database='e0_app_development', user='admin', password='admin')



def on_connect(client, userdata, flags, rc):
    print(f"Conectado: {str(rc)}")
    client.subscribe("global-emergencies")

def on_message(client, userdata, msg):
    msg = json.loads(msg.payload)
    print(str(msg))

    i = 0
    while i <= len(msg['message']):
        if msg['message'][len(msg['message'])-1-i] == "'" or msg['message'][len(msg['message'])-1-i] == '"':
            msg['message'] = msg['message'][0:len(msg['message'])-1-i] + msg['message'][len(msg['message'])-i:]
            continue
        i += 1

    i = 0
    while i <= len(msg['location']):
        if msg['location'][len(msg['location'])-1-i] == "'" or msg['location'][len(msg['location'])-1-i] == '"':
            msg['location'] = msg['location'][0:len(msg['location'])-1-i] + msg['location'][len(msg['location'])-i:]
            continue
        i += 1

    cur = conexion_db.cursor()
    try:
        cur.execute("SELECT MAX(id) FROM \"Events\"")
        consulta = cur.fetchone()
        id = int(consulta[0]) + 1
    except TypeError:
        id = 1
    
    cur.execute("INSERT INTO \"Events\" (id, event_type, lat, lon, location, message, level, \"createdAt\", \"updatedAt\") VALUES ({}, '{}', {}, {}, '{}', '{}', {}, '{}', '{}');".format(id, msg["type"], msg["lat"], msg["lon"], msg["location"], str(msg["message"]), msg["level"], datetime.datetime.now(), datetime.datetime.now()))
    conexion_db.commit()
    print("Datos guardados correctamente")
    cur.close()
    

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set("common", "iic2173")
client.connect("planetaryevents.iic2173.net", 9000, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
try:
    client.loop_forever()
except KeyboardInterrupt:
    print('Conexión interrumpida por teclado')
except Exception as e:
    print('Algo salió mal')
    print(e)
finally:
    conexion_db.close()