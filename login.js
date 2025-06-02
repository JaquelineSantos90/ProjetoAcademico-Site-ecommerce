document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Recupera usuários salvos do localStorage
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado.');
      return;
    }

    if (usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
      alert(`Seja bem-vindo, aproveite as ofertas, ${usuarioSalvo.nome}!`);
      window.location.href = 'loja.html';
    } else {
      alert('Email ou senha incorretos.');
    }
  });
});
