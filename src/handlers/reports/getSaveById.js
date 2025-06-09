import Report from "../../models/reportSchema.js";

const getSaveById = async (request, h) => {
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
            const save = report.saved;

        return h
        .response({
            status: "Succes",
            data: save,
        })
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

export default getSaveById;