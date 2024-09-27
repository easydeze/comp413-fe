import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/Login'); // Immediately redirect to the Login page
  return null;
}