import express, { response } from "express";
import { connectDB } from "./config/db.config.js";
import { ENVIRONMENT } from "./config/environment.js";
import usersRouter from "./routes/users.router.js";
import transporter from "./config/mail.config.js";
import cors from "cors";
import authorizationMiddleware from "./middlewares/auth.middleware.js";
import workspace_router from "./routes/workspace.router.js";
import memberWorkspaceRouter from "./routes/membersWorkspace.router.js";
import channel from "./models/Channel.model.js";
import channelRouter from "./routes/channels.routes.js";
import messageRouter from "./routes/messages.router.js";

const app = express();

app.use(cors());

app.get("/ping", (request, response) => {
  response.send("<h1>Server is runing</h1>");
});



// app.get("/private-info", authorizationMiddleware, (request, response) => {
//   try {
//     response.send(
//       "Clave super importante que solo un USUARIO DEBERIA PODER ACCCEDER"
//     );
//   } catch (error) {
//     response.status(500).send({
//       ok: false,
//       message: "Error interno del servidor",
//       status: 500,
//     });
//   }
// });

app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("Hola, soy una respuesta de express");
// });

app.use("/api/users", usersRouter);
app.use("/api/workspaces", workspace_router);
app.use("/api/members", memberWorkspaceRouter);
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);

connectDB();

// let baseDatosRota = true;
// app.post("/depositos", (request, response) => {
//   console.log("Me llego esta consulta: ", request.body);
//   if (baseDatosRota) {
//     response.status(500).send("La base de datos exploto");
//   }
//   response.status(201).send("Listo, no te la devuelvo mas!");
// });

app.listen(ENVIRONMENT.PORT, () => {
  console.log(
    `La aplicacion se esta escuchando en el puerto http://localhost:${ENVIRONMENT.PORT}`
  );
});

const enviarMailTest = async () => {
  const result = await transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: ENVIRONMENT.GMAIL_USERNAME,
    subject: "Test de nodemailer",
    html: "<h1>Hola desde node.js tercera prueba </h1>",
  });
  console.log("Email enviado", result);
};
