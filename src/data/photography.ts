export interface InstagramPost {
  id: string;
  title: string;
  views: string;
  likes?: string;
  type: 'reel' | 'photo' | 'carousel';
  postUrl: string;
  imageUrl: string;
  location?: string;
  caption: string;
}

export const MOST_VIEWED_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    title: 'Dolce Far Niente · Coastal Horizons',
    views: '120K+ Views',
    likes: '4.2K',
    type: 'reel',
    postUrl: 'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    location: 'Coastal Escapes',
    caption: 'Moments suspended between sea and sky · dolce far niente.',
  },
  {
    id: 'post-2',
    title: 'Urban Shadows & Geometry',
    views: '85K+ Views',
    likes: '3.1K',
    type: 'reel',
    postUrl: 'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    location: 'Urban Silhouettes',
    caption: 'Hard shadows and angular perspective through the 35mm lens.',
  },
  {
    id: 'post-3',
    title: 'Dusk in the Metropolis',
    views: '62K+ Views',
    likes: '2.5K',
    type: 'reel',
    postUrl: 'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3',
    imageUrl:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
    location: 'Golden Hour Dusk',
    caption: 'When the city breathes between day and night.',
  },
  {
    id: 'post-4',
    title: 'Transit & Mountain Passes',
    views: '45K+ Views',
    likes: '1.9K',
    type: 'photo',
    postUrl: 'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3',
    imageUrl:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
    location: 'Northern Trails',
    caption: 'Wanderers and quiet moments worth remembering.',
  },
];
