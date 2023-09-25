export type Post = {
  comments: string[];
  created_at: Date;
  // description: string;
  // description: Record<string, any>;
  description: {
    time: Date;
    blocks: Block[];
    version: string;
  };
  id: string;
  imageUrl: string;
  likes: number;
  title: string;
  slug: string;
};

export type Block = {
  id: string;
  type: string;
  data: Record<string, any>;
};
