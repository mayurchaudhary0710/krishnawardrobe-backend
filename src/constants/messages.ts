const Messages = {
  // Success messages
  sessionCreated: 'Session created successfully!',
  successMessage: 'Request completed successfully!',
  documentCreatedMessage: 'Document created successfully!',
  loginSuccessMessage: 'Login successful!',
  logOutSuccessMessage: 'Logout successful!',
  userCreatedMessage: 'Registered successfully!',
  verificationsuccess: 'Verification successful.',
  resetSuccessful: 'Password reset successful',
  setSuccessful: 'Password set successful',
  changeSuccessful: 'Password change successful',
  formCreateSuccessful: 'Form created successfully',
  formUpdateSuccessful: 'Form updated successfully',
  recordUpdatedSuccessfully: 'Record updated successfully.',
  recordDeletedSuccessfully: 'Record deleted successfully.',
  recordCreatedSuccessfully: 'Record created successfully.',
  exitPoint: 'Exit Point updated successfully',
  importedSuccessfully: 'Items imported successfully',
  requestCompletedSuccessfully: 'Request completed successfully.',
  positionChanged: 'Position Changed successfully.',
  otpSendSuccessfully: 'OTP sent successfully',

  verifyOtpForPhone: 'Please verify OTP to change Phone Number',
  verifyOtpForEmail: 'Please verify OTP to change Email',
  notificationSend: 'Notification sent Successfully',

  // auth
  tooManyPasswordResetRequest:
    'Too many password reset request, Please try again in 2 hours',
  linkExpired: 'This link is expired',
  resetLinkSuccessFull: 'Please Check your email for password reset',
  // Invalid messages
  invalidPassword: 'Invalid password',
  invalidEmail: 'Invalid email',
  invalidOperation: 'Invalid Operation',
  invalidCredentials: 'Invalid credentials',
  invalidIds: 'Please Provide Valid Record IDs',
  invalidContact: 'Invalid number, please check your phone number.',
  invalidCode:
    'Invalid verification code. Please check the code and try again.',
  otpExpired: 'Otp has been expired',
  invalidQRCode: 'Invalid QR code.',
  invalidVerificationCode:
    'Invalid verification code. Please check the code and try again.',
  invalidId: 'Please provide valid ObjectId.',
  invalidPhoneAndEmail: 'Phone Number or Email already exist',
  invalidToken: 'Invalid Token',
  dateCanNotBePast: 'Date cannot be in the past',

  // Error messages
  validationError: 'Validation error!',
  internalServerError: 'Internal server error',
  tokenError: 'Invalid Token!!',
  noAccessTokenProvided: 'No access token provided',
  invalidAccessToken: 'Invalid access token',
  genericError: 'Something went wrong!',
  profileLimit: `You Can't add more profiles`,
  loginTokenMissing: 'Please provide login token',
  positionReserved: 'Position is already reserved for another item.',
  thisTypeIsInUse: 'This Type of item is currently in use.',
  uploadedFileNotExists: `Uploaded File Doesn't Exists!!`,
  duplicatePositions: 'Positions are duplicate',
  isNotValid: (field: string) => `${field} is not valid`,
  isCurrentlyInUse: (field: string) => `${field} is currently is use.`,
  insufficientPoints: 'Insufficient points.',
  promotionLimit: `You Can't get this promotion`,
  giftOutOfStock: 'Gift out of stock. You cannot redeem it.',

  errorInSendingMessage: 'Error in Sending Message',
  firebaseNotInit: 'Firebase Not Initialized',
  noDeviceTokensProvided:
    'No valid device tokens provided for sending notifications.',
  isNotValidToken: `Some Tokens are not valid FCM tokens`,
  failedToSendNotification: 'tokens are Invalid. Failed to send notification',
  // (field: string) => `${field} is not valid`,

  // Not messages
  inviolable: `Not deleted, It is associated somewhere else!`,
  userNotFound: 'User not found.',
  inactiveUser: 'Inactive Account.',
  recordNotCreated: 'Record not created! ',
  recordNotUpdated: 'Record not updated! ',
  dataNotFound: 'Data not found',
  fileNotFound: 'File not found',
  formNotFound: 'Form not found',
  recordDoesNotExist: `Record doesn't exist`,
  unverifiedVerificationCode:
    'Verification code has not been verified. Please verify first.',
  recordNotFound: (field: string) => `${field} not found`,
  recordDoesNotExists: (field: string) => `${field} does not exist`,
  alreadyLoggedIn: (field: string) => `Already logged in as ${field}`,
  userTpeNotFound: (field: string) => `Current user is not a ${field}`,
  inactiveGift: 'Inactive Gift.',
  notHavePermissionTBookSlot: 'Not have permission to book slot',
  noSuchActionIsAllow: 'No such action is allow',
  sessionCompleted: 'This already missed/completed',
  canBookSession: (role: string, actionType: string) =>
    `Only ${role} can send ${actionType}`,
  dateValidation: 'Date can not be of past',

  // Failure messages
  formExistsWithThisName: 'Form name is already exists.Try new name',
  badRequest: 'Bad request',
  recordAlreadyExist: 'Record already exists!',

  alreadyExist: (field: string) => `${field} is already exist!`,
  emailPhoneNumberAlreadyExist: 'Email or Phone Number Already Exists ',
  foundContact: 'User is already been registered.',
  failedToAuthenticate: 'Falied to Authenticate',
  alreadyVerified: 'Verification already completed.',
  expiredVerificationCode:
    'Verification code has expired. Please request a new verification code.',
  newPasswordSameAsOld:
    'New password must be different from the existing password.',
  currentpasswordwrong:
    'Your current password is wrong, please enter the correct password.',
  entranceNotExist: 'Please create entrance report first',
  notDeleted: 'Record not deleted it is associated somewhere else',
  nodata: 'No schedule IDs provided for deletion.',

  // Misc. Messages
  verificationEmailSent:
    'A verification email has been sent to your registered email address. Please check your inbox.',

  // Unauthorized
  unauthorizeResourse: 'Requested resource is unauthorized!!',

  // Export Messages
  exportSuccessfully: 'Excel File Downloaded Successfully ',
  pleaseProvideRequiredFields: 'Please Provide required fields',
  importSuccessfully: 'Excel File Imported Successfully ',
  validFile: 'Please Upload Valid CSV/Excel File',
  provideExcelFile: 'Please provide Excel File',
  latestAppDictionary: 'You have latest files',
  childPreLeaveExist: 'Child pre leave is exist for this date range',
  EXITTIMEEXCEEDED: 'Exit Time Exceeded',
  attendanceExist:
    'Cannot create an entrance report after an exit report has been created',
  inactiveBusinesCard: 'Inactive Business Card, Please Login to Active',
  isRequired: (feild: string) => `${feild} is Required`,
  customMessage: (msg: string) => `${msg}`,
  minLength: (feild: string, length: number) =>
    `${feild} length must be greater than or equal to ${length ? length : ''}`,
  maxLength: (feild: string, length: number) =>
    `${feild} length must be less than or equal to ${length ? length : ''}`,
  lengthRequired: (feild: string, length: number) =>
    `${feild} length must be equal to ${length ? length : ''}`,

  // therapists messages

  therapistAlreadyExist: 'Therapist already exist',
  phoneNumberAlreadyExists: 'Phone Number Already Exists',

  //offer messages
  invalidOfferCode: 'Invalid Offer Code',
  offerCodeExpired: 'Offer Code Expired',
  minimumPaymentValue: 'Offer price exceeds the minimum payment value',
  offerUsageLimitReached: 'Offer usage limit reached',
};

export { Messages };
