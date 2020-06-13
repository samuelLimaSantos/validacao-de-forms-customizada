const fields = document.querySelectorAll("[required]"); // Pega as tags que tem como atributo o required

function validateField(field) {
    // lógica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;
        

        for (let error in field.validity) {
            // O for in consegue iterar sobre elementos do objeto retornando a key dele 
            // se não for customError então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error;

            }
        }

        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages[field.type][typeError];
        // o type retorna o tipo do input 
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error"); // Primeiramente sobe para o elemeto pai, depois seleciona o span que tem a classe error

        if (message) {
            spanError.classList.add("active"); 
            spanError.innerHTML = message;

        } else {
            spanError.classList.remove("active"); 
            spanError.innerHTML = ""
        }

    }

    return function() {

        const error = verifyErrors();
        
        if (error) {
            const message = customMessage(error);
            field.style.borderColor = "red";
            setCustomMessage(message);
        } else {
            field.style.borderColor = "green";

            setCustomMessage();
        }
    }
}


function customValidation(event) {

    const field = event.target; // retorna qual dos elementos disparou o evento
    const validation = validateField(field);

    validation();


    // o método setCustomValidity serve para você customizar a mensagem que aparece no campo obrigatório
}

for (field of fields) {
    field.addEventListener("invalid", (event) => {
        // O event invalid pode ser aplicado quando existe tags com atributos require ele é ativado quando o campo está inválido
        event.preventDefault(); // Faz com que não mostre a bolha de error
        customValidation(event);
    });
    field.addEventListener("blur", customValidation); 
}



document.querySelector("form").addEventListener("submit", (event) => {
    // Essa função será acionada quando o form for devidamente enviado
    console.log("Enviar o formulário");
    event.preventDefault(); // Faz com que o formulário não seja submetido.
});