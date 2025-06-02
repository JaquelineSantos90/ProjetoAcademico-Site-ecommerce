document.addEventListener('DOMContentLoaded', () => {
  const divBoasVindas = document.getElementById('boas-vindas');
  const logoutBtn = document.getElementById('logout-btn');
  const loginLink = document.getElementById('login-link');
  const cadastroLink = document.getElementById('cadastro-link');

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.nome) {
    divBoasVindas.textContent = `Seja bem-vindo, aproveite as ofertas ${usuario.nome}! Boas compras!`;

    logoutBtn.style.display = 'inline';
    if (loginLink) loginLink.style.display = 'none';
    if (cadastroLink) cadastroLink.style.display = 'none';
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('usuario');
      alert('Você foi desconectado com sucesso!');
      window.location.href = 'login.html';
    });
  }

  // Inicializa carrinho vazio se não existir
  if (!localStorage.getItem('carrinho')) {
    localStorage.setItem('carrinho', JSON.stringify([]));
  }

  // Lógica dos botões de compra
  const botoesComprar = document.querySelectorAll('.produto button');

  botoesComprar.forEach((botao) => {
    botao.addEventListener('click', () => {
      const produtoElemento = botao.parentElement;
      const nome = produtoElemento.querySelector('h2').textContent;
      const descricao = produtoElemento.querySelector('p').textContent;
      const imagem = produtoElemento.querySelector('img').getAttribute('src');
      const precoTexto = produtoElemento.querySelector('.preco')?.textContent || "R$ 0,00";

      const preco = parseFloat(precoTexto.replace(/[^\d,]/g, '').replace(',', '.')) || 0;

      const novoItem = { nome, descricao, imagem, preco };

      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(novoItem);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      const irParaCarrinho = confirm("Produto adicionado! Deseja ir para o carrinho?");
      if (irParaCarrinho) {
        window.location.href = 'carrinho.html';
      }
    });
  });
});
