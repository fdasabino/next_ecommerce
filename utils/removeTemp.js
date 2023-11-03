import fs from "fs";

export const removeTmp = (path) => {
    console.log("path", path);
    if (!path) {
        throw new Error("No file path provided");
    }

    fs.unlink(path, (err) => {
        if (err) {
            throw new Error(err);
        }

        console.log(`File ${path} deleted successfully`);
    });
};
