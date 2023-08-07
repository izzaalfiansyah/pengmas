<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            if (Auth::user() == null) {
                return Response([
                    'message' => 'Unauthorized',
                ], 401);
            }

            $user = Auth::user();
            $authorization = $request->header('Authorization');

            $token = explode(' ', $authorization)[1];

            if ($user->getRememberToken() != $token) {
                return Response([
                    'message' => "Unauthorized",
                ], 401);
            }
        } catch (\Exception $e) {
            return Response([
                'message' => "Unauthorized",
            ], 401);
        }


        return $next($request);
    }
}
