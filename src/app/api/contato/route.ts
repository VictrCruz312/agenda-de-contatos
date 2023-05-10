import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { nome, idade } = await request.json();

  const errors = {} as any;
  if (!nome) {
    errors.nome = "is required";
  }
  if (!idade) {
    errors.idade = "is required";
  }
  if (Object.keys(errors).length) {
    return new Response(JSON.stringify(errors), { status: 400 });
  }

  const contato = await prisma.contato.create({ data: { nome, idade } });
  return new Response(JSON.stringify(contato), { status: 201 });
}

export async function GET(request: Request) {
  const where = {} as any;
  const url = new URL(request.url);

  if (url.searchParams.has("nome")) {
    where["nome"] = { contains: url.searchParams.get("nome") };
  }

  if (url.searchParams.has("idade")) {
    where["idade"] = Number(url.searchParams.get("idade"));
  }

  const contatos = await prisma.contato.findMany({
    where,
    include: { telefones: true },
  });
  return new Response(JSON.stringify(contatos), { status: 200 });
}
