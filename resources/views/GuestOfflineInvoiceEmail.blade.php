<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Sirmata Ecofarm and Nature Park</title>
</head>
<body>
    <div style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb;">
        <div style="max-width: 800px; background-color: #006400; text-align: center; padding: 20px; margin: 0 auto;">
            <img src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1693441880/Sirmata%20Images/Logo/yzbmqf8rp6lcwain2bea.png" alt="Sirmata Ecofarm Logo" style="max-width: 200px; height: auto;">
        </div>
        <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 20px; margin: 0 auto;">
            <h1 style="font-size: 20px; text-align: center; font-weight: bold; margin: 0 0 10px;">Booking Confirmation - Sirmata Ecofarm and Nature Park</h1>
            <div style="font-size: 16px; line-height: 1.5;">
                <p style="margin-top: 20px; font-size: 14px;">Dear {{$firstName}} {{$lastName}},<br><br>We are delighted to confirm your reservation at Sirmata Ecofarm and Nature Park for your upcoming stay. Thank you for choosing to stay with us!</p>
                <p style="margin-top: 20px; font-size: 14px;">Below, you will find a summary of your booking details:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Reservation ID:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$reservationID}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Guest Name:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$firstName}} {{$lastName}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Contact Number:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$guestNumber}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Email:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$guestEmail}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Check-In Date:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$formattedGuestCheckOut}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Check-Out Date:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$formattedGuestCheckIn}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Accommodation Type:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$roomName}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Special Request:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$specialRequest}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Total Guests:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$totalGuests}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Total Nights:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$totalNights}}</td>
                    </tr>
                    <tr @if (is_null($discountValue)) style="display: none;" @endif>
    <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Total Discount:</strong></td>
    <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">{{$discountValue ?? ''}} %</td>
</tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;"><strong>Total Cost:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #ccc;">₱ {{$totalAmount}}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-weight: bold;">Payment Information:</p>
             
                <p style="margin-top: 20px;">Total Amount Paid: ₱{{$totalAmount}}</p>
          
              
                <p style="margin-top: 20px; font-weight: bold;">Important Information:</p>
                <p style="margin-top: 20px;">Check-in time: 2:00 PM</p>
                <p style="margin-top: 20px;">Check-out time: 12:00 NN</p>
                <p style="margin-top: 20px; font-size: 14px;">We are committed to providing you with a memorable experience during your stay at Sirmata Ecofarm and Nature Park. Our team is here to assist you with any questions or special requests you may have. Should you need any assistance or have additional inquiries, please do not hesitate to contact us at <a href="tel:+639171208306">+63 917 120 8306</a> / <a href="tel:+639158766542">+63 915 876 6542</a> or via email at <a href="mailto:sirmatafarm@gmail.com">sirmatafarm@gmail.com</a>.</p>
                <p style="margin-top: 20px; font-size: 14px;">We look forward to welcoming you to our eco-friendly paradise and hope you have a fantastic stay with us. If there is anything more we can do to ensure your stay is exceptional, please let us know.</p>
                <p style="font-size: 14px;">Safe travels, and we look forward to seeing you soon!<br><br>Warm regards, <br>Sirmata Ecofarm and Nature Park<br>Malineng Cuyapo, Nueva Ecija<br><a href="tel:+639171208306">+63 917 120 8306</a><br><a href="mailto:sirmatafarm@gmail.com">sirmatafarm@gmail.com</a><br><a href="https://www.sirmatafarm.com" target="_blank">www.sirmatafarm.com</a></p>
            </div>
        </div>
    </div>
    <div style="text-align: center; font-size: 12px; color: #555; margin-top: 20px;">© 2023 Sirmata Ecofarm and Nature Park. All rights reserved.</div>
</body>
</html>

