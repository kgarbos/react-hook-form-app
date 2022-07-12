import { Typography } from "@material-ui/core";
import React from "react";
import Form from "../Form";
import { Input } from "../Input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainContainer from "../MainContainer";
import PrimaryButton from "../PrimaryButton";
import * as yup from "yup";
import { useData } from "../DataContext";

// Object validation for form fields with react-form 
const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "First name should not contain numbers or special characters")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "First name should not contain numbers or special characters")
    .required("Last name is a required field"),
});

function Step1() {
  const { data, setValues } = useData();
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    navigate("/step2");
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🐗 Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Last Name"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Step1;
