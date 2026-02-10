
async function verify() {
    try {
        console.log('Fetching initial stats and card...');
        const r1 = await fetch('http://localhost:3001/api/stats');
        const initialStats = await r1.json();
        console.log('Initial Stats:', initialStats);

        const rCard1 = await fetch('http://localhost:3001/api/card');
        const initialCard = await rCard1.json();
        console.log('Initial Card Balance:', initialCard.balance);

        console.log('Creating new transaction for $100...');
        const r2 = await fetch('http://localhost:3001/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant: 'Test Merchant',
                category: 'Test Category',
                amount: 100.00
            })
        });
        const newTx = await r2.json();
        console.log('Transaction Created:', newTx);

        console.log('Fetching updated stats and card...');
        const r3 = await fetch('http://localhost:3001/api/stats');
        const updatedStats = await r3.json();
        console.log('Updated Stats:', updatedStats);

        const rCard2 = await fetch('http://localhost:3001/api/card');
        const updatedCard = await rCard2.json();
        console.log('Updated Card Balance:', updatedCard.balance);
        
        let success = true;

        if (updatedStats.totalVolume === initialStats.totalVolume + 100) {
            console.log('SUCCESS: Stats (Total Volume) updated correctly!');
        } else {
            console.error('FAILURE: Stats did not update correctly.');
            success = false;
        }

        if (updatedCard.balance === initialCard.balance + 100) {
             console.log('SUCCESS: Card balance updated correctly!');
        } else {
             console.error('FAILURE: Card balance did not update correctly.');
             success = false;
        }

    } catch (e) {
        console.error('Error during verification:', e);
    }
}

verify();
