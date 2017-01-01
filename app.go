package main

import (
	"fmt"
	"log"
	"gopkg.in/mgo.v2"
	"flag"
)

type Person struct {
	Name  string
	Phone string
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

	//
	//c.Find()
	//err = c.Insert(&Person{"Ale", "+55 53 8116 9639"},
	//	&Person{"Cla", "+55 53 8402 8510"})
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//result := Person{}
	//err = c.Find(bson.M{"name": "Ale"}).One(&result)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//fmt.Println("Phone:", result.Phone)
}
