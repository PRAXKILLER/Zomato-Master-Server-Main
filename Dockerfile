FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

ENV MONGO_URL=mongodb+srv://PrakharShrivastava:prax123killer@zomato-master.wlym8.mongodb.net/zomato?retryWrites=true&w=majority
ENV GOOGLE_CLIENT_ID=808576733891-e8jcd17natp7ighf8ma11n4lgheo7ca2.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV AWS_S3_ACCESS_KEY=AKIA2KPQXKEMMKUN2JM7
ENV AWS_S3_SECRET_KEY=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
ENV NODE_ENV=production
ENV PORT=4000

RUN npm run build

CMD ["npm", "run", "start"]