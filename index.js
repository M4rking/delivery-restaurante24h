 // Menu items data - CÓDIGO CORRIGIDO
        const menuItems = [
            {
                id: 1,
                name: "Cachupa Rica",
                category: "pratos",
                price: 850,
                description: "Prato tradicional cabo-verdiano com milho, feijão, carne e linguiça.",
                image: "./imagem/cachupa.jpg"
            },
            {
                id: 2,
                name: "Lagosta Grelhada",
                category: "pratos",
                price: 1200,
                description: "Lagosta fresca grelhada com manteiga de alho e ervas.",
                image: "./imagem/lagosta.jpg"
            },
            {
                id: 3,
                name: "Atum com Molho de Cebola",
                category: "pratos",
                price: 750,
                description: "Filé de atum grelhado com molho de cebola caseiro.",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                name: "Frango Grelhado",
                category: "pratos",
                price: 650,
                description: "Frango grelhado com especiarias e acompanhamentos.",
                image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 5,
                name: "Pizza de Queijo",
                category: "pratos",
                price: 800,
                description: "Pizza com queijo derretido e molho de tomate caseiro.",
                image: "imagem/PizzaQ.jpg"
            },
            {
                id: 6,
                name: "Hambúrguer Especial",
                category: "pratos",
                price: 700,
                description: "Hambúrguer com carne 100% bovina, queijo e salada.",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 7,
                name: "Sumo de Maracujá Natural",
                category: "bebidas",
                price: 200,
                description: "Sumo natural de maracujá com gelo.",
                image: "imagem/sumomaracujá.jpeg"
            },
            {
                id: 8,
                name: "Coca-Cola",
                category: "bebidas",
                price: 150,
                description: "Refrigerante Coca-Cola lata 330ml.",
                image: "imagem/cola.jpg"
            },
            {
                id: 9,
                name: "Água Mineral",
                category: "bebidas",
                price: 100,
                description: "Água mineral sem gás 500ml.",
                image: "imagem/agual.webp"
            },
            {
                id: 10,
                name: "Cerveja Strela",
                category: "bebidas",
                price: 180,
                description: "Cerveja nacional Strela garrafa 330ml.",
                image: "imagem/cerveja.jpg"
            },
            {
                id: 11,
                name: "Pudim de Coco",
                category: "sobremesas",
                price: 300,
                description: "Pudim de coco cremoso caseiro.",
                image: "imagem/pudim.jpg"
            },
            {
                id: 12,
                name: "Bolo de Bolacha",
                category: "sobremesas",
                price: 250,
                description: "Bolo de bolacha tradicional com café.",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ];

        // Carrinho de compras
        let cart = [];
        const DELIVERY_FEE = 200;

        // Elementos do DOM
        const cartCount = document.querySelector('.cart-count');
        const fabCart = document.getElementById('fab-cart');
        const fabBadge = document.getElementById('fab-badge');
        const menuContainer = document.querySelector('.menu-items');
        const cartContainer = document.querySelector('.cart-items');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        const customerName = document.getElementById('customer-name');
        const customerPhone = document.getElementById('customer-phone');
        const customerAddress = document.getElementById('customer-address');
        const customerNotes = document.getElementById('customer-notes');
        const confirmationModal = document.getElementById('confirmation-modal');
        const closeModal = document.querySelector('.close-modal');
        const confirmOrderBtn = document.getElementById('whatsapp-send-btn');
        const orderSummary = document.getElementById('order-summary');
        const desktopNavItems = document.querySelectorAll('.desktop-nav-item');

        // Render menu items 
        function renderMenuItems(category = 'all') {
            menuContainer.innerHTML = '';
            
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            filteredItems.forEach(item => {
                const menuItemElement = document.createElement('div');
                menuItemElement.className = 'menu-item';
                menuItemElement.setAttribute('data-category', item.category);
                menuItemElement.innerHTML = `
                    <div class="menu-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="menu-item-content">
                        <div class="menu-item-title">
                            <h3>${item.name}</h3>
                            <span class="price">${item.price} CVE</span>
                        </div>
                        <p class="menu-item-desc">${item.description}</p>
                        <button class="add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                `;
                menuContainer.appendChild(menuItemElement);
            });

            // Adicionar eventos aos botões de adicionar ao carrinho
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.getAttribute('data-id'));
                    addToCart(itemId);
                    
                    // Mostrar FAB se estiver na seção menu
                    if (currentSection === 'menu') {
                        fabCart.style.display = 'flex';
                    }
                });
            });
        }

        // Adicionar item ao carrinho - CÓDIGO CORRIGIDO
        function addToCart(itemId) {
            const item = menuItems.find(item => item.id === itemId);
            const existingItem = cart.find(cartItem => cartItem.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${item.name} adicionado ao carrinho!`);
        }

        // Remover item do carrinho
        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }

        // Atualizar quantidade do item no carrinho
        function updateQuantity(itemId, newQuantity) {
            if (newQuantity < 1) {
                removeFromCart(itemId);
                return;
            }
            
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
            }
        }

        // Atualizar visualização do carrinho - CÓDIGO CORRIGIDO
        function updateCart() {
            const cartItemsContainer = document.querySelector('.cart-items');
            const subtotalPriceElement = document.getElementById('subtotal-price');
            const totalPriceElement = document.getElementById('total-price');
            
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center;">Seu carrinho está vazio</p>';
                subtotalPriceElement.textContent = '0 CVE';
                totalPriceElement.textContent = `${DELIVERY_FEE} CVE`;
                cartCount.textContent = '0';
                fabBadge.textContent = '0';
                checkoutBtn.disabled = true;
                fabCart.style.display = 'none';
                return;
            }
            
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <span class="cart-item-price">${item.price} CVE</span>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            const total = subtotal + DELIVERY_FEE;
            subtotalPriceElement.textContent = `${subtotal} CVE`;
            totalPriceElement.textContent = `${total} CVE`;
            
            // Atualizar contadores
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            fabBadge.textContent = totalItems;
            
            // Habilitar botão de checkout se o carrinho não estiver vazio
            checkoutBtn.disabled = false;
            
            // Adicionar eventos aos controles do carrinho
            setupCartEventListeners();
        }

        function setupCartEventListeners() {
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.getAttribute('data-id'));
                    const item = cart.find(item => item.id === itemId);
                    if (item) {
                        updateQuantity(itemId, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.getAttribute('data-id'));
                    const item = cart.find(item => item.id === itemId);
                    if (item) {
                        updateQuantity(itemId, item.quantity + 1);
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }

        // Mostrar modal de confirmação - CÓDIGO CORRIGIDO
        function showConfirmationModal() {
            // Validar formulário
            if (!customerName.value || !customerPhone.value || !customerAddress.value) {
                showNotification('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = subtotal + DELIVERY_FEE;
            
            let summaryHTML = `
                <h4>Resumo do Pedido:</h4>
                <div style="margin: 15px 0;">
            `;
            
            cart.forEach(item => {
                summaryHTML += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>${item.name} (${item.quantity}x)</span>
                        <span>${item.price * item.quantity} CVE</span>
                    </div>
                `;
            });
            
            summaryHTML += `
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Subtotal:</span>
                        <span>${subtotal} CVE</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Taxa de entrega:</span>
                        <span>${DELIVERY_FEE} CVE</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px;">
                        <span>Total:</span>
                        <span>${total} CVE</span>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <h4>Informações de Entrega:</h4>
                    <p><strong>Nome:</strong> ${customerName.value}</p>
                    <p><strong>Telefone:</strong> ${customerPhone.value}</p>
                    <p><strong>Endereço:</strong> ${customerAddress.value}</p>
                    ${customerNotes.value ? `<p><strong>Observações:</strong> ${customerNotes.value}</p>` : ''}
                </div>
            `;
            
            orderSummary.innerHTML = summaryHTML;
            confirmationModal.style.display = 'flex';
        }

        // Finalizar pedido via WhatsApp - 
        function sendToWhatsApp() {
            let message = "🛵 *PEDIDO - RESTAURANTE 24H* 🛵\n\n";
            message += "👤 *Dados do Cliente:*\n";
            message += `• Nome: ${customerName.value}\n`;
            message += `• Telefone: ${customerPhone.value}\n`;
            message += `• Endereço: ${customerAddress.value}\n`;
            if (customerNotes.value) {
                message += `• Observações: ${customerNotes.value}\n`;
            }
            
            message += "\n🍽️ *Itens do Pedido:*\n";
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                message += `• ${item.name} (${item.quantity}x) - ${itemTotal} CVE\n`;
            });
            
            const total = subtotal + DELIVERY_FEE;
            
            message += "\n💰 *Valores:*\n";
            message += `• Subtotal: ${subtotal} CVE\n`;
            message += `• Taxa de entrega: ${DELIVERY_FEE} CVE\n`;
            message += `• *TOTAL: ${total} CVE*\n\n`;
            message += "⏰ *Pedido realizado via site*";
            
            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Número de WhatsApp do restaurante
            const whatsappNumber = "+2389758163";
            
            // Abrir WhatsApp com a mensagem
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Fechar modal
            confirmationModal.style.display = 'none';
            
            // Limpar carrinho
            cart = [];
            updateCart();
            
            // Limpar formulário
            customerName.value = '';
            customerPhone.value = '';
            customerAddress.value = '';
            customerNotes.value = '';
            
            showNotification('Pedido enviado com sucesso!');
        }

        // Mostrar notificação
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Category filter 
        function setupEventListeners() {
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    // Filter menu items
                    const category = button.getAttribute('data-category');
                    renderMenuItems(category);
                });
            });

            // Checkout
            checkoutBtn.addEventListener('click', showConfirmationModal);

            // Modal
            closeModal.addEventListener('click', () => {
                confirmationModal.style.display = 'none';
            });

            confirmOrderBtn.addEventListener('click', sendToWhatsApp);

            // Fechar modal ao clicar fora
            window.addEventListener('click', (e) => {
                if (e.target === confirmationModal) {
                    confirmationModal.style.display = 'none';
                }
            });

            // Validar formulário em tempo real
            const formInputs = document.querySelectorAll('#customer-name, #customer-phone, #customer-address');
            formInputs.forEach(input => {
                input.addEventListener('input', validateForm);
            });
        }

        function validateForm() {
            const name = document.getElementById('customer-name').value.trim();
            const phone = document.getElementById('customer-phone').value.trim();
            const address = document.getElementById('customer-address').value.trim();
            
            checkoutBtn.disabled = !(name && phone && address && cart.length > 0);
        }

        // Configurar botões de categoria na home 
        function setupHomeCategories() {
            const homeCategoryButtons = document.querySelectorAll('#home .category-btn');
            
            homeCategoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Mudar para a seção menu
                    showSection('menu');
                    
                    // Ativar a categoria correspondente no menu
                    const category = this.getAttribute('data-category');
                    
                    // Aguardar um pouco para garantir que a seção menu foi carregada
                    setTimeout(() => {
                        const menuCategoryButtons = document.querySelectorAll('#menu .category-btn');
                        menuCategoryButtons.forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.getAttribute('data-category') === category) {
                                btn.classList.add('active');
                            }
                        });
                        
                        // Filtrar os itens do menu
                        renderMenuItems(category);
                    }, 100);
                });
            });
        }

        // Navegação entre seções - CÓDIGO CORRIGIDO
        let currentSection = 'home';
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('.nav-item');

        function initNavigation() {
            // Navegação mobile
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const section = this.getAttribute('data-section');
                    showSection(section);
                });
            });
            
            // Navegação desktop
            desktopNavItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const section = this.getAttribute('data-section');
                    showSection(section);
                });
            });

            // Botões que mudam de seção
            document.querySelectorAll('[data-section]').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    if (this.getAttribute('data-section')) {
                        e.preventDefault();
                        showSection(this.getAttribute('data-section'));
                    }
                });
            });

            // Floating Action Button para carrinho
            fabCart.addEventListener('click', function() {
                showSection('cart');
            });
        }

        function showSection(sectionName) {
            // Esconder todas as seções
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Mostrar seção selecionada
            document.getElementById(sectionName).classList.add('active');

            // Atualizar navegação mobile
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === sectionName) {
                    item.classList.add('active');
                }
            });
            
            // Atualizar navegação desktop
            desktopNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === sectionName) {
                    item.classList.add('active');
                }
            });

            currentSection = sectionName;
            
            // Mostrar/ocultar FAB baseado na seção atual
            if (sectionName === 'menu' && cart.length > 0) {
                fabCart.style.display = 'flex';
            } else {
                fabCart.style.display = 'none';
            }
        }


        // Inicialização - CÓDIGO CORRIGIDO
        document.addEventListener('DOMContentLoaded', function() {
            initNavigation();
            renderMenuItems();
            updateCart();
            setupEventListeners();
            setupHomeCategories();
        });

        
