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
