// api.js
export async function fetchUserPreferences() {
  const response = await fetch('/api/user/preference');
  if (!response.ok) throw new Error('Failed to fetch preferences');
  return response.json();
}

export async function updateUserPreference(newUnit) {
  const response = await fetch('/api/user/preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ unit: newUnit }),
  });
  if (!response.ok) throw new Error('Failed to update preference');
}