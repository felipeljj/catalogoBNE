// script.js

// script.js

// Array para armazenar os serviços
let services = [];

// Serviços iniciais com IDs fixos
const initialServices = [
    {
        id: 'service1',
        name: 'Hospedagem simples',
        description: 'Para você começar seu projeto!',
        image: 'images/hosting.png'
    },
    {
        id: 'service2',
        name: 'Hospedagem plus',
        description: 'Mais recursos e velocidade!',
        image: 'images/hosting.png'
    },
    {
        id: 'service3',
        name: 'Hospedagem premium',
        description: 'Recursos, IA, muita velocidade e domínio gratuito',
        image: 'images/hosting.png'
    },
    {
        id: 'service4',
        name: 'Hospedagem Business',
        description: 'Todas as ferramentas para seu negócio',
        image: 'images/premium.webp'
    },
    {
        id: 'service5',
        name: 'Servidor dedicado',
        description: 'Um servidor dedicado para você ter total controle!',
        image: 'images/dedicated.png'
    }
];

// Função para carregar serviços do Local Storage
function loadServices() {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
        services = JSON.parse(storedServices);
    } else {
        services = [];
    }

    // Adicionar serviços iniciais se não estiverem presentes
    initialServices.forEach(initialService => {
        const exists = services.some(service => service.id === initialService.id);
        if (!exists) {
            services.push(initialService);
        }
    });

    saveServices();
}
// Função para carregar serviços do Local Storage
function loadServices() {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
        services = JSON.parse(storedServices);
    } else {
        // Se não houver serviços no Local Storage, carregue os serviços iniciais
        services = [
            {
                id: generateId(),
                name: 'Hospedagem simples',
                description: 'Para você começar seu projeto!',
                image: 'images/hosting.png'
            },
            {
                id: generateId(),
                name: 'Hospedagem plus',
                description: 'Mais recursos e velocidade!',
                image: 'images/hosting.png'
            },
            {
                id: generateId(),
                name: 'Hospedagem premium',
                description: 'Recursos, IA, muita velocidade e domínio gratuito',
                image: 'images/hosting.png'
            },
            {
                id: generateId(),
                name: 'Hospedagem Business',
                description: 'Todas as ferramentas para seu negócio',
                image: 'images/premium.webp'
            },
            {
                id: generateId(),
                name: 'Servidor dedicado',
                description: 'Um servidor dedicado para você ter total controle!',
                image: 'images/dedicated.png'
            }
        ];
        saveServices();
    }
}

// Função para salvar serviços no Local Storage
function saveServices() {
    localStorage.setItem('services', JSON.stringify(services));
}

// Função para gerar IDs únicos
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Função para renderizar os serviços na página
function renderServices() {
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.innerHTML = ''; // Limpa o conteúdo atual

    services.forEach(service => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        cardItem.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <div class="card-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <button type="button" class="buy-btn">Adquira já</button>
                <button type="button" class="edit-btn" data-id="${service.id}">Editar</button>
                <button type="button" class="delete-btn" data-id="${service.id}">Remover</button>
            </div>
        `;

        cardWrapper.appendChild(cardItem);
    });
}

// Manipulação do Modal
const modal = document.getElementById('serviceModal');
const addServiceBtn = document.getElementById('addServiceBtn');
const closeModalBtn = document.querySelector('.close');
const serviceForm = document.getElementById('serviceForm');
const modalTitle = document.getElementById('modal-title');
let editingServiceId = null;

// Abrir modal para adicionar novo serviço
addServiceBtn.onclick = function() {
    modal.classList.add('show');
    modalTitle.textContent = 'Adicionar Serviço';
    serviceForm.reset();
    editingServiceId = null;
};

// Fechar modal
closeModalBtn.onclick = function() {
    modal.classList.remove('show'); // Remove a classe 'show' do modal
};

// Fechar modal clicando fora do conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show'); // Remove a classe 'show' do modal
    }
};

// Submeter formulário de adicionar/editar serviço
serviceForm.onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;
    const imageInput = document.getElementById('serviceImage');

    if (!name || !description) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (editingServiceId) {
        // Estamos editando um serviço existente
        const serviceIndex = services.findIndex(service => service.id === editingServiceId);
        if (serviceIndex !== -1) {
            if (imageInput.files && imageInput.files[0]) {
                // Se uma nova imagem foi selecionada, atualize-a
                const reader = new FileReader();
                reader.onload = function(e) {
                    services[serviceIndex] = {
                        ...services[serviceIndex],
                        name,
                        description,
                        image: e.target.result
                    };
                    saveServices();
                    renderServices();
                    modal.classList.remove('show');
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                // Se nenhuma nova imagem foi selecionada, mantenha a imagem existente
                services[serviceIndex] = {
                    ...services[serviceIndex],
                    name,
                    description
                };
                saveServices();
                renderServices();
                modal.classList.remove('show');
            }
        }
    } else {
        // Estamos adicionando um novo serviço
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newService = {
                    id: generateId(),
                    name,
                    description,
                    image: e.target.result
                };
                services.push(newService);
                saveServices();
                renderServices();
                modal.classList.remove('show');
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            // Se não houver imagem selecionada ao adicionar um novo serviço, exiba um alerta
            alert('Por favor, selecione uma imagem para o novo serviço.');
        }
    }
};

// Editar serviço
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const serviceId = event.target.getAttribute('data-id');
        const service = services.find(s => s.id === serviceId);

        if (service) {
            modal.classList.add('show'); // Adiciona a classe 'show' ao modal
            modalTitle.textContent = 'Editar Serviço';
            document.getElementById('serviceName').value = service.name;
            document.getElementById('serviceDescription').value = service.description;
            editingServiceId = serviceId;
        }
    }
});

// Remover serviço
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const serviceId = event.target.getAttribute('data-id');
        services = services.filter(service => service.id !== serviceId);
        saveServices();
        renderServices();
    }
});

// Inicialização
loadServices();
renderServices();
