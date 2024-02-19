### README.md

markdown

# Grocery Booking API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

What things you need to install the software and how to install them.

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (for multi-container deployment)

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. **Clone the repository**

   bash
   git clone https://github.com/xxsaurav/qp-assessment
   cd qp-assessment

2. **Environment Setup**

   Create a `.env` file in the root directory of the project. Add the necessary environment variables based on the `.env.example` file provided in the repository.

   plaintext
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdb
   DB_HOST=db

3. **Using Docker to Start the Project**

   This project can be run using Docker and Docker Compose. This makes it easy to set up and ensures consistency across different development environments.

   - **Build and run the project with Docker Compose:**

     bash
     docker-compose up --build

     The `--build` flag is used to build the images before starting the containers. On subsequent starts when no changes to the Dockerfile are made, you can omit `--build` for faster startup:

     bash
     docker-compose up

   - **Stopping the Containers**

     To stop the running containers, you can use the following command:

     bash
     docker-compose down
     This command stops and removes the containers created by `docker-compose up`. To preserve the database between starts, you might want to use `docker-compose stop`, which stops the containers without removing them.
