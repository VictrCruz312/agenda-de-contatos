-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "idade" DECIMAL(3,0) NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(16) NOT NULL,
    "idContato" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
