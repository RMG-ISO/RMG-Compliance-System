// import { RestService, Rest } from "@abp/ng.core";
// import { HttpEvent, HttpEventType } from "@angular/common/http";
// import { Injectable, Injector } from "@angular/core";
// import { AttachmentService } from "@proxy/attachments";
// import { AppInjector } from "src/app/app.module";
// import { environment } from "src/environments/environment";

// @Injectable({
//     providedIn: 'root'
// })
// class MyUploadAdapter {
    
//     loader
//     constructor(
//         loader,
//         // private restService: RestService,
//         // private injector:Injector
//     ) {
//         this.loader = loader;
//     }

//     // Starts the upload process.
//     upload() {
//         return this.loader.file
//             // .then( file => new Promise( ( resolve, reject ) => {
//             //     this._initListeners( resolve, reject, file );
//             // } ) );
//             .then( file => new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);
//                 reader.onload = (r) => {
//                     console.log(reader.result)
//                     return resolve(reader.result)
//                 };
//                 reader.onerror = error => reject(error);
//             }));


//             // const toBase64 = file => new Promise((resolve, reject) => {
//             //     const reader = new FileReader();
//             //     reader.readAsDataURL(file);
//             //     reader.onload = () => resolve(reader.result);
//             //     reader.onerror = error => reject(error);
//             // });

//     }

//     // Aborts the upload process.
//     xhr
//     abort() {
//         if ( this.xhr ) this.xhr.abort();
//     }

//     private generateFormData(files: FileList) {
//         const formData = new FormData();
//         Array.from(files).forEach(file => {
//           formData.append('files', file, file.name);
//         });
//         return formData;
//     }

//     // Initializes XMLHttpRequest listeners.
//     _initListeners( resolve, reject, file ) {
//         const genericErrorText = `Couldn't upload file: ${ file.name }.`;


//         let restService =  AppInjector.get(RestService);
//         let attachmentService = AppInjector.get(AttachmentService);
//         restService
//         .request<any, any>(
//           {
//             method: 'POST',
//             url: '/api/app/attachment/upload-files',
//             params: {
    
//             //   attachmentId: attachment ? attachment.id : null,
//             //   fileExtentions: this.fileExtentions,
//             //   isMultiple: this.isMultiple,
//             //   maxFileSize: this.maxFileSize
//             },
//             body: this.generateFormData([file] as any),
//             reportProgress: true,
//           },
//           {
//             apiName: attachmentService.apiName,
//             observe: Rest.Observe.Events
//           },
    
//         ).toPromise().then( (event: HttpEvent<any>) => {
//             console.log(event)

//             switch (event.type) {
//                 case HttpEventType.Sent:
//                   break;
//                 case HttpEventType.ResponseHeader:
//                   break;
//                 case HttpEventType.UploadProgress:
//                     this.loader.uploadTotal = event.total;
//                     this.loader.uploaded = event.loaded;
//                 //   this.progress = Math.round(event.loaded / event.total * 100);
//                   break;
//                 case HttpEventType.Response:
//                     attachmentService.getAttachmentWithFileByAttachmentId(event.body).subscribe(r => {
//                         // .map(file => {
//                         //   file.size = ~~(file.size/ 1000);
//                         //   return file
//                         // })
//                         r.attachmentFiles[0].id
//                         // getDownloadFileByFileId
//                         resolve( {
//                             default: r.attachmentFiles[0].id
//                         } )
//                       })

                    

//                 //   this.OnUpload.emit(event.body);
//                 //   this.OnEndUpload.emit(true);
//                 //   this.uploading = false;
//                 //   this.progress = 0;
//                   break;
//             }
//         }).catch(e => {
//             return reject( genericErrorText )
//         });
    
//     }

// }

// export const MyCustomUploadAdapterPlugin = ( editor ) => {
//     editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
//         return new MyUploadAdapter( loader );
//     };
// }