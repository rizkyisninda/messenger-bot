/* eslint-disable */

// example post webhook message
// {
//     "object": "page",
//     "entry": [
//       {
//         "id": "340787623261492",
//         "time": 1560694135661,
//         "messaging": [
//           {
//             "sender": {
//               "id": "2433361193350736"
//             },
//             "recipient": {
//               "id": "340787623261492"
//             },
//             "timestamp": 1560693267855,
//             "message": {
//               "mid": "CrXWCB7SGbtlybhel7mwLgiuQXu5jkxW02FLbe_UYzSE7C1iKfdGCypXY75Nn-7HsJdGXrAc-ShZCVzm3eWCSw",
//               "seq": 0,
//               "text": "asadasd"
//             }
//           }
//         ]
//       }
//     ]
//   }


require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/config/db')
const response = require('../src/utils/response')
const app = require('../src/app')(db)
const should = require('chai').should();

chai.use(chaiHttp)
describe('API TEST', function () {
    after(() => {
        process.exit()
    })

    describe('GET all messages with pagination data', () => {
        it('should get message data pagination is not empty', (done) => {
            chai.request(app)
                .get('/messages')
                .end(function (err, res) {
                    should.equal(res.status, 200)
                    should.equal(res.body.success, true)
                    should.exist(res.body.data)
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('GET all messages with pagination data', () => {
        it('should get message data pagination is empty', (done) => {
            chai.request(app)
                .get('/messages?page=100')
                .end(function (err, res) {
                    should.equal(res.status, 200)
                    should.equal(res.body.success, false)
                    should.equal(res.body.data, null);
                    done()
                })
        })
    })

    describe('GET messages with id ', () => {
        it('should get message data pagination is empty', (done) => {
            chai.request(app)
                .get('/message/4')
                .end(function (err, res) {
                    should.equal(res.status, 200)
                    should.equal(res.body.success, true)
                    should.exist(res.body.data)
                    done()
                })
        })
    })
})
