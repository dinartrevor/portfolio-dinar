<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\SettingService;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => \App\Http\Resources\SettingResource::collection($this->settingService->getAllSettings()),
        ]);
    }

    public function edit($id)
    {
        $setting = \App\Models\Setting::findOrFail($id);
        return Inertia::render('Admin/Settings/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request, $id)
    {
        $setting = \App\Models\Setting::findOrFail($id);
        
        $rules = [
            'value' => 'nullable',
        ];

        if ($setting->key === 'profile_image') {
            $rules['value.*'] = 'image|max:2048';
        } elseif ($request->hasFile('value')) {
            $rules['value'] = 'image|max:2048';
        } elseif ($setting->key !== 'site_logo_image') {
            $rules['value'] = 'required';
        }

        $request->validate($rules);

        if ($setting->key === 'profile_image' && $request->hasFile('value')) {
            // Delete old images
            if ($setting->value) {
                $oldImages = json_decode($setting->value, true);
                if (is_array($oldImages)) {
                    foreach ($oldImages as $oldImage) {
                        if (\Storage::disk('public')->exists($oldImage)) {
                            \Storage::disk('public')->delete($oldImage);
                        }
                    }
                }
            }

            $paths = [];
            foreach ($request->file('value') as $file) {
                $paths[] = $file->store('settings', 'public');
            }
            $this->settingService->updateSetting($id, ['value' => json_encode($paths)]);
        } elseif ($request->hasFile('value')) {
            // Delete old single image
            if ($setting->value && \Storage::disk('public')->exists($setting->value)) {
                \Storage::disk('public')->delete($setting->value);
            }
            $path = $request->file('value')->store('settings', 'public');
            $this->settingService->updateSetting($id, ['value' => $path]);
        } else {
            if ($request->has('value')) {
                $this->settingService->updateSetting($id, ['value' => $request->value]);
            }
        }

        return redirect()->route('admin.settings.index')->with('success', 'Setting updated successfully.');
    }
}
