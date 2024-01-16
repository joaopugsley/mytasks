export const ActivationEmail = (username: string, activationLink: string) => {
  return `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    style="font-family:Proxima Nova,'Roboto',Verdana,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3">
  
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Ative sua conta</title>
  </head>
  
  <body
    style="width:100%;font-family:Proxima Nova,'Roboto',Verdana,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color: #F6F6F6; padding: 10px; border-radius: 8px;">
      <h1>Olá ${username}, clique no link abaixo para ativar sua conta:</h1>
      <p>${activationLink}</p>
    </div>
  </body>
  
  </html>`;
};
