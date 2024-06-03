<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Payments; // Import your Payment model
use App\Models\Guest;
use Illuminate\Support\Carbon;

class DeleteUnpaidPayments extends Command
{
    protected $signature = 'payments:delete-unpaid';

    protected $description = 'Delete unpaid payments';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Get unpaid payments older than 2 hours
        $unpaidPayments = Payments::where(function ($query) {
            $query->where('payment_status', 'awaiting_next_action')
                  ->orWhere('payment_status', 'pending');
        })
        ->where('created_at', '<', now()->subHours(2))
        ->get();
        
        $guestIds = $unpaidPayments->pluck('guest_id')->unique();
        // Count the unpaid payments
        $unpaidPaymentsCount = count($unpaidPayments);

        Guest::whereIn('guest_id', $guestIds)->delete();
        $this->info('Guest Deleted.' );
    }
}
