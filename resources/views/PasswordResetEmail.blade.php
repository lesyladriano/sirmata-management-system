
<html>
<head>
    <title>Click To Verify Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: rgb(249, 250, 251); width:100%;">
<div style="justify-content: center; align-items: center; height: 100%;">

<div style=" text-align: center; background-color: #3F3F3F; padding-top: 1rem; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);">
    <img src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1693441880/Sirmata%20Images/Logo/yzbmqf8rp6lcwain2bea.png" style="width: 200px; margin: 0 auto;">
</div>


<div style=" flex-direction: column; justify-content: center; align-items: center; width: 100%; text-align: center; background: rgb(249, 250, 251); box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5); padding-top: 1rem; height: 100%;">
<br></br>
        <div style="padding-top: 1rem;">
            Click the Button to Reset your password.
        </div>
    <br></br>
    <div style="width: 100%; padding-top: 2rem;">
    <a href="{{ route('/password-reset', ['userId' => $userId, 'verificationToken' => $verificationToken]) }}"

   style="background: #4BA541; border-radius: 6px; padding: .7rem 1rem; box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2); transition: .3s ease-in-out; color: white; text-decoration: none; display: inline-block;"
   class="button-text"
   onmouseover="this.style.background='#186918'"
   onmouseout="this.style.background='#4BA541'">
    Reset Password
</a>

        </div>

        <br></br>
   
</div>
</div>
</body>
</html>