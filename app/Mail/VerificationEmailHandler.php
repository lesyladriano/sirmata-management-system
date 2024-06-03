<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationEmailHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $emailAddress; 
    public $verificationToken;
    /**
     * Create a new message instance.
     */
    public function __construct($emailAddress, $verificationToken)
    {
        $this->emailAddress=$emailAddress;
        $this->verificationToken = $verificationToken;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sirmata Email Verification',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'ClickToVerifyEmail',
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
