import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { initSocket } from "./src/services/socket.service.js";
import { scheduleProjectStartNotifications } from "./src/services/scheduler.service.js";
import authRoutes from "./src/routes/auth.routes.js";
import rolesRoutes from "./src/routes/roles.routes.js";
import permissionsRoutes from "./src/routes/permissions.routes.js";
import userPermissionsRoutes from "./src/routes/rolePermissions.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import projectsRoutes from "./src/routes/projects.routes.js";
import projectMembersRoutes from "./src/routes/projectMembers.routes.js";
import tasksRoutes from "./src/routes/tasks.routes.js";
import taskCommentsRoutes from "./src/routes/taskComments.routes.js";
import filesRoutes from "./src/routes/files.routes.js";
import reportsRoutes from "./src/routes/reports.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import activityLogsRoutes from "./src/routes/activityLogs.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import calendargRoutes from "./src/routes/calendar.routes.js";
import mailRoutes from "./src/routes/mails.routes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Updated CORS: Frontend URL lazmi add karein jo Koyeb/Vercel ne di hai
app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://zenith-board-hub.lovable.app",
    "https://orbit-grid-suite.lovable.app",
    "https://project-managment-frontend-w5hm.vercel.app",
    /\.koyeb\.app$/ // Ye Koyeb ke subdomains allow kar dega
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/src/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/uploads", express.static(path.join(__dirname, "src/uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is live!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/role", rolesRoutes);
app.use("/api/permissioins", permissionsRoutes);
app.use("/api", userPermissionsRoutes);
app.use("/api", notificationRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/project", projectsRoutes);
app.use("/api/project", projectMembersRoutes);
app.use("/api/task", tasksRoutes);
app.use("/api/taskcomment", taskCommentsRoutes);
app.use("/api/files", filesRoutes);
app.use("/api/report", reportsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/activitylog", activityLogsRoutes);
app.use("/api", calendargRoutes);
app.use("/api/mails", mailRoutes);

// 2. Updated PORT and Host for Cloud
// Koyeb automatically PORT variable set karta hai
const PORT = process.env.PORT || 8000; 

const server = http.createServer(app);
initSocket(server);
scheduleProjectStartNotifications();

// 3. 0.0.0.0 bind karna zaroori hai cloud ke liye
server.listen(PORT, "0.0.0.0", () => {
  console.log(`API server is live on port ${PORT}`);
});