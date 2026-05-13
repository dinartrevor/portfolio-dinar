<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\FreelanceExperience;
use App\Models\Hobby;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\SocialLink;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Frontend/Home', [
            'settings' => Setting::all()->pluck('value', 'key'),
            'skills' => Skill::orderBy('order')->get()->groupBy('category'),
            'experiences' => Experience::orderBy('start_date', 'desc')->get(),
            'freelance_experiences' => FreelanceExperience::orderBy('order')->get(),
            'projects' => Project::orderBy('order')->get(),
            'certificates' => Certificate::orderBy('order')->get(),
            'hobbies' => Hobby::where('is_active', true)->orderBy('order')->get(),
            'educations' => Education::orderBy('start_year', 'desc')->get(),
            'social_links' => SocialLink::all(),
        ]);
    }
}
