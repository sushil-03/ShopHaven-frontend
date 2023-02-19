import React, { useRef } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const sendInfo = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hcj6u9f",
        "template_qyt7izl",
        form.current,
        "z-wPJMT9V0o5oHSwN"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen">
      <div className="heading text-center mb-8">
        <h2 className="font-bold text-4xl mt-5">Contact Us</h2>
        <span className=" mt-5 text-gray-400 ">
          Any question or remarks? Just write us a message!
        </span>
      </div>

      <div className="container w-4/5 flex  m-auto mt-5 border rounded-md shadow-xl">
        <div className="left md:block hidden w-2/5 relative bg-[#3e1f93] rounded-lg  text-white overflow-hidden p-4 m-2">
          <div className=" mt-5 mb-9 ">
            <h3 className="text-3xl font-semibold font-roboto text-white my-3">
              Contact Information
            </h3>
            <span className="text-[#8a78be]">
              Fill up the form and I will get back to you within 24 hours.
            </span>
          </div>
          <div className="helper mb-10">
            <div className="my-10">
              <CallIcon className=" text-[#fd9f9f]" />
              <span className="ml-3 text-[#d0c9e5]">+0123 4567 8910</span>
            </div>
            <div className="my-10">
              <EmailIcon className=" text-[#fd9f9f]" />{" "}
              <span className="ml-3 text-[#d0c9e5]">hello@shophaven.com</span>
            </div>
            <div className="mt-10 mb-20">
              <LocationOnIcon className=" text-[#fd9f9f]" />{" "}
              <span className="ml-3 text-[#d0c9e5]">
                Dehradun Uttarakhand India
              </span>
            </div>
          </div>
          <div className="tags  w-52 flex justify-center gap-6 mb-8">
            <Link to="https://twitter.com/sushil_0_3">
              <span className="h-12 w-12 rounded-full hover:bg-[#fd9f9f] p-2 z-40">
                <TwitterIcon />
              </span>
            </Link>
            <Link to="https://www.instagram.com/sushil_rawat__/">
              <span className="h-12 w-12  rounded-full hover:bg-[#fd9f9f] p-2 z-40">
                <InstagramIcon />
              </span>
            </Link>
            <Link to="https://www.linkedin.com/in/sushil-rawat-77265019b/">
              <span className="h-12 w-12  rounded-full hover:bg-[#fd9f9f] p-2 z-40">
                <LinkedInIcon />
              </span>
            </Link>
          </div>
          <div className="absolute w-72 h-72 bg-[#fd9f9f] -bottom-32 -right-36 rounded-full"></div>
        </div>
        <div className="right w-3/4 pl-12 m-2 pt-5 font-roboto">
          <form onSubmit={sendInfo} ref={form}>
            <div className="inputTage flex flex-wrap gap-5 items-center">
              <div className="w-64  flex flex-col ">
                <label htmlFor="first_name " className="text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="first_name"
                  className=" outline-none  py-2 border-b-2 focus:border-[#3e1f93]"
                  placeholder="Raju"
                />
              </div>
              <div className=" w-64  flex flex-col">
                <label htmlFor="last_name " className="text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last"
                  id="last_name"
                  className=" outline-none  py-2 border-b-2 focus:border-[#3e1f93]"
                  placeholder="Rastogi"
                />
              </div>
              <div className=" w-64  flex flex-col">
                <label htmlFor="mail" className="text-sm">
                  Mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="@gmail.com"
                  className=" outline-none  py-2 border-b-2 focus:border-[#3e1f93]"
                  id="email"
                />
              </div>
              <div className="w-64  flex flex-col">
                <label htmlFor="first_name" className="text-sm">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  className=" outline-none  py-2 border-b-2 focus:border-[#3e1f93]"
                  id="phone"
                  placeholder="012 3456 789"
                />
              </div>
              <div className="w-64  flex flex-col">
                <label htmlFor="first_name" className="text-sm">
                  Message
                </label>
                <textarea
                  rows="5"
                  cols="25"
                  name="message"
                  type="number"
                  className="mt-2 p-3 border focus:border-[#3e1f93]"
                  placeholder="Write here..."
                />
              </div>
              <div className=" w-64 md:h-40 h-20 relative">
                <button
                  className="bg-[#3e1f93] font-bold text-white rounded-md w-44 h-14 absolute  bottom-0  right-0 "
                  onClick={sendInfo}
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
