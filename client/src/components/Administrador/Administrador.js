import { useState } from 'react';
import './Administrador.css';
import axios from 'axios';

function Administrador() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [users, setUsers] = useState();

  (async () => {
    setUsers(await getUsers())
  })()

  async function getUsers () {
    let usuarios = ''
    const serverIP = process.env.REACT_APP_SERVER_IP
    const { data } = await axios.get(`${serverIP}/usuarios`)
    
    data.users.forEach((element, index) => {
      const { type, fullName, username, email } = element
      usuarios += `
        <tr id="${username}">
          <td>${index + 1}</td>
          <td>${type}</td>
          <td>${fullName}</td>
          <td>${username}</td>
          <td>${email}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteUser(${username})">
              Eliminar
            </button>
          </td>
        </tr>
      `
    })

    return usuarios
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault()

    const form = document.getElementById('userForm')
    const formData = new FormData(form)
    const re = /^(?=.*\d)(?=.*[!"#$%&/()=?'@+*{[},;.:_-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (!re.test(formData.get('password'))) {
      alert('La contraseña debe tener:\nLongitud mínima de 8 caracteres\n' +
        'Números\nUn carácter especial\nMayúsculas\nMinúsculas')
    } else if (formData.get('password') !== formData.get('passwordConfirmation')) {
      alert('Las contraseñas no coinciden.')
    } else {
      formData.delete('passwordConfirmation')
      const serverIP = process.env.REACT_APP_SERVER_IP
      const { data } = await axios.post(`${serverIP}/login/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert(data.msg)
      if (data.status) {
        window.location.reload()
      }
    }
  }

  const handleSubmitFlight = async (e) => {
    e.preventDefault()

    const form = document.getElementById('flightForm')
    form.reset()
  }

  const handleSubmitCar = async (e) => {
    e.preventDefault()

    const form = document.getElementById('carForm')
    form.reset()
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid row">
          <a class="navbar-brand pe-none col-2" href="#">AVICAR</a>

          <ul class="nav nav-pills col-8" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-usuarios-tab" data-bs-toggle="pill"
                data-bs-target="#pills-usuarios" type="button" role="tab" aria-controls="pills-usuarios"
                aria-selected="false">Usuarios</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-admin-vuelos-tab" data-bs-toggle="pill"
                data-bs-target="#pills-admin-vuelos" type="button" role="tab" aria-controls="pills-admin-vuelos"
                aria-selected="true">Vuelos</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-admin-autos-tab" data-bs-toggle="pill"
                data-bs-target="#pills-admin-autos" type="button" role="tab" aria-controls="pills-admin-autos"
                aria-selected="false">Autos</button>
            </li>
          </ul>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse col-2" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="profile" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Mi perfil
                </a>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><a class="dropdown-item pe-none" href="#">Usuario: {user.username}</a></li>
                  <li><a class="dropdown-item pe-none" href="#">Correo: {user.email}</a></li>
                  <li><a class="dropdown-item" href="/">Cerrar sesión</a></li>
                </ul>
              </li>
            </ul>
            <span class="badge bg-primary m-1">Administrador</span>
          </div>
        </div>
      </nav>

      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-usuarios" role="tabpanel" aria-labelledby="pills-usuarios-tab">
          <nav>
            <div class="nav nav-tabs mb-1" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-registrar-usuarios-tab" data-bs-toggle="tab"
                data-bs-target="#nav-registrar-usuarios" type="button" role="tab" aria-controls="nav-registrar-usuarios"
                aria-selected="true">Registrar</button>
              <button class="nav-link" id="nav-eliminar-usuarios-tab" data-bs-toggle="tab"
                data-bs-target="#nav-eliminar-usuarios" type="button" role="tab" aria-controls="nav-eliminar-usuarios"
                aria-selected="false">Eliminar</button>
            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-registrar-usuarios" role="tabpanel" aria-labelledby="nav-registrar-usuarios-tab">
              <form class="form mb-5" id="userForm" onSubmit={handleSubmitUser}>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="flexRadioDefault1" value="Turista" checked />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Turista
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="flexRadioDefault2" value="Recepcionista" />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Recepcionista
                    </label>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nombre completo</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" name="fullName" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Usuario</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="username" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Foto de perfil</label>
                  <input type="file" class="form-control" id="exampleInputPassword1" name="image" accept="image/*" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control" id="exampleInputPassword1" name="email" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" name="password" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Confirmación de contraseña</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" name="passwordConfirmation" required />
                </div>
                <button type="submit" class="btn btn-primary">Registrar</button>
              </form>
            </div>

            <div class="tab-pane fade" id="nav-eliminar-usuarios" role="tabpanel" aria-labelledby="nav-eliminar-usuarios-tab">
              <table class="table table-striped" id="tablaEliminarUsuarios">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Nombre completo</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="tbodyEliminarUsuarios" dangerouslySetInnerHTML={{ __html: users }} />
              </table>
            </div>
          </div>
        </div>

        <div class="tab-pane fade" id="pills-admin-vuelos" role="tabpanel" aria-labelledby="pills-admin-vuelos-tab">
          <nav>
            <div class="nav nav-tabs mb-1" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-registrar-vuelos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-registrar-vuelos" type="button" role="tab" aria-controls="nav-registrar-vuelos"
                aria-selected="true">Registrar</button>
              <button class="nav-link" id="nav-eliminar-vuelos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-eliminar-vuelos" type="button" role="tab" aria-controls="nav-eliminar-vuelos"
                aria-selected="false">Eliminar</button>
            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-registrar-vuelos" role="tabpanel" aria-labelledby="nav-registrar-vuelos-tab">
              <form class="form mb-5" id="flightForm" onSubmit={handleSubmitFlight}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nombre de la agencia</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" name="agencia" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Ciudad de origen</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="ciudadOrigen" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Ciudad de destino</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="ciudadDestino" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Precio de vuelo</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" name="precio" required />
                </div>
                <button type="submit" class="btn btn-primary">Registrar</button>
              </form>
            </div>

            <div class="tab-pane fade" id="nav-eliminar-vuelos" role="tabpanel" aria-labelledby="nav-eliminar-vuelos-tab">
              <table class="table table-striped" id="tablaEliminarVuelos">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre de la agencia</th>
                    <th scope="col">Ciudad de origen</th>
                    <th scope="col">Ciudad de destino</th>
                    <th scope="col">Precio de vuelo</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="tbodyEliminarVuelos"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="tab-pane fade" id="pills-admin-autos" role="tabpanel" aria-labelledby="pills-admin-autos-tab">
          <nav>
            <div class="nav nav-tabs mb-1" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-registrar-autos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-registrar-autos" type="button" role="tab" aria-controls="nav-registrar-autos"
                aria-selected="true">Registrar</button>
              <button class="nav-link" id="nav-eliminar-autos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-eliminar-autos" type="button" role="tab" aria-controls="nav-eliminar-autos"
                aria-selected="false">Eliminar</button>
            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-registrar-autos" role="tabpanel" aria-labelledby="nav-registrar-autos-tab">
              <form class="form mb-5" id="carForm" onSubmit={handleSubmitCar}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nombre de la agencia</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" name="agencia" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Marca</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="marca" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Placa</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="placa" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Modelo</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="modelo" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Precio</label>
                  <input type="number" class="form-control" id="exampleInputPassword1" name="precio" required />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Ciudad en la que se encuentra el vehículo</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" name="ciudad" required />
                </div>
                <button type="submit" class="btn btn-primary">Registrar</button>
              </form>
            </div>

            <div class="tab-pane fade" id="nav-eliminar-autos" role="tabpanel" aria-labelledby="nav-eliminar-autos-tab">
              <table class="table table-striped" id="tablaEliminarAutos">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre de la agencia</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="tbodyEliminarAutos"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Administrador;
