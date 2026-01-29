import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import topicRoutes from './routes/topic.routes.js'
import resourceRoutes from './routes/resource.routes.js'

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Reading API",
        version: "1.0.0",
        status: "running"
    })
})

//Mounting Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api', resourceRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

//Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global error: ", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
})

export default app;

