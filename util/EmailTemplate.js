class EmailTemplate {
  verificationEmail(unverifiedUserID, verificationCode) {
    const emailDiv = `
    <div
    class="email"
    style="background: #2c2c32; color: #faf8ff; padding: 40px 20px; border-radius: 6px; font-family: Arial, Helvetica, sans-serif; font-size: 16px"
    >
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Hey there,</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Thank you for signing up to Bill Divider!</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">
        To complete the sign up process, you would need to enter the following email-verification code: ${verificationCode}. Alternatively, you can click on the following link: <a href="https://billdivider.fun/verification.html?id=${unverifiedUserID}&keepMeSignedIn=&verificationCode=${verificationCode}">https://billdivider.fun/verification.html?id=${unverifiedUserID}&keepMeSignedIn=&verificationCode=${verificationCode}</a>.
      </p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">
        Please note that the verification code is only valid for 15 minutes from when this email was sent.
      </p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">If this request wasn't made by you, please ignore this email.</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 0; padding: 0">Best,</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Bill Divider Automated Email Service</p>
    </div>
    `;

    return emailDiv;
  };

  recoveryEmail(username, userID, recoveryCode) {
    const emailDiv = `
    <div
    class="email"
    style="background: #2c2c32; color: #faf8ff; padding: 40px 20px; border-radius: 6px; font-family: Arial, Helvetica, sans-serif; font-size: 16px"
    >
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Hey ${username},</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Hope you're doing well.</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">
        We've received an account recovery request from you. To recover your account, please click the following link: <a href="https://billdivider.fun/updatePassword.html?id=${userID}&recoveryCode=${recoveryCode}">https://billdivider.fun/updatePassword.html?id=${userID}&recoveryCode=${recoveryCode}</a>.
      </p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">If this request wasn't made by you, please ignore this email.</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 0; padding: 0">Best,</p>
      <p style="line-height: 22px; margin: 0; margin-bottom: 20px">Bill Divider Automated Email Service</p>
    </div>
    `;

    return emailDiv;
  };
};

module.exports = EmailTemplate;