import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeadingTitle from "../base-component/HeadingTitle";
import ParaText from "../base-component/ParaText";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="py-5 sm:py-10">
      <HeadingTitle
        className=""
        bottomDescription="Manage Your Book Collection with Ease."
        topDescription="Organized Efficiency"
      >
        Login
      </HeadingTitle>
      <div className="mb-3 mt-9 bg-transparent pb-6">
        <LoginForm />
      </div>
      <div className="mt-9 bg-transparent">
        <ParaText>
        Effortlessly organize and manage your book collection. Log in now to view, add, edit, and delete books. Experience seamless book management across all devices. Start maximizing your collection organization today with Your Book Library!
        </ParaText>
      </div>
    </div>
  );
};

export default Login;
