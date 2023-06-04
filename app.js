import express from 'express';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

export default app;