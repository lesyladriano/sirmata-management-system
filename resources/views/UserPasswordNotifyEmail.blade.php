<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f0f0; width: 100%;">
    <div class="container" style="text-align: center; max-width: 600px; background-color: #006400; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2); padding: 1rem; border-radius: 5px; max-width: 600px; margin: 0 auto; width: 100%;">
        <img src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1693441880/Sirmata%20Images/Logo/yzbmqf8rp6lcwain2bea.png" class="logo" style="width: 200px; margin: 0 auto; display: block;">
    </div>
    <div class="content" style="text-align: center; background: #ffffff; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2); padding: 1rem; border-radius: 5px; max-width: 600px; margin: 0 auto; width: 100%;">
        <div class="greeting" style="font-size: 24px; font-weight: bold; color: #333;">
            <h3>Password Reset Notification</h3>
        </div>
        <div class="message" style="font-size: 14px; color: #666; margin-top: 20px;">
            <p>Hello <b>{{$changedName}}</b>,</p>
            <p>Your password has been successfully changed by <b>{{$loggedName}}</b>.</p>
        </div>
        <div class="instructions" style="font-size: 14px; color: #666; margin-top: 20px; padding-left:5rem; padding-right:5rem">
            If you did not authorize this change, please contact the website administrator immediately or reset your password using the link below.
            <br/><br/>
            <a style="font-size: 20px;  margin-top: 5rem; background:#006400; padding-left:.5rem; padding-right:.5rem; padding-top:.3rem; padding-bottom:.3rem; border-radius:.2rem; color:white;text-decoration:none;  " href="https://sirmatafarm.com/login?showForgotPassword=true">Password Reset</a>
        </div>
    </div>
</body>
</html>
