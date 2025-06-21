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

// Registra o valor informado em inputs e tira screenshot ao perder o foco
document.addEventListener(
  "blur",
  (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      const info = {
        tipo: "input",
        valor: e.target.value,
        quando: new Date().toISOString(),
      };
      interacoes.push(info);
      console.log("Interação registrada:", info);

      chrome.runtime.sendMessage("capturar", (res) => {
        if (res && res.imagem) {
          interacoes.push({
            tipo: "screenshot",
            imagem: res.imagem,
            quando: new Date().toISOString(),
          });
          console.log("Screenshot capturada.");
        }
      });
    }
  },
  true
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "getInteracoes") {
    sendResponse(interacoes);
  }
});
