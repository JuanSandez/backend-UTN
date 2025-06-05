import express, { response } from "express";
import { connectDB } from "./config/db.config.js";
import { ENVIRONMENT } from "./config/environment.js";
import usersRouter from "./routes/users.router.js";
import transporter from "./config/mail.config.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/ping", (request, response) => {
  response.send("<h1>Server is runing</h1>");
});

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hola, soy una respuesta de express");
});

app.use("/api/users", usersRouter);

connectDB();

let baseDatosRota = true;
app.post("/depositos", (request, response) => {
  console.log("Me llego esta consulta: ", request.body);
  if (baseDatosRota) {
    response.status(500).send("La base de datos exploto");
  }
  response.status(201).send("Listo, no te la devuelvo mas!");
});

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
