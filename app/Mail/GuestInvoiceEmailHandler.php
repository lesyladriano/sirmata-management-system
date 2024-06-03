<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuestInvoiceEmailHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $guestEmail; 
    public $firstName;
    public $lastName;
    public $formattedCheckInDate;
    public $formattedCheckOutDate;
    public $roomName;
    public $totalAmount;
    public $firstPhoneNumber;
    public $reservationId;
    public $guestNumber;
    public $totalGuests;
    public $totalNights;
    public $specialRequest;
    public  $paymentModeOnline;
   
    
    /**
     * Create a new message instance.
     */
    public function __construct($guestEmail,$firstName, $lastName,$formattedCheckInDate , $formattedCheckOutDate,$roomName,$totalAmount, $firstPhoneNumber,$reservationId,$guestNumber,$totalGuests,$totalNights,$specialRequest, $paymentModeOnline)
    {
        $this->guestEmail=$guestEmail;
        $this->firstName=$firstName;
        $this->lastName=$lastName;
        $this->formattedCheckInDate=$formattedCheckInDate;
        $this->formattedCheckOutDate=$formattedCheckOutDate;
        $this->roomName=$roomName;
        $this->totalAmount=$totalAmount;
        $this->firstPhoneNumber=$firstPhoneNumber;
        $this->reservationId=$reservationId;
        $this->guestNumber=$guestNumber;
        $this->totalGuests=$totalGuests;
        $this->totalNights=$totalNights;
        $this->specialRequest=$specialRequest;
        $this->paymentModeOnline=$paymentModeOnline;
        
        
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sirmata Invoice',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'GuestInvoiceEmail',
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
