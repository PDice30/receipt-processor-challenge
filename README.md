# receipt-processor-challenge
receipt-processor-challenge for Fetch Rewards - by Phil Deisinger

# App Structure
The receipt-processor-challenge is using node with express and typescript.
It features input validation and logging of the receipt score.

The project is structured in a way that scaling it up would be very easy, even if it means it is a currently a bit "over-engineered".

There is test coverage for both endpoints.

The docker compose is setup in a way that it also could be extended to a full-stack application.

# To Build and Run
- Navigate to the root directory of the project
- In the terminal, enter command "docker compose up --build"
- The service will now be started and listening at localhost:3000
