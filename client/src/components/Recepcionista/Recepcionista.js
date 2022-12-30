import { useState } from 'react';
import './Recepcionista.css';

function Recepcionista() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid row">
          <a class="navbar-brand pe-none col-2" href="#">AVICAR</a>

          <ul class="nav nav-pills col-8" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-solicitudes-tab" data-bs-toggle="pill"
                data-bs-target="#pills-solicitudes" type="button" role="tab" aria-controls="pills-solicitudes"
                aria-selected="true">Solicitudes</button>
            </li>
          </ul>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse col-2" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <button type="button" id="imageRecepcionista" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src={user.image} width="65" />
              </button>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Mi perfil
                </a>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><a class="dropdown-item pe-none" href="#">Nombre: {user.fullName}</a></li>
                  <li><a class="dropdown-item pe-none" href="#">Usuario: {user.username}</a></li>
                  <li><a class="dropdown-item pe-none" href="#">Correo: {user.email}</a></li>
                  <li><a class="dropdown-item" href="/">Cerrar sesión</a></li>
                </ul>
              </li>
            </ul>
            <span class="badge bg-primary m-1">Recepcionista</span>
          </div>
        </div>
      </nav>

      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-solicitudes" role="tabpanel" aria-labelledby="pills-solicitudes-tab">
          <nav>
            <div class="nav nav-tabs mb-1" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-solicitud-vuelos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-solicitud-vuelos" type="button" role="tab" aria-controls="nav-solicitud-vuelos"
                aria-selected="true">Vuelos</button>
              <button class="nav-link" id="nav-solicitud-autos-tab" data-bs-toggle="tab"
                data-bs-target="#nav-solicitud-autos" type="button" role="tab" aria-controls="nav-solicitud-autos"
                aria-selected="false">Autos</button>
            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-solicitud-vuelos" role="tabpanel" aria-labelledby="nav-solicitud-vuelos-tab">
              <table class="table table-striped" id="tablaSolicitudVuelos">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre de usuario</th>
                    <th scope="col">Nombre de la agencia</th>
                    <th scope="col">Ciudad de origen</th>
                    <th scope="col">Ciudad de destino</th>
                    <th scope="col">Precio de vuelo</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="tbodySolicitudVuelos"></tbody>
              </table>
            </div>

            <div class="tab-pane fade" id="nav-solicitud-autos" role="tabpanel" aria-labelledby="nav-solicitud-autos-tab">
              <table class="table table-striped" id="tablaSolicitudAutos">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre de usuario</th>
                    <th scope="col">Nombre de la agencia</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="tbodySolicitudAutos"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Foto de perfil</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src={user.image} width="465" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recepcionista;
