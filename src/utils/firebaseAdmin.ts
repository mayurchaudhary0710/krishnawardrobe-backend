import admin, {
  credential,
  messaging,
  type ServiceAccount,
} from "firebase-admin";
import { Messages, statusCodes } from "@constants";
import { log } from "console";
import { CustomError } from "./customError";

export const initFirebase = () => {
  try {
    const firebaseConfig: ServiceAccount = {};
    admin.initializeApp({ credential: credential.cert(firebaseConfig) });
  } catch (error) {
    log("Error in initializing firebase", error);
    // throw new Error(messageKey.firebaseNotInit);
  }
};

export const sendNotification = (deviceToken: any, notificationData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message: any = { data: notificationData, token: deviceToken };
      const sendMessage = await messaging().send(message);
      if (!sendMessage) {
        throw new CustomError();
      }
      resolve({
        tokens: deviceToken,
        sendMessage,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const sendNotificationForMultiDevice = (
  deviceTokens: any[] = [],
  notificationData: any,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokens = deviceTokens.reduce(
        (acc, tokenObj) => [...acc, tokenObj.token || ""],
        [],
      );

      if (!tokens.length) {
        throw new CustomError(
          statusCodes.badRequest_status,
          Messages.tokenError,
        );
      }

      const fieldsToSend = [
        "_id",
        "arTitle",
        "heTitle",
        "arSummary",
        "heSummary",
        "heFullText",
        "arFullText",
        "innerPageToOpen",
        "pageToOpen",
      ];

      const details: any = convertNotificationData(notificationData);

      const filteredData = fieldsToSend.reduce((acc, field) => {
        if (details[field]) {
          acc[field] = details[field];
        }
        return acc;
      }, {});

      const imageUrl = `${encodeURIComponent(details.heNotificationImage)}`;
      const messages = {
        notification: {
          title: details.heTitle,
          body: details.heSummary,
        },
        android: {
          notification: { imageUrl },
        },
        apns: {
          payload: { aps: { "mutable-content": 1 } },
          fcm_options: { image: imageUrl },
        },
        data: filteredData,
        tokens,
      };

      const sendMessage = await messaging().sendEachForMulticast(messages);

      if (!sendMessage) {
        throw new CustomError(
          statusCodes.internal_server,
          Messages.errorInSendingMessage,
        );
      }
      resolve({
        tokens: deviceTokens,
        sendMessage,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const convertNotificationData = (notificationData) => {
  const fieldMapping = {
    title: ["arTitle", "heTitle"],
    summary: ["arSummary", "heSummary"],
    notificationImage: ["arNotificationImage", "heNotificationImage"],
    fullText: ["arFullText", "heFullText"],
  };
  return Object.keys(fieldMapping).reduce(
    (acc, field) => {
      if (notificationData[field]) {
        const [arKey, heKey] = fieldMapping[field];
        acc[arKey] = notificationData[field].arabic;
        acc[heKey] = notificationData[field].hebrew;
      }
      return acc;
    },
    {
      ...(notificationData._id && { _id: notificationData._id.toString() }),
      ...(notificationData.innerPageToOpen && {
        innerPageToOpen: notificationData.innerPageToOpen,
      }),
      ...(notificationData.pageToOpen && {
        pageToOpen: notificationData.pageToOpen,
      }),
    },
  );
};

export const processNotificationResponses = (
  notification,
  payload,
  pushNotificationId,
  userNotificationId,
) => {
  return notification.sendMessage.responses.reduce(
    (acc, response, index) => {
      const token = notification.tokens[index];
      if (response.error) {
        acc.failureTokens = [
          ...acc.failureTokens,
          {
            pushNotificationId: pushNotificationId ?? null,
            userNotificationId: userNotificationId ?? null,
            detail: payload.title.hebrew,
            userId: token.userId,
            notificationToken: token.token,
            errorMessage: response.error.errorInfo.message,
          },
        ];
      }

      if (response.success) {
        acc.successTokens = [
          ...acc.successTokens,
          {
            userId: token.userId,
            token: token.token,
            details: payload,
          },
        ];
      }
      return acc;
    },
    {
      failureTokens: [],
      successTokens: [],
    },
  );
};
