let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const dessertDiv = e.target.parentElement;
            const dessertName = document.querySelector('h3').innerText;
            const price = parseFloat(document.querySelector('.item-price').innerText.replace('$', ''));
            const controls = dessertDiv.querySelector('.controls');
            const itemCount = dessertDiv.querySelector('.item-count');

            // Show controls and hide button
            controls.classList.remove('hidden');
            e.target.style.display = 'none';

            // Initialize cart item
            if (!cart[dessertName]) {
                cart[dessertName] = { price: price, quantity: 0 };
            }

            // Add button functionality
            let count = cart[dessertName].quantity;
            dessertDiv.querySelector('.add').addEventListener('click', () => {
                count++;
                itemCount.innerText = count;
                cart[dessertName].quantity = count;
                updateCart();
            });

            // Minus button functionality
            dessertDiv.querySelector('.minus').addEventListener('click', () => {
                if (count > 0) {
                    count--;
                    itemCount.innerText = count;
                    cart[dessertName].quantity = count;
                    updateCart();
                }
            });
        });
    });
});

const updateCart = () => {
    const cartContents = document.querySelector('.cart-container');

    if (!cartContents) return;

    cartContents.innerHTML = ""; // Clear existing items

    let totalItems = 0;
    let totalAmount = 0;

    for (const item in cart) {
        const { price, quantity } = cart[item];
        if (quantity > 0) {
            // Create a new cart item element
            const dessertItem = document.createElement('div');
            dessertItem.classList.add('cart-item');

            dessertItem.innerHTML = `
                <span class="cart-quantity">
                    <p>${item}</p>
                    <div class="quantity-wrap">
                        <span class="quantity">${quantity}</span>
                        <span class="each-item">$${price.toFixed(2)}</span>
                        <span class="item-total">$${(quantity * price).toFixed(2)}</span>
                    </div>
                </span>
                <button class="remove-item">
                    <span class="access-hidden">Remove Item</span>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                    </svg>
                </button>
            `;

            cartContents.appendChild(dessertItem);

            totalItems += quantity;
            totalAmount += quantity * price;
        }
    }

    // Update total items and amount in the UI
    document.querySelector('.secheaders').innerText = `(${totalItems})`;
    document.querySelector('.total-amount').innerText = `$${totalAmount.toFixed(2)}`;
};
