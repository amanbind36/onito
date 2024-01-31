// import React,{useState} from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const AadharSchema = yup.object().shape({
//   govtId: yup
//     .string()
//     .matches(/^[2-9]\d{11}$/, 'Invalid Aadhar number')
//     .test('not-starts-with-zero-one', 'Aadhar should not start with 0 or 1', (value) => !/^[01]/.test(value)),
// });

// const PANSchema = yup.object().shape({
//   govtId: yup.string().matches(/^[a-zA-Z0-9]{10}$/, 'Invalid PAN number'),
// });

// const SignupSchema = yup.object().shape({
//   name: yup.string().required().min(3),
//   age: yup.number().positive().integer().required(),
//   sex: yup.string().required().oneOf(['Male', 'Female']),
//   mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
//   govtIdType: yup.string().required().oneOf(['Aadhar', 'PAN']),
//  govtId: yup.string().when('govtIdType', {
//     is: 'Aadhar',
//     then: AadharSchema,
//     otherwise: PANSchema,
//   }),
// });

// export default function SignIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: yupResolver(SignupSchema)
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
//   };
//     const [selectedOption, setSelectedOption] = useState(null);


//      const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     setValue("govtId", ""); // Clear the input field when the option changes
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Name</label>
//         <input {...register("name")} />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>

//       <div>
//         <label>Age</label>
//         <input type="number" {...register("age", { valueAsNumber: true })} />
//         {errors.age && <p>{errors.age.message}</p>}
//       </div>

//       <div>
//         <label>Sex</label>
//         <select {...register("sex")}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         {errors.sex && <p>{errors.sex.message}</p>}
//       </div>

//       <div>
//         <label>Mobile</label>
//         <input {...register("mobile")} />
//         {errors.mobile && <p>{errors.mobile.message}</p>}
//       </div>

//          <div>
//         <label>Govt Id Type</label>
//         <select {...register("govtIdType")}  onChange={(e) => handleOptionChange(e.target.value)}>
//           <option value="Aadhar">Aadhar</option>
//           <option value="PAN">PAN</option>
//         </select>
//         {errors.govtIdType && <p>{errors.govtIdType.message}</p>}
//       </div>

//         <div>
//         <label>Govt Id</label>
//         {selectedOption === "Aadhar" ? (
//           <input {...register("govtId", { ...AadharSchema.fields.govtId })} type="number" />
//         ) : selectedOption === "PAN" ? (
//           <input {...register("govtId", { ...PANSchema.fields.govtId })} type="text" />
//         ) : null}
//         {errors.govtId && <p>{errors.govtId.message}</p>}
//       </div>

//       <input type="submit" />
//     </form>
//   );
// }


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./form1.css";
import { useDispatch } from 'react-redux';
import { submitForm1Data } from "../Redux/Action";

const SignupSchema = yup.object().shape({
  name: yup.string().required().min(3),
  age: yup.number().positive().integer().required(),
  sex: yup.string().required().oneOf(['Male', 'Female']),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  govtIdType: yup.string().required().oneOf(['Aadhar', 'PAN']),
  govtId: yup.string().when('govtIdType', {
    is:"Aadhar",
    then: (govtIdSchema) =>
    govtIdSchema
      .matches(/^\d{12}$/, 'Aadhar card number must be 12 digits')
      .test('not-starts-with-zero-one', 'Aadhar should not start with 0 or 1', (value) => !/^[01]/.test(value))
      .required('Aadhar card number is required'),
  otherwise: (govtIdSchema) =>
    govtIdSchema
      .matches(/^[A-Za-z]{10}$/, 'PAN card number must be 10 alphabets')
      .required('PAN card number is required'),
}),

});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setValue,  // Corrected import
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(SignupSchema),

  });
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("Aadhar");
  const navigate = useNavigate();
  // Watch govtIdType
  const govtIdType = watch("govtIdType");

  // Update the selected option state
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setValue("govtId", ""); // Clear the input field when the option changes
  };

  const onSubmit = (data) => {
    console.log(data);
    // alert(JSON.stringify(data));
    navigate("/form2");
    dispatch(submitForm1Data(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>Sex</label>
        <select {...register("sex")}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.sex && <p>{errors.sex.message}</p>}
      </div>

      <div>
        <label>Mobile</label>
        <input {...register("mobile")} />
        {errors.mobile && <p>{errors.mobile.message}</p>}
      </div>

      <div>
        <label>Govt Id Type</label>
        <select {...register("govtIdType")} onChange={(e) => handleOptionChange(e.target.value)}>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
        </select>
        {errors.govtIdType && <p>{errors.govtIdType.message}</p>}
      </div>

      <div>
        <label>Govt Id</label>
        {selectedOption === "Aadhar" ? (
          <input {...register("govtId")} type="number" />
        ) : selectedOption === "PAN" ? (
          <input {...register("govtId")} type="text" />
        ) : null}
        {errors.govtId && <p>{errors.govtId.message}</p>}
      </div>

      <input type="submit" value="Next" />
    </form>
  );
}

