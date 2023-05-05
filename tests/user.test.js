const axios = require("axios");
const URL = "http://localhost:4000/users";
const LOCATIONS_BU_URL = "http://localhost:4000/users/locations-bu";
const crudUtils = require("../utils/crud.utils.js");
const userServices = require("../services/user.services");
const responseConstants = require("../constants/response.constants.js");
const auth = require("../middleware/auth");
const sinon = require("sinon");

describe("Add user functionality testing", () => {
  it("should add a new user to the database", async () => {
    let crudUtilsStub = sinon.stub(crudUtils);
    let userData = {
      empName: "shiva",
      empId: "5555",
      gender: "female",
      email: "sujigmail@dw.com",
      contact: "9898999900",
      bu: "digital velocity",
      location: "Chennai",
      status: "active",
    };
    crudUtilsStub.readRecordsByFieldName.returns([]);
    let result = await userServices.addUserService(userData);
    expect(result).toEqual({
      status: true,
      data: responseConstants.SUCCESS.addSuccess,
    });
    sinon.restore();
  });

  it("should not add a duplicate user to the database", async () => {
    let crudUtilsStub = sinon.stub(crudUtils);
    let userData = {
      empName: "shivani",
      empId: "5555",
      gender: "female",
      email: "shivgmail@dw.com",
      contact: "989899400",
      bu: "digital velocity",
      location: "Chennai",
      status: "active",
    };
    crudUtilsStub.readRecordsByFieldName.returns([{ employee_id: 5555 }]);

    let result = await userServices.addUserService(userData);
    expect(result).toEqual({
      status: false,
      data: responseConstants.ERROR.alreadyExists,
    });

    sinon.restore();
  });

  it("should return an error when there is no token", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {},
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: responseConstants.ERROR.unauthorized,
        code: 401,
        data: "Invalid User",
      });
    });
  });

  it("should return an error when data is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empName",
            errorMessage: '"empName" is required',
          },
          {
            errorField: "empId",
            errorMessage: '"empId" is required',
          },
          {
            errorField: "gender",
            errorMessage: '"gender" is required',
          },
          {
            errorField: "empMail",
            errorMessage: '"empMail" is required',
          },
          {
            errorField: "contactNumber",
            errorMessage: '"contactNumber" is required',
          },
          {
            errorField: "businessUnit",
            errorMessage: '"businessUnit" is required',
          },
          {
            errorField: "location",
            errorMessage: '"location" is required',
          },
          {
            errorField: "status",
            errorMessage: '"status" is required',
          },
        ],
      });
    });
  });

  it("should return an error when employee name is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empName",
            errorMessage: '"empName" is not allowed to be empty',
          },
        ],
      });
    });
  });

  it("should return an error when employee name is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan6",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empName",
            errorMessage:
              '"empName" with value "hariharan6" fails to match the required pattern: /^[a-zA-Z]+$/',
          },
        ],
      });
    });
  });

  it("should return an error when employee id is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670a",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empId",
            errorMessage: '"empId" must be a number',
          },
        ],
      });
    });
  });

  it("should return an error when gender is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "gender",
            errorMessage: '"gender" is not allowed to be empty',
          },
        ],
      });
    });
  });

  it("should return an error when gender is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male342fff",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "gender",
            errorMessage:
              '"gender" length must be less than or equal to 6 characters long',
          },
          {
            errorField: "gender",
            errorMessage:
              '"gender" with value "male342fff" fails to match the required pattern: /^[a-zA-Z]+$/',
          },
        ],
      });
    });
  });

  it("should return an error when employee email is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empMail",
            errorMessage: '"empMail" is not allowed to be empty',
          },
        ],
      });
    });
  });

  it("should return an error when employee email is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "haricdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "empMail",
            errorMessage: '"empMail" must be a valid email',
          },
        ],
      });
    });
  });

  it("should return an error when contact number is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "contactNumber",
            errorMessage: '"contactNumber" is not allowed to be empty',
          },
        ],
      });
    });
  });

  it("should return an error when contact number is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "a9080706050",
        businessUnit: "1",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "contactNumber",
            errorMessage: '"contactNumber" length must be 10 characters long',
          },
          {
            errorField: "contactNumber",
            errorMessage:
              '"contactNumber" with value "a9080706050" fails to match the required pattern: /^[6789]\\d{9}$/',
          },
        ],
      });
    });
  });

  it("should return an error when business unit is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "digital velocity",
        location: "1",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "businessUnit",
            errorMessage: '"businessUnit" must be a number',
          },
        ],
      });
    });
  });

  it("should return an error when location is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "chennai",
        status: "active",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "location",
            errorMessage: '"location" must be a number',
          },
        ],
      });
    });
  });

  it("should return an error when status is empty", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "status",
            errorMessage: '"status" is not allowed to be empty',
          },
        ],
      });
    });
  });

  it("should return an error when location is invalid", async () => {
    await axios({
      method: "post",
      url: URL,
      headers: {
        authorization: `Bearer ${process.env.JWT_TESTING_TOKEN}`,
      },
      data: {
        empName: "hariharan",
        empId: "2670",
        gender: "male",
        empMail: "hari@cdw.com",
        contactNumber: "9080706050",
        businessUnit: "1",
        location: "1",
        status: "activestatus6",
      },
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "Invalid Input",
        code: 400,
        data: [
          {
            errorField: "status",
            errorMessage:
              '"status" length must be less than or equal to 8 characters long',
          },
          {
            errorField: "status",
            errorMessage:
              '"status" with value "activestatus6" fails to match the required pattern: /^[a-zA-Z]+$/',
          },
        ],
      });
    });
  });
});

describe("Reading locations and business units", () => {
  it("should return an error when there is no token", async () => {
    await axios({
      method: "get",
      url: LOCATIONS_BU_URL,
      headers: {},
      data: {},
    }).catch((err) => {
      expect(err.response.data).toEqual({
        status: "User is Unauthorized",
        code: 401,
        data: "Invalid User",
      });
    });
  });

  it("should return the data when token is provided", async () => {
    let fileStub = sinon.stub(auth);
    fileStub.createToken.returns("eyJhbGciOiJIUzI1Ni");
    let response = await userServices.getLocationsAndBuService();
    expect(response.data).toEqual({
      locations: [
        {
          location_id: 1,
          location_name: "Chennai",
        },
        {
          location_id: 2,
          location_name: "Hyderabad",
        },
        {
          location_id: 3,
          location_name: "Bengaluru",
        },
      ],
      business_units: [
        {
          business_unit_id: 1,
          business_unit_name: "digital velocity",
        },
        {
          business_unit_id: 2,
          business_unit_name: "digital security",
        },
        {
          business_unit_id: 3,
          business_unit_name: "cloud services",
        },
      ],
    });
  });
});
