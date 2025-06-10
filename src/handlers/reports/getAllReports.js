import Report from "../../models/reportSchema.js";

const getAllReports = async (request, h) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    return h.response({ status: "success", data: reports }).code(200);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return h
      .response({ status: "fail", message: "Failed to fetch reports" })
      .code(500);
  }
};

export default getAllReports;
