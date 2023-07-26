import { DecoupledEditor as DecoupledEditorBase } from '@ckeditor/ckeditor5-editor-decoupled';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';

export default class PDFEditor extends DecoupledEditorBase {}
PDFEditor.builtinPlugins = [
    ExportPdf
    // Rest of plugins to include in the build.
    // ...
];