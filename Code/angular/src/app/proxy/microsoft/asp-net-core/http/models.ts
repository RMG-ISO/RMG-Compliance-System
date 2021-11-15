
export interface IFormFile {
  contentType?: string;
  contentDisposition?: string;
  headers: Record<string, {}>;
  length: number;
  name?: string;
  fileName?: string;
}
