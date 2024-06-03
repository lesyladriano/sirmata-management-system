<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserPasswordNotifyHandler extends Mailable
{
    use Queueable, SerializesModels;
    public $changedName; 
    public $loggedName;
    /**
     * Create a new message instance.
     */
    public function __construct($changedName, $loggedName)
    {
        $this->changedName=$changedName;
        $this->loggedName = $loggedName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sirmata Farm and Nature Park',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'UserPasswordNotifyEmail',
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
