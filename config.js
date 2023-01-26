"use strict";

module.exports = {
  getSecret: function () {
    return "token";
  },
  getDB:function(){
    return "mongodb:";
},

  getPort: function () {
    return 20014;
  },
  getAdminDatabase: function () {
    return "Administracion";
  },
  getDevicesColl: function () {
    return "dispositivos";
  },
  getDataBase: function () {
    return "Humi-temp";
  },
  getColl: function () {
    return "data";
  },
};
