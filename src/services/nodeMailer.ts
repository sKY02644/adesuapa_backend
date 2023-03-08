import nodemailer from "nodemailer";
import { Utils, WelcomeBody, ConfirmationBody } from '../utils/utils'

 export default class NodeMailer {

  private readonly regex = Utils.regex
  private readonly templateDir = 'mailTemplates'
  private transporter: nodemailer.Transporter;

  constructor(options: any) {
    this.transporter = nodemailer.createTransport({ ...options });
  }

  private sendEmail(mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  public async processInitMail(welcomeData: WelcomeBody, from: string, confirmationData?: ConfirmationBody) {

        const promises: Promise<any>[] = []

        const template = await Utils.readFileData(this.templateDir, 'welcomeTemplate.html')

        if(template.error){
            return { type: "welcome", status: "rejected", error: template.error }
        }

        const templateString = template.data.toString();

        const welcomeMailTemplate =  Utils.replacePlaceholders(this.regex, templateString, welcomeData)

        const welcomeMailOptions = { from: `Team Adesuapa <${from}>`, to: welcomeData.email, subject: 'Welcome Email', html: welcomeMailTemplate }

        const welcomeInfoPromise = this.sendEmail(welcomeMailOptions).catch(error => {
            return { type: "confirmation", status: "rejected", error};
        })
        
        promises.push(welcomeInfoPromise)

        if(confirmationData){

            const template = await Utils.readFileData(this.templateDir, 'confirmationTemplate.html')

            if(template.error){
                return { type: "confirmation", status: "rejected", error: template.error }
            }    

            const templateString = template.data.toString();
            
            const tableRow = Utils.replacePlaceholders(this.regex, this.tableRow('1'), confirmationData)

            confirmationData.tr = tableRow

            const confirmationMailTemplate =  Utils.replacePlaceholders(this.regex, templateString, confirmationData)

            const confirmationMailOptions = { from, to: welcomeData.email, subject: 'Confirmation Email', html: confirmationMailTemplate }

            const confirmationInfoPromise = this.sendEmail(confirmationMailOptions).catch(error => {
                return { type: "welcome", status: "rejected", error: error.message};
            });
            promises.push(confirmationInfoPromise)
        }

        const response: any = await Promise.allSettled(promises)

        return { response: [response[0]['value'], response[1]['value']], status: true }

  }

  private tableRow(type: string = "") {
    let tr = "";
    switch (type) {
      case "1":
        tr = `<tr>
                    <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Hello [[user_name]], welcome onboard ADESUAPA</h3>
                            <h3 style="text-align: left; font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Your password: <b>[[default_password]]</b></h3>
                            <h3 style="text-align: left; font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: -35px; font-weight: 400;">Your ID: <b>[[user_uid]]</b></h3>
                            <h4 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">Click here to login to your account</h4>
                            <p><a href="[[confirmation_url]]" alt="Click here to login to your account" class="btn btn-primary" style="padding: 10px 15px; display: inline-block; border-radius: 5px; background: #1976D2; color: #ffffff;">Login</a></p>
                        </div>
                    </td>
                </tr>`;
        break;
      case "2":
        tr = `<tr>
                    <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">[[message]]</h3>
                        </div>
                    </td>
                </tr>`;
        break;
      case "3":
        `<tr>
                     <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">[[message]]</h3>
                            <h3 style="font-family: &#39Lato&#39, sans-serif; color: #000000; margin-top: 0; font-weight: 400;">[[confirmation_url]]</h3>
                        </div>
                    </td>
                </tr>`;
        break;
      default:
        break;
    }
    return tr;
  }

  public async passwordResetCodeTemplate(values: { [x: string]: any; email?: any; }, from: string){

    const template = await Utils.readFileData(this.templateDir, values.type === 'update' ? 'resetPassword.html' : 'resetCodeTemplate.html')

    if(template.error){
        return { type: "passwordreset", status: "rejected", error: template.error }
    }

    const templateString = template.data.toString();

    const passworsRestMailTemplate =  Utils.replacePlaceholders(this.regex, templateString, values)

    const passworsRestMailOptions = { from: `Team Adesuapa <${from}>`, to: values.email, subject: values.type === 'update' ? 'Adesuapa - Alert - Reset Password' : 'Adesuapa Reset Password', html: passworsRestMailTemplate }

    const passworsRestInfoPromise = this.sendEmail(passworsRestMailOptions).catch(error => {
        console.log(error)
        return { type: "passwordreset", status: "rejected", error: error.message};
    })

    const response: any = await Promise.allSettled([passworsRestInfoPromise])

    return { response: response[0]['value'], status: true }
  }
}