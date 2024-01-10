const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

// Valida o CEP input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);

    // regra para somente numeros
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

// Evento para dar get no endereço
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    //   Checa se o CEP é valido
    if (inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// Pega o endereço da API
const getAddress = async (cep) => {
    toggleLoader();

    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();


    // Mostra erro e reseta
    if (data.erro === true) {
        if (!addressInput.hasAttribute("disabled")) {
            toggleDisabled();
        }

        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP Inválido, tente novamente.");
        return;
    }

    // Ativa caso o form esiver vazio
    if (addressInput.value === "") {
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

// Add ou remove disable attribute
const toggleDisabled = () => {
    if (regionInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};

// Mostra ou esconde o loader
const toggleLoader = () => {
    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// mostra ou esconde mensagem
const toggleMessage = (msg) => {
    const fadeElement = document.querySelector("#fade");
    const messageElement = document.querySelector("#message");

    const messageTextElement = document.querySelector("#message p");

    messageTextElement.innerText = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// fecha mensagem modal
closeButton.addEventListener("click", () => toggleMessage());

// Salva endereço
addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    toggleLoader();

    setTimeout(() => {
        toggleLoader();

        toggleMessage("Endereço salvo com sucesso!");

        addressForm.reset();

        toggleDisabled();
    }, 1000);
});