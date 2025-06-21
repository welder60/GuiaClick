# GuiaClick

GuiaClick é uma extensão para o Google Chrome que registra interações do usuário em páginas web (como cliques e teclas pressionadas) e tira capturas de tela da aba visível. Com isso, você pode montar tutoriais ou esboços em HTML com base no que foi feito na página.

## Funcionalidades

- Registra cliques e teclas.
- Captura screenshots da aba ativa.
- Permite iniciar e pausar a captura.
- Finaliza a sessão e salva um arquivo HTML com as capturas e descrições.
- Exibe os dados registrados em um painel popup.
- Gera uma base para criação de tutoriais.

## Como instalar

1. Baixe ou clone este repositório.
2. Abra o Chrome e vá em `chrome://extensions/`.
3. Ative o **Modo do desenvolvedor** (canto superior direito).
4. Clique em **"Carregar sem compactação"**.
5. Selecione a pasta da extensão (`minha-extensao/`).

## Como usar

1. Acesse qualquer página da web.
2. Clique no ícone da extensão.
3. Use os botões:
   - **Iniciar/Pausar Captura**: alterna o registro de interações.
   - **Finalizar e Salvar**: encerra a sessão e baixa um arquivo HTML com as interações.
   - **Ver Interações**: lista os cliques e teclas capturados.
   - **Capturar Tela**: tira um print da aba atual e exibe no popup.

## Estrutura dos arquivos

- `manifest.json`: define permissões e arquivos da extensão.
- `content.js`: registra eventos de clique e teclado.
- `background.js`: gerencia a captura de tela.
- `popup.html`: interface do popup.
- `popup.js`: controla a lógica da interface.

## Observações

- A captura de tela recorta a região do elemento clicado quando possível.
- Os dados são mantidos apenas em memória enquanto a página estiver aberta.
- O arquivo HTML gerado ao finalizar inclui todas as interações e screenshots.
- Após o salvamento a extensão fica pronta para iniciar uma nova captura.

## Licença

MIT
