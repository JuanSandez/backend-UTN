# 📝 Tarea Backend

## GET /api/workspace/:workspace_id/channels/

**¿Qué hace?**  
Debe obtener todos los canales del cliente que consultó.

**Errores posibles:**  
- Workspace no encontrado  
- Usuario no autorizado  

**Ejemplo de respuesta:**
```json
{
  "message": "Canales obtenidos",
  "ok": true,
  "status": 200,
  "data": {
    "channels": [ ... ]
  }
}
POST /api/workspace/:workspace_id/channels/
¿Qué hace?
Crear un canal.

Body:

json
Copiar
Editar
{
  "name": "Canal de estudio"
}
Validaciones:

name debe ser un string.

Debe tener menos de 12 caracteres.

No puede ser un canal ya existente en ese workspace.

💡 Idea para saber si un canal se repite:

js
Copiar
Editar
Channel.find({ name: "Canal de estudio", workspace_id: 1 })
Si el resultado es una lista con más de 0 elementos, entonces el canal ya existe.

En caso de error:

Responder con status: 400 y mensaje descriptivo.

Ejemplo de respuesta exitosa:

json
Copiar
Editar
{
  "message": "Canal Creado",
  "ok": true,
  "status": 201,
  "data": {
    "channels": [ ... ]
  }
}
(Opcional) DELETE /api/workspace/:workspace_id/channels/:channel_id
¿Qué hace?
Elimina un canal.

Validaciones:

Chequear que el canal exista. Si no existe: status: 404

Recomendado: Solo miembro o dueño con rol distinto de "user" o "member" pueden hacer esta operación. Si no tiene permiso: status: 403

Frontend
(pendiente)
