import Report from "../../models/reportSchema.js";

const deleteReportById = async (request, h) => {
    try {
        const { reportId } = request.params;
        const report = await Report.findById(reportId);

        if (!report) {
            return h
            .response({
            status: "fail",
            message: "Report not found"
            }).code(404);
        }

        await Report.findByIdAndDelete(reportId)
        return h
        .response({
            status: "succes",
            message: "Report Deleted"
        }).code(200);
        
    } catch (error) {
        console.error("Error delete report :", error);
    return h
      .response({
        status: "fail",
        message: "Failed to delete report",
      })
      .code(500);
    }
}

export default deleteReportById;