chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "capturar") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      sendResponse({ imagem: dataUrl });
    });
    return true; // necessário para usar sendResponse assíncrono
  }
});
