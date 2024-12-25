import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
       ` https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=d8GifpoBRjwFIdtFgjb6lj1wze27sye9G9qZGD8qCbA`
      );
      setImages(response.data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch images. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="image-search">
        <h1 className="d-flex text-bold fw-3">
          Discover the Photos and Illustrations
        </h1>
        <p className="text-warning">
          <i>
            Begin with a general overview of what the picture is or portrays,{' '}
            <span className="text-success">
              focusing first on an overview before providing details.
            </span>
          </i>
        </p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="text-light bg-primary">
            Search
          </button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="image-gallery">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="image-item">
                  <img
                    src={image.urls.small}
                    alt={image.alt_description || 'Image'}
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p>No images found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;