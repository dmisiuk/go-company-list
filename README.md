Billing based on _golang_ for SC

Dependencies:

    #: go get gopkg.in/mgo.v2
    
Run as http server:

    #: cd server && go run app.go -http=true
    
Prepare front-end:
    
    #: npm i
    #: npm link webpack
    
Run webpack with watcher:

    #: webpack --progress --colors --watch
    
TODO
 
 * disable access to server and other technical files