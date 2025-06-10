import Report from "../../models/reportSchema.js";

// getAllReportsPaginate.js
const getAllReportsPaginate = async (request, h) => {
  try {
    const { page = 1, limit = 9 } = request.query;
    const skip = (page - 1) * limit;
    const reports = await Report.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Report.countDocuments();

    return h
      .response({
        status: "success",
        data: reports,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return h
      .response({ status: "fail", message: "Failed to fetch reports" })
      .code(500);
  }
};

export default getAllReportsPaginate;
