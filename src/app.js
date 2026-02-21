import express from "express";
import cors from "cors";
import emailRouter from "./routes/Email.route.js";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Health check route
app.get("/", (req, res) => {
    res.json({ 
        status: "success", 
        message: "Email Spoofing Detection API is running",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/email", emailRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        status: "error", 
        message: "Route not found" 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

export default app;