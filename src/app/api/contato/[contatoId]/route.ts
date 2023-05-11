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
    const { nome, idade, telefones = [], ...rest } = data;
    await Promise.all(
      telefones.map(async (telefone: { id?: number; numero: string }) => {
        if (telefone.id) {
          const existingTelefone = await prisma.telefone.findFirst({
            where: {
              id: telefone.id,
              contato: { id: Number(params.contatoId) },
            },
          });
          if (!existingTelefone) {
            throw new Error("Telefone não encontrado");
          }

          // Se o telefone já existe no banco, faz a atualização pelo ID
          return prisma.telefone.update({
            where: { id: telefone.id },
            data: { numero: telefone.numero },
          });
        } else {
          // Se o telefone não existe no banco, faz a criação de um novo telefone
          return prisma.telefone.create({
            data: {
              numero: telefone.numero,
              contato: { connect: { id: Number(params.contatoId) } },
            },
          });
        }
      })
    );

    // Faz a atualização do contato
    const contato = await prisma.contato.update({
      where: { id: Number(params.contatoId) },
      data: { nome, idade },
      include: { telefones: true },
    });
    return new Response(JSON.stringify(contato), { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error.message === "Telefone não encontrado") {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 404,
      });
    }
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
    const telefones = await prisma.telefone.deleteMany({
      where: { idContato: Number(params.contatoId) },
    });

    const contato = await prisma.contato.delete({
      where: { id: Number(params.contatoId) },
    });
    logger.info(
      `Contato de nome, '${contato.nome}' e idade, '${contato.idade}' excluído`
    );
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
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
