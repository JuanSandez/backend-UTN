import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.config.js";
import { ENVIRONMENT } from "./config/environment.js";
import transporter from "./config/mail.config.js";


import usersRouter from "./routes/users.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import memberWorkspaceRouter from "./routes/membersWorkspace.router.js";
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
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor OK");
});

app.use("/api/users", usersRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/members", memberWorkspaceRouter);
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);


connectDB();


app.listen(ENVIRONMENT.PORT || 3000, () => {
  console.log(`Servidor escuchando en http://localhost:${ENVIRONMENT.PORT || 3000}`);
});


const enviarMailTest = async () => {
  const result = await transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: ENVIRONMENT.GMAIL_USERNAME,
    subject: "Test de nodemailer",
    html: "<h1>Hola desde Node.js, prueba OK</h1>",
  });
  console.log("Email enviado:", result);
};

export default app;




