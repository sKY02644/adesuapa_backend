import { Blob } from 'buffer';

export function changeDpiDataUrl(base64Image: string, dpi: number): Array<string>;
export function changeDpiBlob(blob: Blob, dpi: number): Promise<Blob>;
export function changeDpiBuffer(buffer: Buffer, dpi: number): Buffer;