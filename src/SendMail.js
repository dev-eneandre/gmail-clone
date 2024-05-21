import React from "react";
import "./SendMail.css";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  closeSendMessage,
  selectSendMessageIsOpen,
} from "./features/mailSlice";
import { useDispatch } from "react-redux";

const SendMail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // const onSubmit = (formData) => {
  //   console.log(formData);
  // };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>

        <Close
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>

      <form onSubmit={handleSubmit(selectSendMessageIsOpen)}>
        <input
          {...register("to", { required: true })}
          placeholder="To"
          type="email"
        />
        {errors?.to && <p className="sendMail__error">To is required!</p>}
        <input
          {...register("subject", { required: true })}
          placeholder="Subject"
          type="text"
        />{" "}
        {errors?.subject && (
          <p className="sendMail__error">Subject is required!</p>
        )}
        <input
          {...register("message", { required: true })}
          placeholder="..."
          type="text"
          className="sendMail__message"
        />
        {errors?.message && (
          <p className="sendMail__error">Message is required!</p>
        )}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
