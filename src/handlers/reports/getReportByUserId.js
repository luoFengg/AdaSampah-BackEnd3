import Report from "../../models/reportSchema.js";

const getReportByUserId = async (request, h) => {
  try {
    const { userId } = request.params;
    const getReports = await Report.find({ userId });

    return h
      .response({
        status: "success",
        data: getReports,
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching reports by userId: :", error);
    return h
      .response({
        status: "fail",
        message: "Failed to Find report",
      })
      .code(500);
  }
};

export default getReportByUserId;
