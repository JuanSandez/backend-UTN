## MessagesChannel

ACLARACION:
Es recomendable que hagan un middleware que se llame channelMiddleware que chequee:

- Que el channel exista
- Que guarde el canal buscado en request.channel


GET `/api/messages/:workspace_id/:channel_id`

Obtiene todos los mensajes pertenecientes al channel resultado

Ejemplo de respuesta:
```json
{
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            //Aqui vendra la lista de mensajes
        ]
    }
}
----------------------------------------------------
POST `/api/messages/:channel_id/`

Envia un nuevo mensaje al channel consultado.
EJ de body:
{
    "message": "Mensaje de prueba"
}



Ejemplo de respuesta:

{
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            //Aqui vendra la lista de mensajes
        ]
    }
}