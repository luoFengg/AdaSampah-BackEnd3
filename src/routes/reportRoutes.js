import getAllReports from "../handlers/reports/getAllReports.js";
import getReportById from "../handlers/reports/getReportById.js";
import postReport from "../handlers/reports/postReport.js";
import editReportDescription from "../handlers/reports/editReportDescription.js";
import updateReportStatus from "../handlers/reports/updateReportStatus.js";
import deleteReportById from "../handlers/reports/deleteReportById.js";
import toggleSaveById from "../handlers/reports/toggleSaveById.js";
import getSaveById from "../handlers/reports/getSaveById.js";
import getReportByUserId from "../handlers/reports/getReportByUserId.js";
import authenticate from "../middleware/auth.js";
import getAllReportsPaginate from "../handlers/reports/getAllReportsPaginate.js";

const reportRoutes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response("Hello, World!").code(200);
    },
  },
  {
    method: "GET",
    path: "/reports",
    handler: getAllReports,
  },
  {
    method: "GET",
    path: "/reports/limit",
    handler: getAllReportsPaginate,
  },
  {
    method: "GET",
    path: "/reports/{reportId}",
    handler: getReportById,
  },
  {
    method: "POST",
    path: "/reports",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 5 * 1024 * 1024,
        allow: "multipart/form-data",
      },
    },
    handler: postReport,
  },
  {
    method: "PUT",
    path: "/reports/{reportId}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: editReportDescription,
  },
  {
    method: "PATCH",
    path: "/reports/{reportId}/status",
    options: {
      // Tambahkan payload config
      payload: {
        parse: true,
        allow: "application/json",
      },
    },
    // options: {
    //   pre: [{ method: authenticate }],
    //   plugins: {
    //     "hapi-auth-cookie": false,
    //   },
    // },
    handler: updateReportStatus,
  },
  {
    method: "DELETE",
    path: "/reports/{reportId}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: deleteReportById,
  },
  {
    method: "PATCH",
    path: "/reports/{reportId}/saved/{userId}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: toggleSaveById,
  },
  {
    method: "GET",
    path: "/reports/{reportId}/saved",
    handler: getSaveById,
  },
  {
    method: "GET",
    path: "/reports/user/{userId}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: getReportByUserId,
  },
];

export default reportRoutes;
