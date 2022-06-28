import React, { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import { useRouter } from "next/router";
import { postData } from "../../utils/fetchData";
import { toast } from "react-toastify";

function FormSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    postData("api/v1/participant/auth/signup", form)
      .then((res) => {
        if (res.data) {
          toast.success("Berhasil Signup", {
            position: "top-right",
            autoClose: "2000",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0">
      <TextInput
        label={"First Name"}
        type={"text"}
        name="firstName"
        value={form.firstName}
        placeholder={"First name here"}
        onChange={handleChange}
      />
      <TextInput
        label={"Last Name"}
        type={"text"}
        name="lastName"
        value={form.lastName}
        placeholder={"Last name here"}
        onChange={handleChange}
      />
      <TextInput
        label={"Email"}
        type={"email"}
        name="email"
        value={form.email}
        placeholder={"semina@bwa.com"}
        onChange={handleChange}
      />

      <TextInput
        label={"Password (6 characters)"}
        type={"password"}
        name="password"
        value={form.password}
        placeholder="Type your password"
        onChange={handleChange}
      />
      <TextInput
        label={"Role"}
        type={"text"}
        name="role"
        value={form.role}
        placeholder="Role"
        onChange={handleChange}
      />

      <div className="d-grid mt-2">
        <Button variant={"btn-green"} action={() => handleSubmit()}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default FormSignup;
