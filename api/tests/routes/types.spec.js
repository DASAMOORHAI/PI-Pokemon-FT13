/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, conn } = require('../../src/db.js');
const { Op } = require("sequelize");

const agent = session(app);
async function getLastType() {
  await Type.findOne({
    where: {
      id: {
        [Op.eq]: 20
      }
    }
  })
}

describe('Types routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Type.sync({ force: true }));
  describe('GET /types', () => {
    it('should get all 20 types', (done) => {
      agent.get('/types')
        .then((res) => {
          let lastType = getLastType()
          return lastType
        })
        .then((type) => {
          expect(type).to.not.be.equal(null)
        })
        .then(done())
    }
    );
  });
});
