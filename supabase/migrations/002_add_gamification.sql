-- Add gamification columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN total_likes INTEGER NOT NULL DEFAULT 0,
ADD COLUMN pet_clicks INTEGER NOT NULL DEFAULT 0;

-- Create RPC for atomic profile likes increment
CREATE OR REPLACE FUNCTION increment_profile_likes(target_username TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET total_likes = total_likes + 1
  WHERE username = target_username;
END;
$$;

-- Create RPC for atomic pet clicks increment
CREATE OR REPLACE FUNCTION increment_pet_clicks(target_username TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET pet_clicks = pet_clicks + 1
  WHERE username = target_username;
END;
$$;

-- Create RPC for atomic profile likes decrement
CREATE OR REPLACE FUNCTION decrement_profile_likes(target_username TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET total_likes = GREATEST(total_likes - 1, 0)
  WHERE username = target_username;
END;
$$;
