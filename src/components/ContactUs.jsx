import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactUs.css";

const Contact = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const email = form.current.email.value;
    const username = form.current.username.value;
    const phone = form.current.phone.value;

    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!username.trim()) {
      newErrors.username = "Name is required";
    }

    if (phone && !/^(57)?\d{10}$/.test(phone)) {
      newErrors.phone =
        "Invalid phone number. Must be 10 digits, optionally starting with '57'.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = () => {
    setErrors({});
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      emailjs
        .sendForm(
          "service_i2fdtm9",
          "template_e1kdj6o",
          form.current,
          "OheQdJStKuMccOfYe"
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("message sent");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="wrapper">
      <div className="login-box">
        <form ref={form} onSubmit={sendEmail} action="">
          <h2 className="h2-margin">Contact Us! </h2>

          <div className="input-box">
            <span className="icon">
              <ion-icon name="email"></ion-icon>
            </span>
            <input
              type="email"
              name="email"
              required
              onChange={handleInputChange}
            />
            <label>Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="text"
              name="username"
              required
              onChange={handleInputChange}
            />
            <label>Name</label>
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="input-box">
            <span className="icon">
              <ion-icon name="call"></ion-icon>
            </span>
            <input
              type="text"
              name="phone"
              onChange={handleInputChange}
              required
            />
            <label>Phone</label>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="input-box">
            <input type="text" name="message" />
            <label>Message</label>
          </div>

          <input className="button" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
