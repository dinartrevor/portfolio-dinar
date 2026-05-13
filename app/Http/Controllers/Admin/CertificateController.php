<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => Certificate::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Certificates/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_featured' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        }

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate added successfully.');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('Admin/Certificates/Edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_featured' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($certificate->image) {
                Storage::disk('public')->delete($certificate->image);
            }
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        }

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->image) {
            Storage::disk('public')->delete($certificate->image);
        }
        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
