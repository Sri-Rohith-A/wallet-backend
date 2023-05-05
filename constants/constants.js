const EXPIRES_IN = "1h";
const SALT_ROUNDS = 10;
const MAX_FILES = "90d";

const ACCESS_LEVELS = { USER: 0, ADMIN: 1 };

const CASH_TYPE_ID = {
  CDW_CASH_ID: 1,
  MATERNITY_CASH_ID: 2,
  EVENT_CASH_ID: 3,
};

const STATUS_CODES = {
  BAD_REQUEST: 400,
};

const GENDER = {
  MALE: "male",
  FEMALE: "female",
};

const UNDEFINED = undefined;

module.exports = { EXPIRES_IN, SALT_ROUNDS, MAX_FILES, ACCESS_LEVELS, STATUS_CODES, CASH_TYPE_ID, GENDER, UNDEFINED };
