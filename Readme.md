# URL Shortener

This is a basic url shortener built using : 
    
    -nodejs
    -expressjs
    -mongodb (mongoose)

### Routes

- post :  /url - generates a new short url and returns the shortened url in the format example.com/randomID

- get :  /:id - redirect the user to original URL

- get :  /url/analytics/:id - returns the number of visits/clicks for the provided short URL


