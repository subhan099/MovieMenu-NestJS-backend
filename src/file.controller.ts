// import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";

// @Controller('files')
// export class FilesController {
//     @Post('upload')
//     @UseInterceptors(FileInterceptor('file'))
//     UploadFile(@UploadedFile() file) {
//         if (!file){
//             throw new Error('no file uploaded')
//         }

//         console.log("file uploaded", file);

//         return {message: "file Uploaded successfully"}
//     }
// }