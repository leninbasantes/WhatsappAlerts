const request = require("request");
jest.mock("request");

describe("sendWhatsapp", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        template: "some-template",
        data: ["some-data"],
        phones: [{ number: "555-555-5555" }]
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should send a WhatsApp message when a template and phone number are provided", async () => {
    const getTemplateName = jest
      .spyOn(require("../db"), "getTemplateName")
      .mockResolvedValue("some-template-name");

    await sendWhatsapp(req, res);

    expect(getTemplateName).toHaveBeenCalledWith("some-template");
    expect(request).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("ok");
  });

  it("should return a 500 status and error message if no template is provided", async () => {
    req.body.template = undefined;
    await sendWhatsapp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("No hay template");
  });

  it("should return a 200 status and error message if no phone numbers are provided", async () => {
    req.body.phones = [];
    await sendWhatsapp(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("No hay numeros de telefono");
  });

  it("should return a 500 status and error message if getTemplateName returns -1", async () => {
    jest
      .spyOn(require("../db"), "getTemplateName")
      .mockResolvedValue(-1);

    await sendWhatsapp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("No hay template");
  });
});
