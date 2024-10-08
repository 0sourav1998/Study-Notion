import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { countryCode } from "../../../data/countrycode";

const ContactFormSection = () => {
  const handleMessageSubmit = (data) => {
  };

  const defaultValues = {
    countryCode: "+91",
  };

  const {
    register,
    setValue ,
    formState: { errors, isSubmitSuccessfull },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue("countryCode", "+91");
  }, [setValue]);


  return (
    <div className="flex flex-col md:w-11/12 w-full lg:mx-auto">
      <p className="text-center md:text-3xl text-lg font-semibold md:mb-10 mb-4">Get in Touch</p>
      <form
        onSubmit={handleSubmit(handleMessageSubmit)}
        className="flex flex-col lg:w-1/2 w-[90%] lg:mx-auto relative lg:left-16 md:ml-4 ml-1"
      >
        <div className="flex lg:flex-row flex-col gap-x-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-3 md:text-2xl text-lg font-semibold">
              First Name
            </label>
            <input
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              className="bg-richblack-300 text-black p-2 rounded-md"
              {...register("firstName", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-3 md:text-2xl text-lg font-semibold">
              Last Name
            </label>
            <input
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              className="bg-richblack-300 text-black p-2 rounded-md"
              {...register("lastName", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="emailAddress"
            className="mb-3 mt-6 md:text-2xl text-lg font-semibold"
          >
            Email Address
          </label>
          <input
            name="emailAddress"
            id="emailAddress"
            placeholder="Enter Email Address"
            className="bg-richblack-300 text-black p-2 rounded-md lg:w-[75%] w-[100%]"
            {...register("emailAddress", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.emailAddress && <span>{errors.emailAddress.message}</span>}
        </div>
        <div className="flex-col mt-6">
            <div className="mb-3">
                <lable htmlFor="phoneNo" className="md:text-2xl text-lg font-semibold">Phone Number</lable>
            </div>
            <div className="flex gap-4">
            <select
            className="w-[15%] bg-richblack-300 text-richblack-5 rounded-md"
             {...register("countryCode",{required : {value : true , message : "This Value is required"}})}>
            {countryCode.map((element, index) => (
              <option className="text-black" key={index} value={element.code}>
                {element.code} - {element.country}
              </option>
            ))}
          </select>
          <input
          id="phoneNo"
            type="number"
            placeholder="0123456789"
            name="phoneNo"
            className="lg:w-[57%] w-[100%] bg-richblack-300 text-black p-2 rounded-md"
            {...register("phoneNo", {
              required: { value: true, message: "This Field is required" },
              maxLength: { value: 10, message: "Invalid Phone Number" },
              minLength: { value: 8, message: "Invalid Phone Number" },
            })}
          />
        </div>
            </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-3 mt-6 md:text-2xl text-lg font-semibold">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter Your Message"
            name="message"
            rows={7}
            column={30}
            className="bg-richblack-300 text-black p-2 rounded-md lg:w-[75%] w-[100%]"
            {...register("message", {
              required: { value: true, message: "This field is required" },
            })}
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-50 text-richblack-900 w-fit p-2 rounded-md hover:scale-95 transition-all duration-200 mt-8 mb-8"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactFormSection;
