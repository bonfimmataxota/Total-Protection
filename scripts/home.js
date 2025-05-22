let cart = [];
let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDialog = document.getElementById('cartDialog');
    const closeCart = document.querySelector('.close-cart');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const paymentForm = document.getElementById('paymentForm');
    const cartItemsContainer = document.querySelector('.cart-items');
    const backToCart = document.getElementById('backToCart');
    const checkoutForm = document.getElementById('checkoutForm');

    // Abrir carrinho
    cartIcon.addEventListener('click', () => {
        cartDialog.style.display = 'block';
        updateCartDisplay();
    });

    // Fechar carrinho
    closeCart.addEventListener('click', () => {
        cartDialog.style.display = 'none';
    });

    // Adicionar ao carrinho
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const container = button.closest('.camera-container, .alarm-container');
            const productType = container.querySelector('.camera-btn, .alarm-btn').textContent;
            const price = parseFloat(button.textContent.split('R$')[1].trim().replace(',', '.'));
            const image = container.querySelector('img').src;

            addToCart(productType, price, image);
        });
    });

    document.getElementById('buyFireAlarm').addEventListener('click', function(e) {
        e.preventDefault();
        
        const container = this.closest('.fire-container');
        const image = container.querySelector('.fire-image').src;
        
        // Cria o item com todos os detalhes necessários
        const item = {
            productType: 'Alarme de Incêndio',
            price: 175.00,
            image: image
        };
        
        // Usar a função addToCart existente
        addToCart(item.productType, item.price, item.image);
        
        
    });

    // Formatar CPF automaticamente
    document.getElementById('cpf').addEventListener('input', function(e) {
        let cpf = e.target.value.replace(/\D/g, '');
        if (cpf.length > 11) cpf = cpf.slice(0, 11);
        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
        }
        e.target.value = cpf;
    });

    // Mostrar formulário de pagamento
    checkoutBtn.addEventListener('click', () => {
        cartItemsContainer.style.display = 'none';
        document.querySelector('.cart-footer').style.display = 'none';
        paymentForm.style.display = 'block';
        cartDialog.style.display = 'none'; // Fecha o carrinho ao clicar em finalizar compra
    });

    // Voltar para o carrinho
    backToCart.addEventListener('click', () => {
        paymentForm.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        document.querySelector('.cart-footer').style.display = 'block';
    });

    // Processar pagamento
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const address = document.getElementById('address').value;

        alert(`Pedido confirmado!\n\nNome: ${name}\nCPF: ${cpf}\nEndereço: ${address}`);
        
        // Limpar carrinho
        cartItems = [];
        cartCount = 0;
        cartTotal = 0; // <-- Adicione esta linha para zerar o total
        updateCartCount();
        updateCartTotal(); // <-- Atualiza o total exibido
        updateCartDisplay();
        
        // Fechar modal
        cartDialog.style.display = 'none';
    });
});

function addToCart(productType, price, image) {
    cartItems.push({ productType, price, image });
    cartTotal += price;
    cartCount++;
    updateCartCount();
    updateCartTotal();
    updateCartDisplay();
}

function updateCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.productType}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.productType}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}

function updateCartTotal() {
    const cartTotalElement = document.querySelector('.cart-total');
    cartTotalElement.textContent = `Total: R$ ${cartTotal.toFixed(2)}`;
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    let total = 0;

    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.productType}" style="width: 50px; height: 50px;">
            <span>${item.productType}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" class="remove-item">&times;</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    // Subtrai o valor do item removido do total
    cartTotal -= cartItems[index].price;
    cartItems.splice(index, 1);
    cartCount--;
    updateCartCount();
    updateCartTotal(); // Atualiza o total exibido
    updateCartDisplay();
}