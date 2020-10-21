const { Scene } = require('telegraf');

const startScene = require('./start');
const findWorkScene = require('./findWork');
const postWorkScene = require('./postWork');
const locationScene = require('./postWork/location');
const categoryScene = require('./postWork/category');
const headerScene = require('./postWork/header');
const employmentTypeScene = require('./postWork/employmentType');
const descriptionScene = require('./postWork/description');
const salaryScene = require('./postWork/salary');
const contactScene = require('./postWork/contact');
const summaryScene = require('./postWork/summary');
const adsScene = require('./ads');
const jobsScene = require('./findWork/jobs');
const partnerScene = require('./partner');
const balanceScene = require('./balance');
const supportScene = require('./support');

module.exports = {
  startScene,
  findWorkScene,
  postWorkScene,
  locationScene,
  categoryScene,
  headerScene,
  employmentTypeScene,
  descriptionScene,
  salaryScene,
  contactScene,
  summaryScene,
  adsScene,
  jobsScene,
  partnerScene,
  balanceScene,
  supportScene
};
