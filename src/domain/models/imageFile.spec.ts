import { describe, expect, it } from "vitest";
import { ImageFile } from "./imageFile";

describe('ImageFile', () => {
  it('should instantiate ImageFile', () => {
    const imageFile = ImageFile.create({
      id: 'id',
      originalname: 'originalname',
      mimetype: 'mimetype',
      buffer: Buffer.from('buffer')
    });
    expect(imageFile.id).toBe('id');
    expect(imageFile.originalname).toBe('originalname');
    expect(imageFile.mimetype).toBe('mimetype');
    expect(imageFile.buffer).toEqual(Buffer.from('buffer'));
  });

  it('should throw error when id is not provided', () => {
    expect(() => {
      ImageFile.create({
        id: '',
        originalname: 'originalname',
        mimetype: 'mimetype',
        buffer: Buffer.from('buffer')
      });
    }).toThrow();
  });

  it('should throw error when originalname is not provided', () => {
    expect(() => {
      ImageFile.create({
        id: 'id',
        originalname: '',
        mimetype: 'mimetype',
        buffer: Buffer.from('buffer')
      });
    }).toThrow();
  });

  it('should throw error when mimetype is not provided', () => {
    expect(() => {
      ImageFile.create({
        id: 'id',
        originalname: 'originalname',
        mimetype: '',
        buffer: Buffer.from('buffer')
      });
    }).toThrow();
  });
});