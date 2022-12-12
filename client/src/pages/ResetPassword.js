import React, { useState } from "react";
import axios from "axios";
import url from "../utils/url";
import FormRow from "../components/FormRow";
import useLocalState from "../utils/localState";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
  } = useLocalState();

  const query = useQuery();

  const handleChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      showAlert({ text: "Please enter password" });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${url}/api/v1/auth/reset-password`, {
        password,
        email: query.get("email"),
        passwordToken: query.get("token"),
      });
      setLoading(false);
      setSuccess(true);
      showAlert({ text: data.msg, type: "success" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  }

  return (
    <section className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={loading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>Reset Password</h4>
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
            placeholder="Enter new password..."
          />
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      )}
    </section>
  )
}