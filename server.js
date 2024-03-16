import express from 'express';
import { postsRoutes } from './routes/postRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';
import mongoose from 'mongoose';

import path from 'path';
import { fileURLToPath } from 'url';
// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initializing Express app
const app = express();
// Middleware to receive JSON
app.use(express.json());
// Adding the API end-points and the route handlers
app.use('/api/posts', postsRoutes);
app.use('/api/users',usersRoutes);

// Use the Frontend App
app.use(express.static(path.join(__dirname,'/frontend/dist')))

// render client for any path

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/dist/index.html'))
})


// Connectiong to Mongodb using Mongoose
mongoose.connect(process.env.DB_URI,{dbName:'demo_db'})
    .then(() => {
            console.log('Connected to the database successfully');
            app.listen(4000, 'localhost', () => console.log('Listening on port 4000')); 
        
    })
    .catch((err) => {
        console.log('Error connecting to the database:', err);
    });
    