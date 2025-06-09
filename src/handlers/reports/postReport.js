import Report from "../../models/reportSchema.js";
import cloudinary from "../../config/cloudinary.js";

const postReport = async (request, h) => {
  try {
    // ambil data dari request payload
    const userId = request.authenticatedUser?.userId;

    const {
      description,
      lat,
      lon,
      latDetail,
      lonDetail,
      regency,
      status,
      saved,
      province,
      location,
      detailLocation,
    } = request.payload;

    // ambil file gambar dari request payload
    const photo = request.payload.photo;

    // upload foto ke Cloudinary
    let photoUrl = "";

    if (photo) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "reports" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              photoUrl = result.secure_url;
              resolve();
            }
          }
        );
        photo.pipe(stream);
      });
    }

    const report = new Report({
      userId,
      description,
      photoUrl,
      lat: Number(lat),
      lon: Number(lon),
      latDetail: Number(latDetail),
      lonDetail: Number(lonDetail),
      regency,
      province,
      location,
      detailLocation,
      status: status ? JSON.parse(status) : [],
      saved: saved ? JSON.parse(saved) : [],
    });

    const result = await report.save();

    return h
      .response({
        status: "success",
        message: "Report created successfully",
        data: { reportId: result._id },
      })
      .code(201);
  } catch (error) {
    console.error("Error creating report:", error);
    return h
      .response({
        status: "fail",
        message: "Failed to create report",
      })
      .code(500);
  }
};

export default postReport;
