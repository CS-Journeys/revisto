# Dockerfile based on https://jsramblings.com/dockerizing-a-react-app/

# ==== CONFIGURE ====
FROM --platform=linux/amd64 node:18-bullseye-slim 
WORKDIR /app
COPY . .

# ==== BUILD ====
# npm ci makes sure the exact versions in the lockfile gets installed
RUN npm ci --ommit=dev --silent


# ==== ENVIRONMENT VARIABLE CONFIG ====
ARG ATLAS_URI
ARG TOKEN_SECRET

ENV ATLAS_URI=$ATLAS_URI
ENV TOKEN_SECRET=$TOKEN_SECRET
ENV PORT 8080

# ==== RUN ====
EXPOSE 8080
CMD [ "node", "index.js" ]
