package main

import (
	"fmt"
	"log"
	"gopkg.in/mgo.v2"
	"flag"
	"gopkg.in/mgo.v2/bson"
)

type Company struct {
	Id interface{} `bson:"_id"`
	Name string `bson:"name"`
	Email string `bson:"email"`
}

func main() {
	dbName := flag.String("db", "test", "mongo database")
	flag.Parse()

	log.Println("using database", *dbName)

	mongoUrl := "localhost:27017"
	session, err := mgo.Dial(mongoUrl)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)

	companyCollName:= "company"
	c := session.DB(*dbName).C(companyCollName)
	count, err := c.Count()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("count of companies:", count)

	allCompanies := make([]Company,0)

	err = c.Find(bson.M{}).All(&allCompanies)
	if err != nil {
		log.Fatal(err)
	}

	for _, company := range allCompanies {
		fmt.Println(company)
	}

}
