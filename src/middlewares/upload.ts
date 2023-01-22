import multer from "multer";

const excelFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-inventory-${file.originalname}`);
    },
  });

  const uploadFile = multer({ storage: storage, fileFilter: excelFilter });

 export = uploadFile