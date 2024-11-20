document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('card-container');
    if (!productContainer) {
        console.error('Elemento #card-container não encontrado!');
        return;  // Se o contêiner não existir, pare a execução.
    }

    // Controle do menu de navegação (barra lateral)
    if (!window.bar) {
        const bar = document.getElementById('barra');
        const fechar = document.getElementById('fechar');
        const nav = document.getElementById('nav-barra');

        if (bar) {
            bar.addEventListener('click', () => {
                nav.classList.add('active');
            });
        }

        if (fechar) {
            fechar.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        }

        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target); 
            const isClickOnBar = bar.contains(event.target);  

            if (!isClickInsideNav && !isClickOnBar) {
                nav.classList.remove('active');
            }
        });
    }

    // Variáveis do campo de pesquisa e contêiner de produtos
    const searchInput = document.getElementById('searchInput');

    // Dados dos produtos (exemplo simples, você pode integrar com seu banco de dados ou API)
    const products = [
        { name: 'Orquídea Phalaenopsis', price: 'R$49,90', imgSrc: 'images/pagina_flores/Orquídea Phalaenopsis.jpg' },
        { name: 'Flor do Campo', price: 'R$39,90', imgSrc: 'images/pagina_flores/Flor do Campo.jpg' },
        { name: 'Lírios', price: 'R$29,90', imgSrc: 'images/pagina_flores/Lírios.jpg' },
        { name: 'Girassol', price: 'R$9,90', imgSrc: 'images/pagina_flores/Girassol.jpg' },
        { name: 'Suculentas', price: 'R$12,90', imgSrc: 'images/pagina_flores/Suculentas.jpg' },
        { name: 'Astromélias', price: 'R$32,90', imgSrc: 'images/pagina_flores/Astromélias.jpg' },
        { name: 'Gérberas', price: 'R$22,90', imgSrc: 'images/pagina_flores/gerberas (3).jpg' },
        { name: 'Rosas', price: 'R$19,90', imgSrc: 'images/pagina_flores/Rosas.jpg' }
    ];

    // Função para exibir os produtos
    function displayProducts(filteredProducts) {
        productContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos produtos

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('pro');
            productDiv.innerHTML = `
                <img src="${product.imgSrc}" alt="${product.name}">
                <div class="des">
                    <h6>${product.name}</h6>
                    <h4>${product.price}</h4>
                </div>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    // Função para filtrar os produtos com base no termo de pesquisa
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase(); // Obtém o valor da pesquisa e converte para minúsculas

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) // Filtra os produtos com base no nome
        );

        displayProducts(filteredProducts); // Exibe os produtos filtrados
    }

    // Adiciona o evento de input no campo de pesquisa
    searchInput.addEventListener('input', filterProducts);

    // Exibe todos os produtos inicialmente
    displayProducts(products);
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');
    
    const suggestions = [
        'Orquídea Phalaenopsis',
        'Flor do Campo',
        'Lírios',
        'Girassol',
        'Suculentas',
        'Astromélias',
        'Gérberas',
        'Rosas'
    ];

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    
    function showSuggestions(query) {
        suggestionsList.innerHTML = ''; // Limpa as sugestões anteriores
    
        if (query) {
            const filteredSuggestions = suggestions.filter(item => 
                removeAccents(item).includes(removeAccents(query)) // Remove acentuação para comparação
            );
    
            filteredSuggestions.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                li.onclick = function() {
                    searchInput.value = item;
                    suggestionsList.style.display = 'none';
                };
                suggestionsList.appendChild(li);
            });
    
            suggestionsList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsList.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();
        showSuggestions(query);
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search')) {
            suggestionsList.style.display = 'none';
        }
    });
});