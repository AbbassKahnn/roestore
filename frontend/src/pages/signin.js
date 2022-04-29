import { useState } from "react";
import AlertModal from "../components/model/alert";
import { PostAPIService } from "../services";

const SignIn = () => {
    //LOGIN state
  const [isLogin, setIsLogin] = useState(false);
  // for signUp
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    password: '',
  });

  const {
    user_name,
    first_name,
    last_name,
    email,
    address,
    password,
  } = formData;
// get data from form inputs field
  const onChangeFormData = (e) => {
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value});
  }
    //success or failure message
  const [message, setMessage] = useState();
      //message heading
    const [msgHeading, setMsgHeading]= useState();
    // API CALL for logIn
  const Login = (e) => {
    e.preventDefault();
    PostAPIService('http://localhost:5000/users/login', formData).then((res)=> {
      localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
      if(res?.data?.data?.user.user_name === 'admin'){
        window.location.replace('/orders');

      }else{
        // redirects to Home page
        window.location.replace('/');

      }
    }).catch(err=>{
      localStorage.removeItem("user");
      setMsgHeading('Oops!');
      setMessage('Invalid username or password')
    console.log("🚀 ~ file: signin.js ~ line 34 ~ PostAPIService ~ err", err)
    })
  }
//API call for registrating a user
  const Registration = (e) => {
    e.preventDefault();
    PostAPIService('http://localhost:5000/users', formData).then((res)=> {
      localStorage.setItem("user", JSON.stringify(res?.data?.data[0]));
      window.location.replace('/');
    }).catch(err=>{
      localStorage.removeItem("user");
    console.log("🚀 ~ file: signin.js ~ line 34 ~ PostAPIService ~ err", err)
    })
  }
// closes success or failure modal
  const closeAlert = () =>{
    setMessage('');
    setMsgHeading('');
}
  return (
    <>
    
      <div className="container">
      {message && <AlertModal 
                    action={closeAlert} 
                     message={message} 
                    msgHeading={msgHeading} 
                    />}
        {isLogin ? <form onSubmit={Login}>
          <h2>SignIn </h2>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="username">User Name / Email</label>
                <input type="text" className="form-control" name="user_name" id="username" value={user_name} onChange={onChangeFormData} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={password} onChange={onChangeFormData} />
              </div>
            </div>
          </div>
          
          <div className="radio">
            <p>Don't have an account <span className="cursor-pointer"><strong onClick={() => setIsLogin(false)}>Sign Up</strong></span></p>
          </div>
          
          <button type="submit" className="btn btn-primary">Login</button>
        </form> 
        :
        <form onSubmit={Registration}>
        <h2>SignUp</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="first">First Name</label>
              <input type="text" className="form-control" name="first_name" value={first_name} onChange={onChangeFormData} id="first" required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label for="last">Last Name</label>
              <input type="text" className="form-control" name="last_name" value={last_name} onChange={onChangeFormData} id="last"  />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="username">User Name</label>
              <input type="text" className="form-control" name="user_name" value={user_name} onChange={onChangeFormData} id="username" required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label for="email">Email address</label>
              <input type="email" className="form-control" name="email" value={email} onChange={onChangeFormData} id="email" required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="address">Address</label>
              <input type="text" className="form-control" name="address" value={address} onChange={onChangeFormData} id="address" required  />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={onChangeFormData} id="password" required  />
            </div>
          </div>
        </div>
        <div className="radio">
          <p>Already have an account <span className="cursor-pointer"><strong onClick={() => setIsLogin(true)}>Login</strong></span></p>
        </div>
        
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form> }
      </div>
    </>
  );
}

export default SignIn;