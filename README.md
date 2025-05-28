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
``` 
    git clone https://github.com/mugiwara999/Subscription-microservice.git
    cd Subscription-microservice
    npm install
```

2. **Run Redis locally**
``` 
    docker run -d --name redis -p 6379:6379 redis
```

3. **Run Postgres locally**
``` 
    docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```


3. **Change .env.example to .env and fill in the required fields**
``` 
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
    REDIS_URL="redis://localhost:6379"
```

4. **Apply the migrations and generate the Prisma client**
``` 
    npx prisma migrate dev
    npx prisma generate
```

5. **Run the project**
``` 
    npm run start
```

6. **Verify the project is running**
``` 
    GET http://localhost:3000/      → Hello World
```

## API Documentation

POST /auth/signup

Body:
``` json
{
    "email": "test@test.com",
    "password": "password"
}
```

Response: 200 OK
``` json
{
    "user": "123e4567-e89b-12d3-a456-426614174000", //example user id
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" //example token
}
```

POST /auth/login

Body:
``` json
{
    "email": "test@test.com",
    "password": "password"
}
```

Response: 200 OK
``` json
{
    "user": "123e4567-e89b-12d3-a456-426614174000", //example user id
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" //example token
}
```


POST /plans (auth required)

Body:
``` json
{
    "name": "test",
    "price": 100,
    "features": ["feature1", "feature2"],
    "duration": 30
}
```
Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Response: 200 OK
``` json
{
    "id": "23f33325-b7d1-46c5-8986-8c04c0259157",
    "name": "test",
    "price": "100",
    "features": [
        "feature1",
        "feature2"
    ],
    "createdAt": "2025-05-28T12:18:05.050Z",
    "updatedAt": "2025-05-28T12:18:05.050Z",
    "duration": 30
}
```
PUT /plans/:id (auth required)

Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Body:
``` json
{
    "name": "test1",
    "price": 100,
    "features": ["feature1", "feature2"],
    "duration": 30
}
```

Response: 200 OK
``` json
{
    "id": "23f33325-b7d1-46c5-8986-8c04c0259157",
    "name": "test1",
    "price": "100",
    "features": [
        "feature1",
        "feature2"
    ],
    "createdAt": "2025-05-28T12:18:05.050Z",
    "updatedAt": "2025-05-28T12:21:15.790Z",
    "duration": 30
}
```

GET /plans/:id

Response: 200 OK
``` json
{
    "id": "23f33325-b7d1-46c5-8986-8c04c0259157",
    "name": "test",
    "price": "100",
    "features": [
        "feature1",
        "feature2"
    ],
}
```

DELETE /plans/:id (auth required)

Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```
Body:
``` json
{
    "id": "23f33325-b7d1-46c5-8986-8c04c0259157"
}
```

Response: 200 OK
``` json
{
    "id": "23f33325-b7d1-46c5-8986-8c04c0259157",
    "name": "test1",
    "price": "100",
    "features": [
        "feature1",
        "feature2"
    ],
    "createdAt": "2025-05-28T12:18:05.050Z",
    "updatedAt": "2025-05-28T12:21:15.790Z",
    "duration": 30
}
```


GET /plans

Response: 200 OK
``` json
[]
```

POST /subscriptions (auth required)

Body:
``` json
{
    "plan_id": "23f33325-b7d1-46c5-8986-8c04c0259157"
}
```
Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Response: 200 OK
``` json
{
    "id": "64e46e10-c5bd-4b22-9670-f65c01f765f9",
    "user_id": "48933714-ed1a-4754-a456-ac6194cd063a",
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9",
    "status": "ACTIVE",
    "startedAt": "2025-05-28T12:28:25.110Z",
    "expiresAt": "2025-06-27T12:54:55.098Z"
}
```

PUT /subscriptions/upgrade (auth required)

Body:
``` json
{
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9"
}
```
Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Response: 200 OK
``` json
{
    "id": "64e46e10-c5bd-4b22-9670-f65c01f765f9",
    "user_id": "48933714-ed1a-4754-a456-ac6194cd063a",
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9",
    "status": "ACTIVE",
    "startedAt": "2025-05-28T12:28:25.110Z",
    "expiresAt": "2025-06-27T12:54:55.098Z"
}

```

DELETE /subscriptions/:id (auth required)

Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Response: 200 OK
``` json
{
    "id": "64e46e10-c5bd-4b22-9670-f65c01f765f9",
    "user_id": "48933714-ed1a-4754-a456-ac6194cd063a",
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9",
    "status": "CANCELLED",
    "startedAt": "2025-05-28T12:28:25.110Z",
    "expiresAt": "2025-06-27T12:54:55.098Z"
}

```

DELETE /subscriptions (auth required)

Headers:
``` json
{
    "Authorization": "Bearer <token>"
}
```

Response: 200 OK
``` json
{
    "id": "64e46e10-c5bd-4b22-9670-f65c01f765f9",
    "user_id": "48933714-ed1a-4754-a456-ac6194cd063a",
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9",
    "status": "CANCELLED",
    "startedAt": "2025-05-28T12:28:25.110Z",
    "expiresAt": "2025-06-27T12:54:55.098Z"
}
```

GET /subscriptions (auth required)

Headers:
``` json
{
    "Authorization": "Bearer <token>"
}   
```

Response: 200 OK
``` json
{
    "id": "a9cf5e70-e737-422a-b696-d8ac99b48f81",
    "user_id": "48933714-ed1a-4754-a456-ac6194cd063a",
    "plan_id": "427a11ab-08fc-43df-8623-6e3f74c592b9",
    "status": "ACTIVE",
    "startedAt": "2025-05-28T12:58:35.349Z",
    "expiresAt": "2025-06-27T12:58:35.348Z"
}
```

