import { Prisma } from '@prisma/client';

export const userBasicSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  avatarUrl: true,
  provider: true,
};
