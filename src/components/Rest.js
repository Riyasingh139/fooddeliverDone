import { useParams } from "react-router-dom"
import Header from "../components/Header"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Rest =()=>{
  let {id} =useParams();
  let [restrodetal,setDetails]=useState(null);
  let [menulist,setMenulist]=useState([])
  let [totalprice,settotalprice]=useState(0)
    // Define a state variable for the input field with an initial value of "hello"
    const usernam = localStorage.getItem('username');
    if(!usernam){
alert("Pls login Or Create Account");
window.location.assign('/');


    }

    const email=localStorage.getItem('email');
    const address=localStorage.getItem('address')
    const mobile=localStorage.getItem('mobile')
    const [inputValue, setInputValue] = useState(usernam);
    const [emailvalue, setEmailValue] = useState(email);
    const[addressvalue,setAddress]=useState(address);
    const[mobivalue,setMobile]=useState(mobile);
    // Handle changes to the input field
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      setEmailValue(event.target.value);
      setAddress(event.target.value)
     

    };
  
  
  let getRestaurantDetails = async () => {
    let url = `https://finalapi-58a2.onrender.com/api/get-restaurant-details-by-id/${id}`;
    let response = await fetch(url, { method: "GET" });
    let data = await response.json();
    setDetails(data.result);


  };
  // const authToken = localStorage.getItem('authToken');
  let getMenuList =async() =>{
    let url = `https://finalapi-58a2.onrender.com/api/get-menu-items-by-restaurant-id/${id}`;
    let response = await fetch(url, { method: "GET" });
    let data = await response.json();
    setMenulist(data.result);
  }
  let addQty = (index)=>{
    settotalprice(menulist[index].price + totalprice);
    menulist[index].qty +=1;
    setMenulist([...menulist]);
    toast("Item Add To Cart");
   
  }
  let removeQty = (index) =>{
    settotalprice(totalprice - menulist[index].price  );
    menulist[index].qty -=1;
    setMenulist([...menulist]);
    toast("Item Remove To Cart");
    
  }
  let makePayment =async() => {
    let url= `https://finalapi-58a2.onrender.com/api/create-orderId`;
    let {data} = await axios.post(url,{amount: totalprice})
    let {order} =data
    // console.log(res);
    // return false;
    var options = {
      key: "rzp_test_MLK6nxzrDt8vQW", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato Clone ",
      description: "Make Payment to get orders",
      image: "https://w7.pngwing.com/pngs/356/244/png-transparent-zomato-hd-logo-thumbnail.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        let userData=menulist.filter((menu)=>menu.qty > 0)
        let sendData={
          payment_id:response.razorpay_payment_id,
          order_id:response.razorpay_order_id,
          signature:response.razorpay_signature,
          userData,
          inputValue,
          email,
          mobile
        }
        let url= `https://finalapi-58a2.onrender.com/api/verify-payment`;
        var {data} = await axios.post(url,sendData)   
        let conn= `https://finalapi-58a2.onrender.com/api/orderData`;
        var {data} = await axios.post(conn,sendData)  
       
        if(data. stauts === true)
        {
          window.location.assign("/thank/" + sendData.order_id);
          console.log(sendData)

        }else{
          alert("failed !");
        }
        

      },
      prefill: {
        name: inputValue,
        email: emailvalue,
        contact:mobivalue ,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  useEffect(()=>{
    getRestaurantDetails();
  },[])

    return <>
      {restrodetal !== null ? (

    <>
 <div
            className="modal fade"
            id="slideShow"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg " style={{ height: "75vh" }}>
              <div className="modal-content">
               <div className="modal-header">
              <h5 className="modal-title about" id="exampleModalToggleLabel">
                Gallery @ {restrodetal.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
                <div className="modal-body h-75">
                  { <Carousel showThumbs={false} infiniteLoop={true}>
                    {restrodetal.thumb.map((value, index) => {
                      return (
                        <div key={index} className="w-100 img55">
                          <img src={"/image/" + value} className="img55"/>
                        </div>
                      );
                    })}
                  </Carousel> }
                </div>
              </div>
            </div>
          </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title about" id="exampleModalToggleLabel">
                Menu @ {restrodetal.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
           { menulist.map((menu,index)=>{
            return ( 
            <div className="row p-2" key={menu._id} >
            <div className="col-8">
              <p className="mb-1 h6 name name-restro">{menu.name}</p>
              <p className="mb-1 clrp">Rs. {menu.price} /-</p>
              <p className="small text-muted clrp">{menu.description}</p>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <div className="menu-food-item">
                <img src={`/image/${menu.image}`} className="menu-img" alt="" />
                {
                  menu.qty === 0 ?(
                    <section>
                      <button
                      className="btn btn-primary btn-sm add"
                      onClick={()=>addQty(index)}
                    >
                      Add
                    </button>
                    <ToastContainer />
                    </section>
                  ): <div className="order-item-count section ">
                    <span
                      className="hand" 
                      onClick={()=>removeQty(index)}

                    >
                      -
                    </span>
                    <ToastContainer />
                    <span>{menu.qty}</span>
                    <span
                      className="hand"
                      onClick={()=>addQty(index)}
                    >
                      +
                    </span>
                  </div>
             
                }
                  
               
                 
              </div>
            </div>
            <hr className=" p-0 my-2" />
          </div>
            )
           })
                 
           
           }
           
                <div className="d-flex justify-content-between">
                  <h3>Total ₹{totalprice}</h3>
                  <button
                    className="btn btn-danger"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Process
                  </button>
                </div>
            
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Personal Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter full Name"
                  value={inputValue}
                  onChange={handleInputChange}  
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={emailvalue}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                  
                >
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={addressvalue}
                  readOnly
                  onChange={handleInputChange}

                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button className="btn btn-success" onClick={makePayment} >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
          <div className="row justify-content-center">
            <Header bgColor="bg-danger" />
          </div>
     
   <div className="row justify-content-center ">
        <div className="col-10 d-lg-block d-md-block d-none">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="restaurant-main-image menu-img  position-relative">
                <img src={`/image/${restrodetal.image}`} alt=""  />
                <button
                  className="btn btn-outline-light position-absolute btn-gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#slideShow"
                >
                  Click To Get Image Gallery
                </button>
              </div>
            </div>
            <div className="col-12">
              <h3 className="mt-4 mb-4 name2">{restrodetal.name}</h3>
              <div className="d-flex   justify-content-between">
                <ul className="list-unstyled liststyle2 d-flex gap-3">
                  <li
                   className="orver"
                  >
                    Overview
                  </li>

                </ul>
                <a
                      className="btn btn-danger btn4 align-self-start"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalToggle"
                      role="button"
                      onClick={getMenuList}
                    >
                      Menus
                </a>
                
               
              </div>
              <hr className="mt-0" />
              
                <div className="over-view">
                  <p className="h5 mb-4 mt-4 about">About this place</p>

                  <p className="mb-0 clr2 fw-bold">Cuisine</p>
                  <p className="clrp">
                  {restrodetal.cuisine.map((value)=>{
                    return value.name
                  }).join(", ")}
                  </p>

                  <p className="mb-0 clr2  mt-3 fw-bold">Average Cost</p>
                  <p className="clrp">₹ {restrodetal.min_price} /- for two people (approx.)</p>
                </div>
            
                <div className="over-view">
                  <p className="mb-0 mt-3  clr2 fw-bold">Phone Number</p>
                  <p className="clrp">{restrodetal.contact_number}</p>

                  <p className="mb-0 mt-3 clr2  fw-bold">Address</p>
                  <p className="clrp mb-5">
                    {restrodetal.locality} , {restrodetal.city}
                  </p>
                </div>
           
            </div>
          </div>
        </div>
        
            <div className="col-12 d-md-none d-lg-none d-block mt-4">
              <div className="ollll position-relative">
                <img src={`/image/${restrodetal.image}`} alt="" className="olol  menu-img" />
                <button
                      className="btn btn-outline-light position-absolute btn-gallery"
                      data-bs-toggle="modal"
                      data-bs-target="#slideShow"
                    >
                      Click To Get Image Gallery
                    </button>
              </div>
              <div className="col-10 details d-md-none d-lg-none d-block ">
              <h3 className="mt-4 mb-4 name">{restrodetal.name}</h3>
              <div className="d-flex justify-content-between">
                <ul className="list-unstyled liststyle   d-flex gap-3">
                  <li
                   
                  >
                    Overview
                  </li>
                  
                </ul>
                <a
                      className="btn btn-danger  align-self-start"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalToggle"
                      role="button"
                      onClick={getMenuList}
                    >
                      Menus
                </a>
              </div>
              <hr className="mt-0" />
              
                <div className="over-view">
                  <p className="h5 mb-4 clr ">About this place</p>

                  <p className="mb-0 clr2 fw-bold">Cuisine</p>
                  <p className="clrp">
                  {restrodetal.cuisine.map((value)=>{
                    return value.name
                  }).join(", ")}
                  </p>

                  <p className="mt-3 clr2 fw-bold">Average Cost</p>
                  <p className="clrp">₹ {restrodetal.min_price} /- for two people (approx.)</p>
                </div>
            
                <div className="over-view">
                  <p className="mt-3 clr2 fw-bold">Phone Number</p>
                  <p className="clrp">{restrodetal.contact_number}</p>

                  <p className="mt-3 clr2 fw-bold">Address</p>
                  <p className="mb-5 clrp">
                  {restrodetal.locality} , {restrodetal.city}
                  </p>
                </div>
           
            </div>

            </div>
      </div>

    </>
    ) : null}

    </>
}
export default Rest;