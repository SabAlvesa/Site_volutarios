
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
  
      if (tabId === 'lista') {
        renderVolunteerList(document.getElementById('filter-input').value || '');
      }
    });
  });
  

  function carregarDadosUsuario() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      alert('Usuário não encontrado. Faça login novamente.');
      window.location.href = 'login.html';
      return;
    }
  
    document.getElementById('user-fullname').textContent = user.fullname;
    document.getElementById('user-name').textContent = user.fullname;
    document.getElementById('user-email').textContent = user.email;
  
    const endereco = `${user.rua || ''}, ${user.bairro || ''}, ${user.cidade || ''} - ${user.estado || ''}`;
    document.getElementById('user-address').textContent = endereco;
  
    const img = document.getElementById('user-photo');
    const photoUrl = `https://picsum.photos/160/160?random=${encodeURIComponent(user.fullname)}`;
  
    img.src = photoUrl;
    img.alt = `Foto de perfil de ${user.fullname}`;
    img.onerror = () => {
      img.src = 'https://source.unsplash.com/160x160';
    };
  }
  
 
  function renderVolunteerList(filter = '') {
    const volunteerUl = document.getElementById('volunteer-ul');
    volunteerUl.innerHTML = '';
  
    const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
  
   
    const filteredVolunteers = volunteers.filter(v =>
      v.fullname.toLowerCase().includes(filter.toLowerCase())
    );
  
    if (filteredVolunteers.length === 0) {
      volunteerUl.innerHTML = '<li>Nenhum voluntário encontrado.</li>';
      return;
    }
  
    filteredVolunteers.forEach((v, index) => {
      const li = document.createElement('li');
      li.textContent = v.fullname;
  
      
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.className = 'btn btn-secondary';
      removeBtn.style.marginLeft = '15px';
  
      removeBtn.onclick = () => {
        if (confirm(`Tem certeza que deseja remover ${v.fullname}?`)) {
         
          const idx = volunteers.findIndex(vol => vol.fullname === v.fullname);
          if (idx !== -1) {
            volunteers.splice(idx, 1);
            localStorage.setItem('volunteers', JSON.stringify(volunteers));
            renderVolunteerList(document.getElementById('filter-input').value);
          }
        }
      };
  
      li.appendChild(removeBtn);
      volunteerUl.appendChild(li);
    });
  }
  
  
  function deleteMyAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Nenhum usuário logado.');
      return;
    }
  
    if (confirm('Tem certeza que deseja excluir seu cadastro? Esta ação não pode ser desfeita.')) {
      
      let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
      volunteers = volunteers.filter(v => v.fullname !== user.fullname && v.email !== user.email);
      localStorage.setItem('volunteers', JSON.stringify(volunteers));
  
      
      localStorage.removeItem('user');
  
      alert('Seu cadastro foi excluído com sucesso.');
      window.location.href = 'index.html';
    }
  }
  
  
  document.getElementById('delete-account-btn').addEventListener('click', deleteMyAccount);
  document.getElementById('filter-input').addEventListener('input', e => {
    renderVolunteerList(e.target.value);
  });
  
  document.getElementById('clear-all-btn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todos os cadastros? Essa ação não pode ser desfeita.')) {
      localStorage.removeItem('volunteers');
      renderVolunteerList();
    }
  });
  

  document.getElementById('logout-btn').addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('user');
    alert('Você saiu da conta.');
    window.location.href = 'login.html';
  });
  
 
  window.addEventListener('DOMContentLoaded', () => {
    carregarDadosUsuario();
    renderVolunteerList();
  });
  