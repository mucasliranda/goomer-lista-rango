import { describe, expect, it } from "vitest";
import Hour from "./hour";

describe('Hour', () => {
  it('should create a new hour with success', () => {
    const hour = Hour.create({
      start: "08:00",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    });

    expect(hour.id).toBeDefined();
    expect(hour.start).toBe("08:00");
    expect(hour.end).toBe("18:00");
    expect(hour.days).toEqual([1, 2, 3, 4, 5]);
  });

  it('should throw an error when creating a new hour without start', () => {
    expect(() => Hour.create({
      start: "",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour without end', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour without days', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "",
      days: []
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid days', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "18:00",
      days: [1, 2, 3, 4, 5, 6, 7]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid start', () => {
    expect(() => Hour.create({
      start: "08:75",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid end', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "18:75",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid start pattern', () => {
    expect(() => Hour.create({
      start: "8hrs",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid end pattern', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "18hrs",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid start interval', () => {
    expect(() => Hour.create({
      start: "08:27",
      end: "18:00",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });

  it('should throw an error when creating a new hour with invalid end interval', () => {
    expect(() => Hour.create({
      start: "08:00",
      end: "18:27",
      days: [1, 2, 3, 4, 5]
    })).toThrow();
  });
});