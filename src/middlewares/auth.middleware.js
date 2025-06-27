import { ENVIRONMENT } from "../config/environment.js"
import jwt from "jsonwebtoken"

// Middleware
// ¿Qué es un middleware? Ya los hemos usado antes, por ejemplo cuando escribimos: app.use(express.json())
// Un middleware es una función que se ejecuta entre la solicitud (request) y la respuesta (response).
// Entre la solicitud y la respuesta, puedo querer hacer varias cosas, por ejemplo:
// - Verificar si la solicitud tiene contenido JSON y, de ser así, guardar ese JSON en req.body.
// - Imprimir un "Hola Mundo" en la consola.
// - Verificar si un token enviado por los headers es válido.

const authorizationMiddleware = (request, response, next) => {
    try {
        const authorization_header = request.headers['authorization']
        const authorization_type = authorization_header.split(' ')[0]
        const authorization_token = authorization_header.split(' ')[1]
        const authorization_token_payload = jwt.verify(authorization_token, ENVIRONMENT.JWT_SECRET_KEY)
        //Se suelen guardar los datos de sesion dentro de request.user o 
        request.user = authorization_token_payload
        // console.log(authorization_token_payload);
        next()
    } 
    catch (error) {
        if(error instanceof jwt.JsonWebTokenError) {
            response.status(401).send({
                ok: false,
                message: "Token invalido",
                status: 401
            })
        }
        else{
            response.status(500).send(
                {
                    ok:false,
                    message: "Error interno del servidor",
                    status: 500
                }
            )
        }
    }
}
export default authorizationMiddleware