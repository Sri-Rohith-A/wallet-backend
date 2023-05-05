const response = {
  SUCCESS: {
    getSuccess: "Fetch successful",
    deleteSuccess: "Element deleted successfully",
    addSuccess: "Data is added successfully",
    updateSuccess: "Data Updated successfully",
    authorized: "User is Authorized",
  },
  ERROR: {
    unauthorized: "User is Unauthorized",
    serverError: "Internal Server Error",
    noRecords: "Record not found",
    alreadyExists: "Data already exists",
    invalidInput: "Invalid Input",
    invalidId: "Invalid Id",
    notImplementedMethod: "Method not implemented",
  },
  LOGIN: {
    success: "User logged in successfully!!!",
    invalidPassword: "Password is invalid!!!",
    invalidUser: "User not exists!!!",
  },
  CASH: {
    enterAtleastThreeDigits: "Employee ID must be only 3 or 4 digits to search and must contain only numbers",
    enterOnlyAlphabets: "Employee name must contain only alphabets",
  },
  USER: {
    notFound: "User not found",
    addSuccess: "User is added successfully",
    alreadyExists: "User already exists",
    updateSuccess: "User updated successfully",
    idError: "User ID cannot be changed",
    maternityNotEligible: "User is not eligible for maternity cash",
    noMaternityCash: "User does not have maternity cash",
  },
};

module.exports = response;
