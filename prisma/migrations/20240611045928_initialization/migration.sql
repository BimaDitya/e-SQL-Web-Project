-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TRUE', 'FALSE');

-- CreateTable
CREATE TABLE "Account" (
    "Id" SERIAL NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Password" CHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "Id" SERIAL NOT NULL,
    "FirstName" VARCHAR(255) NOT NULL,
    "LastName" VARCHAR(255) NOT NULL,
    "School" VARCHAR(255) NOT NULL,
    "FK_Account" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "Id" SERIAL NOT NULL,
    "Slug" TEXT NOT NULL,
    "Complete" "Status" NOT NULL DEFAULT 'FALSE',
    "Start_Time" TIMESTAMP(0) NOT NULL,
    "End_Time" TIMESTAMP(0) NOT NULL,
    "FK_Account" INTEGER NOT NULL,
    "FK_Material" INTEGER NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Material" (
    "Id" SERIAL NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Desc" TEXT NOT NULL,
    "Slug" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Content" (
    "Id" SERIAL NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Slug" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "FK_Material" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "Id" SERIAL NOT NULL,
    "Slug" VARCHAR(255) NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Score" REAL NOT NULL,
    "FK_Material" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Score" (
    "Id" SERIAL NOT NULL,
    "SubmittedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Score" REAL NOT NULL DEFAULT 0,
    "Trial" REAL NOT NULL DEFAULT 0,
    "Exercise" VARCHAR(255) NOT NULL,
    "FK_Account" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "Id" SERIAL NOT NULL,
    "Slug" VARCHAR(255) NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Score" REAL NOT NULL DEFAULT 0,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Results" (
    "Id" SERIAL NOT NULL,
    "Test" VARCHAR(255) NOT NULL DEFAULT '',
    "Slug" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Complete" "Status" NOT NULL DEFAULT 'FALSE',
    "FK_Account" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Durations" (
    "Id" SERIAL NOT NULL,
    "Test" VARCHAR(255) NOT NULL DEFAULT '',
    "Start_Time" TIMESTAMP(0) NOT NULL,
    "End_Time" TIMESTAMP(0) NOT NULL,
    "Duration" VARCHAR(255) NOT NULL DEFAULT '00:00',
    "FK_Account" INTEGER NOT NULL,

    CONSTRAINT "Durations_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email" ON "Account"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_FK_Account_key" ON "Profile"("FK_Account");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_Slug_key" ON "Progress"("Slug");

-- CreateIndex
CREATE INDEX "Progress_FK_Account_idx" ON "Progress"("FK_Account");

-- CreateIndex
CREATE INDEX "Progress_FK_Material_idx" ON "Progress"("FK_Material");

-- CreateIndex
CREATE UNIQUE INDEX "Material_Slug_key" ON "Material"("Slug");

-- CreateIndex
CREATE UNIQUE INDEX "Content_Slug_key" ON "Content"("Slug");

-- CreateIndex
CREATE INDEX "Content_FK_Material_idx" ON "Content"("FK_Material");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_Slug_key" ON "Exercise"("Slug");

-- CreateIndex
CREATE INDEX "Exercise_FK_Material_idx" ON "Exercise"("FK_Material");

-- CreateIndex
CREATE UNIQUE INDEX "Score_Exercise_key" ON "Score"("Exercise");

-- CreateIndex
CREATE INDEX "Score_FK_Account_idx" ON "Score"("FK_Account");

-- CreateIndex
CREATE UNIQUE INDEX "Exams_Slug_key" ON "Exams"("Slug");

-- CreateIndex
CREATE UNIQUE INDEX "Results_Slug_key" ON "Results"("Slug");

-- CreateIndex
CREATE INDEX "Results_FK_Account_idx" ON "Results"("FK_Account");

-- CreateIndex
CREATE INDEX "Durations_FK_Account_idx" ON "Durations"("FK_Account");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_FK_Account_fkey" FOREIGN KEY ("FK_Account") REFERENCES "Account"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_FK_Account_fkey" FOREIGN KEY ("FK_Account") REFERENCES "Account"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_FK_Material_fkey" FOREIGN KEY ("FK_Material") REFERENCES "Material"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_FK_Material_fkey" FOREIGN KEY ("FK_Material") REFERENCES "Material"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_FK_Material_fkey" FOREIGN KEY ("FK_Material") REFERENCES "Material"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_FK_Account_fkey" FOREIGN KEY ("FK_Account") REFERENCES "Account"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_FK_Account_fkey" FOREIGN KEY ("FK_Account") REFERENCES "Account"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Durations" ADD CONSTRAINT "Durations_FK_Account_fkey" FOREIGN KEY ("FK_Account") REFERENCES "Account"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
