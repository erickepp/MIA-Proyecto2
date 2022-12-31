import './Login.css';
import axios from 'axios';

function Login() {
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = document.getElementById('form')
    const formData = new FormData(form)
    const re = /^(?=.*\d)(?=.*[!"#$%&/()=?'@+*{[},;.:_-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (!re.test(formData.get('password'))) {
      alert('La contraseña debe tener:\nLongitud mínima de 8 caracteres\n' +
        'Números\nUn carácter especial\nMayúsculas\nMinúsculas')
    } else {
      const serverIP = process.env.REACT_APP_SERVER_IP
      const { data } = await axios.post(`${serverIP}/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (data.status) {
        localStorage.setItem('user', JSON.stringify(data.user))

        if (data.user.type === 'admin') {
          window.location.href = '/administrador'
        } else if (data.user.type === 'Turista') {
          window.location.href = '/turista'
        } else {
          window.location.href = '/Recepcionista'
        }
      } else {
        alert(data.msg)
      }
    }
  }

  return (
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2">Sign in to AviCar</h2>
                  <p class="text-white-50 mb-5">Please enter your login and password!</p>

                  <form id="form" onSubmit={handleSubmit}>
                    <div class="form-floating mb-4">
                      <input type="text" id="typeUsernameOrEmailX" name="usernameOrEmail" class="form-control text-bg-dark" placeholder="Username or email address" required />
                      <label class="form-label" for="typeUsernameOrEmailX">Username or email address</label>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="password" id="typePasswordX" name="password" class="form-control text-bg-dark" placeholder="Password" required />
                      <label class="form-label" for="typePasswordX">Password</label>
                    </div>

                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Sign in</button>
                  </form>

                </div>

                <div>
                  <p class="mb-0">Don't have an account? <a href="/register" class="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
