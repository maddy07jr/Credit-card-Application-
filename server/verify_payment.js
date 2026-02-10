
async function verify() {
    try {
        console.log('Fetching initial stats and card...');
        const rCards = await fetch('http://localhost:3001/api/card');
        const initialCard = await rCards.json();
        console.log('Initial Card Balance:', initialCard.balance);

        const paymentAmount = 50.00;
        console.log(`Making a payment of $${paymentAmount}...`);
        
        const rPayment = await fetch('http://localhost:3001/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant: 'Payment Received',
                category: 'Payment',
                amount: -paymentAmount,
                userId: 'user1' 
            })
        });
        const paymentTx = await rPayment.json();
        console.log('Payment Transaction Created:', paymentTx);

        console.log('Fetching updated card...');
        const rCards2 = await fetch('http://localhost:3001/api/card');
        const updatedCard = await rCards2.json();
        console.log('Updated Card Balance:', updatedCard.balance);
        
        // Check if balance decreased
        // Initial 2245.5 (1245.5 + 1000 from previous step)
        // Payment 50 -> 2195.5
        
        if (updatedCard.balance === initialCard.balance - paymentAmount) {
             console.log('SUCCESS: Payment processed and balance updated correctly!');
        } else {
             console.error('FAILURE: Balance did not update correctly.');
             console.log('Expected:', initialCard.balance - paymentAmount);
             console.log('Actual:', updatedCard.balance);
        }

    } catch (e) {
        console.error('Error during verification:', e);
    }
}

verify();
