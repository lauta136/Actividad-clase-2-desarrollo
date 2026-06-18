const form = document.getElementById("comment-form");

const dialog = document.getElementById("form-success");
const dialog_data = document.getElementById("form-results");

// Configuración de cada campo: id del input, id del span de error,
// etiqueta para mostrar en el cartel y función de validación.
const camposConfig = [
    { id: "name", errorId: "name-error", label: "Nombre completo", validar: validarNombre },
    { id: "mail", errorId: "mail-error", label: "Email", validar: validarMail },
    { id: "password", errorId: "password-error", label: "Contraseña", validar: validarPassword },
    { id: "confirmPassword", errorId: "confirmPassword-error", label: "Confirmar contraseña", validar: validarConfirmPassword },
    { id: "age", errorId: "age-error", label: "Edad", validar: validarEdad },
    { id: "phone", errorId: "phone-error", label: "Teléfono", validar: validarTelefono },
    { id: "address", errorId: "address-error", label: "Dirección", validar: validarDireccion },
    { id: "city", errorId: "city-error", label: "Ciudad", validar: validarCiudad },
    { id: "zipCode", errorId: "zipCode-error", label: "Código Postal", validar: validarCodigoPostal },
    { id: "dni", errorId: "dni-error", label: "DNI", validar: validarDni },
    { id: "review", errorId: "review-error", label: "Reseña", validar: validarReview },
];

// Referencias rápidas a cada input/error por id
const campos = {};
camposConfig.forEach(({ id, errorId, label }) => {
    campos[id] = {
        data: document.getElementById(id),
        error: document.getElementById(errorId),
        label,
    };
});

const radio_error = document.getElementById("radio-error");

// ----- Funciones de validación -----

function validarNombre() {
    const valor = campos.name.data.value.trim();
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;
    if (valor.length <= 6 || !regex.test(valor)) {
        campos.name.error.textContent =
            "Debe tener más de 6 letras y un espacio entre nombre y apellido";
        return false;
    }
    campos.name.error.textContent = "";
    return true;
}

function validarMail() {
    const input = campos.mail.data;
    if (input.value.trim().length === 0 || !input.validity.valid) {
        campos.mail.error.textContent = "Inserte un email válido";
        return false;
    }
    campos.mail.error.textContent = "";
    return true;
}

function validarPassword() {
    const valor = campos.password.data.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(valor)) {
        campos.password.error.textContent =
            "Debe tener al menos 8 caracteres, con letras y números";
        return false;
    }
    campos.password.error.textContent = "";
    return true;
}

function validarConfirmPassword() {
    const valor = campos.confirmPassword.data.value;
    if (valor.length === 0 || valor !== campos.password.data.value) {
        campos.confirmPassword.error.textContent = "Las contraseñas no coinciden";
        return false;
    }
    campos.confirmPassword.error.textContent = "";
    return true;
}

function validarEdad() {
    const valor = campos.age.data.value.trim();
    const numero = Number(valor);
    if (valor.length === 0 || !Number.isInteger(numero) || numero < 18) {
        campos.age.error.textContent = "Debe ser un número entero mayor o igual a 18";
        return false;
    }
    campos.age.error.textContent = "";
    return true;
}

function validarTelefono() {
    const valor = campos.phone.data.value;
    const regex = /^\d{7,}$/;
    if (!regex.test(valor)) {
        campos.phone.error.textContent =
            "Debe tener al menos 7 dígitos, sin espacios, guiones ni paréntesis";
        return false;
    }
    campos.phone.error.textContent = "";
    return true;
}

function validarDireccion() {
    const valor = campos.address.data.value;
    const regex = /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])(?=.*\d)(?=.*\s).{5,}$/;
    if (!regex.test(valor)) {
        campos.address.error.textContent =
            "Debe tener al menos 5 caracteres, con letras, números y un espacio";
        return false;
    }
    campos.address.error.textContent = "";
    return true;
}

function validarCiudad() {
    const valor = campos.city.data.value.trim();
    if (valor.length < 3) {
        campos.city.error.textContent = "Debe tener al menos 3 caracteres";
        return false;
    }
    campos.city.error.textContent = "";
    return true;
}

function validarCodigoPostal() {
    const valor = campos.zipCode.data.value.trim();
    if (valor.length < 3) {
        campos.zipCode.error.textContent = "Debe tener al menos 3 caracteres";
        return false;
    }
    campos.zipCode.error.textContent = "";
    return true;
}

function validarDni() {
    const valor = campos.dni.data.value;
    const regex = /^\d{7,8}$/;
    if (!regex.test(valor)) {
        campos.dni.error.textContent = "Debe ser un número de 7 u 8 dígitos";
        return false;
    }
    campos.dni.error.textContent = "";
    return true;
}

function validarReview() {
    if (campos.review.data.value.trim().length === 0) {
        campos.review.error.textContent = "Debe escribir una reseña";
        return false;
    }
    campos.review.error.textContent = "";
    return true;
}

function validarRadio() {
    const seleccionado = document.querySelector('input[name="radioReview"]:checked');
    if (!seleccionado) {
        radio_error.textContent = "Debe seleccionar una opción";
        return false;
    }
    radio_error.textContent = "";
    return true;
}

// ----- Eventos blur / focus -----

camposConfig.forEach(({ id, errorId, validar }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);

    input.addEventListener("blur", validar);
    input.addEventListener("focus", () => {
        error.textContent = "";
    });
});

// Los radios no tienen blur "tradicional", pero igual se puede validar
// cuando el foco sale del grupo y limpiar el error al enfocar cualquiera
document.querySelectorAll('input[name="radioReview"]').forEach((radio) => {
    radio.addEventListener("blur", validarRadio);
    radio.addEventListener("focus", () => {
        radio_error.textContent = "";
    });
});

// ----- Submit -----

form.addEventListener("submit", (e) => {
    e.preventDefault();

    dialog_data.innerHTML = "";

    const validaciones = camposConfig.map(({ validar }) => validar());
    validaciones.push(validarRadio());

    const formularioValido = validaciones.every((valido) => valido);

    if (!formularioValido) {
        const aviso = document.createElement("li");
        aviso.textContent = "Hay errores en el formulario, revisalos antes de continuar.";
        aviso.classList.add("error-item");
        dialog_data.appendChild(aviso);
    }

    camposConfig.forEach(({ id, label }) => {
        const item = document.createElement("li");
        const campo = campos[id];

        if (campo.error.textContent) {
            item.textContent = `${label}: ${campo.error.textContent}`;
            item.classList.add("error-item");
        } else if (id === "password" || id === "confirmPassword") {
            item.textContent = `${label}: ${"•".repeat(campo.data.value.length)}`;
        } else {
            item.textContent = `${label}: ${campo.data.value}`;
        }

        dialog_data.appendChild(item);
    });

    const seleccionado = document.querySelector('input[name="radioReview"]:checked');
    const itemRadio = document.createElement("li");
    if (radio_error.textContent) {
        itemRadio.textContent = `Experiencia: ${radio_error.textContent}`;
        itemRadio.classList.add("error-item");
    } else {
        itemRadio.textContent = `Experiencia: ${seleccionado.value}`;
    }
    dialog_data.appendChild(itemRadio);

    dialog.showModal();
});