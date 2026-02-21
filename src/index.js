import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🚀 API endpoint: http://localhost:${PORT}/api/v1/email/emailchecking`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

// Handle server errors
app.on("error", (error) => {
    console.error("❌ Server error:", error);
    throw error;
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});