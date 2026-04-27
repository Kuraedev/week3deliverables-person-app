import { Prisma } from "@prisma/client";

import { parsePersonInput, ValidationError } from "@/lib/person-validation";
import { prisma } from "@/lib/prisma";

type PersonRouteContext = {
  params: Promise<{ id: string }>;
};

function parsePersonId(rawId: string): number {
  const id = Number.parseInt(rawId, 10);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError("Person id must be a positive integer.");
  }

  return id;
}

function errorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return "That email address already exists.";
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return "Person record not found.";
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

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return 404;
  }

  return 500;
}

export async function GET(_request: Request, context: PersonRouteContext) {
  try {
    const { id } = await context.params;
    const personId = parsePersonId(id);

    const person = await prisma.person.findUnique({
      where: { id: personId },
    });

    if (!person) {
      return Response.json({ error: "Person record not found." }, { status: 404 });
    }

    return Response.json({ person });
  } catch (error) {
    return Response.json(
      { error: errorMessage(error) },
      { status: errorStatus(error) }
    );
  }
}

export async function PUT(request: Request, context: PersonRouteContext) {
  try {
    const { id } = await context.params;
    const personId = parsePersonId(id);
    const payload = await request.json();
    const data = parsePersonInput(payload);

    const person = await prisma.person.update({
      where: { id: personId },
      data,
    });

    return Response.json({ person });
  } catch (error) {
    return Response.json(
      { error: errorMessage(error) },
      { status: errorStatus(error) }
    );
  }
}

export async function DELETE(_request: Request, context: PersonRouteContext) {
  try {
    const { id } = await context.params;
    const personId = parsePersonId(id);

    await prisma.person.delete({
      where: { id: personId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json(
      { error: errorMessage(error) },
      { status: errorStatus(error) }
    );
  }
}
