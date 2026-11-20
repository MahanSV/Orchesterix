-- CreateEnum
CREATE TYPE "bankAccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DORMANT', 'BLOCKED', 'PENDING_ACTIVATION', 'CLOSED');

-- CreateEnum
CREATE TYPE "bankAccountType" AS ENUM ('CURRENT', 'QARZ_AL_HASAN_SAVINGS', 'SHORT_TERM_ORDINARY', 'SHORT_TERM_SPECIAL', 'LONG_TERM');

-- CreateEnum
CREATE TYPE "staffRole" AS ENUM ('Admin', 'Support', 'Manager');

-- CreateEnum
CREATE TYPE "staffStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "ticketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'WAITING_FOR_INTERNAL_UNIT', 'RESOLVED', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "shebaId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "turnover" TEXT NOT NULL,
    "type" "bankAccountType" NOT NULL,
    "status" "bankAccountStatus" NOT NULL,
    "score" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BankAccountFacility" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "facilityFieldId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FacilitiesCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "FacilityField" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "facilityTemplateId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FacilityTemplate" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "facilitiesCategoryId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "role" "staffRole" NOT NULL,
    "status" "staffStatus" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT,
    "answer" JSONB,
    "status" "ticketStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "staffId" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "status" "userStatus" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UserInquery" (
    "id" TEXT NOT NULL,
    "point" TEXT,
    "guarantees" JSONB,
    "totalTurnover" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_id_key" ON "FAQ"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_id_key" ON "BankAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccountFacility_id_key" ON "BankAccountFacility"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacilitiesCategory_id_key" ON "FacilitiesCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacilityField_id_key" ON "FacilityField"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacilityTemplate_id_key" ON "FacilityTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_id_key" ON "Staff"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nationalId_role" ON "Staff"("nationalId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_staffId_key" ON "Ticket"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalId_key" ON "User"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "UserInquery_id_key" ON "UserInquery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInquery_userId_key" ON "UserInquery"("userId");

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccountFacility" ADD CONSTRAINT "BankAccountFacility_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccountFacility" ADD CONSTRAINT "BankAccountFacility_facilityFieldId_fkey" FOREIGN KEY ("facilityFieldId") REFERENCES "FacilityField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityField" ADD CONSTRAINT "FacilityField_facilityTemplateId_fkey" FOREIGN KEY ("facilityTemplateId") REFERENCES "FacilityTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityTemplate" ADD CONSTRAINT "FacilityTemplate_facilitiesCategoryId_fkey" FOREIGN KEY ("facilitiesCategoryId") REFERENCES "FacilitiesCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInquery" ADD CONSTRAINT "UserInquery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
