<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{  
    public function sortIndex(Request $request)
    {
        $perPage = 9; 
    
        $sortBy = $request->input('sortBy', 'created_at');
        $sortOrder = $request->input('sortOrder', 'desc');
    
        $review = Review::orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
    
        return response()->json($review);
    }

 
    

    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews); 
    }   

    public function store(StoreReviewRequest $request)
    {
        $reviews = new Review([
            'full_name' => $request->input('full_name'),
            'email' => $request->input('email'),
            'review' => $request->input('review'),
            'rating' => $request->input('rating'),
        ]);
    
     
        $reviews->review_id = rand(1000, 9999);    
        $reviews->save();
        return response()->json('Review created!');
    }
    
    public function show($review_id)
    {
        $contact = Review::find($review_id);
        return response()->json($contact);
    }

    public function update(Request $request, $review_id)
    {
       $reviews = Review::find($review_id);
       $reviews->update($request->all());
       return response()->json('Review updated');
    }
    public function destroy($review_id)
    {
        $reviews = Review::find($review_id);
        $reviews->delete();
        return response()->json(' deleted!');
    }

    public function search(Request $request)
    {
        $query = Review::query();
    
        if ($request->has('searchTerm')) {
            $searchTerm = $request->input('searchTerm');
            $query->where(function($q) use ($searchTerm) {
                $q->where('full_name', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('review', 'LIKE', "%{$searchTerm}%");
            });
        }
    
        if ($request->has('display')) {
            $display = $request->input('display') == 'true' ? true : false;
            $query->where('display', $display);
        }
    
        // Check for 'unseen' parameter and filter accordingly
        if ($request->has('unseen')) {
            $unseen = $request->input('unseen') == 'true' ? true : false;
            $query->where('unseen', $unseen);
        }
    
        $reviews = $query->get();
    
        return response()->json($reviews);
    }
}