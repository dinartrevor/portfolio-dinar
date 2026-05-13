import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { settings } = usePage().props;
    
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    const favicon = getImageUrl(settings?.site_logo_icon);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
            <Head>
                {favicon && <link rel="icon" type="image/x-icon" href={favicon} />}
            </Head>
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-cyan-600" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-8 py-8 shadow-2xl shadow-gray-200/50 sm:max-w-md sm:rounded-[2rem] border border-gray-100">
                {children}
            </div>
        </div>
    );
}
