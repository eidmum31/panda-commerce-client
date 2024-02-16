import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/Authprovider";
import Swal from "sweetalert2";

const Register = () => {
  const {createUser}=useContext(AuthContext);
  const handleRegister=(e)=>{
    e.preventDefault();
    const form=e.target;
    const email=form.email.value;
    const password=form.password.value;
    console.log(email,password);
    createUser(email,password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      Swal.fire({
        title: "WELL DONE!",
        text: "Successfully created account!",
        icon: "success"
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
       
      });
    });
  }
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto mt-[200px]">
      <h1 className="text-center text-3xl pt-4 font-semibold">Register</h1>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            name="email"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            name="password"
            required
          />
          <p className="label font-semibold">
            <small>
              Already have an account?{" "}
              <Link className="underline" to={`/login`}>
                Log In
              </Link>
            </small>
          </p>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
