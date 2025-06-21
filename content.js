let interacoes = [];
let capturando = false;

// Coleta informações básicas do elemento clicado
function dadosElemento(el) {
  const rect = el.getBoundingClientRect();
  return {
    tag: el.tagName,
    texto: el.innerText,
    id: el.id || null,
    classes: el.className || null,
    href: el.href || null,
    bounding: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
  };
}

// Retorna o div pai mais próximo, caso exista
function divPaiMaisProximo(el) {
  while (el && el !== document.body) {
    if (el.tagName === "DIV") return el;
    el = el.parentElement;
  }
  return null;
}

// Captura screenshot da aba e recorta a região do elemento
// ou do div pai mais próximo, se existir
function capturarRegiao(el, cb) {
  const alvo = divPaiMaisProximo(el) || el;
  const rect = alvo.getBoundingClientRect();
  chrome.runtime.sendMessage("capturar", (res) => {
    if (!res || !res.imagem) {
      cb(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const ratio = window.devicePixelRatio || 1;
      const canvas = document.createElement("canvas");
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        rect.x * ratio,
        rect.y * ratio,
        rect.width * ratio,
        rect.height * ratio,
        0,
        0,
        rect.width * ratio,
        rect.height * ratio
      );
      cb(canvas.toDataURL("image/png"));
    };
    img.src = res.imagem;
  });
}

function registrar(info) {
  if (!capturando) return;
  interacoes.push(info);
  console.log("Interação registrada:", info);
}

// Registra cliques e captura a região clicada
document.addEventListener("click", (e) => {
  if (!capturando) return;
  const info = Object.assign(
    {
      tipo: "clique",
      quando: new Date().toISOString(),
    },
    dadosElemento(e.target)
  );

  capturarRegiao(e.target, (img) => {
    if (img) info.screenshot = img;
    registrar(info);
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
    if (
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") &&
      capturando
    ) {
      const info = Object.assign(
        {
          tipo: "input",
          valor: e.target.value,
          quando: new Date().toISOString(),
        },
        dadosElemento(e.target)
      );

      capturarRegiao(e.target, (img) => {
        if (img) info.screenshot = img;
        registrar(info);
        console.log("Screenshot capturada.");
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
