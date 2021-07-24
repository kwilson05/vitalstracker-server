-- CreateEnum
CREATE TYPE "WaterMeasurement" AS ENUM ('OUNCES', 'CUPS');

-- CreateTable
CREATE TABLE "BloodPressure" (
    "id" SERIAL NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "systolic" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterIntake" (
    "id" SERIAL NOT NULL,
    "measurement" "WaterMeasurement" NOT NULL DEFAULT E'CUPS',
    "intake" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vital" (
    "id" SERIAL NOT NULL,
    "notes" TEXT NOT NULL,
    "pulse" INTEGER NOT NULL,
    "bodyTemperature" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "waterIntakeId" INTEGER NOT NULL,
    "bloodPressureId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vital_waterIntakeId_unique" ON "Vital"("waterIntakeId");

-- CreateIndex
CREATE UNIQUE INDEX "Vital_bloodPressureId_unique" ON "Vital"("bloodPressureId");

-- AddForeignKey
ALTER TABLE "Vital" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vital" ADD FOREIGN KEY ("waterIntakeId") REFERENCES "WaterIntake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vital" ADD FOREIGN KEY ("bloodPressureId") REFERENCES "BloodPressure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
