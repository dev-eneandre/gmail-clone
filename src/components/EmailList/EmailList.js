import React, { useEffect, useState } from "react";
import "./EmailList.css";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Checkbox, IconButton } from "@mui/material";
import {
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
  KeyboardHide,
  MoreVert,
  Settings,
  Inbox,
  People,
  LocalOffer,
} from "@mui/icons-material";
import Section from "../Section/Section";
import EmailRow from "../EmailRow/EmailRow";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const EmailList = () => {
  const [emails, setEmails] = useState([]);

  const emailCollectionRef = collection(db, "emails");

  useEffect(() => {
    getEmailList();
  }, [emailCollectionRef]);

  const getEmailList = async () => {
    try {
      const data = await getDocs(emailCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmails(filteredData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDown />
          </IconButton>
          <IconButton onClick={() => getEmailList()}>
            <RefreshOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <IconButton>
            <ChevronRight />
          </IconButton>
          <IconButton>
            <KeyboardHide />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={Inbox} title="Primary" color="red" selected />
        <Section Icon={People} title="Social" color="#1A73E8" />
        <Section Icon={LocalOffer} title="Promotions" color="green" />
      </div>

      <div className="emaiList__list">
        {emails.map(({ id, to, subject, message, timestamp }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
