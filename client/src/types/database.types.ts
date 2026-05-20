// ─── Supabase Database Types ───────────────────────────────────────
// Manually defined to match the profiles table schema.
// In production, generate these with: npx supabase gen types typescript

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          theme_config: ThemeConfigJson;
          blocks: BlockJson[];
          is_published: boolean;
          created_at: string;
          updated_at: string;
          total_likes: number;
          pet_clicks: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          theme_config?: ThemeConfigJson;
          blocks?: BlockJson[];
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          total_likes?: number;
          pet_clicks?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          theme_config?: ThemeConfigJson;
          blocks?: BlockJson[];
          is_published?: boolean;
          updated_at?: string;
          total_likes?: number;
          pet_clicks?: number;
        };
      };
    };
  };
}

// ─── JSONB Column Types ────────────────────────────────────────────

export interface ThemeConfigJson {
  mode: 'light' | 'dark' | 'custom';
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  backgroundImage?: string;
  backgroundBlur?: number;
  customCSS?: string;
  backgroundVideoUrl?: string;
  musicUrl?: string;
  cursorStyle?: 'default' | 'crosshair' | 'neon' | 'katana' | 'dot';
  particleEffect?: 'none' | 'snow' | 'matrix' | 'sakura';
  canvasMode?: 'none' | 'cyberpunk' | 'matrix' | 'liquidGlass';
  glassmorphismLevel?: 0 | 1 | 2 | 3;
  themePreset?: 'custom' | 'y2k-matrix' | 'lofi-chill' | 'cyberpunk' | 'opium-dark';
  discordUserId?: string;
}

export interface BlockJson {
  id: string;
  type: 'link' | 'text' | 'image' | 'embed' | 'social' | 'header' | 'spacer' | 'vibeTracker' | 'progressBar' | 'lanyard' | 'animatedText';
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  content: Record<string, unknown>;
  style: {
    backgroundColor?: string;
    backgroundGradient?: string;
    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    padding?: number;
    opacity?: number;
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    animation?: 'none' | 'fadeIn' | 'slideUp' | 'bounce' | 'pulse';
  };
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Helper Type ───────────────────────────────────────────────────
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
