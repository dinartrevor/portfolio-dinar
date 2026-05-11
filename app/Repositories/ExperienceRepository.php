<?php

namespace App\Repositories;

use App\Models\Experience;

class ExperienceRepository extends BaseRepository
{
    public function __construct(Experience $experience)
    {
        parent::__construct($experience);
    }

    public function getAll()
    {
        return $this->model->orderBy('start_date', 'desc')->get();
    }
}
