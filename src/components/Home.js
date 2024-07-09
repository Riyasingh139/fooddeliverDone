import { useEffect } from "react";
import { useState } from "react";
import  axios  from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
const Home = () =>{
  let [mealType,setMealtype] = useState([]);
  let [placeholdertext,setplaceholder]=useState("Get A Loction")
  let [placeholder,setplace]=useState("Loding")

  let [getloction,setloction]=useState([])
  let [getRestro,setRestro] =useState([])
  let navigate = useNavigate();
  let getMealTypes =async()=>{
    let url=`https://finalapi-58a2.onrender.com/api/get-meal-type-list`
    let response =await fetch(url,{method:'GET'});
    let data= await response.json();
    setMealtype(data.result)
  }
  // call this api one page load 
  // mounting 
  // hook useEffect
  let [newUser,setUser]=useState({
    name: "",
    mobile:"",
    email: "",
    address: "",
    password: "",
   })
   let saveNewUser=async ()=>{
    let url= `https://finalapi-58a2.onrender.com/api/create-user-account`;
    let {data} = await axios.post(url,{...newUser})
    if(data.stauts === true)
    {
      alert("Your Accounr Is Created NoW");
      window.location.assign('/');
      // window.location.assign("/restro/:id")
    }
    else{
      alert("Sorry !")
    }
  }
  let [login, setlogin] = useState({
    username: "",
    password: ""
  })
  let loginset = async () => {
    let url = `https://finalapi-58a2.onrender.com/api/login-account`;
    let { data } = await axios.post(url, { ...login });
    console.log(data);
    if (data.status === true) {
        alert("successfully login" )
        window.location.reload();
        } else {
      alert("Invalid Username or Password")

    }
    const token = data.token;
const decoded = jwtDecode(token);
console.log(decoded);
window.localStorage.setItem('username', decoded.name);
window.localStorage.setItem('email', decoded.email);
window.localStorage.setItem('address', decoded.address);
window.localStorage.setItem('mobile', decoded.mobile);
  };
  
  useEffect(()=>{
    getMealTypes();
  },[]);
  console.log(mealType)
  let getloctionlist=async()=>{
    setplaceholder("Getting a loction list....")
    setRestro([])
    let url=`https://finalapi-58a2.onrender.com/api/get-loc`
    let response =await fetch(url,{method:'GET'});
    let data= await response.json();
    setloction(data.result)
  }
  console.log(getloction)
  let getRestrobyId=async(id,name,city)=>{
    let url=`https://finalapi-58a2.onrender.com/api/get-resto-list-by-id/${id}`
    let response =await fetch(url,{method:'GET'});
    let data= await response.json();
    if(data.result.length  === 0)
    {
      alert ("No Found")
    }
    // setloction(data.result)
    console.log(data)
    setplaceholder(`${name} , ${city}`)
    setloction([])
    setRestro(data.result)
    setplace("FETCH DATA FROM SERVER")

  }
    return <>
  
    <main className="container-fluid imge  ">
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
              <input type="text" className="form-control" required value={newUser.name}  onChange={(event)=>{setUser({...newUser,name:event.target.value})}}/>
                <label htmlFor="form-label">Name</label>
              </div>
              <div className="form-floating mb-2">
                <input type="email" className="form-control" required value={newUser.email} onChange={(event)=>{setUser({...newUser,email:event.target.value})}}/>
                <label htmlFor="form-label">Email</label>

              </div>
              <div className="form-floating mb-2">
              <input type="number" className="form-control" required value={newUser.mobile} onChange={(event)=>{setUser({...newUser,mobile:event.target.value})}}/>
                <label htmlFor="form-label">Mobile NO</label>
                
              </div>
              <div className="form-floating mb-2">
              <input type="password" className="form-control" required value={newUser.password} onChange={(event)=>{setUser({...newUser,password:event.target.value})}}/>
                <label htmlFor="form-label">Password</label>
              </div>
              <div className="form-floating mb-2">
              <textarea class="form-control"  rows="3" required value={newUser.address} onChange={(event)=>{setUser({...newUser,address:event.target.value})}}></textarea>
                <label htmlFor="form-label">Address</label>
              </div>
              </section>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success"onClick={saveNewUser}>Sign Up</button>
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
    <section className="row ">
        <header className="col-11 m-auto mt-2 d-lg-flex d-md-flex justify-content-lg-end  justify-content-md-end d-none ">
            <section className="">
                <button className="btn text-white p-2  " data-bs-toggle="modal" data-bs-target="#login">Login</button>
                <button className="btn btn-outline-light " data-bs-toggle="modal" data-bs-target="#Createaccount">Create An Account</button>
            </section>
        </header>
        <section className="col-12 mt-2  mb-1 d-flex justify-content-end d-lg-none d-md-none " data-bs-toggle="collapse" data-bs-target="#side">
                <span><i className="fa-solid fa-bars fa-lg mt-2 h"></i></span> 
        </section>
        <section className="collapse row ms-2 " id="side">
            <section className="col-12 d-flex justify-content-end d-lg-none d-md-none m-0 mb-1 ">
                <button className="btn  text-white p-2 " data-bs-toggle="modal" data-bs-target="#login">Login</button>
            </section>
            <section className="col-12  d-flex justify-content-end d-lg-none d-md-none ">
                <button className="btn  btn-outline-light " data-bs-toggle="modal" data-bs-target="#Createaccount">Create An Account</button>
            </section>
        </section>
    </section>
    <section className="row ">
        <div className="col-11 m-auto mt-3 d-flex justify-content-center align-items-center fw-bold bg-white brand-logo ">
            e!
        </div>

    </section>
    <section className="row ">
        <div className="col-lg-12 col-md-12 d-none fw-bold mt-4 d-lg-flex d-md-flex justify-content-center main-text text-white">
            Find the best restaurants, cafés, and bars
        </div>
        <div className="col-12 d-flex d-lg-none d-md-none mt-4 text-white fw-bold justify-content-center main-text1">
           <p className="m-0 p-0"> Find the best restaurants,</p>
        </div>
        <div className="col-12 d-flex d-lg-none d-md-none  text-white fw-bold justify-content-center main-text1">
            <p className="m-0 p-0"> cafés, and bars,</p>
         </div>
    </section>
   <section>
    <section className="row ">
      
      <div className="col-lg-12 col-md-12 mt-4 d-lg-flex d-md-flex d-none align-items-center justify-content-center mar1 ">
          <section  className=" loc-ul">
          <input type="text" name="" id="" className="input wid" placeholder={placeholdertext} readOnly onFocus={getloctionlist}/ >
          <ul className="list-group ">
  {
    getloction.map((loc)=>{
      return <li key ={loc._id}className="list-group-item" onClick={()=>getRestrobyId(loc.location_id,loc.name,loc.city
        )}>{loc.name} , {loc.city} </li>
    })
  }
</ul>
          </section>
          <section className="res d-flex search-res">
              <span
          ><i className="fa fa-search search-icon sa" aria-hidden="true"></i
        ></span>
              <input type="text" name="" id="" className="input2" placeholder="Search for restaurants" readOnly/>
              <ul className="list-group ok">
              {
                getRestro.map((rest)=>{
                  return   <li key ={rest._id}className="list-group-item" onClick={()=>navigate("/restro/"+ rest._id)}><img src={`./image/${rest.image}`} className="me-3" style={{width:"43px",height:"43px", borderRadius:"50%" }} alt="" srcset="" />{rest.name} , {rest.city} </li>
                })
              }
  </ul>
          </section>
      </div>
        <div className="col-lg-12 col-md-12 col-12  mt-4 d-lg-none d-md-none d-block align-items-center  justify-content-center mb-5  ">
          <section className="re1 d-flex  px-0 loc-min">
            <input type="text" name="" id="" className="input3 me-3" placeholder={placeholdertext} readOnly onFocus={getloctionlist}/ >
            <ul className="list-group ">
              { 
                getloction.map((loc)=>{
                  return   <li key ={loc._id}className="list-group-item" onClick={()=> getRestrobyId(loc.location_id,loc.name,loc.city)} >{loc.name} , {loc.city} </li>
                })

              }
  </ul>
        </section>
          <section className="res d-flex ser-res">
              <span
          ><i className="fa fa-search search-icon sa" aria-hidden="true"></i
        ></span>
              <input type="text" name="" id="" className="input2 me-3" placeholder="Search for restaurants" readOnly />
              <ul className="list-group ok">
              {
                getRestro.map((rest)=>{
                  return   <li key ={rest._id}className="list-group-item" onClick={()=>navigate("/restro/"+rest._id)}><img src={`./image/${rest.image}`} className="me-3" style={{width:"43px",height:"43px", borderRadius:"50%" }} alt="" srcset="" />{rest.name} , {rest.city} </li>
                })
              }
  </ul>
          </section>
        </div>
      </section>
  </section>
</main>
<main className="container-fluid  ">
  <div className="row  ">
      <div className="col-9 m-lg-auto mt-lg-3   ms-0  mt-md-3  col-lg-10 col-md-11 ">
          <h1 className="mt-3 mb-2 ms-1 align-items-md-start   ms-1 fs-2 colr1 ">Quick Searches</h1>
       
          <p className=" ms-1 ms-lg-1 ms-md-1 mt-0 p-0   colr ">Discover restaurants by type of meal</p>
          
      </div>
  </div>
    <div className="row ms-lg-1 ms-md-1 ms-0 me-0 mb-3 gap-lg-5 gap-3 gap-md-5 align-content-start pt-4 justify-content-center pb-0">
      {
        mealType.map((value , index)=>{
          return <div key={value._id} onClick ={()=>navigate("/search/"+value.meal_type+"/"+value.name)}className="col-12  col-lg-3   col-md-5 mb-1 gap-1 d-flex bor  px-0  ">
          <img src={`/image/${value.image}`} alt="" className="list-item-image"/>
                <section className=" p-3 ">
              <p className="m-0 fw-bold text-dark cart1">{value.name}</p>
              <p className="m-0 text-muted cart2">{value.content}
</p>
           </section>
          </div> 
        })
      }
      
  </div>  
</main>
</>
    
}
export default Home;