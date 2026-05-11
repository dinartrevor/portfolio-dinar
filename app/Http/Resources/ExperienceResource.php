<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company' => $this->company,
            'position' => $this->position,
            'description' => $this->description,
            'start_date' => $this->start_date ? $this->start_date->format('M Y') : null,
            'end_date' => $this->end_date ? $this->end_date->format('M Y') : null,
            'is_current' => (bool)$this->is_current,
        ];
    }
}
