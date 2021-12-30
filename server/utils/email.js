import AWS from "aws-sdk";

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
};

const AWS_SES = SES_CONFIG.accessKeyId ? new AWS.SES(SES_CONFIG) : null;

/**
 params is an object with the following properties:
  Destination: {ToAddresses: [], CcAddresses: [], BccAddresses: []}
  Message: {Subject: {Data: '', Charset: ''}, Body: {Html: {Data: '', Charset: ''}, Text: {Data: '', Charset: ''}}}
  Source: ''
  ReplyToAddresses: []
  returns a Promise
  */
const SendEmail = (email, params) => {
  var env = process.env.NODE_ENV || "development";
  if (env === "development" && !AWS_SES) {
    console.log("Sending email to: " + params.Destination.ToAddresses[0]);
    console.log(params.Message.Body.Html.Data);
    return Promise.reject("AWS_SES not configured");
  }
  return AWS_SES.sendEmail(params).promise();
};

export const SendPasswordReset = (email, token) => {
  let params = {
    Source: "",
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<a href="revisto.live/reset/${token}>Reset Password</a>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset your Revisto password!",
      },
    },
  };
  return SendEmail(email, params);
};

export default SendEmail;
