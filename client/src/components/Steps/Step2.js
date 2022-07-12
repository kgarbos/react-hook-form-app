import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";
import MainContainer from "../MainContainer";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import Form from "../Form";
import { Input } from "../Input";
import { useData } from "../DataContext";
import PrimaryButton from "../PrimaryButton";

const schema = yup.object({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});
const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

function Step2() {
  const { data, setValues } = useData();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    navigate("/step3");
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🐒 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              inputRef={register}
              name="hasPhone"
            />
          }
          label="Do you have a phone"
        />
        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={(e) => {
              e.target.value = normalizePhoneNumber(e.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}

export default Step2;
