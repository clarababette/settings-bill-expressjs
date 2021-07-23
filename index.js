// "use strict";
import express from 'express';
import exphbs from 'express-handlebars';
import SettingsBill from './public/settings-bill.js';
import moment from 'moment';

const app = express();

const settingsBill = new SettingsBill();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.post('/settings', (req, res) => {
  settingsBill.setSettings({
    smsCost: req.body.smsSetting,
    callCost: req.body.callSetting,
    warningLevel: req.body.callSetting,
    criticalLevel: req.body.criticalLevelSetting,
    warningLevel: req.body.warningLevelSetting,
  });
  res.redirect('/');
});
app.post('/action', (req, res) => {
  const settings = Object.values(settingsBill.getSettings());
  if (
    req.body.billItem &&
    !settingsBill.hasReachedCriticalLevel() &&
    !settings.includes(undefined)
  ) {
    settingsBill.recordAction(req.body.billItem);
  }
  res.redirect('/');
});
app.get('/actions', (req, res) => {
  res.render('actions', {actions: settingsBill.actions()});
  console.log(settingsBill.actions());
});
app.get('/', (req, res) => {
  let currentLevel = '';
  if (settingsBill.hasReachedCriticalLevel()) {
    currentLevel = 'danger';
  } else if (settingsBill.hasReachedWarningLevel()) {
    currentLevel = 'warning';
  }
  res.render('home', {
    totals: settingsBill.totals(),
    billsettings: settingsBill.getSettings(),
    level: currentLevel,
  });
});
app.get('/actions/:type', (req, res) => {
  const actionType = req.params.type;
  const actionList = settingsBill.actionsFor(actionType);
  actionList.forEach((action) => {
    action.timestamp = moment(action.timestamp).fromNow();
  });
  res.render('actions', {
    actions: actionList,
  });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
