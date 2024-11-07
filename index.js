const express = require('express');
const { connectDB } = require('./config/db');
const activoRouter = require('./routes/activoRouter');
const activoColumnaRouter = require('./routes/activoColumnaRouter');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

connectDB();

app.use('/api/activo', activoRouter);
app.use('/api/columna', activoColumnaRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server works in port ${PORT}`);
});

