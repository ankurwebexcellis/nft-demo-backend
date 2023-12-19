FROM public.ecr.aws/lambda/nodejs:16

# Set the working directory inside the container
WORKDIR /var/task

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory

COPY package.json ./
COPY nftApis ./nftApis
COPY validations ./validations
COPY .env ./
COPY common ./common



#COPY common/ ./common

# Run npm install to install dependencies
RUN npm install

# Copy your application files to the working directory

# You can overwrite command in `serverless.yml` template
CMD ["nftApis/handler.nftApis"]
