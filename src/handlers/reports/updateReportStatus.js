import Report from "../../models/reportSchema.js";

function formatDate(date) {
  return (
    date
      .toLocaleString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      })
      .replace(",", ",") + " WIB"
  );
}

const updateReportStatus = async (request, h) => {
  try {
    const { reportId } = request.params;
    const { statusDescription } = request.payload;
    if (!statusDescription || statusDescription.trim() === "") {
      return h
        .response({
          status: "fail",
          message: "Description is required",
        })
        .code(400);
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return h
        .response({
          status: "fail",
          message: "Report not found",
        })
        .code(404);
    }

    // Tentukan statusName berikutnya
    const lastStatus = report.status[report.status.length - 1]?.statusName?.toLowerCase();
    let nextStatus = "";
    if (!lastStatus) {
      nextStatus = "Diverifikasi";
    } else if (lastStatus === "diverifikasi") {
      nextStatus = "Diproses";
    } else if (lastStatus === "diproses") {
      nextStatus = "Selesai";
    } else if (lastStatus === "selesai") {
      return h
        .response({
          status: "fail",
          message: "Report already completed",
        })
        .code(400);
    }

    const time = formatDate(new Date());

    // Buat data status baru
    const newStatus = {
      statusName: nextStatus,
      statusDescription: statusDescription,
      time: time,
    };

    // Push ke status[]
    const updateQuery = {
      $push: { status: newStatus },
    };

    // Jika selesai, hapus lat/lon
    if (nextStatus === "Selesai") {
      updateQuery.$unset = { lat: "", lon: "" };
    }

    const updatedReport = await Report.findByIdAndUpdate(reportId, updateQuery, { new: true });

    return h
      .response({
        status: "success",
        message: `Status ${nextStatus} berhasil ditambahkan`,
        data: updatedReport,
      })
      .code(200);
  } catch (error) {
    console.error("Error updating report status:", error);
    return h
      .response({
        status: "fail",
        message: "Failed to update report status",
      })
      .code(500);
  }
};

export default updateReportStatus;
