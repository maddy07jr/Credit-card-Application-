import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock user for Level 1 Login
const USER = {
    username: 'maddy07jr',
    password: 'Db25052002*'
};

app.post('/api/login', (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (username === USER.username && password === USER.password) {
        res.json({ success: true, message: 'Login successful', token: 'mock-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
