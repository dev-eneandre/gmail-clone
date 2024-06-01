import { LabelImportant, StarBorderOutlined } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import "./EmailRow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMail } from "../../features/mailSlice";

const EmailRow = ({ id, title, subject, description, time }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(selectMail({ id, title, subject, description, time }));
    navigate("/mail");
  };
  return (
    <div className="emailRow">
      <div className="emailRow__options">
        <IconButton>
          <Checkbox className="emailRow__options__icon" size="small" />
        </IconButton>
        <IconButton>
          <StarBorderOutlined className="emailRow__options__icon" />
        </IconButton>
      </div>
      <div className="emailRow__message__container" onClick={openMail}>
        <div className="emailRow__title">{title}</div>
        <div className="emailRow__message">
          <h4>
            {subject}
            <span className="emailRow__description"> - {description}</span>
          </h4>
        </div>
        <p className="emailRow__time">{time}</p>
      </div>
    </div>
  );
};

export default EmailRow;
