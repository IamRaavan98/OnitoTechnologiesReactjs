import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./form.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
 export default function Form() {
  const SignupSchema =  yup.object().shape({
    name: yup.string().required(),
    gender: yup.string().required(),
    Age: yup.date().required(),
    website: yup.string().url(),
    mobile: yup.number().test('is-valid-mobile', 'Mobile number is not valid', value => {
      return /^\d{10}$/.test(value)
    }),
    ID: yup
    .string()
    .required("This field is required")
    .oneOf(["aadhar", "PAN"], "Invalid ID type"),
  GovtId: yup
    .string()
    .required("This field is required")
    .when("ID", {
      is: "aadhar",
      then:() => yup
        .string()
        .matches(/^\d{12}$/, "Aadhar ID should be a valid 12-digit numeric string"),
      otherwise:()=> yup
        .string()
        .matches(/^[A-Z]{5}\d{4}[A-Z]$/, "PAN ID should be a valid 10-digit alpha-numeric string"),
    })
  
  
  });


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = (data) => {
    let temp = data.GovtId;
    data.guardian = data.guardian+ "->" + data.guardian_name
    data.ID = data.ID+temp;

    submitDataAndReceive(data);
  };

  //api call
  const submitDataAndReceive = async (data) => {
    try {
      const dataget = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        ...data,
      });
      if(dataget?.data?.success === true){
        navigate("/allUsersData");
      }
      else{
        console.log(dataget);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="personalDetails ">
        <div className="header">
          <h2>Personal Details</h2>
          <Link className="alluserdata" to="/allUsersData">
            All users Data
          </Link>
        </div>

        <div className="detail">
          <label className="distance">
            Name<sup className="astrick">*</sup>
            <input placeholder="Enter Name" {...register("name")} />
            {errors.name && <p className="error">{errors.name?.message}</p>}
          </label>

          <label className="distance">
            Date of Birth or Age<sup className="astrick">*</sup>
            <input
              type="date"
              placeholder="DD/MM/YYYY or Age in Years"
              {...register("Age")}
            />
            {errors.Age && <p className="error">{errors.Age.message}</p>}
          </label>

          <label className="distance gender">
            gender<sup className="astrick">*</sup>
            <div className="">
              <select {...register("gender")} style={{ width: "200px" }}>
                <option value="" disabled selected hidden>
                  Select gender
                </option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
              <div style={{ width: "100px" }} />
              {errors.gender && (
                <p className="error">{errors.gender.message}</p>
              )}
            </div>
          </label>
          {/* </div> */}

          {/* <div className="personalDetail"> */}
          <label className="distance">
            Mobile
            <input type="number" {...register("mobile")} />
            {errors.mobile && <p className="error">{errors.mobile.message}</p>}
          </label>
          <label className="distance">
            Govt issued ID
            <select
              {...register("ID")}
              style={{ width: "100px" }}
              defaultValue=""
            >
              <option value="">select</option>
              <option value="aadhar">Aadhar </option>
              <option value="PAN">PAN</option>
            </select>
            {errors.ID && <p className="error">{errors.ID.message}</p>}

            <input placeholder="Enter Govt ID" {...register("GovtId")} />
            {errors.GovtId && <p>{errors.GovtId.message}</p>}
           
          </label>
        </div>
      </div>

      <div className="contactDetails">
        <h2>Contact Details</h2>
        <div className="detail">
          <label className="distance">
            Guardian Details
            <select {...register("guardian")} style={{ width: "100px" }}>
              <option value="">Enter label</option>
              <option value="parents">Parents</option>
              <option value="orphan">Adopted</option>
            </select>
            <input
              placeholder="Enter Guardian Name"
              {...register("guardian_name")}
            />
            {errors.guardian_name && <p className="error">{errors.guardian_name.message}</p>}
          </label>
          <label className="distance">
            Email
            <input placeholder="Enter Email" {...register("Email")} />
            {errors.Email && <p className="error">{errors.Email.message}</p>}
          </label>
          <label className="distance">
            Emergency Contact <br /> Number
            <input
              placeholder="  Emergency Contact"
              {...register("emergency")}
            />
            {errors.emergency && (
              <p className="error">{errors.emergency.message}</p>
            )}
          </label>
        </div>
      </div>

      <div className="addressDetails">
        <h2>Address Details</h2>
        <div className="detail">
          <label className="distance">
            Address
            <input placeholder="Enter Address" {...register("Address")} />
            {errors.Address && (
              <p className="error">{errors.Address.message}</p>
            )}
          </label>
          <label className="distance">
            State
            <input placeholder="Enter State" {...register("state")} />
            {errors.State && <p className="error">{errors.state.message}</p>}
          </label>

          <label className="distance">
            City
            <input
              type="text"
              placeholder="Enter City/town/village"
              {...register("city")}
              style={{ width: "100px" }}
            />
            {errors.State && <p className="error">{errors.state.message}</p>}
          </label>

          <label className="distance">
            Country
            <input placeholder="India" {...register("Country")} />
            {errors.Country && (
              <p className="error">{errors.Country.message}</p>
            )}
          </label>
          <label className="distance">
            Pincode
            <input placeholder="Enter pincode" {...register("pincode")} />
            {errors.pincode && (
              <p className="error">{errors.pincode.message}</p>
            )}
          </label>
        </div>
      </div>

      <div className="otherDetails">
        <h2>Other Details</h2>
        <div className="detail">
          <label className="distance">
            Occupations
            <input
              placeholder="Enter occupation"
              {...register("occupations")}
            />
            {errors.Occupation && (
              <p className="error">{errors.Occupation.message}</p>
            )}
          </label>
          <label className="distance">
            Religion
            <input placeholder="Enter Religion" {...register("religion")} />
            {errors.religion && (
              <p className="error">{errors.religion.message}</p>
            )}
          </label>

          <label className="distance">
            Maritial Status
            <select
              {...register("maritalStatus")}
              style={{ width: "100px" }}
              defaultValue="married"
            >
              <option value="">Enter Marital Status </option>
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
              <option value="divorce">divorce</option>
            </select>
            {errors.maritalStatus && (
              <p className="error">{errors.maritalStatus.message}</p>
            )}
          </label>

          <label className="distance">
            Blood Group
            <select
              {...register("bloodGroup")}
              style={{ width: "100px" }}
              defaultValue="a"
            >
              <option value="a">A+</option>
              <option value="b">B+</option>
              <option value="c">c+</option>
            </select>
            {errors.bloodGroup && (
              <p className="error">{errors.bloodGroup.message}</p>
            )}
          </label>
          <label className="distance">
            Nationality
            <input {...register("nationality")} />
            {errors.nationality && (
              <p className="error">{errors.nationality.message}</p>
            )}
          </label>
        </div>
      </div>

      <button className="submitButton" type="submit">
        SUBMIT
      </button>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="submitButton cancel"
        type="submit"
      >
        CANCEL
      </button>
    </form>
  );
}
