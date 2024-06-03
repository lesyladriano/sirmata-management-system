<!DOCTYPE html>
<html>
<head>
    <title>Email Password Reset</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background: rgb(249, 250, 251); display: flex; justify-content: center; padding-top: 6rem; height: 100vh;">
    <div style="width: 600px; text-align: center;">
        <div style="background-color: #3F3F3F; padding-top: 1rem; box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5); margin: 0 auto;">
            <img src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1693441880/Sirmata%20Images/Logo/yzbmqf8rp6lcwain2bea.png" style="width: 200px; margin: 0 auto;">
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: rgb(249, 250, 251); box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5); margin: 0 auto; width: 100%;">
            <div style="padding-top: .2rem;">
                <h2>Password Reset</h2>

                <h3 id="userId" hidden>User ID:</h3>
                <h3 id="verificationToken" hidden>Verification Token:</h3>
            </div>  
            <form action="{{ route('password-reset-update') }}" method="post" onsubmit="return validateForm();">
                @csrf <!-- CSRF token -->
                <div style="padding-bottom: 1rem; display: flex; flex-direction: column;">
                    <input type="hidden" name="userId" id="userIdInput">
                    <input type="hidden" name="verificationToken" id="verificationTokenInput">
                </div>

                <div style="padding-bottom: 1rem; display: flex; flex-direction: column;">
                    <label style="font-size: 12px; padding: .2rem; text-align: left;">Password</label>
                    <div style="display:flex"> 
                        <input name="password" id="password" type="password" style="padding: .2rem;" placeholder="Password">
                        <input type="checkbox" id="showPasswordCheckbox">
                    </div>
                </div>

                <div style="padding-bottom: 1rem; display: flex; flex-direction: column;">
                    <label style="font-size: 12px; padding: .2rem; text-align: left;">Password Confirmation</label>
                    <div style="display:flex">
                        <input name="password_confirmation" id="passwordConfirmation" type="password" style="padding: .2rem;" placeholder="Password Confirmation">
                        <input type="checkbox" id="showPasswordCheckbox2">
                    </div>
                </div>
                <br>
                <div style="width: 100%; padding-top: .1rem;">
                </div>
                <button type="submit"
                        style="background: #4BA541;margin-bottom:1rem; border-radius: 6px; padding: .7rem 1rem; box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2); transition: .3s ease-in-out; color: white; text-decoration: none; display: inline-block; width: 200px;"
                        class="button-text"
                        onmouseover="this.style.background='#186918'"
                        onmouseout="this.style.background='#4BA541'">
                    Submit
                </button>
            </form>
        </div>
    </div>
</body>
</html>
<script>
    // JavaScript code for validating the form
    // Get the current URL
    var url = window.location.href;

    // Split the URL by '/' to get individual path segments
    var urlSegments = url.split('/');

    // The second-to-last segment should be the userId
    var userId = urlSegments[urlSegments.length - 2];

    // The last segment should be the verification token
    var verificationToken = urlSegments[urlSegments.length - 1];

    // Remove query parameters from the userId
    var userIdWithoutQuery = userId.split('?')[0];

    // Set the content of the h3 elements to display the userId and verificationToken
    document.getElementById('userId').textContent += ' ' + userIdWithoutQuery;
    document.getElementById('verificationToken').textContent += ' ' + verificationToken;

    // Set the value of the hidden input fields
    document.getElementById('userIdInput').value = userIdWithoutQuery;
    document.getElementById('verificationTokenInput').value = verificationToken;

    // Function to validate the form
    function validateForm() {
        var password = document.getElementById('password').value;
        var passwordConfirmation = document.getElementById('passwordConfirmation').value;

        if (password !== passwordConfirmation) {
            alert('Password and password confirmation do not match');
            return false; // Prevent form submission
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return false; // Prevent form submission
        }

        // Regular expression pattern for letters and symbols
        var pattern = /^(?=.*[a-zA-Z])(?=.*[\W_]).*$/;
        if (!pattern.test(password)) {
            alert('Password must contain letters and symbols');
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    }

    // Function to toggle password visibility
    function togglePasswordVisibility() {
        var passwordInput = document.getElementById('password');
        
        // Toggle input type between 'password' and 'text'
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }

    // Event listener to toggle password visibility when the checkbox is clicked
    document.getElementById('showPasswordCheckbox').addEventListener('click', togglePasswordVisibility);

    // Function to toggle password visibility for confirmation password
    function togglePasswordVisibility2() {
        var passwordConfirmationInput = document.getElementById('passwordConfirmation');
        
        // Toggle input type between 'password' and 'text'
        passwordConfirmationInput.type = passwordConfirmationInput.type === 'password' ? 'text' : 'password';
    }

    // Event listener to toggle password visibility when the checkbox is clicked
    document.getElementById('showPasswordCheckbox2').addEventListener('click', togglePasswordVisibility2);

</script>
