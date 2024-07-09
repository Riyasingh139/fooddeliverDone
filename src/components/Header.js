import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Header = (props) => {
  let [newUser, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  })
  let saveNewUser = async () => {
    let url = `https://finalapi-58a2.onrender.com/api/create-user-account`;
    let { data } = await axios.post(url, { ...newUser })
    if (data.stauts === true) {
      alert("Your Accounr Is Created NoW");
      window.location.assign('/')

      // window.location.assign("/restro/:id")
    }
    else {
      alert("Sorry !")
      window.location.assign('/')

    }
    

  }
  let [login, setlogin] = useState({
    username: "",
    password: ""
  })
  let loginset = async () => {
    let url = `https://finalapi-58a2.onrender.com/api/login-account`;
    let { data } = await axios.post(url, { ...login });
  if (data.status === true) {
    alert("successfully login")
    window.location.assign('/')

    
    }
    else {
      alert("wrong login")
      window.location.assign('/');
    }
    const token = data.token;
const decoded = jwtDecode(token);
console.log(decoded);
window.localStorage.setItem('username', decoded.name);
window.localStorage.setItem('email', decoded.email);
window.localStorage.setItem('address', decoded.address);
window.localStorage.setItem('mobile', decoded.mobile);




  }
  return (
    <>
      <div className="modal fade" id="Createaccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog po">
          <div className="modal-content">
            <div className="modal-header  ">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create An Account</h1>
              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <section className="p-2">
                <div className="form-floating mb-2">
                  <input type="text" className="form-control" required value={newUser.name} onChange={(event) => { setUser({ ...newUser, name: event.target.value }) }} />
                  <label htmlFor="form-label">Name</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="email" className="form-control" required value={newUser.email} onChange={(event) => { setUser({ ...newUser, email: event.target.value }) }} />
                  <label htmlFor="form-label">Email</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="number" className="form-control"  required value={newUser.mobile} onChange={(event) => { setUser({ ...newUser, mobile: event.target.value }) }} />
                  <label htmlFor="form-label">Mobile NO</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="password" className="form-control"  required value={newUser.password} onChange={(event) => { setUser({ ...newUser, password: event.target.value }) }} />
                  <label htmlFor="form-label">Password</label>
                </div>
                <div className="form-floating mb-2">
                  <textarea class="form-control" rows="3" required value={newUser.address} onChange={(event) => { setUser({ ...newUser, address: event.target.value }) }}></textarea>
                  <label htmlFor="form-label">Address</label>

                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={saveNewUser}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header ">
              <h1 className="modal-title " id="login">Login</h1>

              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <section className="p-2">
                <div className="form-floating mb-4">
                  <input type="email" className="form-control" value={login.username} onChange={(event) => { setlogin({ ...login, username: event.target.value }) }} />
                  <label htmlFor="form-label">Email</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="password" className="form-control" value={login.password} onChange={(event) => { setlogin({ ...login, password: event.target.value }) }} />
                  <label htmlFor="form-label">Password</label>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={loginset}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
      <section className="row head-colr  ">
        <header className="margin-head col-10 justify-content-lg-between justify-content-md-between py-2  d-lg-flex d-md-flex  d-none ">
          <section>
            <p className="m-0 logo-header ">e!</p>
          </section>
          <section>
            <button className="btn text-white p-2  " data-bs-toggle="modal" data-bs-target="#login">Login</button>
            <button className="btn btn-outline-light create " data-bs-toggle="modal" data-bs-target="#Createaccount" >Create An Account</button>
          </section>
        </header>
        <section className="col-12 mt-2  mb-1 d-flex justify-content-end d-lg-none d-md-none " data-bs-toggle="collapse" data-bs-target="#side">
          <span><i className="fa-solid fa-bars fa-lg mt-2 xx"></i></span>
        </section>
        <section className="collapse row ms-2 " id="side">
          <section className="col-12 d-flex justify-content-end d-lg-none d-md-none m-0 mb-1 ">
            <button className="btn  text-white p-2  " data-bs-toggle="modal" data-bs-target="#login">Login</button>
          </section>
          <section className="col-12  d-flex justify-content-end d-lg-none d-md-none ">
            <button className="btn   btn-outline-light mb-2 " data-bs-toggle="modal" data-bs-target="#Createaccount" >Create An Account</button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Header;
