import Report from "../../models/reportSchema.js";

const editReportDescription = async (request, h) => {
  try {
    const { reportId } = request.params;
    const { description } = request.payload;

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { description },
      { new: true }
    );

    if (!updatedReport) {
      return h
        .response({ status: "fail", message: "Report not found" })
        .code(404);
    }

    return h
      .response({
        status: "success",
        message: "Report description updated successfully",
        data: updatedReport,
      })
      .code(200);
  } catch (error) {
    console.error("Error updating report description:", error);
    return h
      .response({
        status: "fail",
        message: "Failed to update report description",
      })
      .code(500);
  }
};

export default editReportDescription;
