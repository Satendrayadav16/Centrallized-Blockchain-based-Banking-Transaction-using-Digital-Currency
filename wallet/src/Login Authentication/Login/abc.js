import React from 'react'



const Abc = () => {

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });

  return (
    <div class="container">
        Hello
    <div class="forms-container">
      <div class="signin-signup">
        <form action="/login/1" method="POST" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          <input type="submit" value="Login" class="btn solid" />
        </form>
        <form action="/login/0" class="sign-up-form" method="POST">
        
     
          <h2 class="title">Sign up</h2>
<div class="name">
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />
        
          

          </div>
          <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                required
              />
            </div>

      </div>

      <div class="add">
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              name="address"
              type="text"
              placeholder="Address"
              required
            />
          </div>

          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="District"
              name="district"
              required
            />
          </div>
        </div>
        <div class="input-field">
          <i class="fas fa-envelope"></i>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
          />
        </div>

          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input
              type="number"
              name="phone_number"
              placeholder="Mobile Number"
              required
            />
          </div>

          <div class="pass">
              <div class="input-field">
                  <i class="fas fa-envelope"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div class="input-field">
                  <i class="fas fa-envelope"></i>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
          </div>

          <input type="submit" class="btn" id="btn-me" value="Sign up" />
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <button class="btn transparent" id="sign-up-btn">Sign up</button>
        </div>
        <img src="img/log.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button class="btn transparent" id="sign-in-btn">Sign in</button>
        </div>
        <img src="img/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
  )
}

export default Abc