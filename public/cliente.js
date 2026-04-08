let token = localStorage.getItem('api_token');
let currentUser = JSON.parse(localStorage.getItem('user_data'));
let currentMode = 'login';
let editItemId = null;

const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const authForm = document.getElementById('auth-form');
const authSubmitBtn = document.getElementById('auth-submit');
const authError = document.getElementById('auth-error');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const nameGroup = document.getElementById('name-group');

const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');
const itemsList = document.getElementById('items-list');
const addItemBtn = document.getElementById('add-item-btn');

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const itemForm = document.getElementById('item-form');
const cancelModal = document.getElementById('cancel-modal');

document.addEventListener('DOMContentLoaded', () => {
      if (token) {
                showDashboard();
      } else {
                showAuth();
      }
});

tabLogin.onclick = () => setAuthMode('login');
tabRegister.onclick = () => setAuthMode('register');

function setAuthMode(mode) {
      currentMode = mode;
      tabLogin.classList.toggle('active', mode === 'login');
      tabRegister.classList.toggle('active', mode === 'register');
      nameGroup.style.display = mode === 'register' ? 'flex' : 'none';
      authSubmitBtn.innerText = mode === 'login' ? 'Iniciar Sesion' : 'Registrarse';
      authError.innerText = '';
}

authForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const nombre = document.getElementById('nombre').value;

      const endpoint = currentMode === 'login' ? '/api/usuarios/acceso' : '/api/usuarios/registro';
      const body = currentMode === 'login' ? { email, password } : { nombre, email, password };

      try {
                const res = await fetch(endpoint, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(body)
                });

          const data = await res.json();

          if (res.ok) {
                        if (currentMode === 'register') {
                                          alert('Registro exitoso! Ahora puedes iniciar sesion.');
                                          setAuthMode('login');
                        } else {
                                          saveSession(data.token, data.usuario);
                                          showDashboard();
                        }
          } else {
                        authError.innerText = data.error || 'Ocurrio un error inesperado.';
          }
      } catch (err) {
                authError.innerText = 'No se pudo conectar con el servidor.';
      }
};

function saveSession(t, u) {
      token = t;
      currentUser = u;
      localStorage.setItem('api_token', t);
      localStorage.setItem('user_data', JSON.stringify(u));
}

function showAuth() {
      authSection.style.display = 'block';
      dashboardSection.style.display = 'none';
}

function showDashboard() {
      authSection.style.display = 'none';
      dashboardSection.style.display = 'block';
      userDisplay.innerText = currentUser.nombre;
      fetchItems();
}

logoutBtn.onclick = () => {
      localStorage.removeItem('api_token');
      localStorage.removeItem('user_data');
      token = null;
      currentUser = null;
      showAuth();
};

async function fetchItems() {
      const res = await fetch('/api/elementos', {
                headers: { 'Authorization': `Bearer ${token}` }
      });

    if (res.status === 401) {
              logoutBtn.click();
              return;
    }

    const items = await res.json();
      renderItems(items);
}

function renderItems(items) {
      itemsList.innerHTML = items.length ? '' : '<p class="text-muted">No hay elementos creados aun.</p>';
      items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item-card fade-in';
                div.innerHTML = `
                            <h3>${item.nombre}</h3>
                                        <p>${item.descripcion || 'Sin descripcion'}</p>
                                                    <div class="item-card-actions">
                                                                    <button class="btn-edit" onclick="openEditModal('${item.id}', '${item.nombre}', '${item.descripcion || ''}')">Editar</button>
                                                                                    <button class="btn-delete" onclick="deleteItem('${item.id}')">Eliminar</button>
                                                                                                </div>
                                                                                                        `;
                itemsList.appendChild(div);
      });
}

addItemBtn.onclick = () => {
      editItemId = null;
      modalTitle.innerText = 'Nuevo Elemento';
      itemForm.reset();
      modal.style.display = 'flex';
};

function openEditModal(id, nombre, desc) {
      editItemId = id;
      modalTitle.innerText = 'Editar Elemento';
      document.getElementById('item-nombre').value = nombre;
      document.getElementById('item-descripcion').value = desc;
      modal.style.display = 'flex';
}

cancelModal.onclick = () => modal.style.display = 'none';

itemForm.onsubmit = async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('item-nombre').value;
      const descripcion = document.getElementById('item-descripcion').value;

      const method = editItemId ? 'PUT' : 'POST';
      const url = editItemId ? \`/api/elementos/\${editItemId}\` : '/api/elementos';

          const res = await fetch(url, {
                  method,
                          headers: { 
                                      'Content-Type': 'application/json',
                                                  'Authorization': \`Bearer \${token}\`
                                                          },
                                                                  body: JSON.stringify({ nombre, descripcion })
                                                                      });

                                                                          if (res.ok) {
                                                                                  modal.style.display = 'none';
                                                                                          fetchItems();
                                                                                              } else {
                                                                                                      alert('Error al guardar el elemento.');
                                                                                                          }
                                                                                                          };
                                                                                                          
                                                                                                          async function deleteItem(id) {
                                                                                                              if (!confirm('Estas seguro de eliminar este elemento?')) return;
                                                                                                              
                                                                                                                  const res = await fetch(\`/api/elementos/\${id}\`, {
                                                                                                                          method: 'DELETE',
                                                                                                                                  headers: { 'Authorization': \`Bearer \${token}\` }
                                                                                                                                      });
                                                                                                                                      
                                                                                                                                          if (res.ok) {
                                                                                                                                                  fetchItems();
                                                                                                                                                      } else {
                                                                                                                                                              alert('Error al eliminar el elemento.');
                                                                                                                                                                  }
                                                                                                                                                                  }
                                                                                                                                                                  
