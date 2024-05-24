export type ShortUrlProps = {
  id?: string;
  userId?: string;
  clicks?: number;
  shortUrl?: string;
  originalUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
