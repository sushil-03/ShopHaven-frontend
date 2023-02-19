import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import TextField from "../layout/common/TextField";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import CheckoutStep from "../cart/CheckoutStep.js";
import { useNavigate } from "react-router-dom";
import BungalowIcon from "@mui/icons-material/Bungalow";
const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingInfo = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPin] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert.error("Phone Number should be 10 digits long.");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <div className="w-full h-full m-auto grid place-items-center my-10">
      <MetaData title="Shipping" />
      <div className="container  w-full  h-screen rounded-lg border-2  m-auto shadow-2xl overflow-scroll ">
        <h1 className="p-4 mb-4 font-bold text-2xl font-roboto">
          Shipping Details
        </h1>
        <CheckoutStep activeStep={0} />
        <div className="pt-20">
          <form
            className="grid place-items-center gap-5 mx-2"
            onSubmit={shippingSubmit}
            encType="multipart/form-data"
          >
            <div className="flex gap-5 justify-center items-center ">
              {/* <Label id=""> <HomeIcon /></Label> */}
              <label htmlFor="address">
                <HomeIcon />
              </label>

              <TextField
                type="text"
                id="address"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex gap-5 items-center">
              <label htmlFor="city">
                <LocationCityIcon />
              </label>
              <TextField
                type="text"
                id="city"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex gap-5 items-center">
              <label htmlFor="pin">
                <PinDropIcon />
              </label>
              <TextField
                type="number"
                id="pin"
                placeholder="Pin Code"
                value={pinCode}
                required
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="phone">
                <PhoneIcon />
              </label>
              <TextField
                id="phone"
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="country">
                <PublicIcon />
              </label>
              <TextField
                id="country"
                type="text"
                placeholder="Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="state">
                <BungalowIcon />
              </label>
              <TextField
                id="state"
                type="text"
                placeholder="State"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            {/* 44 */}
            {/* <div className="flex gap-5 ">
              <label htmlFor="country">
                <PublicIcon />
              </label>
              <div className=" flex   justify-between flex-col  gap-4 items-center">
                <input
                  type="text"
                  value={country}
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <select
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="text-sm p-2 w-28 h-full border font-roboto  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {country && (
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-28 p-2 text-sm  h-full border font-roboto  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div> */}
            <input
              type="submit"
              value="Continue"
              className="bg-black font-bold text-white p-4 rounded-lg uppercase"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
