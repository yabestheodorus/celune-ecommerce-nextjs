import { Prisma } from "@prisma/client";

async function main() {
  console.log("Product DMMF fields:");
  const fields = Prisma.dmmf.datamodel.models.find(m => m.name === 'Product')?.fields;
  if (!fields) {
    console.log("Could not find Product model in DMMF");
  } else {
    fields.forEach(f => console.log(`- ${f.name} (${f.type}) unique: ${f.isUnique}`));
  }
}

main().catch(console.error);
