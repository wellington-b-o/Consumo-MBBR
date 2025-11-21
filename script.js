const URL_DO_SCRIPT = "https://script.google.com/macros/s/AKfycbz0kztSeGuKXhTtS9DL_tuObee_Gm7xryh1bnhQ78770q5JTQW8ptAeUCwJnEAvHvqJ/exec";

// PINs válidos
const usuarios = {
    "2222": "Dayvid",
    "4321": "Joabison",
    "5678": "Dayvi",
    "8765": "teste"
};

let usuarioLogado = null;

// --------------------------------------
// LOGIN POR PIN
// --------------------------------------
function validarPIN() {
    const pin = document.getElementById("pin").value.trim();
    const erro = document.getElementById("erro-pin");

    if (usuarios[pin]) {
        usuarioLogado = usuarios[pin];

        document.getElementById("usuarioLogado").textContent = usuarioLogado;

        document.getElementById("login-container").classList.add("escondido");
        document.getElementById("painel-container").classList.remove("escondido");
    } else {
        erro.textContent = "PIN inválido!";
    }
}

// --------------------------------------
// ENVIAR LEITURA
// --------------------------------------
function enviarLeitura() {
    const leitura = document.getElementById("leitura").value.trim();
    const msg = document.getElementById("mensagem");

    if (leitura === "") {
        msg.style.color = "red";
        msg.textContent = "Digite a leitura!";
        return;
    }

    fetch(URL_DO_SCRIPT, {
        method: "POST",
        body: new URLSearchParams({
            leitura: leitura,
            usuario: usuarioLogado
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.result === "success") {
            msg.style.color = "green";
            msg.textContent = "Leitura enviada com sucesso!";
            document.getElementById("leitura").value = "";
        } else {
            msg.style.color = "red";
            msg.textContent = "Erro: " + data.message;
        }
    })
    .catch(err => {
        msg.style.color = "red";
        msg.textContent = "Falha ao enviar!";
    });
}

// --------------------------------------
// SAIR
// --------------------------------------
function logout() {
    usuarioLogado = null;
    document.getElementById("painel-container").classList.add("escondido");
    document.getElementById("login-container").classList.remove("escondido");
    document.getElementById("pin").value = "";
}
