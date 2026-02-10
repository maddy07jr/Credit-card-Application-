
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

export interface DashboardStats {
    totalVolume: number;
    activeCards: number;
    pendingApprovals: number;
}

export interface Card {
    id: string;
    userId: string;
    number: string;
    type: string;
    balance: number;
    limit: number;
    status: 'Active' | 'Frozen' | 'Closed';
    expiry: string;
    cvv: string;
    nameOnCard: string;
}
