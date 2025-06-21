let interacoes = [];
let capturando = false;

function registrar(info) {
  if (!capturando) return;
  interacoes.push(info);
  console.log("Interação registrada:", info);
}

document.addEventListener("click", (e) => {
  registrar({
    tipo: "clique",
    tag: e.target.tagName,
    texto: e.target.innerText,
    quando: new Date().toISOString(),
  });
});

document.addEventListener("keydown", (e) => {
  registrar({
    tipo: "tecla",
    tecla: e.key,
    quando: new Date().toISOString(),
  });
});

// Registra o valor informado em inputs e tira screenshot ao perder o foco
document.addEventListener(
  "blur",
  (e) => {
    if ((e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") && capturando) {
      registrar({
        tipo: "input",
        valor: e.target.value,
        quando: new Date().toISOString(),
      });

      chrome.runtime.sendMessage("capturar", (res) => {
        if (res && res.imagem) {
          registrar({
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
  } else if (msg === "toggleCaptura") {
    capturando = !capturando;
    sendResponse({ capturando });
  } else if (msg === "finalizar") {
    capturando = false;
    sendResponse(interacoes);
    interacoes = [];
  }
});
