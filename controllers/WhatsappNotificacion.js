"use strict";

let db = require("../db");
// const fetch = require("node-fetch");
let request = require("request");

const tokenWhats =
  "token";

function getTemplateName(template) {
  
  let database = db.get();
  let collection = database.db("Whatsapp").collection("Template");
  return new Promise((resolve, reject) => {
    collection.findOne({ name: template }, function (err, result) {
      if (err) {
        reject({
          error: "error2",
          message: "Error en la creaci�n del documento",
        });
      } else if (result != null) {
        resolve(result.nameTemplate);
      } else {
        resolve(-1);
      }
    });
  });
}

async function sendWhatsapp(req, res) {
  // console.log(req)

  console.log("Esta es la DAtA")
  console.log(req.body.data)


  let template = req.body.template;
  let data = req.body.data;
  let phones = req.body.phones;
  let parameters = ``;
  let body = "";
  let options;

  template = await getTemplateName(template);
  // console.log("t"emplate);
  if (template == -1) {
    res.status(500).send("No hay template");
  } else if (phones.length == 0) {
    res.status(200).send("No hay numeros de telefono");
  } else {
    data.map((d) => {
      parameters += `{type:"text",text:"${d}"},`;
    });

    phones.map((phone) => {
      body = `{messaging_product: "whatsapp",to:"${phone.number}",
      type:"template",template:{name: "${template}",
      language:{code:"en_US"},
      components:[{type: "body",parameters:
    [${parameters}],},],},}`;

      options = {
        method: "POST",
        url: "url",
        headers: {
          Authorization: "Bearer " + tokenWhats,
          "Content-Type": "application/json",
        },
        body: body,
      };
      // console.log(body)

      request(options, function (error, response) {
        if (error) {
          // throw new Error(error);
          return res.status(500).send("Mal");
        }
        console.log(response.body);
      });
    });

    return res.status(200).send("ok");
  }

}

module.exports = {
  sendWhatsapp,
};
