<?php

namespace App\Repositories;

use App\Models\Setting;

class SettingRepository extends BaseRepository
{
    public function __construct(Setting $setting)
    {
        parent::__construct($setting);
    }

    public function getValue($key)
    {
        $setting = $this->model->where('key', $key)->first();
        return $setting ? $setting->value : null;
    }
}
