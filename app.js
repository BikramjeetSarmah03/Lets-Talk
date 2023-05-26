const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");

const app = express();

app.use(cors({
    origin:"https://project-lets-talk.netlify.app",
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const communityRoutes = require("./routes/communityRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/users", userRoutes);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;
