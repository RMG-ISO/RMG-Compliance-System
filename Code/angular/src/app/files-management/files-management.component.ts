import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { documentService } from '@proxy/Documents';
import { DocumentDto } from '@proxy/Documents/dtos';
import { FormMode } from '../shared/interfaces/form-mode';

@Component({
  selector: 'app-files-management',
  templateUrl: './files-management.component.html',
  styleUrls: ['./files-management.component.scss']
})
export class FilesManagementComponent implements OnInit {
  FormMode = FormMode;
  items: any[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected;
  form: FormGroup;

  visibleContent:string = 'grid';

  constructor(
    private documentsService:documentService,
    public readonly list: ListService,
  ) { }


  catsList;
  ngOnInit(): void {
    this.getCatogries();

    this.getList();
  }


  getCatogries(search = null) {
    this.documentsService.getListCategory({search, maxResultCount:null}).subscribe(r => {
      console.log(r);
      this.catsList = r.items;
    })
  }
 
  searchVal
  getList(search = null) {
    this.searchVal = search;
    const streamCreator = (query) => this.documentsService.getList({ ...query, search: this.searchVal, CategoryId:this.selectedCatId });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(this.items);
    });
  }

  selectedCatId;
  selectionChange(ev) {
    console.log(ev);
    this.selectedCatId - ev.option.value;
    this.getList();
  }
  

  activate(ev) {
    if (ev.type === 'click') {
      console.log(ev);
    }
  }

  delete(row) {

  }

  openDialog(data?: DocumentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      attachmentId: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  OnFileUploaded(attachmentId: string) {
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

  save() {
    console.log('saving here bro')
  }
}

// let items = {
//   "items": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "creationTime": "2022-07-29T15:59:58.449Z",
//       "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "lastModificationTime": "2022-07-29T15:59:58.449Z",
//       "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "isDeleted": true,
//       "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "deletionTime": "2022-07-29T15:59:58.449Z",
//       "creator": {
//         "extraProperties": {
//           "additionalProp1": "string",
//           "additionalProp2": "string",
//           "additionalProp3": "string"
//         },
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "creationTime": "2022-07-29T15:59:58.449Z",
//         "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "lastModificationTime": "2022-07-29T15:59:58.449Z",
//         "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true,
//         "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "deletionTime": "2022-07-29T15:59:58.449Z",
//         "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "userName": "string",
//         "name": "string",
//         "surname": "string",
//         "email": "string",
//         "emailConfirmed": true,
//         "phoneNumber": "string",
//         "phoneNumberConfirmed": true,
//         "lockoutEnabled": true,
//         "lockoutEnd": "2022-07-29T15:59:58.449Z",
//         "concurrencyStamp": "string"
//       },
//       "lastModifier": {
//         "extraProperties": {
//           "additionalProp1": "string",
//           "additionalProp2": "string",
//           "additionalProp3": "string"
//         },
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "creationTime": "2022-07-29T15:59:58.449Z",
//         "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "lastModificationTime": "2022-07-29T15:59:58.449Z",
//         "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true,
//         "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "deletionTime": "2022-07-29T15:59:58.449Z",
//         "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "userName": "string",
//         "name": "string",
//         "surname": "string",
//         "email": "string",
//         "emailConfirmed": true,
//         "phoneNumber": "string",
//         "phoneNumberConfirmed": true,
//         "lockoutEnabled": true,
//         "lockoutEnd": "2022-07-29T15:59:58.449Z",
//         "concurrencyStamp": "string"
//       },
//       "deleter": {
//         "extraProperties": {
//           "additionalProp1": "string",
//           "additionalProp2": "string",
//           "additionalProp3": "string"
//         },
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "creationTime": "2022-07-29T15:59:58.449Z",
//         "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "lastModificationTime": "2022-07-29T15:59:58.449Z",
//         "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true,
//         "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "deletionTime": "2022-07-29T15:59:58.449Z",
//         "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "userName": "string",
//         "name": "string",
//         "surname": "string",
//         "email": "string",
//         "emailConfirmed": true,
//         "phoneNumber": "string",
//         "phoneNumberConfirmed": true,
//         "lockoutEnabled": true,
//         "lockoutEnd": "2022-07-29T15:59:58.449Z",
//         "concurrencyStamp": "string"
//       },
//       "titleAr": "string",
//       "titleEn": "string",
//       "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "attachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userDto": {
//         "extraProperties": {
//           "additionalProp1": "string",
//           "additionalProp2": "string",
//           "additionalProp3": "string"
//         },
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "creationTime": "2022-07-29T15:59:58.449Z",
//         "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "lastModificationTime": "2022-07-29T15:59:58.449Z",
//         "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true,
//         "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "deletionTime": "2022-07-29T15:59:58.449Z",
//         "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "userName": "string",
//         "name": "string",
//         "surname": "string",
//         "email": "string",
//         "emailConfirmed": true,
//         "phoneNumber": "string",
//         "phoneNumberConfirmed": true,
//         "lockoutEnabled": true,
//         "lockoutEnd": "2022-07-29T15:59:58.449Z",
//         "concurrencyStamp": "string"
//       },
//       "attachment": {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "creationTime": "2022-07-29T15:59:58.449Z",
//         "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "lastModificationTime": "2022-07-29T15:59:58.449Z",
//         "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "isDeleted": true,
//         "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "deletionTime": "2022-07-29T15:59:58.449Z",
//         "creator": {
//           "extraProperties": {
//             "additionalProp1": "string",
//             "additionalProp2": "string",
//             "additionalProp3": "string"
//           },
//           "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "creationTime": "2022-07-29T15:59:58.449Z",
//           "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "lastModificationTime": "2022-07-29T15:59:58.449Z",
//           "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "isDeleted": true,
//           "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "deletionTime": "2022-07-29T15:59:58.449Z",
//           "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "userName": "string",
//           "name": "string",
//           "surname": "string",
//           "email": "string",
//           "emailConfirmed": true,
//           "phoneNumber": "string",
//           "phoneNumberConfirmed": true,
//           "lockoutEnabled": true,
//           "lockoutEnd": "2022-07-29T15:59:58.449Z",
//           "concurrencyStamp": "string"
//         },
//         "lastModifier": {
//           "extraProperties": {
//             "additionalProp1": "string",
//             "additionalProp2": "string",
//             "additionalProp3": "string"
//           },
//           "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "creationTime": "2022-07-29T15:59:58.449Z",
//           "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "lastModificationTime": "2022-07-29T15:59:58.449Z",
//           "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "isDeleted": true,
//           "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "deletionTime": "2022-07-29T15:59:58.449Z",
//           "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "userName": "string",
//           "name": "string",
//           "surname": "string",
//           "email": "string",
//           "emailConfirmed": true,
//           "phoneNumber": "string",
//           "phoneNumberConfirmed": true,
//           "lockoutEnabled": true,
//           "lockoutEnd": "2022-07-29T15:59:58.449Z",
//           "concurrencyStamp": "string"
//         },
//         "deleter": {
//           "extraProperties": {
//             "additionalProp1": "string",
//             "additionalProp2": "string",
//             "additionalProp3": "string"
//           },
//           "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "creationTime": "2022-07-29T15:59:58.449Z",
//           "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "lastModificationTime": "2022-07-29T15:59:58.449Z",
//           "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "isDeleted": true,
//           "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "deletionTime": "2022-07-29T15:59:58.449Z",
//           "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "userName": "string",
//           "name": "string",
//           "surname": "string",
//           "email": "string",
//           "emailConfirmed": true,
//           "phoneNumber": "string",
//           "phoneNumberConfirmed": true,
//           "lockoutEnabled": true,
//           "lockoutEnd": "2022-07-29T15:59:58.449Z",
//           "concurrencyStamp": "string"
//         },
//         "isMultiple": true,
//         "maxFileSize": 0,
//         "fileExtentions": "string",
//         "attachmentFiles": [
//           {
//             "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             "creationTime": "2022-07-29T15:59:58.449Z",
//             "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             "lastModificationTime": "2022-07-29T15:59:58.449Z",
//             "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             "isDeleted": true,
//             "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             "deletionTime": "2022-07-29T15:59:58.449Z",
//             "creator": {
//               "extraProperties": {
//                 "additionalProp1": "string",
//                 "additionalProp2": "string",
//                 "additionalProp3": "string"
//               },
//               "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "creationTime": "2022-07-29T15:59:58.449Z",
//               "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "lastModificationTime": "2022-07-29T15:59:58.449Z",
//               "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "isDeleted": true,
//               "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "deletionTime": "2022-07-29T15:59:58.449Z",
//               "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "userName": "string",
//               "name": "string",
//               "surname": "string",
//               "email": "string",
//               "emailConfirmed": true,
//               "phoneNumber": "string",
//               "phoneNumberConfirmed": true,
//               "lockoutEnabled": true,
//               "lockoutEnd": "2022-07-29T15:59:58.449Z",
//               "concurrencyStamp": "string"
//             },
//             "lastModifier": {
//               "extraProperties": {
//                 "additionalProp1": "string",
//                 "additionalProp2": "string",
//                 "additionalProp3": "string"
//               },
//               "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "creationTime": "2022-07-29T15:59:58.449Z",
//               "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "lastModificationTime": "2022-07-29T15:59:58.449Z",
//               "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "isDeleted": true,
//               "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "deletionTime": "2022-07-29T15:59:58.449Z",
//               "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "userName": "string",
//               "name": "string",
//               "surname": "string",
//               "email": "string",
//               "emailConfirmed": true,
//               "phoneNumber": "string",
//               "phoneNumberConfirmed": true,
//               "lockoutEnabled": true,
//               "lockoutEnd": "2022-07-29T15:59:58.449Z",
//               "concurrencyStamp": "string"
//             },
//             "deleter": {
//               "extraProperties": {
//                 "additionalProp1": "string",
//                 "additionalProp2": "string",
//                 "additionalProp3": "string"
//               },
//               "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "creationTime": "2022-07-29T15:59:58.449Z",
//               "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "lastModificationTime": "2022-07-29T15:59:58.449Z",
//               "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "isDeleted": true,
//               "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "deletionTime": "2022-07-29T15:59:58.449Z",
//               "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "userName": "string",
//               "name": "string",
//               "surname": "string",
//               "email": "string",
//               "emailConfirmed": true,
//               "phoneNumber": "string",
//               "phoneNumberConfirmed": true,
//               "lockoutEnabled": true,
//               "lockoutEnd": "2022-07-29T15:59:58.449Z",
//               "concurrencyStamp": "string"
//             },
//             "name": "string",
//             "size": 0,
//             "displayName": "string",
//             "extention": "string",
//             "attachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//           }
//         ]
//       }
//     }
//   ],
//   "totalCount": 0
// }