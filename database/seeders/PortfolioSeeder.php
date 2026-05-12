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
            ['key' => 'site_title', 'value' => 'Dinar Abdul Hollik Firdaus | Full Stack Developer', 'group' => 'site'],
            ['key' => 'site_logo_text', 'value' => 'Dinar Abdul.', 'group' => 'site'],
            ['key' => 'site_logo_image', 'value' => null, 'group' => 'site'],
            ['key' => 'hero_badge', 'value' => 'Available for Freelance', 'group' => 'hero'],
            ['key' => 'hero_title_prefix', 'value' => 'Dinar Abdul Hollik', 'group' => 'hero'],
            ['key' => 'hero_title_suffix', 'value' => 'Firdaus', 'group' => 'hero'],
            ['key' => 'hero_description', 'value' => 'Full Stack Developer | Backend Specialist with 3+ years of experience building scalable systems and interactive web applications.', 'group' => 'hero'],
            ['key' => 'profile_image', 'value' => json_encode(['img/dinar.jpg', 'img/dinar2.png']), 'group' => 'about'],
            ['key' => 'about_title', 'value' => 'About Me', 'group' => 'about'],
            ['key' => 'about_description', 'value' => "I am a passionate Full Stack & Backend Developer based in Indonesia. I specialize in building high-performance, scalable, and user-centric web applications using modern technologies like Laravel and React.js.\n\nWith over 3 years of professional experience, I have successfully delivered various complex systems, from logistics management to recruitment testing platforms. I am constantly learning and adapting to new technologies to provide the best solutions for my clients and employers.", 'group' => 'about'],
            ['key' => 'contact_email', 'value' => 'dinartrevor@gmail.com', 'group' => 'contact'],
            ['key' => 'contact_description', 'value' => "Have a project in mind or want to hire me for your team? Feel free to reach out. I'm always open to new opportunities.", 'group' => 'contact'],
            ['key' => 'cv_download_link', 'value' => 'https://drive.google.com/file/d/1ddeQiJg0eV_Ek4hvoinDjnwpBRZV9ld1/view?usp=sharing', 'group' => 'contact'],
            ['key' => 'whatsapp_number', 'value' => '6285161030200', 'group' => 'contact'],
            ['key' => 'footer_text', 'value' => 'Dinar Abdul Hollik Firdaus. All rights reserved.', 'group' => 'site'],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }

        // Skills
        $skills = [
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 95, 'order' => 1, 'color' => '#FF2D20', 'icon' => 'laravel'],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 90, 'order' => 2, 'color' => '#777BB4', 'icon' => 'php'],
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 90, 'order' => 3, 'color' => '#4479A1', 'icon' => 'mysql'],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 85, 'order' => 4, 'color' => '#339933', 'icon' => 'nodejs'],
            ['name' => 'React.js', 'category' => 'Frontend', 'level' => 80, 'order' => 5, 'color' => '#61DAFB', 'icon' => 'react'],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 85, 'order' => 6, 'color' => '#38B2AC', 'icon' => 'tailwind'],
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 75, 'order' => 7, 'color' => '#2496ED', 'icon' => 'docker'],
            ['name' => 'Redis', 'category' => 'Tools', 'level' => 70, 'order' => 8, 'color' => '#DC382D', 'icon' => 'redis'],
            ['name' => 'Git', 'category' => 'Tools', 'level' => 90, 'order' => 9, 'color' => '#F05032', 'icon' => 'git'],
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
            'tech_stack' => ['Laravel', 'React.js', 'Mantine UI', 'AdonisJS', 'MySQL', 'Node.js', 'Flutter', 'Redis'],
            'description' => "Developed and optimized web applications for performance, scalability, and security using RESTful APIs and AJAX.\nBuilt and maintained backend services using Laravel and AdonisJS.\nDeveloped modern web applications using React.js with Mantine UI to create responsive and user-friendly interfaces.\nDesigned and implemented admin dashboards using React.js (Mantine) integrated with Laravel backend.\nBuilt server-side applications to support real-time communication between client and server.\nMaintained and monitored backend services and databases to ensure high availability and performance.",
        ]);

        Experience::create([
            'company' => 'PT Shirobyte',
            'role' => 'Backend Developer',
            'start_date' => '2021-06-01',
            'end_date' => '2022-12-31',
            'is_current' => false,
            'tech_stack' => ['Laravel', 'PHP', 'REST API', 'MySQL', 'Git', 'CodeIgniter', 'Node JS', 'Vue JS', 'TypeScript'],
            'description' => "Developed RESTful APIs to support system integration across multiple platforms.\nIdentified, debugged, and resolved application issues in a timely manner.\nEnhanced application scalability by optimizing existing features and codebase.\nImplemented version control best practices to improve code quality and reduce bugs.\nCollaborated with front-end teams to ensure smooth backend integration.",
        ]);

        Experience::create([
            'company' => 'PT Authentic Guards',
            'role' => 'Backend Developer',
            'start_date' => '2020-07-01',
            'end_date' => '2021-11-30',
            'is_current' => false,
            'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST API', 'Redis', 'Javascrpt'],
            'description' => "Developed RESTful APIs to enable seamless interoperability between multiple systems.\nCollaborated closely with front-end developers to ensure smooth system integration.\nMaintained and monitored backend services and databases to ensure optimal performance and reliability.",
        ]);

        // Education
        Education::create([
            'institution' => 'Universitas Teknologi Bandung',
            'degree' => 'Bachelor of Informatics Engineering',
            'major' => 'Informatics Engineering',
            'start_year' => '2021',
            'end_year' => '2025',
            'gpa' => '3.49/4.0',
        ]);

        Education::create([
            'institution' => 'SMK Prakarya Internasional',
            'degree' => 'Vocational High School',
            'major' => 'Software Engineering',
            'start_year' => '2017',
            'end_year' => '2020',
            'gpa' => '8.0',
        ]);

        // Certificates
        Certificate::create(
            [
            'title' => 'Android Development Associate (ADA)',
            'issuer' => 'CertNexus',
            'issue_date' => '2025-09-11',
            'credential_url' => 'https://certifications.certnexus.com/3b4fbdb2-9293-40d0-b8be-6d227f2b0a92#acc.PmGaywr8',
            ]
            
        );

        Certificate::create(
           [
            'title' => 'Project Integration Methodology of Excellence (PRIME)',
            'issuer' => 'CertNexus',
            'issue_date' => '2025-09-11',
            'credential_url' => 'https://certifications.certnexus.com/9259cf3d-a539-4735-b9c8-3bef032ee4f9#acc.eE7ZGKdc',
            ]
            
        );

        // Projects
        Project::create([
            'title' => 'Recruitment Psychological Test App',
            'description' => 'Comprehensive recruitment system for psychological testing and IQ measurement. Features automated grading, real-time proctoring, and advanced analytics for HR teams.',
            'tech_stack' => ['Laravel', 'MySQL', 'Bootstrap', 'AJAX', 'Chart.js'],
            'category' => 'Web App',
            'is_featured' => true,
            'order' => 1,
        ]);

        Project::create([
            'title' => 'Goods Delivery Control',
            'description' => 'Internal logistics system to track and control goods movement across multiple warehouses. Real-time inventory updates and automated shipping manifests.',
            'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Redis', 'Tailwind CSS'],
            'category' => 'System',
            'is_featured' => true,
            'order' => 2,
        ]);

        Project::create([
            'title' => 'E-Commerce Core API',
            'description' => 'Scalable microservices-based API for a high-traffic e-commerce platform. Handles payments, orders, and complex product catalogs.',
            'tech_stack' => ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
            'category' => 'Backend',
            'is_featured' => false,
            'order' => 3,
        ]);

        // Social Links
        SocialLink::create(['platform' => 'GitHub', 'url' => 'https://github.com/dinartrevor', 'icon' => 'github']);
        SocialLink::create(['platform' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/dinar-abdul-hollik-firdaus-2977351a0', 'icon' => 'linkedin']);

        // Dummy Contact Message
        ContactMessage::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Freelance Project',
            'message' => 'Hello Dinar, I would like to discuss a freelance project with you. Your profile looks very impressive!',
        ]);
    }
}
