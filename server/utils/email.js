import validator from "validator";
import logger from "./logger.js";

/**
 * Usage:
 * Email.builder()
 *   .withFromAddress("no-reply@revisto.live")
 *   .withTextBody("This is a test")
 *   .withToAddress("test@test.com")
 *   .withSubject("Hi :D")
 *   .send();
 */
class Email {

  #toAddresses = [];
  #ccAddresses = [];
  #bccAddresses = [];
  #fromAddress;
  #subject;
  #body;
  #isHtml;

  /**
   * Returns a new email instance for use with the builder design pattern
   * 
   * @returns {Email} A new email instance
   */
  static builder() {
    return new Email();
  }

  /**
   * Adds an email address to the list of toAddresses
   * 
   * @param {string} address The email address to add
   * @returns {Email} This object, with the updated list of toAddresses
   */
  withToAddress(address) {

    return this;
  }

  /**
   * Sets the source (from) address for this email
   * 
   * @param {string} address The from address
   * @returns {Email} This object, with the new fromAddress
   */
  withFromAddress(address) {

    return this;
  }

  /**
   * Adds an email address to the list of ccAddresses
   * 
   * @param {string} address The email address to add
   * @returns {Email} This object, with the updated list of ccAddresses
   */
  withCcAddress(address) {

    return this;
  }

  /**
   * Adds an email address to the list of bccAddresses
   * 
   * @param {string} address The email address to add
   * @returns {Email} This object, with the updated list of bccAddresses
   */
  withBccAddress(address) {

    return this;
  }

  /**
   * Sets the subject line for this email
   * 
   * @param {string} subject The subject line
   * @returns {Email} This object, with the new subject line
   */
  withSubject(subject) {

    return this;
  }

  /**
   * Sets this email to use the given HTML body
   * 
   * @param {string} body The body (in HTML format)
   * @returns {Email} This object, with the given body and isHtml set to true
   */
  withHtmlBody(body) {

    return this;
  }

  /**
   * Sets this email to use the given plain-text body
   * 
   * @param {string} body The body (in plain-text)
   * @returns {Email} This object, with the given body and isHtml set to false
   */
  withTextBody(body) {

    return this;
  }

  /**
   * For now, prints this email's data (subject, body, source, destination)
   * Eventually, makes a request to the email service to send this email
   * 
   * @returns {void}
   */
  send() {
    this.#verifyFields();

    logger.warn("TODO: actually send the email");
  }

  /**
   * Ensures this email's fields are correctly set before the email gets sent
   * 
   * @returns {void}
   */
  #verifyFields() {
    // Ensure required fields were specified
    if (this.#toAddresses.length == 0) throw new Error("toAddresses are missing");
    if (this.#fromAddress == null) throw new Error("fromAddress is missing");
    if (this.#subject == null) throw new Error("subject is missing");
    if (this.#body == null) throw new Error("body is missing");
    if (this.#isHtml == null) throw new Error("isHtml is missing");

    // Ensure email addresses are valid
    let addresses = [];
    addresses.push(this.#toAddresses);
    addresses.push(this.#ccAddresses);
    addresses.push(this.#bccAddresses);    
    for (const address of addresses) {
      if (!validator.isEmail(address)) throw new Error(address + " is not a valid email address");
    }
  }
}

export default Email;