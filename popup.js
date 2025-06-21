let estadoCaptura = false;

document.getElementById("toggle").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, "toggleCaptura", (res) => {
      estadoCaptura = res.capturando;
      document.getElementById("toggle").textContent = estadoCaptura
        ? "Pausar Captura"
        : "Iniciar Captura";
    });
  });
});

document.getElementById("finalizar").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, "finalizar", (dados) => {
      const blob = new Blob([JSON.stringify(dados, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interacoes.json";
      a.click();
      URL.revokeObjectURL(url);
      estadoCaptura = false;
      document.getElementById("toggle").textContent = "Iniciar Captura";
    });
  });
});

document.getElementById("ver").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, "getInteracoes", (resposta) => {
      const resultado = document.getElementById("resultado");
      resultado.innerHTML = "<pre>" + JSON.stringify(resposta, null, 2) + "</pre>";
    });
  });
});

document.getElementById("print").addEventListener("click", () => {
  chrome.runtime.sendMessage("capturar", (res) => {
    const img = new Image();
    img.src = res.imagem;
    img.style.maxWidth = "100%";
    document.getElementById("resultado").appendChild(img);
  });
});
