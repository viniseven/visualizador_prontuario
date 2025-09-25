-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicalRecord" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "cpf" INTEGER NOT NULL,
    "rg" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_rg_key" ON "Patient"("rg");
