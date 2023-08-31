
import axios from "axios";
import classes from "./register.module.css";


    try {
      const response = await axios.post("http://localhost:5050/auth/VerifyOtp", {
        phone: phone,
        password: password,
      });
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
    }
  

  return (
    <div id ="authFormContainer" className={classes.authFormContainer}>
      <h2 id ="label">Verify OTP</h2>
      <form className={classes.registerForm}>
        <label id ="label" htmlFor="phone">Enter Your OTP</label>
        {/* <input
          value={otp}
          type="otp"
          placeholder="XXXX"
          id="otp"
          pattern="[0-9]{5}-[0-9]{5}"
          name="otp"
          
        /> */}
      
        <button onClick={signupByPhone} id ="link"><Link to={"/Register_Details_page"}>Verify OTP </Link></button>
      
      </form>

     
    </div>
  );

