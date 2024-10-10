-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RouteStop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RouteStop_AB_unique" ON "_RouteStop"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteStop_B_index" ON "_RouteStop"("B");

-- AddForeignKey
ALTER TABLE "_RouteStop" ADD CONSTRAINT "_RouteStop_A_fkey" FOREIGN KEY ("A") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteStop" ADD CONSTRAINT "_RouteStop_B_fkey" FOREIGN KEY ("B") REFERENCES "Stop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
