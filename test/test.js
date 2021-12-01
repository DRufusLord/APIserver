const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = require('supertest');

const app = express();


// chai.request('http://localhost:3000')
// .get('/')

const expect = chai.expect;

// describe('GET products', function () {
//   it('should get products entry', (done) => {
//     request('http://localhost:3000/products')
//     .get('/')
//     .end((err,res) => {
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an('array');
//       done();
//     })
//   })
// })


describe('GET information of one Product', () => {
  it('should get feature of one product too', (done) => {
    request('http://localhost:3000/products')
    .get('/1')
    .end((err,res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('features').with.lengthOf(2);
      done();
    })
  })
})


describe('GET style of one product', () => {
  it('should get style of one product too', (done) => {
    request('http://localhost:3000/products')
    .get('/1/styles')
    .end((err,res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('results').with.lengthOf(6);
      expect(res.body.results[0]).to.have.property('photos');
      expect(res.body.results[0]).to.have.property('skus');
      done();
    })
  })
})

describe('GET related ID of one product', () => {
  it('should get realted ID of one product too', (done) => {
    request('http://localhost:3000/products')
    .get('/1/related')
    .end((err,res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    })
  })
})


//jmeter test command
// sh jmeter -n -t "./e-commerce.jmx" -l "./e-commerce_test.cvs"
