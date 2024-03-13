FROM node:14-alpine@sha256:434215b487a329c9e867202ff89e704d3a75e554822e07f3e0c0f9e606121b33 as builder
WORKDIR /app 
COPY package.json . 
RUN npm install 
COPY . . 
RUN npm run build

FROM nginx@sha256:6db391d1c0cfb30588ba0bf72ea999404f2764febf0f1f196acd5867ac7efa7e 
EXPOSE 80 
COPY --from=builder /app/build /usr/share/nginx/html