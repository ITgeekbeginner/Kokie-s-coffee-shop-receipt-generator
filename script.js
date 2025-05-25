document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    document.getElementById('receiptDate').textContent= today.toLocaleDateString('en-US', options);
    document.getElementById('generateButton').addEventListener('click', function() {
        generateReceipt();
    });
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
    const inputs = document.querySelectorAll('input, select');
       inputs.forEach(input => {
         input.addEventListener('input', function(){
            const customerName = document.getElementById('customerName').value;
            const  amount = document.getElementById('amount').value;
               if (customerName && amount) {
                  generateReceipt();
               }
         });
    });
});

function generateReceipt() {
    const shopName = document.getElementById('shopName').value;
    const shopAddress = document.getElementById('shopAddress').value;
    const shopContact = document.getElementById('shopContact').value;
    const receiptNumber = document.getElementById('receiptNumber').value;
    const customerName = document.getElementById('customerName').value;
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const paymentMethod = document.getElementById('paymentMethod').value;
    const referenceNumber = document.getElementById('referenceNumber').value;

     // Set receipt values
    document.getElementById('receiptShopName').textContent = shopName;
    document.getElementById('receiptShopAddress').textContent = shopAddress;
    document.getElementById('receiptShopContact').textContent = shopContact;
    document.getElementById('receiptShopFooter').textContent = shopName;
    document.getElementById('receiptNumberDisplay').textContent = receiptNumber;
    document.getElementById('receiptCustomerName').textContent = customerName;
    document.getElementById('receiptAmount').textContent = amount;
    document.getElementById('amountWords').textContent = numberToWords(amount) + ' rands';
    document.getElementById('receiptPaymentMethod').textContent = paymentMethod;
    document.getElementById('receiptReferenceNumber').textContent = referenceNumber || '-';
    
    // Show receipt
    document.getElementById('receipt').style.display = 'block';
}

// Function to convert numbers to words
function numberToWords(num) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    num = parseFloat(num);
    const wholeNumber = Math.floor(num);
    const decimal = Math.round((num - wholeNumber) * 100);
    
    if (wholeNumber === 0) return 'zero';
    
    let result = '';
    
    if (wholeNumber >= 1000) {
        const thousands = Math.floor(wholeNumber / 1000);
        result += ones[thousands] + ' thousand ';
    }
    
    const hundreds = Math.floor((wholeNumber % 1000) / 100);
    if (hundreds > 0) {
        result += ones[hundreds] + ' hundred ';
    }
    
    const remainder = wholeNumber % 100;
    if (remainder > 0) {
        if (remainder < 20) {
            result += ones[remainder];
        } else {
            result += tens[Math.floor(remainder / 10)];
            if (remainder % 10 > 0) {
                result += ' ' + ones[remainder % 10];
            }
        }
    }
    
    if (decimal > 0) {
        result += ' and ' + decimal + '/100';
    }
    
    return result.trim();
}