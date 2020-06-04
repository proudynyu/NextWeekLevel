import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path'

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

// static files
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.listen(3333);