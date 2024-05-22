export type UrlShortenerProps = {
  userId?: string;
  shortUrl?: string;
  originalUrl: string;
  accessCount?: number;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
