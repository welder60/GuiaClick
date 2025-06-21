let interacoes = [];

document.addEventListener("click", (e) => {
  const info = {
    tipo: "clique",
    tag: e.target.tagName,
    texto: e.target.innerText,
    quando: new Date().toISOString()
  };
  interacoes.push(info);
  console.log("Interação registrada:", info);
});

document.addEventListener("keydown", (e) => {
  const info = {
    tipo: "tecla",
    tecla: e.key,
    quando: new Date().toISOString()
  };
  interacoes.push(info);
  console.log("Interação registrada:", info);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getInteracoes") {
    sendResponse(interacoes);
  }
});
