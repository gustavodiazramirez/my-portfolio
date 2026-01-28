export interface Project {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  impact: string;
  media: MediaItem[];
  technologies: string[];
  category: string;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
}
