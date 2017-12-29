const Config = require('../../config.js');
const Mailjet = require('node-mailjet')
  .connect(Config.mailjetPublic, Config.mailjetPrivate);
const mailjetSend = Mailjet.post('send');

const UrlEmail = {
  send: function (recipient, uniqueLink) {
    const emailData = {
      FromEmail: 'christmas-list@outlook.com',
      FromName: 'Christmas List',
      Subject: 'Your List',
      'Text-part': `Hello,\nYour link is ${uniqueLink} \n\n--Christmas List`,
      Recipients: [{ Email: recipient }],
    };
    let output = {
      status: null,
      body: null
    };
    return mailjetSend.request(emailData)
    .then(() => {
      output.status = 200;
      output.body = `urlEmail sent to ${emailData.Recipients[0].Email}`;
      return output;
    }).catch(error => {
      output.status = 400;
      output.body = {
        error: error.Error,
        message: error.ErrorMessage,
        explanation: error.response.res.statusMessage
      };
      return output;
    });
  }
};

module.exports = UrlEmail;