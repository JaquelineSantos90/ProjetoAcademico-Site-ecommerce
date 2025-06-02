document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita envio automático

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const dataNascimento = document.getElementById('data-nascimento').value;
    const genero = document.getElementById('genero').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validações
    if (nome === '') {
      alert('Por favor, preencha o nome.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email inválido.');
      return;
    }

    if (!validarIdade(dataNascimento)) {
      alert('Você precisa ter pelo menos 16 anos.');
      return;
    }

    if (genero === '') {
      alert('Por favor, selecione o gênero.');
      return;
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Salvando usuário no localStorage
    const usuario = {
      nome,
      email,
      senha,
      dataNascimento,
      genero
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Cadastro realizado com sucesso!');
    form.reset(); // Limpa os campos
  });

  function validarIdade(data) {
    const hoje = new Date();
    const nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade >= 16;
  }
});
