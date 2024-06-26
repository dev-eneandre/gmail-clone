import React from "react";
import "./SendMail.css";
import { Close, TrySharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  closeSendMessage,
  selectSendMessageIsOpen,
} from "../../features/mailSlice";
import { useDispatch } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const SendMail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    try {
      addDoc(collection(db, "emails"), {
        to: formData.to,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
      });

      dispatch(closeSendMessage());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>

        <Close
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <textarea
          {...register("message", { required: true })}
          placeholder=""
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
