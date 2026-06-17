async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`/api/tripundo${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Tripundo API request failed')
  }

  return data
}

export function getBootstrap() {
  return request('/bootstrap')
}

export function getCommunities(filters = {}) {
  const params = new URLSearchParams(filters)
  const query = params.toString()
  return request(`/communities${query ? `?${query}` : ''}`)
}

export function getCommunity(id) {
  return request(`/communities/${id}`)
}

export function createCommunity(payload) {
  return request('/communities', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function joinCommunity(payload) {
  return request('/community-members', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getCommunityMessages(communityId) {
  return request(`/communities/${communityId}/messages`)
}

export function sendCommunityMessage(payload) {
  return request('/community-messages', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getReservedKeywords() {
  return request('/reserved-keywords')
}

export function createJoinRequest(payload) {
  return request('/join-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function joinTripPlan(payload) {
  return request('/plan-members', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createTripPlanMessage(payload) {
  return request('/plan-messages', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function startTripPlan(tripId, payload) {
  return request(`/trip-plans/${tripId}/start`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function createTrip(payload) {
  return request('/trips', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createStoryAsset(payload) {
  return request('/story-assets', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function enableTravelerPresence(payload) {
  return request('/presence', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createReport(payload) {
  return request('/reports', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
