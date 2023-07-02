# Dockerfile based on https://jsramblings.com/dockerizing-a-react-app/

# ==== CONFIGURE ====
FROM --platform=linux/amd64 node:18-bullseye-slim
WORKDIR /app
COPY . .

# ==== BUILD ====
# npm ci makes sure the exact versions in the lockfile gets installed
RUN npm ci --ommit=dev --silent
RUN npm run build

# ==== ENVIRONMENT VARIABLE CONFIG ==== 
ENV REACT_APP_BASE_URL="https://revisto.net/api"

# ==== RUN ====
EXPOSE 3000
RUN npm install -g serve
CMD [ "serve", "-s", "build" ]
