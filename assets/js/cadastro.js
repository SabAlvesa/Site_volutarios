
document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
  
    if (cep.length !== 8) {
      alert('CEP inválido. Deve conter 8 dígitos.');
      return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao consultar o CEP.');
        return response.json();
      })
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }
  
       
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
      })
      .catch(error => {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar o endereço. Tente novamente.');
      });
  });
  

  document.getElementById('signup-form').onsubmit = function (e) {
    e.preventDefault();
  
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const cep = document.getElementById('cep').value.trim();
    const password = document.getElementById('password').value;
  
    
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
  
   
    if (isNaN(age) || age < 18) {
      alert('Você deve ter 18 anos ou mais para se cadastrar.');
      return;
    }
  
    
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cep)) {
      alert('Digite um CEP válido (ex: 12345-678).');
      return;
    }
  
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Digite um e-mail válido.');
      return;
    }
  
    
    if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
  
    
    const newUser = {
      fullname,
      email,
      username,
      age,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      password
    };
  
    
    localStorage.setItem('user', JSON.stringify(newUser));
  
   
    let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
  

    const alreadyExists = volunteers.some(v => v.fullname === fullname || v.email === email);
    if (!alreadyExists) {
      volunteers.push({ fullname, email });
      localStorage.setItem('volunteers', JSON.stringify(volunteers));
    }
  
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'usuario.html';
  };
  
