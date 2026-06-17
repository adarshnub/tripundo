import { NextResponse } from 'next/server'
import {
  adminMetrics,
  getTripundoBootstrap,
  reservedKeywords,
  storyTemplates,
  tripundoCommunities,
  tripundoProfiles,
  tripundoTrips,
} from '@/lib/tripundo-data'
import { createSupabaseApiClient, normalizeSupabaseRows } from '@/lib/supabase-server'

function json(data: any, init?: ResponseInit) {
  return NextResponse.json(data, init)
}

function initialsForName(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'TT'
}

function normalizeProfile(profile: any) {
  if (!profile || profile.name) return profile

  const name = profile.full_name || 'Tripundo Traveler'
  return {
    ...profile,
    name,
    initials: initialsForName(name),
    role: 'Tripundo traveler',
    company: 'Profile pending',
    industry: 'Travel',
    persona: 'Traveler',
    linkedInStatus: 'not_connected',
    trustScore: 60,
    tripsCompleted: 0,
    interests: [],
    capabilities: [],
    badges: ['Google signed in'],
  }
}

async function readTable(request: any, table: string, fallback: any, select = '*') {
  const supabase = createSupabaseApiClient(request)
  if (!supabase) return fallback

  const { data, error } = await supabase.from(table).select(select)
  if (error) {
    console.warn(`Supabase read failed for ${table}:`, error.message)
    return fallback
  }

  return normalizeSupabaseRows(data, fallback)
}

async function insertRow(request: any, table: string, payload: any) {
  const supabase = createSupabaseApiClient(request)
  if (!supabase) {
    return {
      id: `${table}-${Date.now()}`,
      ...payload,
      persisted: false,
      source: 'demo',
    }
  }

  const { data, error } = await supabase.from(table).insert(payload).select('*').single()
  if (error) {
    return { error: error.message, status: 400 }
  }

  return { ...data, persisted: true, source: 'supabase' }
}

async function updateRow(request: any, table: string, id: string, payload: any) {
  const supabase = createSupabaseApiClient(request)
  if (!supabase) {
    return {
      id,
      ...payload,
      persisted: false,
      source: 'demo',
    }
  }

  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select('*').single()
  if (error) {
    return { error: error.message, status: 400 }
  }

  return { ...data, persisted: true, source: 'supabase' }
}

export async function GET(request: any, { params }: any) {
  const [resource, id, subresource] = params.path || ['bootstrap']

  if (resource === 'bootstrap') {
    const [communities, trips, profileRows, templates] = await Promise.all([
      readTable(request, 'communities', tripundoCommunities),
      readTable(request, 'trips', tripundoTrips),
      readTable(request, 'profiles', tripundoProfiles),
      readTable(request, 'social_templates', storyTemplates),
    ])
    const profiles = profileRows.map(normalizeProfile)
    const bootstrap = getTripundoBootstrap()

    return json({
      ...bootstrap,
      source: createSupabaseApiClient(request) ? 'supabase' : 'demo',
      communities,
      trips,
      profiles,
      currentUser: profiles[0] || bootstrap.currentUser,
      storyTemplates: templates,
      reservedKeywords,
    })
  }

  if (resource === 'communities') {
    const communities = await readTable(request, 'communities', tripundoCommunities)
    const type = request.nextUrl.searchParams.get('type')
    const query = request.nextUrl.searchParams.get('q')?.toLowerCase()
    const filtered = communities.filter((community) => {
      const typeMatch = !type || community.community_type === type
      const queryMatch =
        !query ||
        [community.name, community.destination, community.focus, ...(community.theme_tags || community.tags || [])]
          .join(' ')
          .toLowerCase()
          .includes(query)
      return typeMatch && queryMatch
    })

    if (id && subresource === 'messages') {
      const community = communities.find((item) => item.id === id)
      return json(community?.messages || [])
    }

    if (id) {
      const community = communities.find((item) => item.id === id)
      return json({
        ...community,
        tripPlans: tripundoTrips.filter((trip) => trip.communityId === id),
      })
    }

    return json(filtered)
  }

  if (resource === 'trips') {
    const trips = await readTable(request, 'trips', tripundoTrips)
    return json(id ? trips.find((trip) => trip.id === id) : trips)
  }

  if (resource === 'profiles') {
    const profiles = await readTable(request, 'profiles', tripundoProfiles)
    return json(id ? profiles.find((profile) => profile.id === id) : profiles)
  }

  if (resource === 'story-templates') {
    const templates = await readTable(request, 'social_templates', storyTemplates)
    return json(templates)
  }

  if (resource === 'admin-metrics') {
    return json(adminMetrics)
  }

  if (resource === 'reserved-keywords') {
    return json(reservedKeywords)
  }

  return json({ error: `Unknown Tripundo API resource: ${resource}` }, { status: 404 })
}

export async function POST(request: any, { params }: any) {
  const [resource] = params.path || []
  const body = await request.json().catch(() => ({}))

  if (resource === 'trips') {
    const created = await insertRow(request, 'trips', {
      ...body,
      status: body.status || 'planning',
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'communities') {
    const keyword = String(body.name || body.destination || '').trim().toLowerCase()
    if (reservedKeywords.includes(keyword)) {
      return json(
        {
          error: `Reserved destination "${keyword}" already has an official Tripundo community. Create a trip plan inside that community instead.`,
        },
        { status: 409 }
      )
    }

    const created = await insertRow(request, 'communities', {
      ...body,
      community_type: 'user_created',
      reserved_keyword: null,
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'community-members') {
    const created = await insertRow(request, 'community_members', {
      ...body,
      role: body.role || 'member',
      joined_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'community-messages') {
    const created = await insertRow(request, 'community_posts', {
      ...body,
      body: body.body || body.message,
      post_type: 'discussion',
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'join-requests') {
    const created = await insertRow(request, 'trip_join_requests', {
      ...body,
      status: 'pending',
      requested_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'plan-members') {
    const created = await insertRow(request, 'trip_plan_members', {
      ...body,
      role: body.role || 'planning_member',
      confirmed_for_trip: Boolean(body.confirmed_for_trip),
      joined_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'plan-messages') {
    const created = await insertRow(request, 'trip_plan_messages', {
      ...body,
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'story-assets') {
    const created = await insertRow(request, 'social_assets', {
      ...body,
      privacy_snapshot: body.privacy || {},
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'presence') {
    const created = await insertRow(request, 'traveler_presence', {
      ...body,
      exact_location_shared: false,
      updated_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  if (resource === 'reports') {
    const created = await insertRow(request, 'user_reports', {
      ...body,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    return json(created, created.error ? { status: created.status } : undefined)
  }

  return json({ error: `Unknown Tripundo mutation: ${resource}` }, { status: 404 })
}

export async function PATCH(request: any, { params }: any) {
  const [resource, id, action] = params.path || []
  const body = await request.json().catch(() => ({}))

  if (!id) {
    return json({ error: 'Resource id is required for updates.' }, { status: 400 })
  }

  if (resource === 'join-requests') {
    const updated = await updateRow(request, 'trip_join_requests', id, body)
    return json(updated, updated.error ? { status: updated.status } : undefined)
  }

  if (resource === 'trips') {
    const updated = await updateRow(request, 'trips', id, body)
    return json(updated, updated.error ? { status: updated.status } : undefined)
  }

  if (resource === 'trip-plans' && action === 'start') {
    const updated = await updateRow(request, 'trips', id, {
      status: 'started',
      lifecycle_moment: 'Trip started',
      finalized_profile_ids: body.finalized_profile_ids || [],
      started_at: new Date().toISOString(),
    })
    return json(updated, updated.error ? { status: updated.status } : undefined)
  }

  return json({ error: `Unknown Tripundo update: ${resource}` }, { status: 404 })
}
