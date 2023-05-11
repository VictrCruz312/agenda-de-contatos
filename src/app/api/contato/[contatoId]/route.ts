import logger from "@/utils/logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { contatoId: string };
  }
) {
  let data;
  try {
    data = await request.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "nenhum campo para atualizar" }),
      { status: 200 }
    );
  }

  try {
    const { nome, idade, ...rest } = data;
    const contato = await prisma.contato.update({
      where: { id: Number(params.contatoId) },
      data: { nome, idade },
    });
    return new Response(JSON.stringify(contato), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Contato não encontrado" }), {
      status: 404,
    });
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { contatoId: string };
  }
) {
  try {
    const contato = await prisma.contato.delete({
      where: { id: Number(params.contatoId) },
    });
    logger.info(
      `Contato de nome, '${contato.nome}' e idade, '${contato.idade}' excluído`
    );
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Contato não encontrado" }), {
      status: 404,
    });
  }
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { contatoId: string };
  }
) {
  try {
    const contato = await prisma.contato.findUnique({
      where: { id: Number(params.contatoId) },
      include: { telefones: true },
    });

    if (!contato) {
      return new Response(
        JSON.stringify({ message: "Contato não encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(contato), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Erro ao buscar o contato" }),
      {
        status: 500,
      }
    );
  }
}
