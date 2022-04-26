import chai from 'chai'
import chaihttp from 'chai-http'
import server from '../index.js'

//Assertion Style
chai.should()

chai.use(chaihttp)

describe("Article API" ,()=>{

    //Test the Get Route
    describe("GET /getAllArticles",()=>{
        it("It should get all articles",(done)=>{
            chai.request(server)
                .get('/getAllArticles')
                .end((err,response)=>{
                    response.should.have.status(200)
                    response.should.be.a("object");
                    // response.body.should.have.property("data");
                   done();
                })
        })
    })

})

// GET by {id} Test

// describe("GET /getArticleById/:id",()=>{
//     it("It Should return an article with specified id", (done)=>{
//         const id= "6250726fd94f2cc1b868de19"
//         chai.request(server)
//             .get('/getArticleById/' + id)
//             .end((err,response)=>{
//                 response.should.have.status(200);
//                 response.should.be.a("object");
//                 // response.body.should.have.property("data");

//                 done()
//             })
//     })
    // it("It should return nothing", done =>{
    //     const id = "lorem ipsum"
    //     chai.request(server)
    //         .get("/getArticleById/" + id)
    //         .end((err, response)=>{
    //             response.should.have.status(404);
    //             response.should.be.a("object");
    //             response.body.should.have.property("status").eq("error");
    //             response.body.should.have.property("message");
    //         done();    
    //         })
    // })
// })