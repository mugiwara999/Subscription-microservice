# Subscription Microservice

A Node.js + TypeScript microservice for managing user subscriptions and plans, featuring JWT-based authentication, Redis caching, and BullMQ-backed background jobs to auto-expire subscriptions.

---

##  Technologies

- **Node.js & TypeScript**  
- **Express**  
- **Prisma** (PostgreSQL or any SQL)  
- **Redis** (with `ioredis`)  
- **BullMQ** (job queue)  
- **Zod** (request validation)  
- **JSON Web Tokens** (authentication)  



## Setting up this project

1. **Clone the repo**
``` bash
    git clone https://github.com/mugiwara999/Subscription-microservice.git
    cd Subscription-microservice
    npm install
```

2. **Run Redis locally**
``` bash
    docker run -d --name redis -p 6379:6379 redis
```

3. **Run Postgres locally**
``` bash
    docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```


3. **Change .env.example to .env and fill in the required fields**
``` bash
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
    REDIS_URL="redis://localhost:6379"
```

4. **Apply the migrations and generate the Prisma client**
``` bash
    npx prisma migrate dev
    npx prisma generate
```

5. **Run the project**
``` bash
    npm run start
```

6. **Verify the project is running**
``` 
    GET http://localhost:3000/      → Hello World
```




