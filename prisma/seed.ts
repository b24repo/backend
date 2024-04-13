// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@admin.com';

  // Check if the admin already exists
  const admin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  // If the admin doesn't exist, create them
  if (!admin) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Replace with a strong password
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        // Add any other fields your user model requires
      },
    });
    console.log('Admin user created');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
