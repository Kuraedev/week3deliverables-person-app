import { Prisma } from "@prisma/client";

import { parsePersonInput, ValidationError } from "@/lib/person-validation";
import { prisma } from "@/lib/prisma";

function errorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return "That email address already exists.";
  }

  if (error instanceof SyntaxError) {
    return "Invalid JSON body.";
  }

  return "Unexpected server error.";
}

function errorStatus(error: unknown): number {
  if (error instanceof ValidationError || error instanceof SyntaxError) {
    return 400;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return 409;
  }

  return 500;
}

export async function GET() {
  const people = await prisma.person.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ people });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = parsePersonInput(payload);

    const person = await prisma.person.create({
      data,
    });

    return Response.json({ person }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: errorMessage(error) },
      { status: errorStatus(error) }
    );
  }
}
