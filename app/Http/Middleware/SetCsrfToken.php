<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class SetCsrfToken
{
    public function handle($request, Closure $next)
    {
        $token = Session::token();
        $request->request->add(['_token' => $token]);
        return $next($request);
    }
}
