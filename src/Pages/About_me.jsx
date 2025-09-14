import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Filter, Loader, ZoomIn, ZoomOut, Move } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CreativePortfolio() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [previewItem, setPreviewItem] = useState(null);
  const [relatedMedia, setRelatedMedia] = useState([]);
  const masonryRef = useRef(null);

  useEffect(() => {
    if (previewItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [previewItem]);

  const openPreview = (item) => {
    setPreviewItem(item);
    // Find related media with enhanced matching
    const related = media
      .filter((m) => m.id !== item.id)
      .map((m) => {
        const matchingTags = m.tags?.filter((tag) => item.tags?.includes(tag));
        return {
          ...m,
          matchScore: matchingTags ? matchingTags.length : 0,
        };
      })
      .filter((m) => m.matchScore >= 2)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 8);
    setRelatedMedia(related);
  };

  const closePreview = () => {
    setPreviewItem(null);
    setRelatedMedia([]);
  };

  // Fetch media from Supabase
  useEffect(() => {
    async function fetchMedia() {
      try {
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        const { data, error } = await supabase
          .from("media_metadata")
          .select("*")
          .limit(2000); // Set a high limit to fetch all media

        const shuffledData = shuffleArray(data);

        if (error) {
          throw error;
        }

        setMedia(data);
        setFilteredMedia(data);

        // Extract all unique tags
        const uniqueTags = Array.from(
          new Set(data.flatMap((item) => item.tags || []))
        ).sort();

        setAllTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  // Filter media by selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredMedia(media);
    } else {
      const filtered = media.filter((item) =>
        selectedTags.some((tag) => item.tags && item.tags.includes(tag))
      );
      setFilteredMedia(filtered);
    }

    // Reset loaded images state when filters change
    setLoadedImages({});
  }, [selectedTags, media]);

  // Handle image load events to improve masonry layout
  const handleImageLoaded = (id) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  // Determine media type to render appropriate element
  const renderMediaItem = (item, isPreview = false) => {
    const fileExt = item.file_url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "webp"].includes(fileExt)) {
      return (
        <img
          src={item.file_url}
          alt={item.caption || item.file_name}
          className="w-full rounded-md"
          loading="lazy"
          onLoad={() => handleImageLoaded(item.id)}
        />
      );
    } else if (["mp4", "webm", "mov"].includes(fileExt)) {
      return (
        <video
          src={item.file_url}
          className="w-full rounded-md"
          muted
          loop
          playsInline
          controls={isPreview} // Only show controls in preview mode
          autoPlay={isPreview} // Autoplay in preview mode
        />
      );
    } else if (["gif"].includes(fileExt)) {
      return (
        <img
          src={item.file_url}
          alt={item.caption || item.file_name}
          className="w-full rounded-md"
          loading="lazy"
        />
      );
    }

    // Fallback
    return (
      <div className="w-full aspect-square flex items-center justify-center bg-custom_purple_washed rounded-md">
        <p className="text-custom-gray p-4 text-center font-cascadia">
          {item.file_name}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-custom-background text-custom-text p-8 flex flex-col items-center justify-center gap-4">
        <Loader className="w-8 h-8 text-custom-yellow animate-spin" />
        <p className="text-xl font-cascadia">Loading creative portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-custom-background text-custom-text p-4 md:p-8 font-cascadia pb-20">
      <div className="p-4 md:p-6 mx-auto">
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold mb-2 font-cascadia">
            My Creative Journey
          </h1>
          <p className="text-custom-gray text-sm md:text-lg font-cascadia">
            A showcase of my design work, 3D models, photography, and creative
            projects outside of coding.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-xl font-semibold font-cascadia">
              Projects & Creations
            </h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-custom_purple_washed rounded-md hover:bg-opacity-80 transition"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>

          {isFilterOpen && (
            <div className="fixed inset-0 bg-custom-background-translucent z-40 flex items-center justify-center p-4">
              <div
                className="bg-custom_purple_washed p-6 rounded-lg w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="absolute top-4 right-4 text-custom-gray hover:text-custom-text"
                >
                  <X size={24} />
                </button>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium font-cascadia text-lg">
                    Filter by tags
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? "bg-custom-yellow text-custom-background"
                          : "bg-custom-background text-custom-gray hover:bg-opacity-80"
                      } transition`}
                    >
                      {tag}
                    </button>
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-custom-red text-sm hover:underline flex items-center gap-1"
                    >
                      <X size={14} /> Clear all
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Grid - Masonry Layout */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-16 text-custom-gray">
            <p className="font-cascadia">
              No items match your selected filters. Try a different combination.
            </p>
          </div>
        ) : (
          <div
            ref={masonryRef}
            className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 pb-8"
            style={{ columnFill: "balance" }}
          >
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-md break-inside-avoid mb-4 md:transform md:hover:scale-[1.01] transition-transform duration-200"
              >
                {/* Media Content - Preserves Aspect Ratio */}
                <div className="w-full relative">
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={(e) => {
                      console.log("Media item clicked", item.id);
                      openPreview(item);
                    }}
                  />
                  {!loadedImages[item.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-custom_purple_washed/30 rounded-md">
                      <div className="w-6 h-6 border-2 border-custom-yellow border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="relative z-0">{renderMediaItem(item)}</div>
                  <div className="absolute inset-0 flex-col items-center justify-center opacity-0 md:hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:flex">
                    <ZoomIn className="text-custom-text w-8 h-8 bg-custom-background/50 p-1 rounded-full pointer-events-none" />
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4 hidden md:flex">
                  {item.caption && (
                    <p className="text-custom-text font-medium mb-2 font-cascadia">
                      {item.caption}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={`${item.id}-${tag}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(tag);
                          }}
                          className="text-xs bg-custom-background/80 text-custom-yellow px-2 py-1 rounded-full cursor-pointer md:hover:bg-custom-background transition"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Descriptions Section */}
        <div className="mt-12 space-y-6 bg-custom_purple_washed p-4 md:p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-custom-gray/30 pb-2 font-cascadia">
            Featured Projects
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-yellow font-cascadia">
                Enamel Pin Brand - Uvaan
              </h3>
              <p className="mt-1 text-sm md:text-base text-custom-gray">
                Designed Shivaji Maharaj's Rajmudra as an enamel pin, from
                initial concept in Illustrator to 3D modeling in Blender for
                material selection. Created complete packaging, mockups, and
                promotional materials.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-green font-cascadia">
                Poster Store
              </h3>
              <p className="mt-1 text-sm md:text-base text-custom-gray">
                Curated and processed vintage and modern posters. Created batch
                mockups in Photoshop and built a Shopify storefront with
                promotional materials rendered in Blender.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-blue font-cascadia">
                Blender Creations
              </h3>
              <p className="mt-1 text-sm md:text-base text-custom-gray">
                Designed various 3D scenes, sticker mockups, and short
                promotional videos. Developed realistic product mockups for
                visual merchandising.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-purple font-cascadia">
                Apparel Design
              </h3>
              <p className="mt-1 text-sm md:text-base text-custom-gray">
                Created original T-shirt designs in Illustrator and produced
                photorealistic mockups to visualize the final products.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-red">
                Astrophotography
              </h3>
              <p className="mt-1 text-sm md:text-base text-custom-gray">
                Captured astronomical phenomena including the Milky Way and
                Geminid meteor shower. Also passionate about landscape
                photography.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 bg-custom-background-translucent z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 p-2 bg-custom_purple_washed/50 rounded-full hover:bg-custom_purple_washed transition"
          >
            <X size={24} />
          </button>

          <div
            className="max-w-4xl w-full flex flex-col md:flex-row gap-6 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1">
              <div className="flex-shrink-0">
                <Zoom zoomMargin={40}>
                  {renderMediaItem(previewItem, true)}
                </Zoom>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">
                  {previewItem.caption || previewItem.file_name}
                </h3>
                {previewItem.tags && previewItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {previewItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-custom_purple_washed/50 text-custom-yellow px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {relatedMedia.length > 0 && (
              <div className="w-full md:w-64 flex-shrink-0 mt-8 md:mt-0">
                <h4 className="text-lg font-semibold mb-4">Related Media</h4>
                <div className="grid grid-cols-2 gap-2">
                  {relatedMedia.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-pointer hover:opacity-80 transition relative group"
                      onClick={() => openPreview(item)}
                    >
                      {renderMediaItem(item)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
