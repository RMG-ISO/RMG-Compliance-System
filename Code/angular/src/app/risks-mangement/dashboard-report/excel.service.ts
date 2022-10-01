import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import * as logoFile from './carlogo.js';
import { DatePipe } from '@angular/common';
import { LocalizationService } from '@abp/ng.core';
declare const ExcelJS: any;


@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class ExcelService {

  constructor(
    private datePipe: DatePipe,
    private localizationService:LocalizationService
  ) {

  }

  async generateExcel(departmentName, activeTabName, data) {
/*

        <th> {{ '::DepartmentName' | abpLocalization }} </th>
        <th> {{ '::CreatedDate' | abpLocalization }} </th>

*/

    // const ExcelJS = await import('exceljs');
    // console.log(ExcelJS);
    // const Workbook: any = {};

  // Excel Title, Header, Data
  
    const header = [
      this.localizationService.instant(activeTabName + 'Name'),
      this.localizationService.instant(activeTabName + 'Owner'),
      this.localizationService.instant(activeTabName + 'Potential'),
      this.localizationService.instant(activeTabName + 'Status'),
      this.localizationService.instant('::CreatedBy'),
      this.localizationService.instant('::DepartmentName'),
      this.localizationService.instant('::CreatedDate'),
    ];
    console.log(header)
    console.log(data)

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(this.localizationService.instant('::Report') + departmentName, {
      pageSetup:{
        horizontalCentered:true,
        verticalCentered:true
      }
    });
    worksheet.properties.defaultRowHeight = 25;

// Add Row and formatting
    const titleRow = worksheet.addRow([this.localizationService.instant('::Report') + departmentName]);
    titleRow.font = { name: 'Arial', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    worksheet.addRow([]);
    // const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);


// Add Image
  const logo = workbook.addImage({
    base64: logoFile.logoBase64,
    extension: 'png',
  });

    worksheet.addImage(logo, 'G1:G2');
    worksheet.mergeCells('A1:G2');
    

// Blank Row
    worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '37474f' },
      bgColor: { argb: 'ffffff' },
    };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    cell.font = {
      name: 'Arial Black',
      color: { argb: 'ffffff' },
      family: 2,
      size: 16,
      italic: false
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  // worksheet.addRows(data);


// Add Data and Conditional Formatting
let closeStatus = this.localizationService.instant('::Status:Close');

data.forEach(d => {
  const row = worksheet.addRow(d);
  const qty:any = row.getCell(4);
  let color = '21D500';
  // if ( +qty.value  < 500) {
  //   color = 'FF9999';
  // }
  if ( qty.value === closeStatus) {
    color = 'FF0000';
  }

  qty.font = {
    color: { argb: color },
    bold: true
  };


  // qty.fill = {
  //   type: 'pattern',
  //   pattern: 'solid',
  //   fgColor: { argb: color }
  // };

  console.log(worksheet);
  worksheet._rows.map(row => {
    row._cells.map(cell => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    })
  })
}


);

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 30;
    worksheet.getColumn(7).width = 30;
    worksheet.addRow([]);


// // Footer Row
//     const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
//     footerRow.getCell(1).fill = {
//   type: 'pattern',
//   pattern: 'solid',
//   fgColor: { argb: 'FFCCFFE5' }
// };
//     footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// // Merge Cells
//     worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'CarData.xlsx');
});

  }
}
