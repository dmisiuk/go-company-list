package main

import (
	"encoding/json"
	"flag"
	"io"
	"log"
	"net/http"
	"strconv"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Company struct {
	Id          interface{} `bson:"_id"`
	Name        string      `bson:"name"`
	Email       string      `bson:"email"`
	ContractId  int         `bson:"contractId"`
	ClientCount int
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

	http.HandleFunc("/", serveHttp)
	http.HandleFunc("/dist/", serveStatic)
	http.HandleFunc("/node_modules/", serveStatic)
	log.Println("starting http server on 8888")
	log.Fatal(http.ListenAndServe("localhost:8888", nil))
}
func serveStatic(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "../"+req.URL.Path[1:])
}

func serveHttp(w http.ResponseWriter, req *http.Request) {
	switch req.RequestURI {
	case "/":
		http.ServeFile(w, req, "../index.html")
	case "/hello":
		io.WriteString(w, "hello, world!\n")
	case "/companies":
		io.WriteString(w, "count of companies: "+strconv.Itoa(countCompanies()))
	case "/companies/json":
		b, e := json.Marshal(getAllCompanies())
		var s string
		if e != nil {
			io.WriteString(w, s)
		} else {
			w.Header().Add("Content-type", "application/json")
			w.Write(b)
		}
	default:
		io.WriteString(w, "default page of go http server")
	}

}

func countCompanies() int {
	count, err := companyColl.Count()
	if err != nil {
		log.Fatal(err)
	}
	return count
}

func getAllCompanies() []Company {
	allCompanies := make([]Company, 0)
	err := companyColl.Find(bson.M{}).All(&allCompanies)
	if err != nil {
		log.Fatal(err)
	}
	companiesWithClients := make([]Company, 0)
	for _, company := range allCompanies {
		idStr := getIdAsString(company)
		countOfClients, err := countClients(idStr)
		if err != nil {
			log.Fatal(err)
		}
		company.ClientCount = countOfClients
		companiesWithClients = append(companiesWithClients, company)
	}
	return companiesWithClients
}

func getIdAsString(company Company) string {
	var idStr string
	idStr, ok := company.Id.(string)
	if !ok {
		oid, ok := company.Id.(bson.ObjectId)
		if !ok {
			panic("id is not object id")
		}
		idStr = oid.String()
	}
	if idStr == "" {
		panic("company does not have id")
	}
	return idStr
}

func countClients(companyId string) (int, error) {
	return clientColl.Find(bson.M{"companyId": companyId}).Count()
}
