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



const corsOptions = {
  origin: "https://frontend-utn.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.get("/ping", (request, response) => {
  response.send("<h1>Server is runing</h1>");
});

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/workspaces", workspace_router);
app.use("/api/members", memberWorkspaceRouter);
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);

connectDB();

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
export default app;