// =======================================================
// script.js — compatível com a planilha "CONSUMO AGUA"
// =======================================================

// Cole aqui a URL publicada do seu Apps Script:
const URL_DO_SCRIPT = "https://script.google.com/macros/s/AKfycbwLctK4OP5a6SgFnEFtz4EkxgrNEklD9R21P-KPLGRV0vxM5UIi8H--HPjUFZzxA2Y/exec";

// --- Seleção dos elementos HTML ---
const form = document.getElementById("meuFormulario");
const btnEnviar = document.getElementById("btnEnviar");
const btnBuscar = document.getElementById("btnBuscar");
const dadosContainer = document.getElementById("dados-container");

// =======================================================
// 1️⃣ — Enviar leitura (POST)
// =======================================================
form.addEventListener("submit", function(e) {
  e.preventDefault();
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Salvando...";

  const formData = new FormData(form);
  const leitura = formData.get("leitura");

  fetch(URL_DO_SCRIPT, {
    method: "POST",
    body: new URLSearchParams({ leitura })
  })
  .then(r => r.json())
  .then(data => {
    if (data.result === "success") {
      alert("Leitura salva com sucesso!");
      form.reset();
      btnBuscar.click(); // Atualiza histórico
    } else {
      throw new Error(data.message);
    }
  })
  .catch(err => {
    console.error("Erro ao enviar:", err);
    alert("Erro ao enviar: " + err.message);
  })
  .finally(() => {
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Salvar Leitura";
  });
});

// =======================================================
// 2️⃣ — Buscar histórico (GET)
// =======================================================
btnBuscar.addEventListener("click", function() {
  btnBuscar.disabled = true;
  dadosContainer.innerHTML = "<p>Carregando dados...</p>";

  fetch(URL_DO_SCRIPT)
    .then(r => r.json())
    .then(data => {
      if (data.result === "success") {
        exibirDadosConsumo(data.data);
      } else {
        throw new Error(data.message);
      }
    })
    .catch(err => {
      console.error("Erro ao buscar:", err);
      dadosContainer.innerHTML = "<p>Erro ao buscar dados.</p>";
    })
    .finally(() => {
      btnBuscar.disabled = false;
    });
});

// =======================================================
// 3️⃣ — Exibir histórico na tela
// =======================================================
function exibirDadosConsumo(dados) {
  dadosContainer.innerHTML = "";

  if (!dados || dados.length === 0) {
    dadosContainer.innerHTML = "<p>Nenhum dado encontrado.</p>";
    return;
  }

  // Mostra os mais recentes primeiro
  dados.reverse();

  dados.forEach(item => {
    const div = document.createElement("div");
    div.className = "dado-item";

    const dataObj = new Date(item.data);
    const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    div.innerHTML = `
      <div><strong>Data:</strong> ${dataFormatada}</div>
      <div><strong>Leitura:</strong> ${item.leitura?.toFixed(2) ?? "-"} m³</div>
      <div><strong>Consumo do Dia:</strong> ${item.consumoDia?.toFixed(2) ?? "-"} L</div>
    `;
    dadosContainer.appendChild(div);
  });
}
