export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { url: string; alt?: string } | null;
  parent?: Category | null;
  children?: Category[] | null;
}

