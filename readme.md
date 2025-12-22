
1. docker compose -f infra/docker-compose.yml up -d


2. http://localhost:9001/login  (2️⃣ MinIO Console)
    user: minioadmin
    pass: minioadmin

3. CD apps/api$ npm run dev

```
docker compose -f infra/docker-compose.yml down
docker compose -f infra/docker-compose.yml up -d

docker ps
  You MUST see:
    netflix_nginx
    netflix_minio
    netflix_postgres
    netflix_redis

```

```bash
🔐 1. Register
curl -X POST http://localhost:4000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@netflix.com",
  "password": "password123",
  "name": "Netflix User"
}'
```

```bash
🔑 2. Login
curl -X POST http://localhost:4000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@netflix.com",
  "password": "password123"
}'
```

```bash
🔄 4. Refresh Access Token

curl http://localhost:4000/api/users/me \
-H "Authorization: Bearer ACCESS_TOKEN_HERE"
```

```bash
🔄 4. Refresh Access Token
curl -X POST http://localhost:4000/api/auth/refresh \
-H "Content-Type: application/json" \
-d '{
  "refreshToken": "REFRESH_TOKEN_HERE"
}'

```

```bash
🏷️ 1. Create Genre
curl -X POST http://localhost:4000/api/genres \
-H "Authorization: Bearer ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Action"
}'

🎬 2. Create Movie

curl -X POST http://localhost:4000/api/movies \
-H "Authorization: Bearer ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Batman Begins",
  "description": "The origin of Batman",
  "duration": 8100,
  "releaseYear": 2005,
  "rating": 8.2,
  "thumbnailUrl": "https://image.tmdb.org/t/p/w500/batman.jpg",
  "videoUrl": "https://cdn.local/batman.m3u8",
  "isPublished": true,
  "genres": ["GENRE_ID_HERE"]
}'

📃 3. List Movies

curl http://localhost:4000/api/movies

🎥 4. Get Movie by ID
curl http://localhost:4000/api/movies/MOVIE_ID

📺 5. Netflix Homepage Rows

curl http://localhost:4000/api/movies/rows/home


```

```bash
🧪 cURL — Upload Video
curl -X POST http://localhost:4000/api/videos/upload \
-H "Authorization: Bearer ACCESS_TOKEN" \
-F "video=@sample.mp4"

Response:
{
  "videoId": "uuid",
  "hlsUrl": "http://localhost:8080/videos/uuid/index.m3u8"
}


3.6 Connect Video URL to Movie

curl -X PATCH http://localhost:4000/api/movies/MOVIE_ID \
-H "Authorization: Bearer ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "videoUrl": "http://localhost:8080/videos/uuid/index.m3u8"
}'

Expected Response
{
  "id": "MOVIE_ID",
  "title": "Batman Begins",
  "videoUrl": "http://localhost:8080/videos/uuid/index.m3u8",
  ...
}

Movie ID exists?
  curl http://localhost:4000/api/movies

```