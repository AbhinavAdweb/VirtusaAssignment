const Vuser = require('../models/Vuser');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

var agent = chai.request.agent(app);

describe('Users', () => {

  //Before each test we empty the database
  beforeEach((done) => {
    Vuser.destroy({
      where: {},
      truncate: true
    }).then(done());
  });

  // Testing unauthenticated request
  describe('/GET user', () => {
      it('it should NOT GET all the users and instead return Unauthorized Access error', (done) => {
        chai.request(app)
            .get('/json/users')
            .end((err, res) => {
                  res.should.have.status(401);
                  res.body.should.be.a('object');

                  res.body.should.have.property('error').eql("Unauthorized Access");
              done();
            });
      });
  });

  //Test the /GET route
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      agent.get('/json/login')
        .query({ secretKey: 'virtusa' })
        .then(loginRes => {
          agent.get('/json/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
        });
    });
  });

  //Test the /POST route
  describe('/POST users', () => {
    it('it should POST a user', (done) => {
      let user = {
        name: "Abhinav Ojha",
        age: 27,
        email: "abhinavojha93@gmail.com"
      }

      agent.get('/json/login')
        .query({ secretKey: 'virtusa' })
        .then(loginRes => {
          agent.post('/json/users/add')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');

              res.body.should.have.property('id');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.should.have.property('email');
              res.body.should.have.property('updatedAt');
              res.body.should.have.property('createdAt');
              done();
            });
        });
    });
  });

  //Test the /GET/:id route
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      let user = new Vuser({
        name: "XYZ",
        age: 50,
        email: "xyz@ex.com"
      });

      agent.get('/json/login')
        .query({ secretKey: 'virtusa' })
        .then(loginRes => {
          user.save()
            .then(result => {
              agent.get('/json/users/' + result.id)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');

                  res.body.should.have.property('name');
                  res.body.should.have.property('age');
                  res.body.should.have.property('email');
                  res.body.should.have.property('updatedAt');
                  res.body.should.have.property('createdAt');
                  res.body.should.have.property('id').eql(result.id);
                  done();
                });
            });
        });

    });
  });

  //Test the /PUT/:id route
  describe('/PUT/:id user', () => {
    it('it should UPDATE a user by the given id', (done) => {
      let user = new Vuser({
        name: "XYZ",
        age: 50,
        email: "xyz@ex.com"
      });

      let updatedUser = {
        name: "Abhinav Ojha",
        age: 27,
        email: "abhinavojha93@gmail.com"
      }

      agent.get('/json/login')
        .query({ secretKey: 'virtusa' })
        .then(loginRes => {
          user.save()
            .then(result => {
              agent.put('/json/users/' + result.id)
                .send(updatedUser)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                  res.body.should.be.eql([result.id])
                  done();
                });
            });
        });

    });
  });

  //Test the /DELETE/:id route
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user by the given id', (done) => {
      let user = new Vuser({
        name: "XYZ",
        age: 50,
        email: "xyz@ex.com"
      });

      agent.get('/json/login')
        .query({ secretKey: 'virtusa' })
        .then(loginRes => {
          user.save()
            .then(result => {
              agent.delete('/json/users/' + result.id)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('number');

                  res.body.should.be.eql(result.id)
                  done();
                });
            });
        });

    });

  });

});