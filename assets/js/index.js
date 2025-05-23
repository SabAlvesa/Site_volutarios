window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.fullname) {
     
      document.getElementById('presentation').style.display = 'none';
      document.getElementById('user-area').style.display = 'block';
      document.getElementById('user-name').textContent = user.fullname;
  
      
      const photoUrl = `https://picsum.photos/160/160?random=${encodeURIComponent(user.fullname)}`;
      const img = document.getElementById('user-photo');
      img.src = photoUrl;
      img.alt = `Foto de perfil de ${user.fullname}`;
      img.onerror = () => {
        img.src = 'https://source.unsplash.com/160x160'; 
      };
  
     
      document.getElementById('logout-btn').onclick = () => {
        localStorage.removeItem('user');
        location.reload();
      };
    } else {
      document.getElementById('presentation').style.display = 'block';
      document.getElementById('user-area').style.display = 'none';
    }
  };
  
  