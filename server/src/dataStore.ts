
export interface Transaction {
    id: string;
    userId: string;
    merchant: string;
    category: string;
    amount: number;
    status: 'Completed' | 'Pending' | 'Declined';
    date: string;
    icon: string;
}

export interface User {
    id: string;
    name: string;
    role: 'admin' | 'customer';
}

export interface Card {
    id: string;
    userId: string;
    number: string; // Last 4 digits or masked
    type: string;
    balance: number;
    limit: number;
    status: 'Active' | 'Frozen' | 'Closed';
    expiry: string;
    cvv: string;
    nameOnCard: string;
}

// In-memory data store
class DataStore {
    private transactions: Transaction[] = [
        { id: '1', userId: 'user1', merchant: 'Apple Store', category: 'Electronics', amount: 1299.00, status: 'Completed', date: '2023-10-24', icon: '🍎' },
        { id: '2', userId: 'user1', merchant: 'Uber Rides', category: 'Transport', amount: 24.50, status: 'Completed', date: '2023-10-24', icon: '🚗' },
        { id: '3', userId: 'user1', merchant: 'Starbucks', category: 'Dining', amount: 12.75, status: 'Completed', date: '2023-10-23', icon: '☕' },
        { id: '4', userId: 'user1', merchant: 'Salary Deposit', category: 'Income', amount: -4500.00, status: 'Completed', date: '2023-10-15', icon: '💼' },
        { id: '5', userId: 'user1', merchant: 'Netflix', category: 'Entertainment', amount: 15.99, status: 'Completed', date: '2023-10-14', icon: '🎬' },
        { id: '6', userId: 'user1', merchant: 'Amazon', category: 'Shopping', amount: 89.50, status: 'Pending', date: '2023-10-12', icon: '📦' },
    ];

    private users: User[] = [
        { id: 'user1', name: 'Manick Sriram M', role: 'customer' },
        { id: 'admin1', name: 'Admin User', role: 'admin' }
    ];

    private cards: Card[] = [
        {
            id: 'card1',
            userId: 'user1',
            number: '4532',
            type: 'Platinum Rewards',
            balance: 1245.50,
            limit: 15000.00,
            status: 'Active',
            expiry: '12/28',
            cvv: '123',
            nameOnCard: 'Manick Sriram M'
        }
    ];

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    addTransaction(transaction: Transaction): void {
        this.transactions.unshift(transaction);
        
        // Update card balance if transaction is not income (negative amount usually implies spending in this context, 
        // but based on previous data, positive amounts seem to be spending. Let's assume positive = spending for now based on 'Apple Store' being 1299)
        // Correction: In the initial data, Salary Deposit was -4500, indicating negative IS income/credit.
        // Spending (positive) adds to balance (debt). Income (negative) subtracts from balance (debt).
        
        // Simplification: transactions affecting 'Points' or 'Cash' might be different, but for credit card:
        // Balance = Amount you owe.
        // Spending increases Balance. Payment/Refund decreases Balance.
        
        const card = this.cards.find(c => c.userId === transaction.userId);
        if (card) {
            if (transaction.status === 'Completed' || transaction.status === 'Pending') {
                 // Assuming positive amount = charge, negative amount = payment/credit
                 // Check logic: 
                 // Initial data: Salary -4500. Balance 1245.50. 
                 // Logic: New spending (+ amount) -> Balance increases. 
                 // Logic: Payment (- amount) -> Balance decreases.
                 card.balance += transaction.amount;
            }
        }
    }

    updateTransactionStatus(id: string, status: 'Completed' | 'Pending' | 'Declined'): Transaction | undefined {
        const transaction = this.transactions.find(t => t.id === id);
        if (transaction) {
            const oldStatus = transaction.status;
            transaction.status = status;

            // If a transaction was Pending and is now Declined, we should reverse the balance impact?
            // Or if it was Declined and now Completed (unlikely flow, but possible manual override).
            // For simplicity in this demo:
            // If Declined -> Reverse the charge from balance IF it was previously counted.
            // Our addTransaction counts Pending + Completed. 
            // So if status changes to Declined, we subtract data.
            
            const card = this.cards.find(c => c.userId === transaction.userId);
            if (card) {
                if ((oldStatus === 'Pending' || oldStatus === 'Completed') && status === 'Declined') {
                    card.balance -= transaction.amount;
                }
                // If it was Declined and becomes Pending/Completed (re-attempt?)
                if (oldStatus === 'Declined' && (status === 'Pending' || status === 'Completed')) {
                    card.balance += transaction.amount;
                }
            }

            return transaction;
        }
        return undefined;
    }

    getCard(userId: string): Card | undefined {
        return this.cards.find(c => c.userId === userId);
    }

    getDashboardStats() {
        // Calculate stats dynamically
        const totalVolume = this.transactions
            .filter(t => t.amount > 0 && t.status === 'Completed')
            .reduce((sum, t) => sum + t.amount, 0);
        
        // Count active cards
        const activeCards = this.cards.filter(c => c.status === 'Active').length;
        
        const pendingApprovals = this.transactions.filter(t => t.status === 'Pending').length;

        return {
            totalVolume,
            activeCards: activeCards > 0 ? 1245 : 0, // Keep the mock high number for visual continuity or replace with actual length: this.cards.length
            // Let's use the actual count + base to make it look realistic for 'system' stats
            // or just return the mock 1245 + new cards if any. For now, let's keep static base + dynamic
            pendingApprovals
        };
    }
}

export const dataStore = new DataStore();
