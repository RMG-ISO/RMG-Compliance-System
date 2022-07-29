import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormMode } from '../shared/interfaces/form-mode';
import { DocumentService } from './documents/documents.service';

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
    private documentService:DocumentService,
    public readonly list: ListService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    // this.items = items.items;
    console.log(this.items);
    const streamCreator = (query) => this.documentService.getList({ ...query, search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(this.items);
    });

    // const streamCreator = (query) => new BehaviorSubject(items);
    // this.list.hookToQuery(streamCreator).subscribe((response) => {
    //   this.items = response.items;
    //   this.totalCount = response.totalCount;
    //   console.log(this.items);
    // });
  }

  activate(ev) {
    if (ev.type === 'click') {
      console.log(ev);
    }
  }

  openDialog(data?) {

  }

  delete(row) {

  }


}

let items = {
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "creationTime": "2022-07-29T15:59:58.449Z",
      "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModificationTime": "2022-07-29T15:59:58.449Z",
      "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isDeleted": true,
      "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "deletionTime": "2022-07-29T15:59:58.449Z",
      "creator": {
        "extraProperties": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "creationTime": "2022-07-29T15:59:58.449Z",
        "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "lastModificationTime": "2022-07-29T15:59:58.449Z",
        "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "isDeleted": true,
        "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "deletionTime": "2022-07-29T15:59:58.449Z",
        "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "name": "string",
        "surname": "string",
        "email": "string",
        "emailConfirmed": true,
        "phoneNumber": "string",
        "phoneNumberConfirmed": true,
        "lockoutEnabled": true,
        "lockoutEnd": "2022-07-29T15:59:58.449Z",
        "concurrencyStamp": "string"
      },
      "lastModifier": {
        "extraProperties": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "creationTime": "2022-07-29T15:59:58.449Z",
        "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "lastModificationTime": "2022-07-29T15:59:58.449Z",
        "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "isDeleted": true,
        "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "deletionTime": "2022-07-29T15:59:58.449Z",
        "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "name": "string",
        "surname": "string",
        "email": "string",
        "emailConfirmed": true,
        "phoneNumber": "string",
        "phoneNumberConfirmed": true,
        "lockoutEnabled": true,
        "lockoutEnd": "2022-07-29T15:59:58.449Z",
        "concurrencyStamp": "string"
      },
      "deleter": {
        "extraProperties": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "creationTime": "2022-07-29T15:59:58.449Z",
        "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "lastModificationTime": "2022-07-29T15:59:58.449Z",
        "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "isDeleted": true,
        "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "deletionTime": "2022-07-29T15:59:58.449Z",
        "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "name": "string",
        "surname": "string",
        "email": "string",
        "emailConfirmed": true,
        "phoneNumber": "string",
        "phoneNumberConfirmed": true,
        "lockoutEnabled": true,
        "lockoutEnd": "2022-07-29T15:59:58.449Z",
        "concurrencyStamp": "string"
      },
      "titleAr": "string",
      "titleEn": "string",
      "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "attachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "userDto": {
        "extraProperties": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "creationTime": "2022-07-29T15:59:58.449Z",
        "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "lastModificationTime": "2022-07-29T15:59:58.449Z",
        "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "isDeleted": true,
        "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "deletionTime": "2022-07-29T15:59:58.449Z",
        "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "name": "string",
        "surname": "string",
        "email": "string",
        "emailConfirmed": true,
        "phoneNumber": "string",
        "phoneNumberConfirmed": true,
        "lockoutEnabled": true,
        "lockoutEnd": "2022-07-29T15:59:58.449Z",
        "concurrencyStamp": "string"
      },
      "attachment": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "creationTime": "2022-07-29T15:59:58.449Z",
        "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "lastModificationTime": "2022-07-29T15:59:58.449Z",
        "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "isDeleted": true,
        "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "deletionTime": "2022-07-29T15:59:58.449Z",
        "creator": {
          "extraProperties": {
            "additionalProp1": "string",
            "additionalProp2": "string",
            "additionalProp3": "string"
          },
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "creationTime": "2022-07-29T15:59:58.449Z",
          "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "lastModificationTime": "2022-07-29T15:59:58.449Z",
          "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "isDeleted": true,
          "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "deletionTime": "2022-07-29T15:59:58.449Z",
          "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "userName": "string",
          "name": "string",
          "surname": "string",
          "email": "string",
          "emailConfirmed": true,
          "phoneNumber": "string",
          "phoneNumberConfirmed": true,
          "lockoutEnabled": true,
          "lockoutEnd": "2022-07-29T15:59:58.449Z",
          "concurrencyStamp": "string"
        },
        "lastModifier": {
          "extraProperties": {
            "additionalProp1": "string",
            "additionalProp2": "string",
            "additionalProp3": "string"
          },
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "creationTime": "2022-07-29T15:59:58.449Z",
          "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "lastModificationTime": "2022-07-29T15:59:58.449Z",
          "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "isDeleted": true,
          "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "deletionTime": "2022-07-29T15:59:58.449Z",
          "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "userName": "string",
          "name": "string",
          "surname": "string",
          "email": "string",
          "emailConfirmed": true,
          "phoneNumber": "string",
          "phoneNumberConfirmed": true,
          "lockoutEnabled": true,
          "lockoutEnd": "2022-07-29T15:59:58.449Z",
          "concurrencyStamp": "string"
        },
        "deleter": {
          "extraProperties": {
            "additionalProp1": "string",
            "additionalProp2": "string",
            "additionalProp3": "string"
          },
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "creationTime": "2022-07-29T15:59:58.449Z",
          "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "lastModificationTime": "2022-07-29T15:59:58.449Z",
          "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "isDeleted": true,
          "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "deletionTime": "2022-07-29T15:59:58.449Z",
          "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "userName": "string",
          "name": "string",
          "surname": "string",
          "email": "string",
          "emailConfirmed": true,
          "phoneNumber": "string",
          "phoneNumberConfirmed": true,
          "lockoutEnabled": true,
          "lockoutEnd": "2022-07-29T15:59:58.449Z",
          "concurrencyStamp": "string"
        },
        "isMultiple": true,
        "maxFileSize": 0,
        "fileExtentions": "string",
        "attachmentFiles": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "creationTime": "2022-07-29T15:59:58.449Z",
            "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "lastModificationTime": "2022-07-29T15:59:58.449Z",
            "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "isDeleted": true,
            "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "deletionTime": "2022-07-29T15:59:58.449Z",
            "creator": {
              "extraProperties": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              },
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "creationTime": "2022-07-29T15:59:58.449Z",
              "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "lastModificationTime": "2022-07-29T15:59:58.449Z",
              "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "isDeleted": true,
              "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "deletionTime": "2022-07-29T15:59:58.449Z",
              "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "userName": "string",
              "name": "string",
              "surname": "string",
              "email": "string",
              "emailConfirmed": true,
              "phoneNumber": "string",
              "phoneNumberConfirmed": true,
              "lockoutEnabled": true,
              "lockoutEnd": "2022-07-29T15:59:58.449Z",
              "concurrencyStamp": "string"
            },
            "lastModifier": {
              "extraProperties": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              },
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "creationTime": "2022-07-29T15:59:58.449Z",
              "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "lastModificationTime": "2022-07-29T15:59:58.449Z",
              "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "isDeleted": true,
              "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "deletionTime": "2022-07-29T15:59:58.449Z",
              "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "userName": "string",
              "name": "string",
              "surname": "string",
              "email": "string",
              "emailConfirmed": true,
              "phoneNumber": "string",
              "phoneNumberConfirmed": true,
              "lockoutEnabled": true,
              "lockoutEnd": "2022-07-29T15:59:58.449Z",
              "concurrencyStamp": "string"
            },
            "deleter": {
              "extraProperties": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              },
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "creationTime": "2022-07-29T15:59:58.449Z",
              "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "lastModificationTime": "2022-07-29T15:59:58.449Z",
              "lastModifierId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "isDeleted": true,
              "deleterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "deletionTime": "2022-07-29T15:59:58.449Z",
              "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "userName": "string",
              "name": "string",
              "surname": "string",
              "email": "string",
              "emailConfirmed": true,
              "phoneNumber": "string",
              "phoneNumberConfirmed": true,
              "lockoutEnabled": true,
              "lockoutEnd": "2022-07-29T15:59:58.449Z",
              "concurrencyStamp": "string"
            },
            "name": "string",
            "size": 0,
            "displayName": "string",
            "extention": "string",
            "attachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
        ]
      }
    }
  ],
  "totalCount": 0
}