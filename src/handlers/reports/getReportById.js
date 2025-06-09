import Report from "../../models/reportSchema.js";

const getReportById = async (request, h) => {
  try {
    const { reportId } = request.params;
    const report = await Report.findById(reportId);

    if (!report) {
      return h
        .response({ status: "fail", message: "Report not found" })
        .code(404);
    }

    return h.response({ status: "success", data: report }).code(200);
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    return h
      .response({ status: "fail", message: "Failed to fetch report" })
      .code(500);
  }
};

export default getReportById;
