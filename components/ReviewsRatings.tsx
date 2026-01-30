import React, { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsRatingsProps {
  apartmentId: string;
}

const ReviewsRatings: React.FC<ReviewsRatingsProps> = ({ apartmentId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${apartmentId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [apartmentId]);

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem(`reviews_${apartmentId}`, JSON.stringify(newReviews));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...reviews, review];
    saveReviews(updated);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Reviews & Ratings</h3>
      {reviews.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</div>
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
          </div>
          {reviews.map(review => (
            <div key={review.id} className="border-b py-4">
              <div className="flex justify-between">
                <strong>{review.name}</strong>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex mb-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={i <= review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Write a Review</h4>
        <input
          type="text"
          placeholder="Your name"
          value={newReview.name}
          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <div className="mb-2">
          <label>Rating:</label>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
            className="ml-2 p-1 border rounded"
          >
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
          </select>
        </div>
        <textarea
          placeholder="Your review"
          value={newReview.comment}
          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          rows={3}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewsRatings;