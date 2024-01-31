


import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { submitForm2Data } from "../Redux/Action";
import { useNavigate } from "react-router-dom";

import "./form1.css";

const SignupSchema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.string().optional().matches(/^[0-9]+$/, "Must be a numeric value"),
});

export default function Form2() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);

  const fetchCountries = async (inputValue) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${inputValue}`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const onCountryInputChange = async (inputValue) => {
    if (inputValue) {
      fetchCountries(inputValue);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
    dispatch(submitForm2Data(data)); 
    navigate("/display");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Address</label>
        <input {...register("address")} />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      <div>
        <label>State</label>
        <input type="text" {...register("state")} />
        {errors.state && <p>{errors.state.message}</p>}
      </div>

      <div>
        <label>City</label>
        <input type="text" {...register("city")} />
        {errors.city && <p>{errors.city.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <input
         {...register("country")} list="countryOptions"
          type="text"
          name="country"
          onChange={(e) => onCountryInputChange(e.target.value)}
        />
       

              {/* <input {...register} list="countryOptions" /> */}
              <datalist id="countryOptions">
                {countries.map((country) => (
                  <option key={country.name.common} value={country.name.common} />
                ))}
              </datalist>
          
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
        <label>Pincode</label>
        <input type="text" {...register("pincode")} />
        {errors.pincode && <p>{errors.pincode.message}</p>}
      </div>

      <input type="submit" value="Next" />
    </form>
  );
}

