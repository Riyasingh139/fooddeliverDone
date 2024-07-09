import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Thank = () =>{
    let {id}=useParams();

 return <>
<div className="contents">
  <div className="wrapper-1">
    <div className="wrapper-2">
      <h1 className="h1thkn">Thank you !</h1>
      <p>Thanks for Order Your Order Saved. </p>
      <p className="canel">you should receive a confirmation email soon  </p>
      <br />
      <Link to="/" className="go-home ">
      go home
      </Link>
    </div>
    <div className="footer-like">
      <p>Your Order Id #{id}
      </p>
    </div>
</div>
</div>



 </>
}
export default Thank;