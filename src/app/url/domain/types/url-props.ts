export type UrlProps = {
  userId?: string;
  shortUrl?: string;
  originalUrl: string;
  accessCount?: number;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
