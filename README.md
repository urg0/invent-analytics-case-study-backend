# Invent Analytics Case Study - Backend

### Getting Started: Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Docker (recommended) OR PostgreSQL installed locally

### Step-by-Step Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/urg0/invent-analytics-case-study-backend.git
   cd invent-analytics-case-study-backend
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Database Setup**

   **: Using Docker **

   ```bash
   # Start PostgreSQL container
   docker-compose up -d
   ```

4. **Environment Setup**

   ```bash
   # Copy example env file
   cp .env-example .env
   ```

   Update `.env` with the provided .env file:

5. **Initialize Database**

   ```bash
   # Generate Prisma client
   yarn prisma generate

   ```

6. **Start the server**

### ⚠️ Note

Please make sure the that you add the .env file i sent to the project.

   ```bash
   # Development mode with hot reload
   yarn dev

   # OR Production mode
   yarn build
   yarn start
   ```

The server should now be running at `http://localhost:8080` 🎉

### Verifying Setup

1. **Check API health**

   ```bash
   curl http://localhost:8080/system/health
   ```

   Should return:

   ```json
   {
     "status": "UP",
     "environment": "development",
     "database": "Connected",
     "timestamp": "@timestamp"
   }
   ```

2. **Test book endpoints**
   ```bash
   curl http://localhost:8080/api/books
   ```
   Should return a list of seeded books

### Troubleshooting Common Issues

- **Database Connection Failed**

  - If using Docker: Make sure the container is running (`docker ps`)
  - Check if PostgreSQL is running on port 5432
  - Verify database credentials in .env

- **Prisma Migration Failed**

  - Reset the database: `yarn prisma migrate reset`
  - Try regenerating the client: `yarn prisma generate`

- **Port Already in Use**
  - Change the PORT in .env file
  - Check for other services using port 8080

### Project Structure

```
src/
├── config/           # Configuration files
├── middlewares/      # Express middlewares
├── modules/          # Feature modules
│   ├── book/
│   ├── borrow/
│   └── user/
└── routes/          # API routes
```

### Available Scripts

- `yarn dev` - Development mode
- `yarn build` - Production build
- `yarn start` - Start production server
- `yarn lint` - Run linter
- `yarn type-check` - TypeScript checks

### Tech Stack

- Express.js with TypeScript
- Prisma ORM
- PostgreSQL
- Docker 
- Winston for logging

### Need Help?

If you encounter any issues during setup, please:

1. Check the troubleshooting section above
2. Ensure all prerequisites are properly installed
3. Contact me at urgulerr@gmail.com
