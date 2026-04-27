export type PersonInput = {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  city: string | null;
};

export class ValidationError extends Error {}

const MAX_NAME_LENGTH = 60;
const MAX_CITY_LENGTH = 80;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parsePersonInput(payload: unknown): PersonInput {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Request body must be a JSON object.");
  }

  const record = payload as Record<string, unknown>;
  const firstName = readOptionalString(record.firstName);
  const lastName = readOptionalString(record.lastName);
  const email = readOptionalString(record.email)?.toLowerCase();
  const city = readOptionalString(record.city);

  if (!firstName) {
    throw new ValidationError("First name is required.");
  }

  if (!lastName) {
    throw new ValidationError("Last name is required.");
  }

  if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
    throw new ValidationError("Names must be 60 characters or fewer.");
  }

  if (!email) {
    throw new ValidationError("Email is required.");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Please enter a valid email address.");
  }

  if (city && city.length > MAX_CITY_LENGTH) {
    throw new ValidationError("City must be 80 characters or fewer.");
  }

  const ageRaw = record.age;
  let age: number | null = null;

  if (ageRaw !== undefined && ageRaw !== null && ageRaw !== "") {
    const parsedAge =
      typeof ageRaw === "number" ? ageRaw : Number.parseInt(String(ageRaw), 10);

    if (!Number.isInteger(parsedAge) || parsedAge < 0 || parsedAge > 130) {
      throw new ValidationError("Age must be a whole number between 0 and 130.");
    }

    age = parsedAge;
  }

  return {
    firstName,
    lastName,
    email,
    age,
    city,
  };
}
