<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $emailAddress; 
     public $userId; 
     public  $verificationToken;
    /**
     * Create a new message instance.
     */
    public function __construct($emailAddress,$userId, $verificationToken)
    {
       $this->emailAddress=$emailAddress;
       $this->userId=$userId;
       $this->verificationToken= $verificationToken;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sirmata Account Password Reset',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'PasswordResetEmail',
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
