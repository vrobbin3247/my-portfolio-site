# Spotify Poster Maker: Transforming Music into Visual Art

A web application that automatically generates beautiful posters from Spotify track URLs, combining album artwork with intelligent design principles to create print-ready artwork.

<div class="flex flex-wrap justify-center gap-4 my-4">
  <img src="https://raw.githubusercontent.com/vrobbin3247/Spotify-Poster-Maker/main/images/poster_1.png" width="200" alt="Image 1" />
  <img src="https://raw.githubusercontent.com/vrobbin3247/Spotify-Poster-Maker/main/images/poster_2.png" width="200" alt="Image 2" />
  <img src="https://raw.githubusercontent.com/vrobbin3247/Spotify-Poster-Maker/main/images/poster_3.png" width="200" alt="Image 3" />
  <img src="https://raw.githubusercontent.com/vrobbin3247/Spotify-Poster-Maker/main/images/poster_4.png" width="200" alt="Image 4" />
</div>

## Project Overview

This Streamlit-based application takes any Spotify track URL and transforms it into a high-quality, A4-sized poster. The system automatically extracts track metadata, analyzes album artwork colors, and generates visually cohesive designs suitable for both digital sharing and physical printing.

**Key Features:**

- Automatic poster generation from Spotify URLs
- Dynamic color extraction from album artwork
- Intelligent gradient backgrounds that complement the music
- Smart typography with dynamic font scaling
- High-resolution output (A4, 300 DPI)
- One-click download functionality

## Technical Implementation

### Spotify API Integration

The application uses Spotipy to interact with Spotify's Web API, extracting comprehensive track metadata from simple URLs:

```python
def get_track_data(track_url):
    # Extract track ID from URL
    track_id = track_url.split("/")[-1].split("?")[0]

    # Fetch track details
    track_data = sp.track(track_id)

    # Return structured track information
    return {
        "name": track_data["name"],
        "album": {
            "name": track_data["album"]["name"],
            "images": track_data["album"]["images"],
            "artists": [{"name": artist["name"]} for artist in track_data["album"]["artists"]]
        }
    }
```

### Intelligent Color Analysis

The system uses K-Means clustering to extract dominant colors from album artwork, ensuring visual harmony between the artwork and poster background:

```python
def get_dominant_color(image, k=4):
    image = image.convert("RGB").resize((100, 100))
    pixels = np.array(image).reshape(-1, 3)

    kmeans = KMeans(n_clusters=k, n_init=10)
    kmeans.fit(pixels)

    dominant_color = kmeans.cluster_centers_[np.bincount(kmeans.labels_).argmax()]
    return tuple(map(int, dominant_color))
```

### Dynamic Typography System

To handle varying text lengths across different tracks, the application implements smart font scaling:

```python
def get_fitting_font(font_path, text, max_width, draw, initial_size=250):
    font_size = initial_size
    while font_size >= 100:  # minimum readable size
        font = ImageFont.truetype(font_path, font_size)
        text_width = draw.textbbox((0, 0), text, font=font)[2]
        if text_width <= max_width:
            return font
        font_size -= 10
    return ImageFont.truetype(font_path, 100)
```

## Technology Stack

- **Streamlit**: Web interface and user interaction
- **Spotipy**: Spotify API integration
- **Pillow (PIL)**: Image processing and poster generation
- **scikit-learn**: Color analysis via K-Means clustering
- **NumPy**: Mathematical operations for gradients

## Live Demo

<p><a href="https://spotify-poster-maker.streamlit.app/" target="_blank" rel="noopener noreferrer"><strong>Try the Application</strong></a></p>
<p><a href="https://github.com/vrobbin3247/spotify-poster-maker" target="_blank" rel="noopener noreferrer"><strong>View Source Code</strong></a></p>

---

_Built with Python, Streamlit, and creative problem-solving to bridge the gap between digital music and physical art._
