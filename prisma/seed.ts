import "dotenv/config";
import { products } from "../src/data/products";
import { prisma } from "../src/lib/prisma";

async function main() {
  for (const [index, product] of products.entries()) {
    const sortOrder = index + 1;
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        inStock: product.inStock,
        externalStock: product.externalStock,
        comingSoon: product.comingSoon,
        sortOrder,
        variants: {
          deleteMany: {},
          create: product.variants,
        },
      },
      create: {
        id: product.id,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        inStock: product.inStock,
        externalStock: product.externalStock,
        comingSoon: product.comingSoon,
        sortOrder,
        variants: {
          create: product.variants,
        },
      },
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
