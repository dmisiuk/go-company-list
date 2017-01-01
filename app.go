package main

import (
	"fmt"
	"log"
	"gopkg.in/mgo.v2"
	"flag"
	"gopkg.in/mgo.v2/bson"
)

type Company struct {
	Id          interface{} `bson:"_id"`
	Name        string `bson:"name"`
	Email       string `bson:"email"`
	clientCount int
}

var companyColl, clientColl *mgo.Collection

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

	companyCollName := "company"
	clientCollName := "clients"
	companyColl = session.DB(*dbName).C(companyCollName)
	clientColl = session.DB(*dbName).C(clientCollName)
	count, err := companyColl.Count()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("count of companies:", count)

	allCompanies := make([]Company, 0)

	err = companyColl.Find(bson.M{}).All(&allCompanies)
	if err != nil {
		log.Fatal(err)
	}

	for _, company := range allCompanies {
		var idStr string
		idStr, ok := company.Id.(string)
		if !ok {
			oid, ok := company.Id.(bson.ObjectId)
			if !ok {
				log.Fatal(err)
			}
			idStr = oid.String()
		}
		countOfClients, err := countClients(idStr)
		if err != nil {
			log.Fatal(err)
		}
		company.clientCount = countOfClients
		fmt.Println(company)
	}

}

func countClients(companyId string) (int, error) {
	return clientColl.Find(bson.M{"companyId": companyId}).Count()
}
