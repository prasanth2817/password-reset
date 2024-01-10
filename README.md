This API is designed for achieve the proper password reset flow .
This can ba achieved by generating random strings with the help of Jsonwebtoken. 
The token is generated and send as a url to the users email. From that help of url the users can able to change the password sucessfully .
And also the link is valid only for 15min. After that the user have to regenerate the new url from forgert-password page for reset password. this is done for security purposes.
The Front-end-url is attached here. https://password-reset-signup-login.netlify.app/ 
