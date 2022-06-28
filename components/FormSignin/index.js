import React, { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import { useRouter } from "next/router";
import { postData } from "../../utils/fetchData";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function FormSignin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await postData("api/v1/participant/auth/signin", form);
      toast.success("Berhasil Signin", {
        position: "top-right",
        autoClose: "2000",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Cookies.set("token", res.data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
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
      <div className="d-grid mt-2 gap-4">
        <Button variant={"btn-green"} action={handleSubmit}>
          Sign in
        </Button>
        <Button variant={"btn-navy"} action={() => router.push("/signup")}>
          Create New Account
        </Button>
      </div>
    </form>
  );
}

export default FormSignin;
