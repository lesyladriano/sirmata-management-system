<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OfflineEmailInvoiceHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $guestEmail; 
    public $firstName; 
    public $lastName; 
    public $roomName;
    public $totalAmount;
    public $formattedGuestCheckIn;
    public $formattedGuestCheckOut;
    public $firstPhoneNumber;
    public $reservationID;
    public $guestNumber;
    public $totalGuests;
    public $totalNights;
    public $specialRequest;
    public $checkInTime;
    public $discountValue;
    
    /**
     * Create a new message instance.
     */
    public function __construct($guestEmail,$firstName,$lastName,$roomName,$totalAmount,$formattedGuestCheckIn,$formattedGuestCheckOut,$firstPhoneNumber,$reservationID,$guestNumber,$totalGuests,$totalNights,$specialRequest,$checkInTime,$discountValue)
    {
        $this->guestEmail=$guestEmail;
        $this->firstName=$firstName;
        $this->lastName=$lastName;
        $this->roomName=$roomName;
        $this->totalAmount=$totalAmount;
        $this->formattedGuestCheckIn=$formattedGuestCheckIn;
        $this->formattedGuestCheckOut=$formattedGuestCheckOut;
        $this->firstPhoneNumber=$firstPhoneNumber;
        $this->reservationID=$reservationID;
        $this->guestNumber=$guestNumber;
        $this->totalGuests=$totalGuests;
        $this->totalNights=$totalNights;
        $this->specialRequest=$specialRequest;
        $this->checkInTime=$checkInTime;
        $this->discountValue=$discountValue;

        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Guest Invoice',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'GuestOfflineInvoiceEmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
