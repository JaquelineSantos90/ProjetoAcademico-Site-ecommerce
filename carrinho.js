const listaCarrinho = document.getElementById('lista-carrinho');
const valorTotal = document.getElementById('valor-total');
const cartCounter = document.getElementById('cart-counter');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const preco = Number(item.preco) || 0;
    total += preco;

    const div = document.createElement('div');
    div.className = 'item-carrinho';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" width="40">
      <span><strong>${item.nome}</strong></span>
      <span>${item.descricao}</span>
      <span>R$ ${preco.toFixed(2)}</span>
      <button onclick="removerItem(${index})">Remover</button>
      <hr>
    `;
    listaCarrinho.appendChild(div);
  });

  valorTotal.textContent = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  cartCounter.textContent = carrinho.length;
}

// Finalizar compra
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verifica se o usuário está logado
  if (!usuario || !usuario.nome) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = 'login.html';
    return;
  }

  // Limpa carrinho
  localStorage.removeItem('carrinho');
  carrinho = [];
  atualizarCarrinho();

  // Mostra mensagem de sucesso
  mensagemSucesso.style.display = 'block';

  // Limpa o formulário
  e.target.reset();
});

atualizarCarrinho();
