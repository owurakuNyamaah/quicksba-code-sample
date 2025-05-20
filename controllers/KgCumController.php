<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers\Cumulative;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KgCumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function cumulative() 
    {
        $user = auth()->user()->id;

        $students = [];
        $getStds = DB::select("SELECT student FROM k_glan3s WHERE user_id=$user Order BY student");
        foreach($getStds as $std) {
            $names = [];
            array_push($names, $std->student);
            foreach($names as $std) {
                //Numearcy
                $num1 = DB::select("SELECT Round(total_100,2) AS total FROM k_gnums WHERE student='$std' and user_id=$user");
                $num2 = DB::select("SELECT Round(total_100,2) AS total FROM k_gnum2s WHERE student='$std' and user_id=$user");
                $num3 = DB::select("SELECT Round(total_100,2) AS total FROM k_gnum3s WHERE student='$std' and user_id=$user");
                 
                !empty($num1) ? $numScores1 = $num1[0]->total : $numScores1 = 0;
                !empty($num2) ? $numScores2 = $num2[0]->total : $numScores2 = 0;
                !empty($num3) ? $numScores3 = $num3[0]->total : $numScores3 = 0;

                $numeracy = $numScores1 + $numScores2 + $numScores3;
                //Literacy
                $lan1 = DB::select("SELECT Round(total_100,2) AS total FROM k_glans WHERE student='$std' and user_id=$user");
                $lan2 = DB::select("SELECT Round(total_100,2) AS total FROM k_glan2s WHERE student='$std' and user_id=$user");
                $lan3 = DB::select("SELECT Round(total_100,2) AS total FROM k_glan3s WHERE student='$std' and user_id=$user");
                 
                !empty($lan1) ? $lanScores1 = $lan1[0]->total : $lanScores1 = 0;
                !empty($lan2) ? $lanScores2 = $lan2[0]->total : $lanScores2 = 0;
                !empty($lan3) ? $lanScores3 = $lan3[0]->total : $lanScores3 = 0;

                $literacy = $lanScores1 + $lanScores2 + $lanScores3;
                //Creative arts
                $art1 = DB::select("SELECT Round(total_100,2) AS total FROM k_garts WHERE student='$std' and user_id=$user");
                $art2 = DB::select("SELECT Round(total_100,2) AS total FROM k_gart2s WHERE student='$std' and user_id=$user");
                $art3 = DB::select("SELECT Round(total_100,2) AS total FROM k_gart3s WHERE student='$std' and user_id=$user");
                 
                !empty($art1) ? $artScores1 = $art1[0]->total : $artScores1 = 0;
                !empty($art2) ? $artScores2 = $art2[0]->total : $artScores2 = 0;
                !empty($art3) ? $artScores3 = $art3[0]->total : $artScores3 = 0;

                $arts = $artScores1 + $artScores2 + $artScores3;
                //Our world our people
                $our1 = DB::select("SELECT Round(total_100,2) AS total FROM k_gours WHERE student='$std' and user_id=$user");
                $our2 = DB::select("SELECT Round(total_100,2) AS total FROM k_gour2s WHERE student='$std' and user_id=$user");
                $our3 = DB::select("SELECT Round(total_100,2) AS total FROM k_gour3s WHERE student='$std' and user_id=$user");
                 
                !empty($our1) ? $ourScores1 = $our1[0]->total : $ourScores1 = 0;
                !empty($our2) ? $ourScores2 = $our2[0]->total : $ourScores2 = 0;
                !empty($our3) ? $ourScores3 = $our3[0]->total : $ourScores3 = 0;

                $our = $ourScores1 + $ourScores2 + $ourScores3;

                //Total
                $total = $numeracy + $literacy + $arts + $our;

                array_push($students,array('student'=>$std, 'numeracy'=>(string) $numeracy, 'literacy'=>(string) $literacy, 'arts'=>(string) $arts, 'our'=>(string) $our, 'total'=>(string) $total));
            }
        }


        return Inertia::render('Cumulative/KgOverall',['students'=>$students]);  
    }
}      

