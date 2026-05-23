import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_blQpeMSn3O8E@ep-spring-pine-aptv0bad-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

export default prisma