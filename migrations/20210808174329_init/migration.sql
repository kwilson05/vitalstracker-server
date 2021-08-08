-- CreateEnum
CREATE TYPE "WaterMeasurement" AS ENUM ('OUNCES', 'CUPS');

-- CreateTable
CREATE TABLE "BloodPressure" (
    "id" SERIAL NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "systolic" INTEGER NOT NULL,
    "vitalID" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterIntake" (
    "id" SERIAL NOT NULL,
    "measurement" "WaterMeasurement" NOT NULL DEFAULT E'CUPS',
    "intake" INTEGER NOT NULL,
    "vitalID" INTEGER,

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloodPressure_vitalID_unique" ON "BloodPressure"("vitalID");

-- CreateIndex
CREATE UNIQUE INDEX "WaterIntake_vitalID_unique" ON "WaterIntake"("vitalID");

-- AddForeignKey
ALTER TABLE "BloodPressure" ADD FOREIGN KEY ("vitalID") REFERENCES "Vital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterIntake" ADD FOREIGN KEY ("vitalID") REFERENCES "Vital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vital" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
