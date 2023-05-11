import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { nome, idade, telefones } = await request.json();

  const errors = {} as any;
  if (!nome) {
    errors.nome = "is required";
  }
  if (!idade) {
    errors.idade = "is required";
  }
  if (!telefones) {
    errors.telefones = "is required";
  }

  telefones.map((telefone: any, index: number) => {
    if (typeof telefone !== "string") {
      errors[`telefones[${index}]`] = "telefone deve ser uma string";
    }
  });
  if (Object.keys(errors).length) {
    return new Response(JSON.stringify(errors), { status: 400 });
  }

  const telefonesData = telefones.map((numero: any) => ({
    numero,
  }));
  console.log("teste", telefonesData);

  const contato = await prisma.contato.create({
    data: {
      nome,
      idade,
      telefones: {
        create: telefonesData,
      },
    },
    include: {
      telefones: true,
    },
  });

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
