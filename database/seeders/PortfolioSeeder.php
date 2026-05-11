<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Education;
use App\Models\Certificate;
use App\Models\SocialLink;
use App\Models\ContactMessage;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Settings
        $settings = [
            'site_title' => 'Dinar Abdul Hollik Firdaus | Full Stack Developer',
            'site_logo_text' => 'DH.',
            'hero_badge' => 'Available for Freelance & Full-time',
            'hero_title_prefix' => 'Dinar Abdul Hollik',
            'hero_title_suffix' => 'Firdaus',
            'hero_description' => 'Full Stack Developer | Backend Specialist with 3+ years of experience building scalable systems and interactive web applications.',
            'about_description' => 'I am a passionate Full Stack & Backend Developer focused on building high-performance, scalable, and user-centric web applications. With over 3 years of experience in the industry, I specialize in Laravel, React, and MySQL.',
            'contact_email' => 'dinar.abd@example.com',
            'contact_description' => 'Have a project in mind or want to hire me for your team? Feel free to reach out. I\'m always open to new opportunities.',
            'footer_text' => 'Dinar Abdul Hollik Firdaus. All rights reserved.',
            'whatsapp_number' => '628123456789',
        ];

        foreach ($settings as $key => $value) {
            Setting::create(['key' => $key, 'value' => $value]);
        }

        // Skills
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 95, 'order' => 1],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 90, 'order' => 2],
            ['name' => 'React.js', 'category' => 'Frontend', 'level' => 85, 'order' => 3],
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 90, 'order' => 4],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 88, 'order' => 5],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 80, 'order' => 6],
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 75, 'order' => 7],
            ['name' => 'Git', 'category' => 'Tools', 'level' => 90, 'order' => 8],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        // Experiences
        Experience::create([
            'company' => 'Log In Megastore',
            'role' => 'Full Stack Developer',
            'start_date' => '2023-01-01',
            'is_current' => true,
            'description' => 'Developing and maintaining scalable systems, integrating APIs, and optimizing performance for enterprise-level applications.',
        ]);

        Experience::create([
            'company' => 'PT Shirobyte',
            'role' => 'Backend Developer',
            'start_date' => '2021-06-01',
            'end_date' => '2022-12-31',
            'is_current' => false,
            'description' => 'Focused on backend development using Laravel and Node.js for various client projects.',
        ]);

        // Education
        Education::create([
            'institution' => 'University of Technology',
            'degree' => 'Bachelor of Computer Science',
            'major' => 'Software Engineering',
            'start_year' => '2017',
            'end_year' => '2021',
            'gpa' => '3.8/4.0',
        ]);

        // Certificates
        Certificate::create([
            'title' => 'Laravel Advanced',
            'issuer' => 'Udemy',
            'issue_date' => '2022-05-15',
        ]);

        // Projects
        Project::create([
            'title' => 'Recruitment Psychological Test App',
            'description' => 'Comprehensive recruitment system for psychological testing and IQ measurement.',
            'category' => 'Web App',
            'is_featured' => true,
            'order' => 1,
        ]);

        Project::create([
            'title' => 'Goods Delivery Control',
            'description' => 'Internal logistics system to track and control goods movement across warehouses.',
            'category' => 'System',
            'is_featured' => true,
            'order' => 2,
        ]);

        // Social Links
        SocialLink::create(['platform' => 'GitHub', 'url' => 'https://github.com/dinartrevor', 'icon' => 'github']);
        SocialLink::create(['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/in/dinartrevor', 'icon' => 'linkedin']);

        // Dummy Contact Message
        ContactMessage::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Freelance Project',
            'message' => 'Hello Dinar, I would like to discuss a freelance project with you.',
        ]);
    }
}
