-- ==============================================================================
-- Wiki Media NGHỊCH THỦY HÀN (NTH) - Supabase Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Create table for Community Shared Builds
CREATE TABLE IF NOT EXISTS public.community_builds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    share_code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    sect VARCHAR(64) NOT NULL,
    creator_name VARCHAR(128) DEFAULT 'Hiệp Khách Ẩn Danh',
    inner_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
    gear_slots JSONB NOT NULL DEFAULT '{}'::jsonb,
    element_counts JSONB NOT NULL DEFAULT '{}'::jsonb,
    resonances JSONB NOT NULL DEFAULT '[]'::jsonb,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for instant lookup by share code and sect filter
CREATE INDEX IF NOT EXISTS idx_community_builds_share_code ON public.community_builds(share_code);
CREATE INDEX IF NOT EXISTS idx_community_builds_sect ON public.community_builds(sect);
CREATE INDEX IF NOT EXISTS idx_community_builds_created_at ON public.community_builds(created_at DESC);

-- 2. Create table for User Persistent Inventories (Backup for 10 gear & reserve kungfus)
CREATE TABLE IF NOT EXISTS public.user_inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_key VARCHAR(128) UNIQUE NOT NULL,
    reserve_kungfus JSONB NOT NULL DEFAULT '[]'::jsonb,
    gear_slots JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_inventories_key ON public.user_inventories(user_key);

-- 3. Configure Row Level Security (RLS)
ALTER TABLE public.community_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_inventories ENABLE ROW LEVEL SECURITY;

-- Allow public read access on community builds
CREATE POLICY "Public Read Community Builds"
    ON public.community_builds
    FOR SELECT
    USING (true);

-- Allow public insert of new builds
CREATE POLICY "Public Insert Community Builds"
    ON public.community_builds
    FOR INSERT
    WITH CHECK (true);

-- Allow public read and upsert of inventory by user_key
CREATE POLICY "Public Read User Inventories"
    ON public.user_inventories
    FOR SELECT
    USING (true);

CREATE POLICY "Public Insert/Update User Inventories"
    ON public.user_inventories
    FOR ALL
    USING (true)
    WITH CHECK (true);

