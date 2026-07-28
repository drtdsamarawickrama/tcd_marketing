import { redirect } from 'next/navigation';

export default function NotFound() {
    // Redirect non-existent routes back to home page
    redirect('/');
}
