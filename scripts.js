$(document).ready(function() {
    let cart = [];
    let allProducts = []; 

    $.ajax({
        url: "data.json",
        method: "GET",
        success: function(data) {
            allProducts = data; 
            renderProducts(data); 

            $(".add-to-cart").click(function() {
                let productId = $(this).data("id");
                let productName = $(this).data("name");
                let productPrice = parseFloat($(this).data("price"));

                let existing = cart.find(item => item.id === productId);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
                }
                updateCart();
            });
        }
    });

    function renderProducts(products) {
        let productList = $("#product-list");
        productList.empty();
        products.forEach(product => {
            let productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span>$${product.price}</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
            productList.append(productCard);
        });
    }

    function updateCart() {
        let cartItems = $("#cart-items");
        cartItems.empty();
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItems.append(`<div class="cart-item"><p>${item.name} x${item.quantity}</p><p>$${item.price * item.quantity}</p></div>`);
        });
        $("#total-price").text(total.toFixed(2));
    }

    $("#search input").on("input", function() {
        let query = $(this).val().toLowerCase();
        let filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);

        $(".add-to-cart").click(function() {
            let productId = $(this).data("id");
            let productName = $(this).data("name");
            let productPrice = parseFloat($(this).data("price"));

            let existing = cart.find(item => item.id === productId);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    $("#checkout").click(function() {
        if (cart.length === 0) {
            alert("Cart is empty!");
        } else {
            alert("Thank you for your purchase!");
            cart = [];
            updateCart();
        }
    });

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const address = document.getElementById('address').value.trim();
        const age = document.getElementById('age').value.trim();
        const hobbies = document.getElementById('hobbies').value.trim();
        const country = document.getElementById('country').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
    
        let valid = true;
        let errorMessage = '';
    
        if (!firstName) {
            errorMessage += 'First name is required.\n';
            valid = false;
        }
    
        if (!lastName) {
            errorMessage += 'Last name is required.\n';
            valid = false;
        }
    
        // Mobile validation will be handled by the browser through the pattern attribute
        const mobileInput = document.getElementById('mobile');
        if (!mobileInput.validity.valid) {
            errorMessage += 'Please enter a valid mobile number (10 digits).\n';
            valid = false;
        }
    
        if (!address) {
            errorMessage += 'Address is required.\n';
            valid = false;
        }
    
        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
            errorMessage += 'Please enter a valid age (between 1 and 120).\n';
            valid = false;
        }
    
        if (!hobbies) {
            errorMessage += 'Hobbies are required.\n';
            valid = false;
        }
    
        if (!country) {
            errorMessage += 'Country is required.\n';
            valid = false;
        }
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            errorMessage += 'Please enter a valid email address.\n';
            valid = false;
        }
    
        if (!message) {
            errorMessage += 'Message is required.\n';
            valid = false;
        }
    
        if (!valid) {
            alert('Please correct the following errors:\n' + errorMessage);
        } else {
            alert("Thank you for contacting us! We will get back to you soon.");
            form.reset();
        }
    });
    
});    
