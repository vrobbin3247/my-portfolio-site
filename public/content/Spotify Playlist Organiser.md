# Spotify Playlist Organizer

A React app for splitting up large Spotify playlists into smaller, organized collections using drag-and-drop.

## What It Does

Ever had a massive playlist with hundreds of songs that became impossible to navigate? This tool lets you break it down into focused sub-playlists. You can drag tracks around, create up to 4 new playlists, and save everything back to Spotify.

<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/spotify_organiser_playlist_sorting.gif" width="80%" alt="working" />

**Features:**

- Login with Spotify
- Browse your existing playlists
- Drag and drop tracks between playlists
- Create new playlists with custom names and descriptions
- Save organized playlists back to Spotify

## How It Works

### Authentication

Uses Spotify's OAuth flow with automatic token refresh when needed:

<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/Screenshot%202025-09-11%20at%2011.25.22%E2%80%AFPM.png" width="50%" alt="auth" />

```typescript
const makeSpotifyRequest = async (url: string, options: any = {}) => {
  try {
    const response = await axios({
      url,
      headers: { Authorization: `Bearer ${accessToken}` },
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired, refresh it and try again
      await refreshAccessToken();
      // Retry the request...
    }
  }
};
```

### Drag and Drop

Pretty straightforward - tracks become draggable, playlist slots become drop targets:

```typescript
const handleDragStart = (e: React.DragEvent, track: Track) => {
  e.dataTransfer.setData("track", JSON.stringify(track));
};

const handleDrop = (e: React.DragEvent, playlistNumber: number) => {
  const track = JSON.parse(e.dataTransfer.getData("track"));

  // Add to destination playlist
  setPlaylistTracks((prev) => ({
    ...prev,
    [playlistNumber]: [...(prev[playlistNumber] || []), track],
  }));

  // Remove from available tracks
  setAvailableTracks((prev) =>
    prev.filter((t) => t.track.id !== track.track.id)
  );
};
```

### Track Display

Shows tracks in a carousel-style layout with album art and info:

```typescript
const getVisibleCardIndexes = (trackList: Track[]) => {
  const indices = [];
  for (let i = 0; i < 6; i++) {
    if (i < trackList.length) {
      indices.push((currentIndex + i) % trackList.length);
    }
  }
  return indices;
};
```

## Getting Spotify API Access

You need a Spotify Developer account to use this app:

**1. Create Spotify App**

- Go to [Spotify for Developers](https://developer.spotify.com/)
- Click "Create App"
- Fill in basic details (name, description)
- Add redirect URI: `http://localhost:5173/auth/callback`

**2. Get Your Credentials**

- Copy the Client ID and Client Secret from your app dashboard
- Add these scopes: `playlist-read-private`, `playlist-modify-public`, `playlist-modify-private`

**3. Environment Setup**
Create a `.env` file:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/auth/callback
```

## Main API Functions

```typescript
// Get user's playlists
export const getUserPlaylists = async () => {
  return makeSpotifyRequest(`${API_BASE_URL}/me/playlists`);
};

// Create new playlist
export const createPlaylist = async (data: {
  name: string;
  description?: string;
  public?: boolean;
}) => {
  const user = await getCurrentUserProfile();
  return makeSpotifyRequest(`${API_BASE_URL}/users/${user.id}/playlists`, {
    method: "POST",
    data,
  });
};

// Add tracks to playlist
export const addTracksToPlaylist = async (
  playlistId: string,
  trackUris: string[]
) => {
  return makeSpotifyRequest(`${API_BASE_URL}/playlists/${playlistId}/tracks`, {
    method: "POST",
    data: { uris: trackUris },
  });
};
```

## UI Components

### Dashboard

Shows all your playlists in a scrollable grid. Click one to start organizing it.
<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/spotify_organiser_front.gif" width="80%" alt="dashboard" />

### Playlist Info

Styled like Spotify with album art, track name, and artist.
<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/spotify_organiser_playlist_view.gif" width="80%" alt="main" />

### Destination Areas

Four slots where you can drop tracks. Click empty ones to create a new playlist with a modal form.

### Playlist Creation Modal

Simple form for naming your new playlist, adding a description, and setting privacy.
<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/spotify_organiser_playlist_craetion.gif" width="80%" alt="info view" />

## Saving Back to Spotify

When you're done organizing, the app creates all your new playlists in one batch:
<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/spotify/spotify_organiser_playlist_saving.gif" width="80%" alt="saving" />

```typescript
const savePlaylistsToSpotify = async () => {
  const results = await Promise.all(
    Object.entries(createdPlaylists).map(
      async ([playlistNum, playlistData]) => {
        const trackUris =
          playlistTracks[Number(playlistNum)]?.map(
            (track) => `spotify:track:${track.track.id}`
          ) || [];

        if (trackUris.length === 0) return null;

        const newPlaylist = await createPlaylist({
          name: playlistData.name,
          description: playlistData.description,
          public: playlistData.isPublic,
        });

        await addTracksToPlaylist(newPlaylist.id, trackUris);
        return newPlaylist;
      }
    )
  );
};
```

## Tech Stack

- **React + TypeScript** - Main app framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations for the track cards
- **React Router** - Navigation between pages
- **Axios** - HTTP requests to Spotify API

## Installation

```bash
git clone https://github.com/yourusername/spotify-playlist-organizer.git
cd spotify-playlist-organizer
npm install
npm run dev
```

Make sure to set up your `.env` file with Spotify credentials first.

## How to Use

1. Login with your Spotify account
2. Pick a playlist you want to organize
3. Create up to 4 new playlists by clicking the "+" cards
4. Drag tracks from the main carousel into your new playlists
5. When you're done, hit "Save Playlists to Spotify"

That's it. The app handles the rest and your organized playlists show up in Spotify.
