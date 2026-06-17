create extension if not exists pgcrypto;

create type public.trip_status as enum ('draft', 'planning', 'open', 'full', 'started', 'completed', 'cancelled');
create type public.join_request_status as enum ('pending', 'approved', 'rejected', 'waitlisted');
create type public.group_type as enum ('Men Only', 'Women Only', 'Mixed');
create type public.linkedin_status as enum ('not_connected', 'pending', 'verified', 'manual_review_required', 'failed');
create type public.report_status as enum ('pending', 'reviewing', 'resolved', 'dismissed');
create type public.community_type as enum ('official', 'user_created');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  profile_photo_path text,
  gender text,
  age_range text,
  city text,
  travel_presence_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_auth_user_id_unique
  on public.profiles (auth_user_id)
  where auth_user_id is not null;

create table public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  company text,
  designation text,
  industry text,
  persona text,
  linkedin_url text,
  created_at timestamptz not null default now()
);

create table public.user_linkedin_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  provider_subject text,
  linkedin_url text,
  headline text,
  company text,
  status public.linkedin_status not null default 'pending',
  raw_profile jsonb not null default '{}'::jsonb,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.user_verifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  phone_verified boolean not null default false,
  email_verified boolean not null default false,
  photo_verified boolean not null default false,
  emergency_contact_verified boolean not null default false,
  linkedin_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  created_profile_id uuid;
begin
  insert into public.profiles (auth_user_id, full_name, profile_photo_path)
  select
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Tripundo Traveler'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  where not exists (
    select 1 from public.profiles where auth_user_id = new.id
  )
  returning id into created_profile_id;

  if created_profile_id is not null then
    insert into public.user_verifications (profile_id, email_verified)
    values (created_profile_id, new.email_confirmed_at is not null);
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create table public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  relationship text not null,
  phone_number text not null,
  created_at timestamptz not null default now()
);

create table public.user_matching_preferences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  roles text[] not null default '{}',
  industries text[] not null default '{}',
  verified_only boolean not null default false,
  similar_travel_style boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.user_travel_interests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  interest text not null
);

create table public.user_lifestyle_preferences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  smoking_preference text,
  drinking_preference text,
  food_preference text,
  budget_preference text
);

create table public.user_capabilities (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  capability text not null
);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text not null,
  community_type public.community_type not null default 'user_created',
  reserved_keyword text,
  focus text,
  image_path text,
  cover_image_path text,
  tags text[] not null default '{}',
  theme_tags text[] not null default '{}',
  trust_score int not null default 0 check (trust_score between 0 and 100),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create unique index communities_reserved_keyword_unique
  on public.communities (reserved_keyword)
  where reserved_keyword is not null;

create table public.community_members (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  unique (community_id, profile_id)
);

create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  post_type text not null default 'discussion',
  created_at timestamptz not null default now()
);

create table public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  parent_comment_id uuid references public.community_comments(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.community_polls (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  question text not null,
  options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  organizer_profile_id uuid not null references public.profiles(id) on delete restrict,
  title text not null,
  destination text not null,
  route text,
  start_date date not null,
  end_date date not null,
  pickup_location text,
  expected_budget text,
  description text,
  maximum_participants int not null check (maximum_participants between 2 and 20),
  group_type public.group_type not null default 'Mixed',
  status public.trip_status not null default 'planning',
  resources text[] not null default '{}',
  lifecycle_moment text not null default 'Planning',
  group_trust_score int not null default 0 check (group_trust_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table public.trip_routes (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  origin text not null,
  destination text not null,
  polyline text,
  approximate_distance_km numeric,
  created_at timestamptz not null default now()
);

create table public.trip_join_requests (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  requester_profile_id uuid not null references public.profiles(id) on delete cascade,
  organizer_profile_id uuid references public.profiles(id),
  compatibility_score int check (compatibility_score between 0 and 100),
  status public.join_request_status not null default 'pending',
  requested_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (trip_id, requester_profile_id)
);

create table public.trip_plan_members (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'planning_member',
  confirmed_for_trip boolean not null default false,
  joined_at timestamptz not null default now(),
  unique (trip_id, profile_id)
);

create table public.trip_plan_messages (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.trip_participants (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  participant_role text not null default 'traveler',
  approved_at timestamptz not null default now(),
  removed_at timestamptz,
  unique (trip_id, profile_id)
);

create table public.trip_group_messages (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  body text,
  attachment_path text,
  message_type text not null default 'text',
  created_at timestamptz not null default now()
);

create table public.trip_announcements (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  organizer_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.trip_checklists (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table public.trip_tasks (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  assigned_profile_id uuid references public.profiles(id),
  role text,
  task text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.trip_expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  paid_by_profile_id uuid not null references public.profiles(id),
  category text not null,
  amount numeric(12,2) not null check (amount >= 0),
  note text,
  created_at timestamptz not null default now()
);

create table public.trip_expense_splits (
  id uuid primary key default gen_random_uuid(),
  expense_id uuid not null references public.trip_expenses(id) on delete cascade,
  profile_id uuid not null references public.profiles(id),
  amount numeric(12,2) not null check (amount >= 0),
  paid boolean not null default false
);

create table public.trip_reviews (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  reviewer_profile_id uuid not null references public.profiles(id),
  reviewee_profile_id uuid not null references public.profiles(id),
  reliability int check (reliability between 1 and 5),
  communication int check (communication between 1 and 5),
  safety int check (safety between 1 and 5),
  friendliness int check (friendliness between 1 and 5),
  punctuality int check (punctuality between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table public.trust_scores (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  identity_points int not null default 0,
  linkedin_points int not null default 0,
  completed_trip_points int not null default 0,
  rating_points int not null default 0,
  safety_points int not null default 0,
  total_score int generated always as (identity_points + linkedin_points + completed_trip_points + rating_points + safety_points) stored,
  updated_at timestamptz not null default now()
);

create table public.group_trust_scores (
  id uuid primary key default gen_random_uuid(),
  community_id uuid references public.communities(id) on delete cascade,
  trip_id uuid references public.trips(id) on delete cascade,
  completed_trip_points int not null default 0,
  review_points int not null default 0,
  safety_points int not null default 0,
  organizer_reliability_points int not null default 0,
  dropout_penalty int not null default 0,
  total_score int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.traveler_presence (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  trip_id uuid not null references public.trips(id) on delete cascade,
  enabled boolean not null default false,
  approximate_distance_band text,
  exact_location_shared boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.connection_requests (
  id uuid primary key default gen_random_uuid(),
  requester_profile_id uuid not null references public.profiles(id) on delete cascade,
  receiver_profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (requester_profile_id, receiver_profile_id)
);

create table public.user_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_profile_id uuid references public.profiles(id) on delete set null,
  reported_profile_id uuid references public.profiles(id) on delete set null,
  trip_id uuid references public.trips(id) on delete set null,
  reason text not null,
  details text,
  status public.report_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.user_blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_profile_id uuid not null references public.profiles(id) on delete cascade,
  blocked_profile_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (blocker_profile_id, blocked_profile_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.social_templates (
  id uuid primary key default gen_random_uuid(),
  moment text not null,
  format text not null,
  size text not null,
  theme text not null,
  caption_template text,
  active boolean not null default true
);

create table public.social_assets (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete cascade,
  creator_profile_id uuid references public.profiles(id) on delete set null,
  template_moment text not null,
  format text not null,
  theme text not null,
  storage_path text,
  caption text,
  privacy_snapshot jsonb not null default '{}'::jsonb,
  export_size text,
  created_at timestamptz not null default now()
);

create table public.social_share_events (
  id uuid primary key default gen_random_uuid(),
  social_asset_id uuid not null references public.social_assets(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  channel text not null default 'instagram',
  event_type text not null,
  created_at timestamptz not null default now()
);

create table public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  admin_profile_id uuid references public.profiles(id) on delete set null,
  action_type text not null,
  target_table text,
  target_id uuid,
  note text,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values
  ('profile-photos', 'profile-photos', false),
  ('community-photos', 'community-photos', false),
  ('trip-chat-images', 'trip-chat-images', false),
  ('trip-documents', 'trip-documents', false),
  ('trip-social-assets', 'trip-social-assets', false),
  ('generated-destination-assets', 'generated-destination-assets', false),
  ('report-attachments', 'report-attachments', false)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.user_linkedin_profiles enable row level security;
alter table public.user_verifications enable row level security;
alter table public.emergency_contacts enable row level security;
alter table public.user_matching_preferences enable row level security;
alter table public.user_travel_interests enable row level security;
alter table public.user_lifestyle_preferences enable row level security;
alter table public.user_capabilities enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_polls enable row level security;
alter table public.trips enable row level security;
alter table public.trip_routes enable row level security;
alter table public.trip_join_requests enable row level security;
alter table public.trip_plan_members enable row level security;
alter table public.trip_plan_messages enable row level security;
alter table public.trip_participants enable row level security;
alter table public.trip_group_messages enable row level security;
alter table public.trip_announcements enable row level security;
alter table public.trip_checklists enable row level security;
alter table public.trip_tasks enable row level security;
alter table public.trip_expenses enable row level security;
alter table public.trip_expense_splits enable row level security;
alter table public.trip_reviews enable row level security;
alter table public.trust_scores enable row level security;
alter table public.group_trust_scores enable row level security;
alter table public.traveler_presence enable row level security;
alter table public.connection_requests enable row level security;
alter table public.user_reports enable row level security;
alter table public.user_blocks enable row level security;
alter table public.notifications enable row level security;
alter table public.social_templates enable row level security;
alter table public.social_assets enable row level security;
alter table public.social_share_events enable row level security;
alter table public.admin_actions enable row level security;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
as $$
  select id from public.profiles where auth_user_id = auth.uid() limit 1
$$;

create policy "profiles read own" on public.profiles
  for select using (auth_user_id = auth.uid());

create policy "profiles update own" on public.profiles
  for update using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

create policy "communities readable to authenticated users" on public.communities
  for select to authenticated using (true);

create policy "community members readable to authenticated users" on public.community_members
  for select to authenticated using (true);

create policy "trips readable to authenticated users" on public.trips
  for select to authenticated using (true);

create policy "trip join requests owned by requester or organizer" on public.trip_join_requests
  for select using (
    requester_profile_id = public.current_profile_id()
    or organizer_profile_id = public.current_profile_id()
  );

create policy "trip join requests insert own" on public.trip_join_requests
  for insert with check (requester_profile_id = public.current_profile_id());

create policy "trip plan members readable to authenticated users" on public.trip_plan_members
  for select to authenticated using (true);

create policy "trip plan members insert own" on public.trip_plan_members
  for insert with check (profile_id = public.current_profile_id());

create policy "trip plan messages readable to plan members" on public.trip_plan_messages
  for select using (
    exists (
      select 1 from public.trip_plan_members tpm
      where tpm.trip_id = trip_plan_messages.trip_id
      and tpm.profile_id = public.current_profile_id()
    )
  );

create policy "trip plan messages insert plan members" on public.trip_plan_messages
  for insert with check (
    profile_id = public.current_profile_id()
    and exists (
      select 1 from public.trip_plan_members tpm
      where tpm.trip_id = trip_plan_messages.trip_id
      and tpm.profile_id = public.current_profile_id()
    )
  );

create policy "trip participants readable to participants" on public.trip_participants
  for select using (
    profile_id = public.current_profile_id()
    or exists (
      select 1 from public.trip_participants tp
      where tp.trip_id = trip_participants.trip_id
      and tp.profile_id = public.current_profile_id()
    )
  );

create policy "private trip messages participant only" on public.trip_group_messages
  for select using (
    exists (
      select 1 from public.trip_participants tp
      where tp.trip_id = trip_group_messages.trip_id
      and tp.profile_id = public.current_profile_id()
      and tp.removed_at is null
    )
  );

create policy "private trip messages insert participant only" on public.trip_group_messages
  for insert with check (
    profile_id = public.current_profile_id()
    and exists (
      select 1 from public.trip_participants tp
      where tp.trip_id = trip_group_messages.trip_id
      and tp.profile_id = public.current_profile_id()
      and tp.removed_at is null
    )
  );

create policy "social assets owner or trip participant" on public.social_assets
  for select using (
    creator_profile_id = public.current_profile_id()
    or exists (
      select 1 from public.trip_participants tp
      where tp.trip_id = social_assets.trip_id
      and tp.profile_id = public.current_profile_id()
      and tp.removed_at is null
    )
  );

create policy "social assets creator insert" on public.social_assets
  for insert with check (
    creator_profile_id is null
    or creator_profile_id = public.current_profile_id()
  );

create policy "reports insert authenticated" on public.user_reports
  for insert to authenticated with check (
    reporter_profile_id is null
    or reporter_profile_id = public.current_profile_id()
  );

create policy "blocks owned by blocker" on public.user_blocks
  for all using (blocker_profile_id = public.current_profile_id())
  with check (blocker_profile_id = public.current_profile_id());
