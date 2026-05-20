import type { Metadata } from 'next';
import { ProfilePageClient } from './ProfilePageClient';
import { createClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  
  try {
    const supabase = await createClient();
    const { data: profile } = (await supabase
      .from('profiles')
      .select('display_name, bio')
      .eq('username', username.toLowerCase())
      .maybeSingle()) as any;

    if (profile) {
      const title = `${profile.display_name} (@${username.toLowerCase()}) | BentoBox`;
      const description = profile.bio || `Check out ${profile.display_name}'s interactive BentoBox grid.`;
      return {
        title,
        description,
        openGraph: {
          title,
          description,
        },
      };
    }
  } catch (err) {
    console.error('Error generating metadata:', err);
  }

  return {
    title: `@${username.toLowerCase()} | BentoBox`,
    description: `Check out @${username.toLowerCase()}'s interactive BentoBox grid.`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  return <ProfilePageClient username={username} />;
}
