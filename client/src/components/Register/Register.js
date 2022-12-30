import './Register.css';
import axios from 'axios';

function Register() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const form = document.getElementById('form')
    const formData = new FormData(form)
    formData.set('type', 'turista')
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
        window.location.href = '/'
      }
    }
  }

  return (
    <section class="vh-100% gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div class="card-body p-5">

                <div class="mb-md-4 mt-md-4">

                  <h2 class="fw-bold mb-2 text-center">Sign up to AviCar</h2>
                  <p class="text-white-50 mb-5 text-center">Please enter your data!</p>

                  <form id="form" onSubmit={handleSubmit}>
                    <div class="form-floating mb-4">
                      <input type="text" class="form-control text-bg-dark" id="floatingFullName" name="fullName" placeholder="Full name" required />
                      <label for="floatingFullName">Full name</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input type="text" class="form-control text-bg-dark" id="floatingUsername" name="username" placeholder="Username" required />
                      <label for="floatingUsername">Username</label>
                    </div>

                    <div class="mb-4">
                      <label for="formFile" class="form-label">Profile picture</label>
                      <input class="form-control text-bg-dark" type="file" id="formFile" name="image" accept="image/*" required />
                    </div>

                    <div class="form-floating mb-4">
                      <input type="email" class="form-control text-bg-dark" id="floatingEmail" name="email" placeholder="Email address" required />
                      <label for="floatingEmail">Email address</label>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="password" class="form-control text-bg-dark" id="floatingPassword" name="password" placeholder="Password" required />
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="password" class="form-control text-bg-dark" id="floatingPasswordConfirmation" name="passwordConfirmation" placeholder="PasswordConfirmation" required />
                      <label for="floatingPasswordConfirmation">Password confirmation</label>
                    </div>

                    <div class="text-center">
                      <button class="btn btn-outline-light btn-lg px-5" type="submit">Sign up</button>
                    </div>
                  </form>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
