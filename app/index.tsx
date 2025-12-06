import { Text } from "@/components/ui/text";
import { itemsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { db } from "@/db/utils";

const Index = () => {
  const [items, setItems] = useState<(typeof itemsTable.$inferSelect)[] | null>(
    null
  );

  useEffect(() => {
    const testInsert = async () => {
      await db
        .insert(itemsTable)
        .values([
          {
            name: "testing",
            quantity: 30,
          },
        ])
        .onConflictDoNothing({ target: itemsTable.name });
      const items = await db.select().from(itemsTable);
      console.log(items);
    };
    testInsert();
  }, []);

  return (
    <SafeAreaView className="mx-10">
      <Text>asdasd</Text>
    </SafeAreaView>
  );
};

export default Index;
