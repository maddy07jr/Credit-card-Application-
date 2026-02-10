import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dataStore } from './dataStore';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // In production, restrict this to your client URL
        methods: ["GET", "POST"]
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

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

// API Endpoints for Real-time Data
app.get('/api/transactions', (req: Request, res: Response) => {
    res.json(dataStore.getTransactions());
});

app.get('/api/stats', (req: Request, res: Response) => {
    res.json(dataStore.getDashboardStats());
});

app.get('/api/card', (req: Request, res: Response) => {
    // Mock user ID from session/token
    const userId = 'user1'; 
    const card = dataStore.getCard(userId);
    if (card) {
        res.json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

app.post('/api/transactions', (req: Request, res: Response) => {
    const newTransaction = {
        id: Date.now().toString(),
        userId: 'user1', // Default user for now
        merchant: req.body.merchant,
        category: req.body.category,
        amount: req.body.amount,
        status: 'Pending', // Default status
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        icon: '🆕'
    };

    // @ts-ignore
    dataStore.addTransaction(newTransaction);
    
    // Emit event to all clients
    io.emit('new-transaction', newTransaction);
    io.emit('stats-updated', dataStore.getDashboardStats());
    
    // Emit card update
    const card = dataStore.getCard('user1');
    if (card) {
        io.emit('card-updated', card);
    }

    res.json(newTransaction);
});

app.post('/api/transactions/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    
    // @ts-ignore
    const updatedTransaction = dataStore.updateTransactionStatus(id, status);
    
    if (updatedTransaction) {
        io.emit('transaction-updated', updatedTransaction);
        io.emit('stats-updated', dataStore.getDashboardStats());
        
        // Emit card update
        const card = dataStore.getCard('user1');
        if (card) {
            io.emit('card-updated', card);
        }

        res.json(updatedTransaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
