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


const chai = require('chai')
const db = require('../src/config/db')
const response = require('../src/utils/response')
const app = require('../src/app')(db)
const expect = chai.expect

chai.use(chaiHttp)
describe('API TEST', function () {

    describe('GET all messages with pagination data', () => {
        it('should get message data pagination is not empty', (done) => {
            chai.request(app)
                .get('/messages')
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    }
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })

})

