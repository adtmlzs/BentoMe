import type { Metadata } from 'next';
import { ProfilePageClient } from './ProfilePageClient';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} — BentoBox Profile`,
    description: `Check out ${username}'s interactive bento profile.`,
    openGraph: {
      title: `${username} — BentoBox Profile`,
      description: `Check out ${username}'s interactive bento profile.`,
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  return <ProfilePageClient username={username} />;
}
