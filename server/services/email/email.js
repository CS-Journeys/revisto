import dotenv from "dotenv";
dotenv.config();
import {ENV} from "../../core/constants.js";
import AWS from "aws-sdk";

let AWS_SES;

AWS.config.update({ region: "us-east-2" });
AWS_SES = new AWS.SES({ apiVersion: "2010-12-01" });

const SendEmail = (params) => {
  //Check if AWS_SES has proper credentials
  if (!AWS_SES.config.credentials) {
    return Promise.reject("AWS_SES is not defined");
  }
  if (ENV === "development") {
    console.log("Sending email to: " + params.Destination.ToAddresses[0]);
    console.log(params.Message.Body.Html.Data);
  }
  return AWS_SES.sendEmail(params).promise();
};

export const SendPasswordReset = (email, token) => {
  let params = {
    Source: "no-reply@revisto.live",
    Destination: {
      ToAddresses: ["revisto.live@gmail.com"],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<a href="revisto.live/reset/${token}">Reset Password</a>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset your Revisto password!",
      },
    },
  };
  return SendEmail(params);
};

export default SendEmail;