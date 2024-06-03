<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuestEmailVerificationTokenHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $guestEmail; 
    public $verificationToken;
    /**
     * Create a new message instance.
     */
    public function __construct($guestEmail, $verificationToken)
    {
        $this->guestEmail=$guestEmail;
        $this->verificationToken = $verificationToken;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Guest Email Verification',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'GuestTokenEmail',
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
