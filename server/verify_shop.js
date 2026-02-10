
async function verify() {
    try {
        console.log('Fetching initial stats and card...');
        const rCards = await fetch('http://localhost:3001/api/card');
        const initialCard = await rCards.json();
        console.log('Initial Card Balance:', initialCard.balance);

        const productPrice = 299.99;
        console.log(`Buying Headphones for $${productPrice}...`);
        
        const rPurchase = await fetch('http://localhost:3001/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant: 'TechHaven',
                category: 'Electronics',
                amount: productPrice, // Spending increases balance
                userId: 'user1' 
            })
        });
        const purchaseTx = await rPurchase.json();
        console.log('Purchase Transaction Created:', purchaseTx);

        console.log('Fetching updated card...');
        const rCards2 = await fetch('http://localhost:3001/api/card');
        const updatedCard = await rCards2.json();
        console.log('Updated Card Balance:', updatedCard.balance);
        
        // Check if balance increased
        // Spending adds to balance
        
        // Use a small epsilon for floating point comparison
        const expectedBalance = initialCard.balance + productPrice;
        const diff = Math.abs(updatedCard.balance - expectedBalance);

        if (diff < 0.01) {
             console.log('SUCCESS: Purchase processed and balance updated correctly!');
        } else {
             console.error('FAILURE: Balance did not update correctly.');
             console.log('Expected:', expectedBalance);
             console.log('Actual:', updatedCard.balance);
        }

    } catch (e) {
        console.error('Error during verification:', e);
    }
}

verify();
