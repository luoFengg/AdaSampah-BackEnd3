import Report from "../../models/reportSchema.js";
const toggleSaveById = async (request, h) => {
  const { reportId, userId } = request.params;

  // Check if reportId and userId are provided
  if (!reportId || !userId) {
    return h.response({
      status: 'fail',
      message: 'Report ID and User ID are required',
    }).code(400);
  }

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return h.response({
        status: 'fail',
        message: 'Report not found',
      }).code(404);
    }

    const isUserSaved = report.saved.includes(userId);

    if (isUserSaved) {
      report.saved = report.saved.filter((id) => id !== userId);
      await report.save(); 

      return h.response({
        status: 'success',
        message: 'User ID removed from saved',
      }).code(200);
    } else {
      report.saved.push(userId);
      await report.save(); 

      return h.response({
        status: 'success',
        message: 'User ID added to saved',
      }).code(200);
    }
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'An unexpected error occurred',
    }).code(500);
  }
};
export default toggleSaveById;